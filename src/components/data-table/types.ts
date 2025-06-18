// Generic filter interfaces for DataTable
export interface BaseFilter {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DateRangeFilter {
  from_date?: string;
  to_date?: string;
}

export interface DataTableFilter extends BaseFilter, DateRangeFilter {
  [key: string]: unknown; // Allow additional custom filters
}

// Data fetching result interface
export interface DataFetchResult<TData> {
  success: boolean;
  data: TData[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
    total_items: number;
  };
}

// Filter component props
export interface FilterComponentProps {
  onFilterChange: (filters: DataTableFilter) => void;
  currentFilters: DataTableFilter;
  isLoading?: boolean;
}
