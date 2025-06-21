import type { Locale } from '@/context/i18n-context.ts';
import { getUserFromToken, isAuthenticated } from '@/lib/auth.ts';
import { getPreferredLocale, isValidLocale } from '@/lib/locale-utils.ts';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/plugins/i18n-routing.ts';
import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';

/**
 * Auth loader with i18n integration
 * Redirects to login page if not authenticated while preserving the locale
 */
export function authLoader({ request, params }: LoaderFunctionArgs) {
	const locale = params.locale;

	if (!isAuthenticated()) {
		const user = getUserFromToken();
		const currentPath = new URL(request.url).pathname;

		// Save the current path for redirect after login
		if (user?.id) {
			sessionStorage.setItem(user.id, currentPath);
		}

		// Redirect to login page with correct locale
		const targetLocale = isValidLocale(locale as string)
			? locale
			: getPreferredLocale();

		return redirect(`/${targetLocale}/auth/login`);
	}

	return null;
}

/**
 * Locale validation loader
 * Ensures the URL has a valid locale, otherwise redirects to preferred locale
 */
export function localeLoader({ params, request }: LoaderFunctionArgs) {
	const locale = params.locale as string;

	if (SUPPORTED_LOCALES.includes(locale as Locale)) {
		return null; // Valid locale, continue
	}

	// Invalid locale, redirect to path with preferred locale
	const { pathname } = new URL(request.url);
	const preferredLocale = getPreferredLocale();
	const pathSegments = pathname.split('/').filter(Boolean);

	if (pathSegments.length > 0) {
		// Replace invalid locale or insert preferred locale
		if (pathSegments[0].length === 2) {
			pathSegments[0] = preferredLocale;
		} else {
			pathSegments.unshift(preferredLocale);
		}
	} else {
		pathSegments.push(preferredLocale);
	}

	return redirect(`/${pathSegments.join('/')}`);
}

/**
 * Auth locale loader
 * Validates locale for auth routes and redirects to default if invalid
 */
export function authLocaleLoader({ params }: LoaderFunctionArgs) {
	const locale = params.locale as string;

	if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
		return redirect(`/${DEFAULT_LOCALE}/auth`);
	}

	return null;
}

/**
 * Root locale redirect loader
 * Used for paths without locale to redirect based on user preference
 */
export function rootRedirectLoader({ request }: LoaderFunctionArgs) {
	const preferredLocale = getPreferredLocale();
	const { pathname } = new URL(request.url);

	// For root path or non-locale paths, redirect to preferred locale
	return redirect(`/${preferredLocale}${pathname}`);
}
