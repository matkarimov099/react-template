import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Spinner } from '@/components/ui/spinner';
import { useI18n } from '@/hooks/use-i18n';

export function AuthGuard({ children }: PropsWithChildren) {
	const { currentUser, isLoading, isLoggedIn } = useAuthContext();
	const location = useLocation();
	const { locale } = useI18n();

	// Agar ma'lumotlar yuklanayotgan bo'lsa, loading ko'rsatish
	if (isLoading) {
		return <Spinner show />;
	}

	// Agar foydalanuvchi autentifikatsiya qilinmagan bo'lsa, login sahifasiga yo'naltirish
	// va joriy sahifa manzilini saqlash, keyinroq qaytib yo'naltirish uchun
	if (!isLoggedIn || !currentUser) {
		return (
			<Navigate
				to={`/${locale}/auth/login`}
				state={{ from: { pathname: location.pathname } }}
				replace
			/>
		);
	}

	// Agar foydalanuvchi autentifikatsiya qilingan bo'lsa, children komponentlarni render qilish
	// Bu foydalanuvchiga himoyalangan route'larga kirish imkonini beradi
	// qayta yo'naltirilmasdan
	return <>{children}</>;
}
