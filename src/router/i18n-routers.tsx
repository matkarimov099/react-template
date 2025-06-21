import { NotAccess } from '@/components/common/not-access.tsx';
import { NotFound } from '@/components/common/not-found.tsx';
import { PageTitle } from '@/components/common/page-title.tsx';
import type { Locale } from '@/context/i18n-context';
import { AuthLayout } from '@/layout/AuthLayout';
import { DefaultLayout } from '@/layout/DefaultLayout';
import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	getLocaleFromPath,
} from '@/lib/i18n-routing';
import { Login } from '@/pages/auth/Login.tsx';
import { Users } from '@/pages/users/Users.tsx';
import AuthContextProvider from '@/provider/auth-context-provider.tsx';
import { I18nProvider } from '@/provider/i18n-provider.tsx';
import type { ReactNode } from 'react';
import { Navigate, createBrowserRouter, redirect } from 'react-router';

// Root redirect component to handle locale redirect
function RootRedirect() {
	const preferredLocale =
		(localStorage.getItem('app-locale') as Locale) || DEFAULT_LOCALE;
	return <Navigate to={`/${preferredLocale}/reports`} replace />;
}

// Locale wrapper component that provides I18n context
function LocaleWrapper({ children }: { children: ReactNode }) {
	const currentPath = window.location.pathname;
	const locale = getLocaleFromPath(currentPath);

	return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}

// function authLoader({ request }: LoaderFunctionArgs) {
// 	if (!isAuthenticated()) {
// 		const user = getUserFromToken();
// 		sessionStorage.setItem(user?.id || '', new URL(request.url).pathname);
// 		return redirect('/auth/login');
// 	}
// 	return null;
// }

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootRedirect />,
	},
	{
		path: '/:locale',
		loader: ({ params }) => {
			const locale = params.locale as Locale;
			if (!SUPPORTED_LOCALES.includes(locale)) {
				throw redirect(`/${DEFAULT_LOCALE}`);
			}
			return null;
		},
		element: (
			<LocaleWrapper>
				<AuthContextProvider>
					<DefaultLayout />
				</AuthContextProvider>
			</LocaleWrapper>
		),
		// loader: authLoader,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Navigate to="reports" replace />,
			},
			{
				path: 'reports',
				element: <div>Reports</div>,
			},
			{
				path: 'users',
				element: (
					<>
						<PageTitle title="navigation.users" />
						<Users />
					</>
				),
			},
			{
				path: 'calendar',
				element: <div>Calendar</div>,
			},
			{
				path: 'documents',
				element: <div>Documents</div>,
			},
			{
				path: 'settings',
				element: <div>Settings</div>,
			},
			{
				path: 'help',
				element: <div>Help</div>,
			},
			{
				path: 'projects/ecommerce',
				element: <div>E commerce</div>,
			},
			{
				path: 'projects/social',
				element: <div>Social</div>,
			},
			{
				path: 'projects/security',
				element: <div>Security</div>,
			},
		],
	},
	{
		path: '/:locale/auth',
		loader: ({ params }) => {
			const locale = params.locale as Locale;
			if (!SUPPORTED_LOCALES.includes(locale)) {
				throw redirect(`/${DEFAULT_LOCALE}/auth`);
			}
			return null;
		},
		element: (
			<LocaleWrapper>
				<AuthLayout />
			</LocaleWrapper>
		),
		children: [
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
	{
		path: '/not-access',
		element: <NotAccess />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);
