import {
	CustomCard,
	CustomCardDescription,
	CustomCardTitle,
} from '@/components/custom/custom-card.tsx';
import { LoginForm } from '@/features/auth/components/LoginForm.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { motion } from 'motion/react';
import { KeyRound } from 'lucide-react';

const Login = () => {
	const { t } = useI18n();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.4,
				ease: [0.2, 0.9, 0.25, 1], // iOS cubic-bezier
			}}
			className="w-full"
		>
			{/* Brand header */}
			<div className="text-center mb-8">
				<motion.div
					initial={{ scale: 0.8, rotate: -10 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
					className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-blue)]/80 rounded-2xl shadow-lg"
				>
					<KeyRound className="w-8 h-8 text-white" />
				</motion.div>
				<h1 className="text-2xl font-bold text-[var(--label)] mb-2">
					Welcome Back
				</h1>
				<p className="text-[var(--secondaryLabel)] text-sm">
					Sign in to continue to your account
				</p>
			</div>

			<CustomCard className="md:max-w-md backdrop-blur-xl bg-[var(--card-bg)]/80 border border-[var(--border)]/50 shadow-2xl">
				<CustomCardTitle className="text-center text-xl font-semibold text-[var(--label)] mb-6">
					{t('auth.loginTitle')}
				</CustomCardTitle>
				<LoginForm />
				<CustomCardDescription>
					<div className="text-center text-sm mt-6 pt-6 border-t border-[var(--border)]/30">
						<span className="text-[var(--secondaryLabel)]">
							{t('auth.dontHaveAccount')}{' '}
						</span>
						<LocalizedNavLink
							to="/register"
							className="font-medium text-[var(--system-blue)] hover:text-[var(--system-blue)]/80 transition-colors duration-200"
						>
							{t('auth.register')}
						</LocalizedNavLink>
					</div>
				</CustomCardDescription>
			</CustomCard>
		</motion.div>
	);
};

export default Login;
