import type * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
	'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 border shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/40 data-[state=checked]:shadow-md',
	{
		variants: {
			size: {
				xs: 'size-3 rounded-[2px] [&_svg]:size-2',
				sm: 'size-3.5 rounded-[3px] [&_svg]:size-2.5',
				md: 'size-4 rounded-[4px] [&_svg]:size-3.5',
				lg: 'size-5 rounded-[5px] [&_svg]:size-4',
				xl: 'size-6 rounded-[6px] [&_svg]:size-5',
				'2xl': 'size-7 rounded-[7px] [&_svg]:size-6',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

function Checkbox({
	className,
	size,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & 
	VariantProps<typeof checkboxVariants>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(checkboxVariants({ size }), className)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-all duration-200"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox, checkboxVariants };
