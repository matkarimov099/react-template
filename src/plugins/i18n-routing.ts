import type { Locale } from '@/context/i18n-context.ts';

export const SUPPORTED_LOCALES: Locale[] = ['uz', 'ru', 'en'];
export const DEFAULT_LOCALE: Locale = 'uz';

export function getLocaleFromPath(pathname: string): Locale {
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0] as Locale;

	if (SUPPORTED_LOCALES.includes(firstSegment)) {
		return firstSegment;
	}

	return DEFAULT_LOCALE;
}

export function removeLocaleFromPath(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0] as Locale;

	if (SUPPORTED_LOCALES.includes(firstSegment)) {
		return `/${segments.slice(1).join('/')}`;
	}

	return pathname;
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
	const cleanPath = removeLocaleFromPath(pathname);
	return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getLocalizedPath(path: string, locale: Locale): string {
	// Remove leading slash if present
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	return `/${locale}/${cleanPath}`;
}
