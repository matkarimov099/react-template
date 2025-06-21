import { NotAccess } from '@/components/common/not-access.tsx';
import { NotFound } from '@/components/common/not-found.tsx';
import { PageTitle } from '@/components/common/page-title.tsx';
import { AuthLayout } from '@/layout/AuthLayout';
import { DefaultLayout } from '@/layout/DefaultLayout';
import { getUserFromToken, isAuthenticated } from '@/lib/auth.ts';
import { Login } from '@/pages/auth/Login.tsx';
import { Users } from '@/pages/users/Users.tsx';
import AuthContextProvider from '@/provider/auth-context-provider.tsx';
import {
	type LoaderFunctionArgs,
	createBrowserRouter,
	redirect,
} from 'react-router';

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
						<Users />
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
