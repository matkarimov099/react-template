import type {
	UserCreate,
	UserCreateResponse,
	UserFilter,
	UserUpdate,
} from '@/features/users/types.ts';
import type { ServerError } from '@/types/common.ts';
import {
	keepPreviousData,
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createUser,
	deleteUser,
	getUsers,
	updateUser,
	bulkDeleteUsers,
} from '../services/users.service.ts';

export function useCreateUser() {
	return useMutation<UserCreateResponse, ServerError, UserCreate>({
		mutationFn: createUser,
	});
}

export function useUpdateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UserUpdate }) =>
			updateUser(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] }).then();
		},
	});
}

export function useGetUsers(filter?: UserFilter) {
	return useQuery({
		queryKey: ['users', filter],
		queryFn: filter ? () => getUsers(filter) : skipToken,
		placeholderData: keepPreviousData,
	});
}
useGetUsers.isQueryHook = true;

export function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] }).then();
		},
	});
}

export function useBulkDeleteUsers() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (ids: (string | number)[]) => bulkDeleteUsers(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] }).then();
		},
	});
}
