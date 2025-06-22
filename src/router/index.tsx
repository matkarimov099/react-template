/**
 * International routing management for application
 * Handles locale detection, redirection, and provides i18n context
 */

import { NotAccess } from '@/components/common/not-access';
import { NotFound } from '@/components/common/not-found';
import {
	AuthLayoutWrapper,
	LocaleWrapper,
	MainLayoutWrapper,
	RootRedirect,
} from '@/components/common/router-components.tsx';
import {
	//   authLoader,
	authLocaleLoader,
	localeLoader,
	rootRedirectLoader,
} from '@/lib/loaders.ts';
import { authRoutes } from '@/router/auth-routes.tsx';
import { mainRoutes } from '@/router/main-routes.tsx';
import { createBrowserRouter } from 'react-router';

/**
 * Application router with internationalization support
 */
export const router = createBrowserRouter([
	// Root path redirect to preferred locale
	{
		path: '/',
		element: <RootRedirect />,
	},

	// Non-locale auth path redirect
	{
		path: 'auth/*',
		loader: rootRedirectLoader,
	},

	// Main application routes with locale
	{
		path: '/:locale',
		// Combine locale validation and authentication in one loader
		loader: async (args) => {
			// First validate the locale
			const localeResult = localeLoader(args);
			if (localeResult) return localeResult;

			// Authentication check temporarily disabled
			// return authLoader(args);
			return null; // Bypass authentication check temporarily
		},
		element: <MainLayoutWrapper />,
		errorElement: (
			<LocaleWrapper>
				<NotFound />
			</LocaleWrapper>
		),
		children: mainRoutes,
	},

	// Auth routes with locale
	{
		path: '/:locale/auth',
		loader: authLocaleLoader,
		element: <AuthLayoutWrapper />,
		children: authRoutes,
	},

	// Error pages
	{
		path: '/not-access',
		element: (
			<LocaleWrapper>
				<NotAccess />
			</LocaleWrapper>
		),
	},
	{
		path: '*',
		element: (
			<LocaleWrapper>
				<NotFound />
			</LocaleWrapper>
		),
	},
]);
