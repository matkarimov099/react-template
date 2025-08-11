import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center justify-center ios-rounded-pill border px-2 py-0.5 ios-text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none ios-transition overflow-hidden ios-font',
	{
		variants: {
			variant: {
				default:
					'border-transparent ios-bg-blue ios-text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-blue)_85%,black)]',
				secondary:
					'border-transparent ios-bg-secondary ios-text-primary [a&]:hover:bg-[color-mix(in_srgb,var(--secondaryBackground)_85%,var(--label))]',
				destructive:
					'border-transparent ios-bg-red ios-text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-red)_85%,black)]',
				success:
					'border-transparent ios-bg-green ios-text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-green)_85%,black)]',
				warning:
					'border-transparent ios-bg-yellow text-black [a&]:hover:bg-[color-mix(in_srgb,var(--system-yellow)_85%,black)]',
				info: 'border-transparent ios-bg-cyan ios-text-white [a&]:hover:bg-[color-mix(in_srgb,var(--system-cyan)_85%,black)]',
				outline:
					'ios-text-primary ios-border bg-transparent [a&]:hover:ios-bg-control-ghost [a&]:hover:ios-text-primary',
			},
			size: {
				xs: 'px-1.5 py-0.5 ios-text-xs ios-rounded-sm',
				sm: 'px-2 py-0.5 ios-text-xs ios-rounded-md',
				md: 'px-2.5 py-1 ios-text-sm ios-rounded-md',
				lg: 'px-3 py-1.5 ios-text-sm ios-rounded-lg',
				xl: 'px-4 py-2 ios-text-md ios-rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'sm',
		},
	}
);

function Badge({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
