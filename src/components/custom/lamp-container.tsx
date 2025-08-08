import { cn } from '@/lib/utils.ts';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import type React from 'react';

const lampContainerVariants = cva(
	'relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full z-0 transition-colors duration-500',
	{
		variants: {
			variant: {
				default: 'bg-background',
				primary: 'bg-gradient-to-br from-primary/5 via-background to-primary/10',
				secondary: 'bg-gradient-to-br from-secondary/5 via-background to-secondary/10',
				accent: 'bg-gradient-to-br from-accent/5 via-background to-accent/10',
				education: 'bg-gradient-to-br from-primary/3 via-secondary/2 to-accent/3',
			},
			size: {
				default: 'min-h-screen',
				lg: 'min-h-[120vh]',
				xl: 'min-h-[140vh]',
			},
		},
		defaultVariants: {
			variant: 'education',
			size: 'default',
		},
	}
);

export interface LampContainerProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof lampContainerVariants> {
	children: React.ReactNode;
	className?: string;
	variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'education';
	size?: 'default' | 'lg' | 'xl';
}

export const LampContainer = ({
	children,
	className,
	variant,
	size,
	...props
}: LampContainerProps) => {
	return (
		<div
			className={cn(lampContainerVariants({ variant, size, className }))}
			{...props}
		>
			<div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
				<motion.div
					initial={{ opacity: 0.5, width: '15rem' }}
					whileInView={{ opacity: 1, width: '30rem' }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
					style={{
						backgroundImage:
							'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
					}}
					className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-primary via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
				>
					<div className="absolute w-[100%] left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
					<div className="absolute w-40 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
				</motion.div>
				<motion.div
					initial={{ opacity: 0.5, width: '15rem' }}
					whileInView={{ opacity: 1, width: '30rem' }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
					style={{
						backgroundImage:
							'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
					}}
					className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-secondary text-white [--conic-position:from_290deg_at_center_top]"
				>
					<div className="absolute w-40 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
					<div className="absolute w-[100%] right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
				</motion.div>
				<div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl" />
				<div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
				<div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-3xl" />
				<motion.div
					initial={{ width: '8rem' }}
					whileInView={{ width: '16rem' }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
					className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 blur-2xl"
				/>
				<motion.div
					initial={{ width: '15rem' }}
					whileInView={{ width: '30rem' }}
					transition={{
						delay: 0.3,
						duration: 0.8,
						ease: 'easeInOut',
					}}
					className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-gradient-to-r from-primary via-secondary to-primary"
				/>

				<div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background" />
			</div>

			<div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
				{children}
			</div>
		</div>
	);
};
