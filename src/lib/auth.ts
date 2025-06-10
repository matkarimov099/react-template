import type { DecodedToken } from '@/types/common.ts';
import { type JwtPayload, jwtDecode } from 'jwt-decode';

// check if the token is valid
function checkToken(token: string): boolean {
	const decoded = jwtDecode<JwtPayload>(token);
	return (decoded.exp ?? 0) > Date.now() / 1000;
}

// check if the user is authenticated
export function isAuthenticated(): boolean {
	const token = localStorage.getItem('accessToken');
	if (token) {
		return checkToken(token); // tokenni tekshirish
	}
	return false;
}

//get user from token
export function getUserFromToken() {
	const token = localStorage.getItem('accessToken');
	if (token) {
		return jwtDecode<JwtPayload>(token) as DecodedToken;
	}
}
