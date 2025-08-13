import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { PageTitle } from '@/components/common/page-title.tsx';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';

// Lazy load all main components for better code splitting
const Dashboard = lazy(() => import('@/pages/dashboard/index.tsx'));
const Users = lazy(() => import('@/pages/users/Users.tsx'));
const Reports = lazy(() => import('@/pages/dashboard/Reports.tsx'));
const Calendar = lazy(() => import('@/pages/dashboard/Calendar.tsx'));
const Documents = lazy(() => import('@/pages/dashboard/Documents.tsx'));
const Settings = lazy(() => import('@/pages/dashboard/Settings.tsx'));
const Help = lazy(() => import('@/pages/dashboard/Help.tsx'));
const Ecommerce = lazy(() => import('@/pages/dashboard/projects/Ecommerce.tsx'));
const Social = lazy(() => import('@/pages/dashboard/projects/Social.tsx'));
const Security = lazy(() => import('@/pages/dashboard/projects/Security.tsx'));

/**
 * Main application routes with required authentication
 */
export const mainRoutes: RouteObject[] = [
	{
		index: true,
		element: <Navigate to="dashboard" replace />,
	},
	{
		path: 'dashboard',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.dashboard" />
				<Dashboard />
			</LazyComponent>
		),
	},
	{
		path: 'reports',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.reports" />
				<Reports />
			</LazyComponent>
		),
	},
	{
		path: 'users',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.users" />
				<Users />
			</LazyComponent>
		),
	},
	{
		path: 'calendar',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.calendar" />
				<Calendar />
			</LazyComponent>
		),
	},
	{
		path: 'documents',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.documents" />
				<Documents />
			</LazyComponent>
		),
	},
	{
		path: 'settings',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.settings" />
				<Settings />
			</LazyComponent>
		),
	},
	{
		path: 'help',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.help" />
				<Help />
			</LazyComponent>
		),
	},
	{
		path: 'projects/ecommerce',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.ecommerce" />
				<Ecommerce />
			</LazyComponent>
		),
	},
	{
		path: 'projects/social',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.social" />
				<Social />
			</LazyComponent>
		),
	},
	{
		path: 'projects/security',
		element: (
			<LazyComponent>
				<PageTitle title="navigation.security" />
				<Security />
			</LazyComponent>
		),
	},
];
