import type { TableConfig } from '@/components/data-table/utils/table-config';

/**
 * Users table configuration with automatic search (global filter)
 * Bu config automatic search (tanstack table global filter) ishlatadi
 */
export const usersTableConfigAutoSearch: Partial<TableConfig> = {
	enableRowSelection: true,
	enableClickRowSelect: false,
	enableKeyboardNavigation: true,
	enableSearch: true, // Search input'ni yoqish
	enableDateFilter: false,
	enableColumnFilters: false,
	enableColumnVisibility: true,
	enableToolbar: true,
	enablePagination: true,
	enableExport: true,
	enableUrlState: false,
	enableColumnResizing: true,
	columnResizingTableId: 'users-table-auto-search',
	size: 'default',
	manualPagination: false, // Automatic pagination
	manualSorting: false, // Automatic sorting
	manualFiltering: false, // Automatic filtering
	manualSearch: false, // Automatic search - tanstack table global filter ishlatadi
};
