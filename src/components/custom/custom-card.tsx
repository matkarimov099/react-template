import { cn } from '@/lib/utils.ts';
import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';

const customCardVariants = cva(
	'w-full mx-auto rounded-xl border border-border/20 shadow-lg backdrop-blur-sm transition-all duration-300 group hover:shadow-xl hover:border-primary/20 hover:bg-card/80',
	{
		variants: {
			size: {
				sm: 'max-w-xs p-4',
				default: 'max-w-sm p-8',
				lg: 'max-w-md p-10',
				xl: 'max-w-lg p-12',
			},
			variant: {
				default: 'bg-card/50 dark:bg-card/70',
				primary: 'bg-primary/5 border-primary/20 dark:bg-primary/10',
				secondary: 'bg-secondary/5 border-secondary/20 dark:bg-secondary/10',
				accent: 'bg-accent/5 border-accent/20 dark:bg-accent/10',
				gradient: 'bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

const customCardTitleVariants = cva(
	'font-semibold text-card-foreground transition-colors duration-200 group-hover:text-primary',
	{
		variants: {
			size: {
				sm: 'text-base py-1',
				default: 'text-lg py-2',
				lg: 'text-xl py-3',
				xl: 'text-2xl py-4',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

const customCardDescriptionVariants = cva(
	'font-normal text-muted-foreground transition-colors duration-200',
	{
		variants: {
			size: {
				sm: 'text-xs max-w-xs',
				default: 'text-sm max-w-sm',
				lg: 'text-base max-w-md',
				xl: 'text-lg max-w-lg',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

const customCardSkeletonVariants = cva(
	'rounded-xl z-40 transition-all duration-300 hover:shadow-lg',
	{
		variants: {
			size: {
				sm: 'h-48 md:h-56',
				default: 'h-[15rem] md:h-[20rem]',
				lg: 'h-80 md:h-96',
				xl: 'h-96 md:h-[28rem]',
			},
			variant: {
				default: 'bg-muted/30 dark:bg-muted/50',
				gradient: 'bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

export interface CustomCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof customCardVariants> {
	className?: string;
	children: React.ReactNode;
	size?: 'sm' | 'default' | 'lg' | 'xl';
	variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'gradient';
}

export const CustomCard = ({
	className,
	children,
	size,
	variant,
	...props
}: CustomCardProps) => {
	return (
		<div
			className={cn(customCardVariants({ size, variant, className }))}
			{...props}
		>
			{children}
		</div>
	);
};

export interface CustomCardTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof customCardTitleVariants> {
	children: React.ReactNode;
	className?: string;
	size?: 'sm' | 'default' | 'lg' | 'xl';
}

export const CustomCardTitle = ({
	children,
	className,
	size,
	...props
}: CustomCardTitleProps) => {
	return (
		<h3
			className={cn(customCardTitleVariants({ size, className }))}
			{...props}
		>
			{children}
		</h3>
	);
};

export interface CustomCardDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof customCardDescriptionVariants> {
	children: React.ReactNode;
	className?: string;
	size?: 'sm' | 'default' | 'lg' | 'xl';
}

export const CustomCardDescription = ({
	children,
	className,
	size,
	...props
}: CustomCardDescriptionProps) => {
	return (
		<p
			className={cn(customCardDescriptionVariants({ size, className }))}
			{...props}
		>
			{children}
		</p>
	);
};

export interface CustomCardSkeletonContainerProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof customCardSkeletonVariants> {
	className?: string;
	children: React.ReactNode;
	size?: 'sm' | 'default' | 'lg' | 'xl';
	variant?: 'default' | 'gradient';
	showGradient?: boolean;
}

export const CustomCardSkeletonContainer = ({
	className,
	children,
	size,
	variant,
	showGradient = true,
	...props
}: CustomCardSkeletonContainerProps) => {
	return (
		<div
			className={cn(
				customCardSkeletonVariants({ size, variant, className }),
				showGradient &&
					'[mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]',
			)}
			{...props}
		>
			{children}
		</div>
	);
};
