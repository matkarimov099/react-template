import axiosClient, { publicAxiosClient } from '@/plugins/axios.ts';
import type { ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';
import type { CurrentUser, LoginCredentials } from '../types.ts';

export async function login<T>(data: LoginCredentials) {
	return await publicAxiosClient.post<T, AxiosResponse<T, ServerError>>(
		'/auth/login',
		data,
	);
}

export async function logout() {
	return await axiosClient.get('/auth/logout');
}

export async function currentUser() {
	return await axiosClient.get<CurrentUser>('/auth/me');
}
