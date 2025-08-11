import type {
	User,
	UserCreate,
	UserCreateResponse,
	UserFilter,
	UserUpdate,
} from '@/features/users/types.ts';
import type { PaginatedResponse } from '@/types/common.ts';
import {
	getMockUsersPage,
	getMockUserById,
	createMockUser,
	updateMockUser,
	deleteMockUser,
	bulkDeleteMockUsers,
} from '../data/mock-users.ts';

// Simulate API delay
function delay(ms: number = 500): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createUser(data: UserCreate): Promise<UserCreateResponse> {
	await delay(800); // Simulate network delay
	
	const newUser = createMockUser({
		name: data.name,
		email: data.email,
		phone: data.phone,
		age: data.age,
	});
	
	return {
		id: newUser.id,
		message: 'User created successfully',
	};
}

export async function updateUser(id: string, data: UserUpdate) {
	await delay(600); // Simulate network delay
	
	const updatedUser = updateMockUser(id, data);
	if (!updatedUser) {
		throw new Error('User not found');
	}
	
	return { data: updatedUser, message: 'User updated successfully' };
}

export async function getUsers(filter: UserFilter) {
	await delay(300); // Simulate network delay
	
	const result = getMockUsersPage(
		filter.page || 1,
		filter.limit || 25,
		filter.search,
		filter.sortBy || filter.sort_by,
		filter.sortOrder || filter.sort_order
	);
	
	const response: PaginatedResponse<User> = {
		data: result.data,
		total: result.total,
		page: result.page,
		limit: result.limit,
		totalPages: result.totalPages,
	};
	
	return { data: response };
}

export async function deleteUser(id: string) {
	await delay(400); // Simulate network delay
	
	const success = deleteMockUser(id);
	if (!success) {
		throw new Error('User not found');
	}
	
	return { message: 'User deleted successfully' };
}

export async function bulkDeleteUsers(ids: (string | number)[]) {
	await delay(600); // Simulate network delay
	
	const stringIds = ids.map(id => String(id));
	const deletedCount = bulkDeleteMockUsers(stringIds);
	
	return { 
		message: `${deletedCount} user${deletedCount !== 1 ? 's' : ''} deleted successfully`,
		deletedCount 
	};
}

export async function fetchUsersData(filter: UserFilter) {
	const response = await getUsers(filter);
	return response.data;
}

// Additional helper to get single user
export async function getUserById(id: string): Promise<User> {
	await delay(200); // Simulate network delay
	
	const user = getMockUserById(id);
	if (!user) {
		throw new Error('User not found');
	}
	
	return user;
}