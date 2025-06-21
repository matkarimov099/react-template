import type { Table } from '@tanstack/react-table';
import { Search, Settings, Undo2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import type { TableConfig } from './utils/table-config';
import { DataTableViewOptions } from './view-options';
import type { ReactNode } from 'react';

// Helper functions for component sizing
const getButtonSizeClass = (size: 'sm' | 'default' | 'lg') => {
	switch (size) {
		case 'sm':
			return 'h-8 px-3';
		case 'lg':
			return 'h-11 px-5';
		default:
			return '';
	}
};

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	totalSelectedItems?: number;
	deleteSelection?: () => void;
	getSelectedItems?: () => Promise<TData[]>;
	getAllItems?: () => TData[];
	config: TableConfig;
	resetColumnSizing?: () => void;
	resetColumnOrder?: () => void;
	entityName?: string;
	columnMapping?: Record<string, string>;
	columnWidths?: Array<{ wch: number }>;
	headers?: string[];
	customToolbarComponent?: ReactNode;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
}

export function DataTableToolbar<TData>({
	table,
	config,
	resetColumnSizing,
	resetColumnOrder,
	customToolbarComponent,
	searchValue,
	onSearchChange,
}: DataTableToolbarProps<TData>) {
	const isFiltered =
		table.getState().columnFilters.length > 0 ||
		table.getState().globalFilter ||
		(config.manualSearching && searchValue);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
				{/* Search input */}
				{config.enableSearch && (
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search..."
							value={
								config.manualSearching
									? (searchValue ?? '')
									: ((table.getState().globalFilter as string) ?? '')
							}
							onChange={(event) => {
								if (config.manualSearching && onSearchChange) {
									onSearchChange(event.target.value);
								} else {
									table.setGlobalFilter(event.target.value);
								}
							}}
							className="pl-8 w-[250px] lg:w-[300px]"
						/>
						{((config.manualSearching && searchValue) ||
							(!config.manualSearching && table.getState().globalFilter)) && (
							<Button
								variant="ghost"
								onClick={() => {
									if (config.manualSearching && onSearchChange) {
										onSearchChange('');
									} else {
										table.setGlobalFilter('');
									}
								}}
								className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				)}

				{/* Custom toolbar component */}
				{customToolbarComponent}

				{/* Clear filters */}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => {
							table.resetColumnFilters();
							if (config.manualSearching && onSearchChange) {
								onSearchChange('');
							} else {
								table.setGlobalFilter('');
							}
						}}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>

			<div className="flex items-center gap-2">
				{/* Column visibility */}
				{config.enableColumnVisibility && (
					<DataTableViewOptions table={table} size={config.size} />
				)}

				{/* Table settings */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							size={config.size === 'sm' ? 'sm' : 'default'}
							className={`ml-auto hidden lg:flex ${getButtonSizeClass(
								config.size,
							)}`}
						>
							<Settings className="mr-2 h-4 w-4" />
							Settings
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-64">
						<div className="grid gap-4">
							<div className="space-y-2">
								<h4 className="font-medium leading-none">Table Settings</h4>
								<p className="text-sm text-muted-foreground">
									Customize your table appearance and behavior
								</p>
							</div>
							<div className="grid gap-2">
								{config.enableColumnResizing && resetColumnSizing && (
									<Button
										variant="outline"
										size="sm"
										onClick={resetColumnSizing}
										className="justify-start"
									>
										<Undo2 className="mr-2 h-4 w-4" />
										Reset column sizes
									</Button>
								)}
								{resetColumnOrder && (
									<Button
										variant="outline"
										size="sm"
										onClick={resetColumnOrder}
										className="justify-start"
									>
										<Undo2 className="mr-2 h-4 w-4" />
										Reset column order
									</Button>
								)}
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
