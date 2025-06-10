export interface PaginationFilter {
	limit?: number;
	page?: number;
}

export interface PaginatedResponse<A> {
	data: A[];
	total: number;
}

export interface ServerError {
	message: string;
	error_code?: string;
}

export interface DecodedToken {
	exp: number;
	iat: number;
	id: string;
	role: {
		id: string;
		name: string;
		privileges: string[];
	};
	phone: string;
	firstname: string;
	lastname: string;
	market: string;
	address: string;
}
