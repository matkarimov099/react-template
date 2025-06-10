export interface AuthToken {
	accessToken: string;
	refreshToken: string;
}

export interface LoginCredentials {
	phone: string;
	password: string;
}

export interface CurrentUser {
	id: string;
	phone: string;
	firstname: string;
	lastname: string;
	role: {
		id: string;
		name: string;
		privileges: string[];
	};
}
