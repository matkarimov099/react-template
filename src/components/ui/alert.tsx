import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
	'relative w-full rounded-[var(--radius-lg)] border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current font-family-[var(--font-sans)]',
	{
		variants: {
			variant: {
				default: 'ios-bg-card ios-text-primary ios-border ios-shadow-sm',
				destructive:
					'ios-text-red bg-[color-mix(in_srgb,var(--system-red)_8%,var(--card-bg))] border-[color-mix(in_srgb,var(--system-red)_20%,var(--border))] [&>svg]:text-current *:data-[slot=alert-description]:ios-text-red/90',
				success:
					'ios-text-green bg-[color-mix(in_srgb,var(--system-green)_8%,var(--card-bg))] border-[color-mix(in_srgb,var(--system-green)_20%,var(--border))] [&>svg]:text-current *:data-[slot=alert-description]:ios-text-green/90',
				warning:
					'ios-text-yellow bg-[color-mix(in_srgb,var(--system-yellow)_8%,var(--card-bg))] border-[color-mix(in_srgb,var(--system-yellow)_20%,var(--border))] [&>svg]:text-current *:data-[slot=alert-description]:ios-text-yellow/90',
				info: 'ios-text-cyan bg-[color-mix(in_srgb,var(--system-cyan)_8%,var(--card-bg))] border-[color-mix(in_srgb,var(--system-cyan)_20%,var(--border))] [&>svg]:text-current *:data-[slot=alert-description]:ios-text-cyan/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn('col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight', className)}
			{...props}
		/>
	);
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'col-start-2 grid justify-items-start gap-1 ios-text-secondary ios-text-sm ios-font [&_p]:leading-relaxed',
				className
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription };
