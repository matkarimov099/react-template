import type * as React from 'react';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, inputSize = 'md', ...props }, ref) => {
		return (
			<input
				type={type}
				data-size={inputSize}
				className={cn(
					'flex w-full rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
					inputSize === 'sm' && 'h-7 text-xs px-2 py-1',
					inputSize === 'md' && 'h-9 text-sm px-3 py-2',
					inputSize === 'lg' && 'h-11 text-base px-4 py-3',
					inputSize === 'xl' && 'h-12 text-base px-5 py-3',
					inputSize === '2xl' && 'h-14 text-lg px-6 py-4',
					inputSize === '3xl' && 'h-16 text-lg px-7 py-4',
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
