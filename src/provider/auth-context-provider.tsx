import { AuthContext } from '@/context/auth-context';
import { useCurrentUser, useLogout } from '@/features/auth/hooks/use-auth.ts';
import type { CurrentUser } from '@/features/auth/types.ts';
import type { ServerError } from '@/types/common.ts';
import { isAxiosError } from 'axios';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type AuthContextProviderProps = PropsWithChildren;

export default function AuthContextProvider({
	children,
}: AuthContextProviderProps) {
	const [authToken, setAuthToken] = useState<string | null>(
		localStorage.getItem('accessToken'),
	);
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
	const navigate = useNavigate();
	const {
		mutate: logoutUser,
		isSuccess: logoutSuccess,
		isError: logoutError,
		isPending: logoutPending,
	} = useLogout();
	const { data: currentUserData } = useCurrentUser();

	const logout = async () => {
		logoutUser(undefined, {
			onSuccess: () => {
				localStorage.removeItem('accessToken');
				setAuthToken(null);
				setCurrentUser(null);
				toast.success('Profildan muvaffaqiyatli chiqildi');
				navigate('/auth/login');
			},
			onError: (error) => {
				if (isAxiosError<ServerError>(error)) {
					toast.error(error.response?.data?.message);
				} else {
					toast.error('Profildan chiqishda xatolik yuz berdi!');
				}
			},
		});
	};

	useEffect(() => {
		if (currentUserData) {
			setCurrentUser(currentUserData.data);
		}
	}, [currentUserData]);

	const value = {
		authToken,
		currentUser,
		logout,
		isLoading: logoutPending,
		isSuccessLogout: logoutSuccess,
		isErrorLogout: logoutError,
		isLoggedIn: Boolean(authToken),
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
