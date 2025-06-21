import type { PaginationFilter } from '@/types/common.ts';

export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	age: number;
	created_at: string;
	expense_count: number;
	total_expenses: string;
}

export interface UserCreate {
	name: string;
	email: string;
	phone: string;
	age: number;
}

export interface UserFilter extends PaginationFilter {
	search?: string;
	from_date?: string;
	to_date?: string;
	sort_by?: string;
	sort_order?: 'asc' | 'desc';
	[key: string]: unknown; // Add index signature for DataTable compatibility
}

export interface UserUpdate {
	id: string;
	name?: string;
	email?: string;
	phone?: string;
	age?: number;
}

export interface UserCreateResponse {
	id: string;
	message: string;
}
