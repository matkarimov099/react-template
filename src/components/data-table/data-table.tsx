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

import { Skeleton } from "@/components/ui/skeleton";
import { DataTableResizer } from "./data-table-resizer";
import { useTableColumnResize } from "./hooks/use-table-column-resize";
import { DataTablePagination } from "./pagination";
import {
  cleanupColumnResizing,
  initializeColumnSizes,
  trackColumnResizing,
} from "./utils/column-sizing";
import { createKeyboardNavigationHandler } from "./utils/keyboard-navigation";
import { type TableConfig, useTableConfig } from "./utils/table-config";
import type { ExportConfig, ToolbarRenderProps } from "./types";
import { DataTableToolbar } from "@/components/data-table/toolbar.tsx";

// Types for table handlers
type ColumnOrderUpdater = (prev: string[]) => string[];
type RowSelectionUpdater = (
  prev: Record<string, boolean>
) => Record<string, boolean>;

interface DataTableProps<TData> {
  // Allow overriding the table configuration
  config?: Partial<TableConfig>;

  // Column definitions generator
  getColumns: (
    handleRowDeselection: ((rowId: string) => void) | null | undefined
  ) => ColumnDef<TData>[];

  // Data to display in the table
  data: TData[];

  // Total count for pagination
  totalItems: number;

  // Export configuration
  exportConfig: ExportConfig;

  // ID field in TData for tracking selected items
  idField: keyof TData;

  // Custom page size options
  pageSizeOptions?: number[];

  // Custom toolbar content render function
  renderToolbarContent?: (props: ToolbarRenderProps<TData>) => React.ReactNode;

  // Loading state
  isLoading?: boolean;

  // Pagination props
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;

  // Sorting props
  sorting?: Array<{ id: string; desc: boolean }>;
  onSortingChange?: (
    updaterOrValue:
      | Array<{ id: string; desc: boolean }>
      | ((
          prev: Array<{ id: string; desc: boolean }>
        ) => Array<{ id: string; desc: boolean }>)
  ) => void;

