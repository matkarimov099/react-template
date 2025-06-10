import { NotAccess } from '@/components/common/not-access.tsx';
import { NotFound } from '@/components/common/not-found.tsx';
import { PageTitle } from '@/components/common/page-title.tsx';
import { AuthLayout } from '@/layout/AuthLayout';
import { DefaultLayout } from '@/layout/DefaultLayout';
import { Login } from '@/pages/auth/Login.tsx';
import AuthContextProvider from '@/provider/auth-context-provider.tsx';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
	{
		path: '/',
		element: (
			<AuthContextProvider>
				<DefaultLayout />
			</AuthContextProvider>
		),
		// loader: authLoader,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: (
					<>
						<PageTitle title="Dashboard" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Dashboard Home</h1>
							<p>
								Welcome to the main dashboard. Use the sidebar navigation to
								explore different sections.
							</p>
						</div>
					</>
				),
			},
			{
				path: 'analytics',
				element: (
					<>
						<PageTitle title="Analytics" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">
								Analytics Dashboard
							</h1>
							<p>View your analytics and performance metrics here.</p>
						</div>
					</>
				),
			},
			{
				path: 'reports',
				element: (
					<>
						<PageTitle title="Reports" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Reports</h1>
							<p>View and generate reports here.</p>
						</div>
					</>
				),
			},
			{
				path: 'users',
				element: (
					<>
						<PageTitle title="Users" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">User Management</h1>
							<p>Manage users and access controls.</p>
						</div>
					</>
				),
			},
			{
				path: 'users/list',
				element: (
					<>
						<PageTitle title="User List" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">User List</h1>
							<p>View and manage all users in the system.</p>
						</div>
					</>
				),
			},
			{
				path: 'users/groups',
				element: (
					<>
						<PageTitle title="User Groups" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">User Groups</h1>
							<p>Manage user groups and permissions.</p>
						</div>
					</>
				),
			},
			{
				path: 'statistics',
				element: (
					<>
						<PageTitle title="Statistics" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Statistics</h1>
							<p>View detailed statistics and data visualizations.</p>
						</div>
					</>
				),
			},
			{
				path: 'calendar',
				element: (
					<>
						<PageTitle title="Calendar" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Calendar</h1>
							<p>View and manage events and schedules.</p>
						</div>
					</>
				),
			},
			{
				path: 'documents',
				element: (
					<>
						<PageTitle title="Documents" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Documents</h1>
							<p>View and manage your documents.</p>
						</div>
					</>
				),
			},
			{
				path: 'settings',
				element: (
					<>
						<PageTitle title="Settings" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Settings</h1>
							<p>Configure your application settings.</p>
						</div>
					</>
				),
			},
			{
				path: 'help',
				element: (
					<>
						<PageTitle title="Help" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">Help & Support</h1>
							<p>Get help and support for using the application.</p>
						</div>
					</>
				),
			},
			{
				path: 'projects/ecommerce',
				element: (
					<>
						<PageTitle title="E-Commerce Project" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">
								E-Commerce Project
							</h1>
							<p>View and manage your e-commerce project details.</p>
						</div>
					</>
				),
			},
			{
				path: 'projects/social',
				element: (
					<>
						<PageTitle title="Social App Project" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">
								Social App Project
							</h1>
							<p>View and manage your social app project details.</p>
						</div>
					</>
				),
			},
			{
				path: 'projects/security',
				element: (
					<>
						<PageTitle title="Security App Project" />
						<div className="bg-card rounded-lg p-6 shadow-sm">
							<h1 className="text-2xl font-semibold mb-4">
								Security App Project
							</h1>
							<p>View and manage your security app project details.</p>
						</div>
					</>
				),
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/not-access',
		element: <NotAccess />,
	},
]);
