import type { CurrentUser } from '@/features/auth/types.ts';
import { createContext } from 'react';

interface AuthContext {
	authToken?: string | null;
	currentUser?: CurrentUser | null;
	logout: () => void;
	isLoading: boolean;
	isSuccessLogout: boolean;
	isErrorLogout: boolean;
	isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