  // Search props
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function DataTable<TData>({
  config = {},
  getColumns,
  data,
  totalItems,
  exportConfig,
  idField = "id" as keyof TData,
  pageSizeOptions,
  renderToolbarContent,
  isLoading = false,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  sorting: externalSorting = [],
  onSortingChange,
  searchValue: externalSearchValue = "",
  onSearchChange,
}: DataTableProps<TData>) {
  // Load table configuration with any overrides
  const tableConfig = useTableConfig(config);

  // Table ID for localStorage storage - generate a default if not provided
  const tableId = tableConfig.columnResizingTableId || "data-table-default";

  // Use our custom hook for column resizing
  const { columnSizing, setColumnSizing, resetColumnSizing } =
    useTableColumnResize(tableId, tableConfig.enableColumnResizing);

  // Column order state (managed separately from URL state as it's persisted in localStorage)
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  // PERFORMANCE FIX: Use only one selection state as the source of truth
  const [selectedItemIds, setSelectedItemIds] = useState<
    Record<string | number, boolean>
  >({});

  // No sorting from filters - use external sorting if provided, otherwise internal
  const [sorting, setSorting] =
    useState<Array<{ id: string; desc: boolean }>>(externalSorting);

  // Global filter state for search
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Search state - use external search if manual, otherwise internal
  const [searchTerm, setSearchTerm] = useState<string>(externalSearchValue);

  // Update internal search when external search changes
  useEffect(() => {
    if (tableConfig.manualSearching) {
      setSearchTerm(externalSearchValue);
    }
  }, [externalSearchValue, tableConfig.manualSearching]);

  // Handle search change
  const handleSearchChange = useCallback(
    (value: string) => {
      if (tableConfig.manualSearching && onSearchChange) {
        // Manual search - call external handler
        onSearchChange(value);
      } else {
        // Internal search - use global filter
        setGlobalFilter(value);
      }
      setSearchTerm(value);
    },
    [tableConfig.manualSearching, onSearchChange]
  );

  // Get current search value
  const currentSearchValue = tableConfig.manualSearching
    ? searchTerm
    : globalFilter;

  // Update internal sorting when external sorting changes
  useEffect(() => {
    if (tableConfig.manualSorting) {
      setSorting(externalSorting);
    }
  }, [externalSorting, tableConfig.manualSorting]);

  // Handle sorting change
  const handleSortingChange = useCallback(
    (
      updaterOrValue:
        | Array<{ id: string; desc: boolean }>
        | ((
            prev: Array<{ id: string; desc: boolean }>
          ) => Array<{ id: string; desc: boolean }>)
    ) => {
      if (tableConfig.manualSorting && onSortingChange) {
        onSortingChange(updaterOrValue);
      } else {
        // Internal sorting
        setSorting(updaterOrValue);
      }
    },
    [tableConfig.manualSorting, onSortingChange]
  );

  // Get current data items - already provided as prop
  const dataItems = useMemo(() => data || [], [data]);

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

    // Find items from current page that are selected
    // Return current page items (since we don't have fetchByIdsFn anymore)
    return dataItems.filter((item) => selectedItemIds[String(item[idField])]);
  }, [dataItems, selectedItemIds, totalSelectedItems, idField]);

  // Get all items on current page
  const getAllItems = useCallback((): TData[] => {
    // Return current page data
    return dataItems;
  }, [dataItems]);

  // Memoized pagination state
  const pagination = useMemo(
    () => ({
      pageIndex: currentPage - 1,
      pageSize: pageSize,
    }),
    [currentPage, pageSize]
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

  // Handle pagination changes
  const handlePaginationChange = useCallback(
    (
      updaterOrValue:
        | { pageIndex: number; pageSize: number }
        | ((prev: { pageIndex: number; pageSize: number }) => {
            pageIndex: number;
            pageSize: number;
          })
    ) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue({
              pageIndex: currentPage - 1,
              pageSize: pageSize,
            })
          : updaterOrValue;

      if (onPageChange && newPagination.pageIndex !== currentPage - 1) {
        onPageChange(newPagination.pageIndex + 1);
      }

      if (onPageSizeChange && newPagination.pageSize !== pageSize) {
        onPageSizeChange(newPagination.pageSize);
      }
    },
    [currentPage, pageSize, onPageChange, onPageSizeChange]
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

  // Calculate total pages based on totalItems and current pageSize
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

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
      globalFilter: tableConfig.manualSearching ? "" : globalFilter,
    },
    columnResizeMode: "onChange" as ColumnResizeMode,
    onColumnSizingChange: handleColumnSizingChange,
    onColumnOrderChange: handleColumnOrderChange,
    onSortingChange: handleSortingChange,
    onGlobalFilterChange: tableConfig.manualSearching
      ? undefined
      : setGlobalFilter,
    pageCount: totalPages,
    enableRowSelection: tableConfig.enableRowSelection,
    enableColumnResizing: tableConfig.enableColumnResizing,
    enableGlobalFilter: tableConfig.enableSearch && !tableConfig.manualSearching,
    manualPagination: tableConfig.manualPagination,
    manualSorting: tableConfig.manualSorting,
    manualFiltering: tableConfig.manualFiltering,
    onRowSelectionChange: handleRowSelectionChange,
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

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      {tableConfig.enableToolbar && (
        <DataTableToolbar
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
          searchValue={currentSearchValue}
          onSearchChange={handleSearchChange}
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
              Array.from({ length: pageSize }, (_, index) => {
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
          totalItems={totalItems}
          totalSelectedItems={totalSelectedItems}
          pageSizeOptions={pageSizeOptions || [10, 20, 30, 40, 50]}
          size={tableConfig.size}
        />
      )}
    </div>
  );
}
