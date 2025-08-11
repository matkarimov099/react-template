import { LampContainer } from '@/components/custom/lamp-container.tsx';
import { useI18n } from '@/hooks/use-i18n.ts';
import { motion } from 'motion/react';

export function NotAccess() {
	const { t } = useI18n();
	return (
		<LampContainer>
			<motion.h1
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: 'easeInOut',
				}}
				className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center font-medium text-4xl text-transparent tracking-tight md:text-7xl"
			>
				403 - {t('errors.notAccess')}
			</motion.h1>
		</LampContainer>
	);
}
