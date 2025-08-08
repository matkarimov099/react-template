import * as LabelPrimitive from '@radix-ui/react-label';
import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
	'flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 transition-colors duration-200',
	{
		variants: {
			size: {
				xs: 'text-xs gap-1',
				sm: 'text-sm gap-1.5',
				md: 'text-sm gap-2',
				lg: 'text-base gap-2.5',
				xl: 'text-lg gap-3',
				'2xl': 'text-xl gap-3.5',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

function Label({
	className,
	size,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & 
	VariantProps<typeof labelVariants>) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(labelVariants({ size }), className)}
			{...props}
		/>
	);
}

export { Label, labelVariants };
