import { format } from 'date-fns';

export function humanizeDate(date: string | number | Date) {
	return format(date, 'dd-MM-yyyy');
}

export function humanizeDateTime(date: string | number | Date) {
	if (!date) return '—'; // Handle null/undefined
	const parsedDate = new Date(date);
	if (Number.isNaN(parsedDate.getTime())) return 'Invalid date'; // Handle invalid dates

	return format(parsedDate, 'dd/MM/yyyy HH:mm'); // Format valid date
}

export function humanizeBirthday(date: string | number | Date) {
	return format(date, 'dd/MM/yyyy');
}

export function humanizeCurrency(amount: number) {
	return amount.toLocaleString('uz-UZ');
}

export const formatNumber = (
	value: number | undefined,
	format: 'space' | 'dot' | 'comma',
	currencySymbol?: string,
	disableDecimals: boolean = Boolean(true), // Default to no decimals
): string => {
	if (value === undefined || value === null) return '';

	const formatter = new Intl.NumberFormat('uz-UZ', {
		minimumFractionDigits: disableDecimals ? 0 : 2,
		maximumFractionDigits: disableDecimals ? 0 : 2,
	});

	let formattedValue = formatter.format(value);

	switch (format) {
		case 'space':
			formattedValue = formattedValue.replace(/,/g, ' '); // 1 000 000
			break;
		case 'dot':
			formattedValue = formattedValue.replace(/,/g, '.'); // 1.000.000
			break;
		default:
			break; // "comma" remains unchanged, so no need to assign it to itself
	}

	return currencySymbol
		? `${formattedValue} ${currencySymbol}`
		: formattedValue; // Append currency
};
