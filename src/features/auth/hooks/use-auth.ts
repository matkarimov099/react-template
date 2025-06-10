import {
	currentUser,
	login,
	logout,
} from '@/features/auth/services/auth.service.ts';
import type { AuthToken, LoginCredentials } from '@/features/auth/types.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: LoginCredentials) => login<AuthToken>(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] }).then();
		},
		onError: () => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] }).then();
		},
	});
}

export function useLogout() {
	return useMutation({
		mutationFn: logout,
	});
}

export function useCurrentUser() {
	return useQuery({
		queryKey: ['current-user'],
		queryFn: currentUser,
	});
}
