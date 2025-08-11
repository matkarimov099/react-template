import { currentUser, login, logout } from '@/features/auth/services/auth.service.ts';
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
	const token = localStorage.getItem('accessToken');

	return useQuery({
		queryKey: ['current-user'],
		queryFn: currentUser,
		enabled: Boolean(token), // Faqat token mavjud bo'lganda so'rov yuborish
	});
}
