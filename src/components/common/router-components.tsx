import type { Locale } from '@/context/i18n-context.ts';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { DefaultLayout } from '@/layout/DefaultLayout.tsx';
import { getLocaleFromPath } from '@/plugins/i18n-routing.ts';
import AuthContextProvider from '@/provider/auth-context-provider.tsx';
import { I18nProvider } from '@/provider/i18n-provider.tsx';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

/**
 * LocaleWrapper component that provides I18n context
 */
export function LocaleWrapper({ children }: { children: ReactNode }) {
	const currentPath = window.location.pathname;
	const locale = getLocaleFromPath(currentPath);

	return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}

/**
 * MainLayoutWrapper component with auth context and default layout
 */
export function MainLayoutWrapper() {
	return (
		<LocaleWrapper>
			<AuthContextProvider>
				<DefaultLayout />
			</AuthContextProvider>
		</LocaleWrapper>
	);
}

/**
 * AuthLayoutWrapper component with auth layout
 */
export function AuthLayoutWrapper() {
	return (
		<LocaleWrapper>
			<AuthLayout />
		</LocaleWrapper>
	);
}

/**
 * RootRedirect component to handle locale redirect
 */
export function RootRedirect() {
	const preferredLocale =
		(localStorage.getItem('app-locale') as Locale) || 'uz';
	return <Navigate to={`/${preferredLocale}/reports`} replace />;
}
