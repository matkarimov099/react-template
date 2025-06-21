import { Login } from '@/pages/auth/Login.tsx';
import type { RouteObject } from 'react-router';

/**
 * Authentication routes (login, register, etc.)
 */
export const authRoutes: RouteObject[] = [
	{
		path: 'login',
		element: <Login />,
	},
	// Future auth routes can be added here (register, forgot password, etc.)
];
