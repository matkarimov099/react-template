import {
	CustomCard,
	CustomCardDescription,
	CustomCardTitle,
} from '@/components/custom/custom-card.tsx';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { Link } from 'react-router';

export const Login = () => {
	return (
		<CustomCard className="md:max-w-md">
			<CustomCardTitle className="text-center text-3xl">Kirish</CustomCardTitle>
			<LoginForm />
			<CustomCardDescription>
				<div className="text-center text-sm">
					Hisobingiz yo'qmi?{' '}
					<Link to="/register" className="underline underline-offset-4">
						Ro'yxatdan o'ting
					</Link>
				</div>
			</CustomCardDescription>
		</CustomCard>
	);
};
