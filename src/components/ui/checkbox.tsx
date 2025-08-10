import type * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
	'peer shrink-0 border transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: [
					'bg-[var(--control-bg)] border-[var(--control-border)] text-white',
					'hover:border-[var(--border)]',
					'focus:border-[var(--ring)] focus:ring-[6px] focus:ring-[color-mix(in_srgb,var(--ring)_10%,transparent)]',
					'data-[state=checked]:bg-[var(--system-blue)] data-[state=checked]:border-[var(--system-blue)]',
					'data-[state=indeterminate]:bg-[var(--system-blue)] data-[state=indeterminate]:border-[var(--system-blue)]',
				],
				destructive: [
					'bg-[var(--control-bg)] border-[var(--control-border)] text-white',
					'hover:border-[var(--border)]',
					'focus:border-[var(--system-red)] focus:ring-[6px] focus:ring-[color-mix(in_srgb,var(--system-red)_10%,transparent)]',
					'data-[state=checked]:bg-[var(--system-red)] data-[state=checked]:border-[var(--system-red)]',
					'data-[state=indeterminate]:bg-[var(--system-red)] data-[state=indeterminate]:border-[var(--system-red)]',
				],
			},
			size: {
				xs: 'size-3 rounded-[3px]',
				sm: 'size-4 rounded-[4px]',
				md: 'size-5 rounded-[5px]',
				lg: 'size-6 rounded-[6px]',
				xl: 'size-7 rounded-[7px]',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'sm',
		},
	},
);

const checkboxIndicatorVariants = cva(
	'flex items-center justify-center text-current transition-all duration-150',
	{
		variants: {
			size: {
				xs: '[&_svg]:size-2',
				sm: '[&_svg]:size-3',
				md: '[&_svg]:size-3.5',
				lg: '[&_svg]:size-4',
				xl: '[&_svg]:size-5',
			},
		},
		defaultVariants: {
			size: 'sm',
		},
	},
);

function Checkbox({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
	VariantProps<typeof checkboxVariants>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(checkboxVariants({ variant, size }), className)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className={cn(checkboxIndicatorVariants({ size }))}
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
