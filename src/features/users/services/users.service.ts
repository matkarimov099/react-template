import type {
	User,
	UserCreate,
	UserCreateResponse,
	UserFilter,
	UserUpdate,
} from '@/features/users/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function createUser(
	data: UserCreate,
): Promise<UserCreateResponse> {
	const response = await axiosClient.post<
		UserCreateResponse,
		AxiosResponse<UserCreateResponse, ServerError>
	>('/users', data);
	return response.data;
}

export async function updateUser(id: string, data: UserUpdate) {
	return await axiosClient.put(`/users/${id}`, data);
}

export async function getUsers(filter: UserFilter) {
	return await axiosClient.post<PaginatedResponse<User>>(
		'/users/search',
		filter,
	);
}

export async function deleteUser(id: string) {
	return await axiosClient.delete(`/users/${id}`);
}
