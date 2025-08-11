import * as React from 'react';
import { forwardRef } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
	label?: string;
	error?: string;
	helperText?: string;
	showFocusRing?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			inputSize = 'md',
			label,
			error,
			helperText,
			showFocusRing = true,
			id,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();
		const generatedId = React.useId();
		const inputId = id || generatedId;
		const errorId = error ? `${inputId}-error` : undefined;
		const helperTextId = helperText ? `${inputId}-helper` : undefined;

		const describedBy =
			[ariaDescribedBy, errorId, helperTextId].filter(Boolean).join(' ') || undefined;

		// Apply reduced motion classes if the user prefers reduced motion
		const motionAwareClassName = React.useMemo(() => {
			return cn(
				'flex w-full ios-bg-control ios-border-control ios-rounded-md ios-text-primary ios-font file:border-0 file:bg-transparent file:font-medium file:ios-text-primary placeholder:ios-text-secondary placeholder:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 appearance-none',
				// Focus styles with conditional motion
				showFocusRing && !prefersReducedMotion && 'focus:ios-ring',
				showFocusRing && prefersReducedMotion && 'focus:border-[var(--ring)]',
				// Transition with conditional duration
				prefersReducedMotion ? 'transition-colors duration-0' : 'ios-transition-fast',
				// Size-specific classes
				inputSize === 'xs' && 'h-7 ios-text-xs px-2 py-1 ios-rounded-sm',
				inputSize === 'sm' && 'h-8 ios-text-sm px-3 py-1.5 ios-rounded-md',
				inputSize === 'md' && 'h-9 ios-text-md px-4 py-2 ios-rounded-md',
				inputSize === 'lg' && 'h-11 ios-text-lg px-5 py-2.5 ios-rounded-lg',
				inputSize === 'xl' && 'h-12 ios-text-xl px-6 py-3 ios-rounded-lg',
				// Error state
				error && 'border-[var(--system-red)] focus:border-[var(--system-red)]',
				className
			);
		}, [inputSize, className, prefersReducedMotion, showFocusRing, error]);

		return (
			<div className="space-y-1">
				{label && (
					<label htmlFor={inputId} className="block ios-font ios-text-primary ios-text-sm">
						{label}
						{props.required && (
							<span className="ml-1 ios-text-red" aria-label="required">
								*
							</span>
						)}
					</label>
				)}

				<input
					type={type}
					id={inputId}
					data-size={inputSize}
					className={motionAwareClassName}
					ref={ref}
					aria-describedby={describedBy}
					aria-invalid={error ? 'true' : undefined}
					{...props}
				/>

				{error && (
					<p
						id={errorId}
						className="ios-font ios-text-red ios-text-sm"
						role="alert"
						aria-live="polite"
					>
						{error}
					</p>
				)}

				{helperText && !error && (
					<p id={helperTextId} className="ios-font ios-text-secondary ios-text-sm">
						{helperText}
					</p>
				)}
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
