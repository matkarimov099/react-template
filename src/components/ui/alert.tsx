import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
	'relative w-full border grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:text-current transition-all duration-200 shadow-sm hover:shadow-md',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
				success:
					'text-green-700 bg-green-50 border-green-200 [&>svg]:text-current *:data-[slot=alert-description]:text-green-600 dark:bg-green-950 dark:text-green-400 dark:border-green-900',
				warning:
					'text-yellow-700 bg-yellow-50 border-yellow-200 [&>svg]:text-current *:data-[slot=alert-description]:text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900',
				info:
					'text-blue-700 bg-blue-50 border-blue-200 [&>svg]:text-current *:data-[slot=alert-description]:text-blue-600 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900',
			},
			size: {
				xs: 'px-2 py-1.5 text-xs rounded-sm [&>svg]:size-3',
				sm: 'px-3 py-2 text-sm rounded-md [&>svg]:size-3.5',
				md: 'px-4 py-3 text-sm rounded-lg [&>svg]:size-4 [&>svg]:translate-y-0.5',
				lg: 'px-5 py-4 text-base rounded-lg [&>svg]:size-5 [&>svg]:translate-y-0.5',
				xl: 'px-6 py-5 text-lg rounded-xl [&>svg]:size-6 [&>svg]:translate-y-1',
				'2xl': 'px-8 py-6 text-xl rounded-xl [&>svg]:size-7 [&>svg]:translate-y-1',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

function Alert({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
