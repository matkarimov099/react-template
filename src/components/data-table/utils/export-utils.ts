import { toast } from 'sonner';
import ExcelJS from 'exceljs';

// Generic type for exportable data - should have string keys and values that can be converted to string
export type ExportableData = Record<
	string,
	string | number | boolean | null | undefined
>;

// More flexible type for any record
export type AnyRecord = Record<string, unknown>;

/**
 * Convert array of objects to CSV string
 */
function convertToCSV<T extends ExportableData>(
	data: T[],
	headers: string[],
	columnMapping?: Record<string, string>,
): string {
	if (data.length === 0) {
		throw new Error('No data to export');
	}

	// Create CSV header row with column mapping if provided
	let csvContent: string;

	if (columnMapping) {
		// Use column mapping for header names
		const headerRow = headers.map((header) => {
			const mappedHeader = columnMapping[header] || header;
			// Escape quotes and wrap in quotes if contains comma
			return mappedHeader.includes(',') || mappedHeader.includes('"')
				? `"${mappedHeader.replace(/"/g, '""')}"`
				: mappedHeader;
		});
		csvContent = `${headerRow.join(',')}\n`;
	} else {
		// Use original headers
		csvContent = `${headers.join(',')}\n`;
	}

	// Add data rows
	for (const item of data) {
		const row = headers.map((header) => {
			// Get the value for this header
			const value = item[header as keyof T];

			// Convert all values to string and properly escape for CSV
			const cellValue =
				value === null || value === undefined ? '' : String(value);
			// Escape quotes and wrap in quotes if contains comma
			return cellValue.includes(',') || cellValue.includes('"')
				? `"${cellValue.replace(/"/g, '""')}"`
				: cellValue;
		});

		csvContent += `${row.join(',')}\n`;
	}

	return csvContent;
}

/**
 * Download blob as file
 */
function downloadFile(blob: Blob, filename: string) {
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);

	link.setAttribute('href', url);
	link.setAttribute('download', filename);
	link.style.visibility = 'hidden';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * Export data to CSV file
 */
export function exportToCSV<T extends AnyRecord>(
	data: T[],
	filename: string,
	headers: string[] = Object.keys(data[0] || {}),
	columnMapping?: Record<string, string>, // Add columnMapping parameter
): boolean {
	if (data.length === 0) {
		console.error('No data to export');
		return false;
	}

	try {
		// Filter data to only include specified headers
		const filteredData = data.map((item) => {
			const filteredItem: Record<
				string,
				string | number | boolean | null | undefined
			> = {};
			for (const header of headers) {
				if (header in item) {
					const value = item[header];
					// Convert unknown values to ExportableData format
					if (value === null || value === undefined) {
						filteredItem[header] = value;
					} else {
						filteredItem[header] = String(value);
					}
				}
			}
			return filteredItem;
		});

		const csvContent = convertToCSV(filteredData, headers, columnMapping);
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		downloadFile(blob, `${filename}.csv`);
		return true;
	} catch (error) {
		console.error('Error creating CSV:', error);
		return false;
	}
}

/**
 * Export data to Excel file using ExcelJS package
 */
