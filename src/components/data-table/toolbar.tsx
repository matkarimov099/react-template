import type { Table } from '@tanstack/react-table';
import { Search, Settings, Undo2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useI18n } from '@/hooks/use-i18n';
import type { ReactNode } from 'react';
import { DataTableExport } from './data-export';
import type { TableConfig } from './utils/table-config';
import { DataTableViewOptions } from './view-options';

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
	getSelectedItems,
	getAllItems,
	config,
	resetColumnSizing,
	resetColumnOrder,
	entityName,
	columnMapping,
	columnWidths,
	headers,
	customToolbarComponent,
	searchValue,
	onSearchChange,
}: Omit<DataTableToolbarProps<TData>, 'totalSelectedItems' | 'deleteSelection'>) {
	const { t } = useI18n();
	const isFiltered =
		table.getState().columnFilters.length > 0 ||
		table.getState().globalFilter ||
		(config.manualSearching && searchValue);

	return (
		<div className="flex flex-wrap items-center justify-between">
			<div className="flex flex-1 flex-wrap items-center gap-2">
				{/* Search input */}
				{config.enableSearch && (
					<div className="relative">
						<Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={t('dataTable.searchPlaceholder')}
							value={
								config.manualSearching
									? (searchValue ?? '')
									: ((table.getState().globalFilter as string) ?? '')
							}
							onChange={event => {
								if (config.manualSearching && onSearchChange) {
									onSearchChange(event.target.value);
								} else {
									table.setGlobalFilter(event.target.value);
								}
							}}
							className="w-[350px] rounded-md border border-border/50 bg-background/80 pl-8 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 lg:w-[300px]"
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
								className="absolute top-0 right-0 h-full px-3 py-0 hover:bg-transparent"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				)}
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
						{t('dataTable.reset')}
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>

			<div className="flex items-center gap-2">
				{/* Custom toolbar component */}
				{customToolbarComponent}

				{config.enableExport && getAllItems && (
					<DataTableExport<TData>
						table={table}
						data={getAllItems()}
						selectedData={[]}
						getSelectedItems={getSelectedItems}
						entityName={entityName}
						columnMapping={columnMapping}
						columnWidths={columnWidths}
						headers={headers}
						size={config.size}
					/>
				)}

				{/* Column visibility */}
				{config.enableColumnVisibility && <DataTableViewOptions table={table} size={config.size} />}

				{/* Table settings */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							size={config.size === 'sm' ? 'sm' : 'default'}
							className={`ml-auto hidden lg:flex ${getButtonSizeClass(config.size)}`}
						>
							<Settings className="mr-2 h-4 w-4" />
							{t('dataTable.settings')}
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-64">
						<div className="grid gap-4">
							<div className="space-y-2">
								<h4 className="font-medium leading-none">{t('dataTable.tableSettings')}</h4>
								<p className="text-muted-foreground text-sm">
									{t('dataTable.tableSettingsDescription')}
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
										{t('dataTable.resetColumnSizes')}
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
										{t('dataTable.resetColumnOrder')}
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
