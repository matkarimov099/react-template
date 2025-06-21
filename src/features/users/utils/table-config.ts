import type { TableConfig } from '@/components/data-table/utils/table-config';

export const usersTableConfig: Partial<TableConfig> = {
	enableRowSelection: true,
	enableClickRowSelect: false,
	enableKeyboardNavigation: true,
	enableSearch: true,
	enableDateFilter: false,
	enableColumnFilters: false,
	enableColumnVisibility: true,
	enableToolbar: true,
	enablePagination: true,
	enableExport: true,
	enableUrlState: false,
	enableColumnResizing: true,
	columnResizingTableId: 'users-table',
	size: 'default',
	manualPagination: true,
	manualSorting: true,
	manualFiltering: true,
	manualSearching: true,
};
