import { CalendarDatePicker } from "@/components/custom/calendar-date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DataTableFilter } from "@/components/data-table/types";
import { formatDate } from "@/components/data-table/utils/date-format";
import { cn } from "@/lib/utils";
import { CalendarIcon, FilterIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface UsersFilterProps {
  onFilterChange: (filters: DataTableFilter) => void;
  currentFilters: DataTableFilter;
  isLoading?: boolean;
}

const sortOptions = [
  { value: "created_at", label: "Date Created" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "age", label: "Age" },
  { value: "expense_count", label: "Expense Count" },
  { value: "total_expenses", label: "Total Expenses" },
];

export function UsersFilter({
  onFilterChange,
  currentFilters,
  isLoading = false,
}: UsersFilterProps) {
  const [localFilters, setLocalFilters] =
    useState<DataTableFilter>(currentFilters);
  const [searchInput, setSearchInput] = useState(currentFilters.search || "");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: currentFilters.from_date
      ? new Date(currentFilters.from_date)
      : undefined,
    to: currentFilters.to_date ? new Date(currentFilters.to_date) : undefined,
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentFilters.search) {
        const updatedFilters = {
          ...localFilters,
          search: searchInput,
          page: 1,
        };
        setLocalFilters(updatedFilters);
        onFilterChange(updatedFilters);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, currentFilters.search, localFilters, onFilterChange]);

  const handleFilterChange = useCallback(
    (newFilters: Partial<DataTableFilter>) => {
      const updatedFilters = {
        ...localFilters,
        ...newFilters,
        page: newFilters.page || 1, // Reset to first page when filters change
      };
      setLocalFilters(updatedFilters);
      onFilterChange(updatedFilters);
    },
    [localFilters, onFilterChange]
  );

  const handleDateRangeChange = useCallback(
    (range: { from: Date | undefined; to: Date | undefined }) => {
      setDateRange(range);
      handleFilterChange({
        from_date: range.from ? formatDate(range.from) : "",
        to_date: range.to ? formatDate(range.to) : "",
      });
    },
    [handleFilterChange]
  );

  const handleSortChange = useCallback(
    (field: string, order: "asc" | "desc") => {
      handleFilterChange({
        sort_by: field,
        sort_order: order,
      });
    },
    [handleFilterChange]
  );

  const clearFilters = useCallback(() => {
    const clearedFilters: DataTableFilter = {
      page: 1,
      limit: currentFilters.limit || 10,
      search: "",
      sort_by: "created_at",
      sort_order: "desc",
      from_date: "",
      to_date: "",
    };
    setLocalFilters(clearedFilters);
    setSearchInput("");
    setDateRange({ from: undefined, to: undefined });
    onFilterChange(clearedFilters);
  }, [currentFilters.limit, onFilterChange]);

  const hasActiveFilters =
    localFilters.search ||
    localFilters.from_date ||
    localFilters.to_date ||
    localFilters.sort_by !== "created_at" ||
    localFilters.sort_order !== "desc";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={isLoading}
          className="h-8"
        />
      </div>

      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 border-dashed",
              (dateRange.from || dateRange.to) && "border-solid bg-accent"
            )}
            disabled={isLoading}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
            {(dateRange.from || dateRange.to) && (
              <div className="ml-2 flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-primary/20" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div>
              <Label>Select date range</Label>
              <CalendarDatePicker
                date={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onDateSelect={(range) => {
                  handleDateRangeChange({
                    from: range.from,
                    to: range.to,
                  });
                }}
              />
            </div>
            {(dateRange.from || dateRange.to) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleDateRangeChange({ from: undefined, to: undefined })
                }
                className="w-full"
              >
                <XIcon className="mr-2 h-4 w-4" />
                Clear dates
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Sort Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 border-dashed",
              (localFilters.sort_by !== "created_at" ||
                localFilters.sort_order !== "desc") &&
                "border-solid bg-accent"
            )}
            disabled={isLoading}
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Sort
            {(localFilters.sort_by !== "created_at" ||
              localFilters.sort_order !== "desc") && (
              <div className="ml-2 flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-primary/20" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div>
              <Label>Sort by</Label>
              <Select
                value={localFilters.sort_by || "created_at"}
                onValueChange={(value) =>
                  handleSortChange(value, localFilters.sort_order || "desc")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Order</Label>
              <Select
                value={localFilters.sort_order || "desc"}
                onValueChange={(value) =>
                  handleSortChange(
                    localFilters.sort_by || "created_at",
                    value as "asc" | "desc"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={isLoading}
          className="h-8 px-2 lg:px-3"
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
