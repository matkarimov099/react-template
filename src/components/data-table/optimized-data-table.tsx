import {
  type ColumnDef,
  type ColumnResizeMode,
  type ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { DataTableResizer } from "./data-table-resizer";
import { useTableColumnResize } from "./hooks/use-table-column-resize";
import { DataTablePagination } from "./pagination";
import { OptimizedDataTableToolbar } from "./optimized-toolbar";
import type { DataTableFilter, DataFetchResult } from "./types";
import {
  cleanupColumnResizing,
  initializeColumnSizes,
  trackColumnResizing,
} from "./utils/column-sizing";
import { createKeyboardNavigationHandler } from "./utils/keyboard-navigation";
import { type TableConfig, useTableConfig } from "./utils/table-config";
import { createSortingState } from "./utils/table-state-handlers";

// Types for table handlers
type PaginationUpdater = (prev: { pageIndex: number; pageSize: number }) => {
  pageIndex: number;
  pageSize: number;
};
type SortingUpdater = (
  prev: { id: string; desc: boolean }[]
) => { id: string; desc: boolean }[];
type ColumnOrderUpdater = (prev: string[]) => string[];
type RowSelectionUpdater = (
  prev: Record<string, boolean>
) => Record<string, boolean>;

interface DataTableProps<TData, TValue> {
  // Allow overriding the table configuration
  config?: Partial<TableConfig>;

  // Column definitions generator
  getColumns: (
    handleRowDeselection: ((rowId: string) => void) | null | undefined
  ) => ColumnDef<TData, TValue>[];

  // Data fetching function
  fetchDataFn: (filters: DataTableFilter) => Promise<DataFetchResult<TData>>;

  // Function to fetch specific items by their IDs
  fetchByIdsFn?: (ids: number[] | string[]) => Promise<TData[]>;

  // Export configuration
  exportConfig: {
    entityName: string;
    columnMapping: Record<string, string>;
    columnWidths: Array<{ wch: number }>;
    headers: string[];
  };

  // ID field in TData for tracking selected items
  idField: keyof TData;

  // Custom page size options
  pageSizeOptions?: number[];

  // Custom toolbar content render function
  renderToolbarContent?: (props: {
    selectedRows: TData[];
    allSelectedIds: (string | number)[];
    totalSelectedCount: number;
    resetSelection: () => void;
  }) => React.ReactNode;

  // Filter component - this is the key change
  filterComponent?: React.ComponentType<{
    onFilterChange: (filters: DataTableFilter) => void;
    currentFilters: DataTableFilter;
    isLoading?: boolean;
  }>;

  // Initial filters
  initialFilters?: Partial<DataTableFilter>;
}

export function DataTable<TData, TValue>({
  config = {},
  getColumns,
  fetchDataFn,
  fetchByIdsFn,
  exportConfig,
  idField = "id" as keyof TData,
  pageSizeOptions,
  renderToolbarContent,
  filterComponent: FilterComponent,
  initialFilters = {},
}: DataTableProps<TData, TValue>) {
  // Load table configuration with any overrides
  const tableConfig = useTableConfig(config);

  // Table ID for localStorage storage - generate a default if not provided
  const tableId = tableConfig.columnResizingTableId || "data-table-default";

  // Use our custom hook for column resizing
  const { columnSizing, setColumnSizing, resetColumnSizing } =
    useTableColumnResize(tableId, tableConfig.enableColumnResizing);

  // Default filters
  const defaultFilters: DataTableFilter = {
    page: 1,
    limit: 10,
    search: "",
    sort_by: "created_at",
    sort_order: "desc",
    from_date: "",
    to_date: "",
    ...initialFilters,
  };

  // Current filters state
  const [currentFilters, setCurrentFilters] =
    useState<DataTableFilter>(defaultFilters);

  // Internal states
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{
    data: TData[];
    pagination: {
      page: number;
      limit: number;
      total_pages: number;
      total_items: number;
    };
  } | null>(null);

  // Column order state (managed separately from URL state as it's persisted in localStorage)
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  // PERFORMANCE FIX: Use only one selection state as the source of truth
  const [selectedItemIds, setSelectedItemIds] = useState<
    Record<string | number, boolean>
  >({});

  // Convert the sorting from filters to the format TanStack Table expects
  const sorting = useMemo(
    () =>
      createSortingState(
        currentFilters.sort_by || "created_at",
        currentFilters.sort_order || "desc"
      ),
    [currentFilters.sort_by, currentFilters.sort_order]
  );

  // Get current data items - memoize to avoid recalculations
  const dataItems = useMemo(() => data?.data || [], [data?.data]);

  // PERFORMANCE FIX: Derive rowSelection from selectedItemIds using memoization
  const rowSelection = useMemo(() => {
    if (!dataItems.length) return {};

    // Map selectedItemIds to row indices for the table
    const selection: Record<string, boolean> = {};

    dataItems.forEach((item, index) => {
      const itemId = String(item[idField]);
      if (selectedItemIds[itemId]) {
        selection[String(index)] = true;
      }
    });

    return selection;
  }, [dataItems, selectedItemIds, idField]);

  // Calculate total selected items - memoize to avoid recalculation
  const totalSelectedItems = useMemo(
    () => Object.keys(selectedItemIds).length,
    [selectedItemIds]
  );

  // PERFORMANCE FIX: Optimized row deselection handler
  const handleRowDeselection = useCallback(
    (rowId: string) => {
      if (!dataItems.length) return;

      const rowIndex = Number.parseInt(rowId, 10);
      const item = dataItems[rowIndex];

      if (item) {
        const itemId = String(item[idField]);
        setSelectedItemIds((prev) => {
          // Remove this item ID from selection
          const next = { ...prev };
          delete next[itemId];
          return next;
        });
      }
    },
    [dataItems, idField]
  );

  // Clear all selections
  const clearAllSelections = useCallback(() => {
    setSelectedItemIds({});
  }, []);

  // PERFORMANCE FIX: Optimized row selection handler
  const handleRowSelectionChange = useCallback(
    (updaterOrValue: RowSelectionUpdater | Record<string, boolean>) => {
      // Determine the new row selection value
      const newRowSelection =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelection)
          : updaterOrValue;

      // Batch update selectedItemIds based on the new row selection
      setSelectedItemIds((prev) => {
        const next = { ...prev };

        // Process changes for current page
        if (dataItems.length) {
          // First handle explicit selections in newRowSelection
          for (const [rowId, isSelected] of Object.entries(newRowSelection)) {
            const rowIndex = Number.parseInt(rowId, 10);
            if (rowIndex >= 0 && rowIndex < dataItems.length) {
              const item = dataItems[rowIndex];
              const itemId = String(item[idField]);

              if (isSelected) {
                next[itemId] = true;
              } else {
                delete next[itemId];
              }
            }
          }

          // Then handle implicit deselection (rows that were selected but aren't in newRowSelection)
          dataItems.forEach((item, index) => {
            const itemId = String(item[idField]);
            const rowId = String(index);

            // If item was selected but isn't in new selection, deselect it
            if (prev[itemId] && newRowSelection[rowId] === undefined) {
              delete next[itemId];
            }
          });
        }

        return next;
      });
    },
    [dataItems, rowSelection, idField]
  );

  // Get selected items data
  const getSelectedItems = useCallback(async () => {
    // If nothing is selected, return empty array
    if (totalSelectedItems === 0) {
      return [];
    }

    // Get IDs of selected items
    const selectedIdsArray = Object.keys(selectedItemIds).map((id) =>
      Number.parseInt(id, 10)
    );

    // Find items from current page that are selected
    const itemsInCurrentPage = dataItems.filter(
      (item) => selectedItemIds[String(item[idField])]
    );

    // Get IDs of items on current page
    const idsInCurrentPage = itemsInCurrentPage.map(
      (item) => item[idField] as unknown as number
    );

    // Find IDs that need to be fetched (not on current page)
    const idsToFetch = selectedIdsArray.filter(
      (id) => !idsInCurrentPage.includes(id)
    );

    // If all selected items are on current page or we can't fetch by IDs
    if (idsToFetch.length === 0 || !fetchByIdsFn) {
      return itemsInCurrentPage;
    }

    try {
      // Fetch missing items in a single batch
      const fetchedItems = await fetchByIdsFn(idsToFetch);

      // Combine current page items with fetched items
      return [...itemsInCurrentPage, ...fetchedItems];
    } catch (error) {
      console.error("Error fetching selected items:", error);
      return itemsInCurrentPage;
    }
  }, [dataItems, selectedItemIds, totalSelectedItems, fetchByIdsFn, idField]);

  // Get all items on current page
  const getAllItems = useCallback((): TData[] => {
    // Return current page data
    return dataItems;
  }, [dataItems]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: DataTableFilter) => {
    setCurrentFilters(newFilters);
  }, []);

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchDataFn(currentFilters);
        setData(result);
        setIsError(false);
        setError(null);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentFilters, fetchDataFn]);

  // Memoized pagination state
  const pagination = useMemo(
    () => ({
      pageIndex: (currentFilters.page || 1) - 1,
      pageSize: currentFilters.limit || 10,
    }),
    [currentFilters.page, currentFilters.limit]
  );

  // Ref for the table container for keyboard navigation
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Get columns with the deselection handler (memoize to avoid recreation on render)
  const columns = useMemo(() => {
    // Only pass deselection handler if row selection is enabled
    return getColumns(
      tableConfig.enableRowSelection ? handleRowDeselection : null
    );
  }, [getColumns, handleRowDeselection, tableConfig.enableRowSelection]);

  // Create event handlers using utility functions
  const handleSortingChange = useCallback(
    (updaterOrValue: SortingUpdater | { id: string; desc: boolean }[]) => {
      // Extract the new sorting state
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;

      if (newSorting.length > 0) {
        const columnId = newSorting[0].id;
        const direction = newSorting[0].desc ? "desc" : "asc";

        handleFilterChange({
          ...currentFilters,
          sort_by: columnId,
          sort_order: direction,
          page: 1, // Reset to first page when sorting changes
        });
      }
    },
    [currentFilters, handleFilterChange, sorting]
  );

  const handlePaginationChange = useCallback(
    (
      updaterOrValue:
        | PaginationUpdater
        | { pageIndex: number; pageSize: number }
    ) => {
      // Extract the new pagination state
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue({
              pageIndex: (currentFilters.page || 1) - 1,
              pageSize: currentFilters.limit || 10,
            })
          : updaterOrValue;

      handleFilterChange({
        ...currentFilters,
        page: newPagination.pageIndex + 1,
        limit: newPagination.pageSize,
      });
    },
    [currentFilters, handleFilterChange]
  );

  const handleColumnSizingChange = useCallback(
    (
      updaterOrValue:
        | ColumnSizingState
        | ((prev: ColumnSizingState) => ColumnSizingState)
    ) => {
      if (typeof updaterOrValue === "function") {
        setColumnSizing((current) => updaterOrValue(current));
      } else {
        setColumnSizing(updaterOrValue);
      }
    },
    [setColumnSizing]
  );

  // Column order change handler
  const handleColumnOrderChange = useCallback(
    (updaterOrValue: ColumnOrderUpdater | string[]) => {
      const newColumnOrder =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnOrder)
          : updaterOrValue;

      setColumnOrder(newColumnOrder);

      // Persist column order to localStorage
      try {
        localStorage.setItem(
          `${tableId}-column-order`,
          JSON.stringify(newColumnOrder)
        );
      } catch (error) {
        console.error("Failed to save column order to localStorage:", error);
      }
    },
    [columnOrder, tableId]
  );

  // Load column order from localStorage on initial render
  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem(`${tableId}-column-order`);
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        setColumnOrder(parsedOrder);
      }
    } catch (error) {
      console.error("Error loading column order:", error);
    }
  }, [tableId]);

  // Set up the table with memoized state
  const table = useReactTable<TData>({
    data: dataItems,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination,
      columnSizing,
      columnOrder,
    },
    columnResizeMode: "onChange" as ColumnResizeMode,
    onColumnSizingChange: handleColumnSizingChange,
    onColumnOrderChange: handleColumnOrderChange,
    pageCount: data?.pagination.total_pages || 0,
    enableRowSelection: tableConfig.enableRowSelection,
    enableColumnResizing: tableConfig.enableColumnResizing,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Create keyboard navigation handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const handler = createKeyboardNavigationHandler(table, () => {
        // Example action on keyboard activation
      });
      handler(event);
    },
    [table]
  );

  // Initialize default column sizes when columns are available and no saved sizes exist
  useEffect(() => {
    initializeColumnSizes(columns, tableId, setColumnSizing);
  }, [columns, tableId, setColumnSizing]);

  // Handle column resizing
  useEffect(() => {
    const isResizingAny = table
      .getHeaderGroups()
      .some((headerGroup) =>
        headerGroup.headers.some((header) => header.column.getIsResizing())
      );

    trackColumnResizing(isResizingAny);

    // Cleanup on unmount
    return () => {
      cleanupColumnResizing();
    };
  }, [table]);

  // Reset column order
  const resetColumnOrder = useCallback(() => {
    // Reset to empty array (which resets to default order)
    table.setColumnOrder([]);
    setColumnOrder([]);

    // Remove from localStorage
    try {
      localStorage.removeItem(`${tableId}-column-order`);
    } catch (error) {
      console.error("Failed to remove column order from localStorage:", error);
    }
  }, [table, tableId]);

  // Handle error state
  if (isError) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load data:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Component */}
      {FilterComponent && (
        <FilterComponent
          onFilterChange={handleFilterChange}
          currentFilters={currentFilters}
          isLoading={isLoading}
        />
      )}

      {/* Toolbar */}
      {tableConfig.enableToolbar && (
        <OptimizedDataTableToolbar
          table={table}
          totalSelectedItems={totalSelectedItems}
          deleteSelection={clearAllSelections}
          getSelectedItems={getSelectedItems}
          getAllItems={getAllItems}
          config={tableConfig}
          resetColumnSizing={() => {
            resetColumnSizing();
            // Force a small delay and then refresh the UI
            setTimeout(() => {
              window.dispatchEvent(new Event("resize"));
            }, 100);
          }}
          resetColumnOrder={resetColumnOrder}
          entityName={exportConfig.entityName}
          columnMapping={exportConfig.columnMapping}
          columnWidths={exportConfig.columnWidths}
          headers={exportConfig.headers}
          customToolbarComponent={renderToolbarContent?.({
            selectedRows: dataItems.filter(
              (item) => selectedItemIds[String(item[idField])]
            ),
            allSelectedIds: Object.keys(selectedItemIds),
            totalSelectedCount: totalSelectedItems,
            resetSelection: clearAllSelections,
          })}
        />
      )}

      <div
        ref={tableContainerRef}
        className="overflow-y-auto rounded-md border table-container"
        aria-label="Data table"
        onKeyDown={
          tableConfig.enableKeyboardNavigation ? handleKeyDown : undefined
        }
      >
        <Table
          className={tableConfig.enableColumnResizing ? "resizable-table" : ""}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="px-2 py-2 relative text-left group/th"
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    tabIndex={-1}
                    style={{
                      width: header.getSize(),
                    }}
                    data-column-resizing={
                      header.column.getIsResizing() ? "true" : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {tableConfig.enableColumnResizing &&
                      header.column.getCanResize() && (
                        <DataTableResizer header={header} />
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              // Loading state
              Array.from({ length: currentFilters.limit || 10 }, (_, index) => {
                const rowKey = `loading-row-${tableId}-${index}`;
                return (
                  <TableRow key={rowKey} tabIndex={-1}>
                    {Array.from({ length: columns.length }, (_, colIndex) => {
                      const cellKey = `skeleton-cell-${tableId}-${index}-${colIndex}`;
                      return (
                        <TableCell
                          key={cellKey}
                          className="px-4 py-2 truncate max-w-0 text-left"
                          tabIndex={-1}
                        >
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : table.getRowModel().rows?.length ? (
              // Data rows
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  id={`row-${rowIndex}`}
                  data-row-index={rowIndex}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  tabIndex={0}
                  aria-selected={row.getIsSelected()}
                  onClick={
                    tableConfig.enableClickRowSelect
                      ? () => row.toggleSelected()
                      : undefined
                  }
                  onFocus={(e) => {
                    // Add a data attribute to the currently focused row
                    for (const el of document.querySelectorAll(
                      '[data-focused="true"]'
                    )) {
                      el.removeAttribute("data-focused");
                    }
                    e.currentTarget.setAttribute("data-focused", "true");
                  }}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      className="px-4 py-2 truncate max-w-0 text-left"
                      key={cell.id}
                      id={`cell-${rowIndex}-${cellIndex}`}
                      data-cell-index={cellIndex}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // No results
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-left truncate"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {tableConfig.enablePagination && (
        <DataTablePagination
          table={table}
          totalItems={data?.pagination.total_items || 0}
          totalSelectedItems={totalSelectedItems}
          pageSizeOptions={pageSizeOptions || [10, 20, 30, 40, 50]}
          size={tableConfig.size}
        />
      )}
    </div>
  );
}
