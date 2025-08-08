import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const inputVariants = cva(
	'flex w-full rounded-md border border-input bg-background shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/40',
	{
		variants: {
			size: {
				xs: 'h-6 px-2 py-1 text-xs rounded-sm',
				sm: 'h-8 px-3 py-1.5 text-sm rounded-md',
				md: 'h-10 px-4 py-2 text-sm rounded-md',
				lg: 'h-12 px-5 py-3 text-base rounded-lg',
				xl: 'h-14 px-6 py-3.5 text-lg rounded-lg',
				'2xl': 'h-16 px-7 py-4 text-xl rounded-xl',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & 
	VariantProps<typeof inputVariants> & {
		inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, size, inputSize, ...props }, ref) => {
		const finalSize = inputSize || size;
		return (
			<input
				type={type}
				className={cn(inputVariants({ size: finalSize }), className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
