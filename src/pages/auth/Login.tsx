import {
	CustomCard,
	CustomCardDescription,
	CustomCardTitle,
} from '@/components/custom/custom-card.tsx';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { LocalizedNavLink } from '@/components/common/localized-nav-link';

export const Login = () => {
	const { t } = useI18n();

	return (
		<CustomCard className="md:max-w-md">
			<CustomCardTitle className="text-center text-3xl">
				{t('auth.loginTitle')}
			</CustomCardTitle>
			<LoginForm />
			<CustomCardDescription>
				<div className="text-center text-sm">
					{t('auth.dontHaveAccount')}{' '}
					<LocalizedNavLink
						to="/register"
						className="underline underline-offset-4"
					>
						{t('auth.register')}
					</LocalizedNavLink>
				</div>
			</CustomCardDescription>
		</CustomCard>
	);
};
