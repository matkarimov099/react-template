import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function dateToString(date: Date | string | number) {
	return format(date, 'yyyy-MM-dd');
}

export function phoneToString(phone: string) {
	return phone.replace(/[^\d+]/g, '');
}
