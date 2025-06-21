import type { Locale } from '@/context/i18n-context.ts';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/plugins/i18n-routing.ts';

/**
 * Gets the preferred locale from localStorage or falls back to DEFAULT_LOCALE
 */
export function getPreferredLocale(): Locale {
	return (localStorage.getItem('app-locale') as Locale) || DEFAULT_LOCALE;
}

/**
 * Validates if the given locale is supported
 */
export function isValidLocale(locale: string): boolean {
	return SUPPORTED_LOCALES.includes(locale as Locale);
}