export async function exportToExcel<T extends AnyRecord>(
	data: T[],
	filename: string,
	columnMapping?: Record<string, string>, // Optional mapping of data keys to display names
	columnWidths?: Array<{ wch: number }>,
	headers?: string[], // Add headers parameter to specify which columns to export
): Promise<boolean> {
	if (data.length === 0) {
		console.error('No data to export');
		return false;
	}

	try {
		// If no column mapping is provided, create one from the data keys
		const mapping =
			columnMapping ||
			Object.keys(data[0] || {}).reduce(
				(acc, key) => {
					acc[key] =
						key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
					return acc;
				},
				{} as Record<string, string>,
			);

		// Create a new workbook and worksheet
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Data');

		// Define columns to export
		const columnsToExport = headers || Object.keys(mapping);

		// Set up columns with headers and widths
		worksheet.columns = columnsToExport.map((key, index) => ({
			header: mapping[key] || key,
			key: key,
			width: columnWidths?.[index]?.wch || 15,
		}));

		// Add data rows
		for (const item of data) {
			const rowData: Record<
				string,
				string | number | boolean | null | undefined
			> = {};
			for (const key of columnsToExport) {
				if (key in item) {
					const value = item[key];
					// Convert unknown values to ExportableData format
					if (value === null || value === undefined) {
						rowData[key] = value;
					} else {
						rowData[key] = String(value);
					}
				}
			}
			worksheet.addRow(rowData);
		}

		// Style the header row
		worksheet.getRow(1).eachCell((cell) => {
			cell.font = { bold: true };
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FFE0E0E0' },
			};
		});

		// Generate Excel buffer
		const excelBuffer = await workbook.xlsx.writeBuffer();

		// Create blob and download
		const blob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});

		downloadFile(blob, `${filename}.xlsx`);
		return true;
	} catch (error) {
		console.error('Error creating Excel file:', error);
		return false;
	}
}

/**
 * Unified export function that handles loading states and error handling
 */
export async function exportData<T extends AnyRecord>(
	type: 'csv' | 'excel',
	getData: () => Promise<T[]>,
	onLoadingStart?: () => void,
	onLoadingEnd?: () => void,
	options?: {
		headers?: string[];
		columnMapping?: Record<string, string>;
		columnWidths?: Array<{ wch: number }>;
		entityName?: string;
	},
): Promise<boolean> {
	// Use a consistent toast ID to ensure only one toast is shown at a time
	const TOAST_ID = 'export-data-toast';

	try {
		// Start loading
		if (onLoadingStart) onLoadingStart();

		// Show toast for long operations using consistent ID
		toast.loading('Preparing export...', {
			description: 'Fetching data for export...',
			id: TOAST_ID,
		});

		// Get the data
		const exportData = await getData();

		// Update the same toast for processing
		toast.loading('Processing data...', {
			description: 'Generating export file...',
			id: TOAST_ID,
		});

		if (exportData.length === 0) {
			toast.error('Export failed', {
				description: 'No data available to export.',
				id: TOAST_ID,
			});
			return false;
		}

		// Get entity name for display in notifications
		const entityName = options?.entityName || 'items';

		// Generate timestamp for filename
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const filename = `${entityName}-export-${timestamp}`;

		// Export based on type
		let success: boolean;
		if (type === 'csv') {
			// Convert to ExportableData format for CSV
			const exportableData = exportData.map((item) => {
				const converted: ExportableData = {};
				for (const [key, value] of Object.entries(item)) {
					if (value === null || value === undefined) {
						converted[key] = value;
					} else if (
						typeof value === 'string' ||
						typeof value === 'number' ||
						typeof value === 'boolean'
					) {
						converted[key] = value;
					} else {
						converted[key] = String(value);
					}
				}
				return converted;
			});

			success = exportToCSV(
				exportableData,
				filename,
				options?.headers,
				options?.columnMapping,
			);
			if (success) {
				toast.success('Export successful', {
					description: `Exported ${exportData.length} ${entityName} to CSV.`,
					id: TOAST_ID,
				});
			}
		} else {
			success = await exportToExcel(
				exportData,
				filename,
				options?.columnMapping,
				options?.columnWidths,
				options?.headers, // Pass headers to exportToExcel
			);
			if (success) {
				toast.success('Export successful', {
					description: `Exported ${exportData.length} ${entityName} to Excel.`,
					id: TOAST_ID,
				});
			}
		}

		return success;
	} catch (error) {
		console.error('Error exporting data:', error);

		toast.error('Export failed', {
			description: 'There was a problem exporting the data. Please try again.',
			id: TOAST_ID,
		});
		return false;
	} finally {
		// End loading regardless of result
		if (onLoadingEnd) onLoadingEnd();
	}
}
