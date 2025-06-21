// Export config types
export interface ExportConfig {
	entityName: string;
	columnMapping: Record<string, string>;
	columnWidths: Array<{ wch: number }>;
	headers: string[];
}

// Toolbar render function types
export interface ToolbarRenderProps<T> {
	selectedRows: T[];
	allSelectedIds: (string | number)[];
	totalSelectedCount: number;
	resetSelection: () => void;
}
