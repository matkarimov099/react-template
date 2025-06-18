import type {
  User,
  UserCreate,
  UserCreateResponse,
  UserUpdate,
} from '@/features/users/types.ts';
import type { DataTableFilter, DataFetchResult } from '@/components/data-table/types';
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

export async function getUsers(filters: DataTableFilter): Promise<DataFetchResult<User>> {
  const response = await axiosClient.post<PaginatedResponse<User>>(
    '/users/search',
    {
      page: filters.page || 1,
      limit: filters.limit || 10,
      search: filters.search || '',
      from_date: filters.from_date || '',
      to_date: filters.to_date || '',
      sort_by: filters.sort_by || 'created_at',
      sort_order: filters.sort_order || 'desc',
    },
  );

  const currentPage = filters.page || 1;
  const limit = filters.limit || 10;
  const totalItems = response.data.total;
  const totalPages = Math.ceil(totalItems / limit);

  // Transform the response to match DataFetchResult interface
  return {
    success: true,
    data: response.data.data,
    pagination: {
      page: currentPage,
      limit: limit,
      total_pages: totalPages,
      total_items: totalItems,
    },
  };
}

export async function getUsersByIds(ids: (string | number)[]): Promise<User[]> {
  const response = await axiosClient.post<{ data: User[] }>('/users/by-ids', {
    ids: ids.map(id => String(id)),
  });
  return response.data.data;
}

export async function deleteUser(id: string) {
  return await axiosClient.delete(`/users/${id}`);
}

export async function bulkDeleteUsers(ids: (string | number)[]) {
  return await axiosClient.post('/users/bulk-delete', {
    ids: ids.map(id => String(id)),
  });
}
