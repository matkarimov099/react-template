import type * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-md border font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 [a&]:active:bg-primary/95',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 [a&]:active:bg-secondary/95',
				destructive:
					'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 [a&]:active:bg-destructive/95 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'text-foreground border-input [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:active:bg-accent/80',
				success:
					'border-transparent bg-green-500 text-white [a&]:hover:bg-green-600 [a&]:active:bg-green-700',
				warning:
					'border-transparent bg-yellow-500 text-white [a&]:hover:bg-yellow-600 [a&]:active:bg-yellow-700',
			},
			size: {
				xs: 'px-1.5 py-0.5 text-xs [&>svg]:size-2.5 rounded-sm h-4',
				sm: 'px-2 py-0.5 text-xs [&>svg]:size-3 rounded-md h-5',
				md: 'px-2.5 py-1 text-sm [&>svg]:size-3.5 rounded-md h-6',
				lg: 'px-3 py-1.5 text-sm [&>svg]:size-4 rounded-lg h-7',
				xl: 'px-4 py-2 text-base [&>svg]:size-4.5 rounded-lg h-8',
				'2xl': 'px-5 py-2.5 text-lg [&>svg]:size-5 rounded-xl h-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

function Badge({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
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
