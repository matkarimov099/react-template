import { AuthContext } from '@/context/auth-context.ts';
import { useContext } from 'react';

export function useAuthContext() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuthContext must be used within a AuthContext');
	}
	return context;
}
