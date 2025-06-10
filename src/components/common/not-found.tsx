'use client';
import { LampContainer } from '@/components/custom/lamp-container.tsx';
import { motion } from 'motion/react';

export function NotFound() {
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
				className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
			>
				404 - Sahifa topilmadi
			</motion.h1>
		</LampContainer>
	);
}
