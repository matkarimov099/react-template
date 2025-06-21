import { PageTitle } from '@/components/common/page-title.tsx';
import { Users } from '@/pages/users/Users.tsx';
import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';

/**
 * Main application routes with required authentication
 */
export const mainRoutes: RouteObject[] = [
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
];

// Navigate is already imported at the top of the file
