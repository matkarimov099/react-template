import * as React from 'react';

import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { generateId } from '@/lib/accessibility';
import { forwardRef } from 'react';

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
		ref,
	) => {
		const prefersReducedMotion = useReducedMotion();
		const inputId = id || generateId('input');
		const errorId = error ? `${inputId}-error` : undefined;
		const helperTextId = helperText ? `${inputId}-helper` : undefined;

		const describedBy =
			[ariaDescribedBy, errorId, helperTextId].filter(Boolean).join(' ') ||
			undefined;

		// Apply reduced motion classes if user prefers reduced motion
		const motionAwareClassName = React.useMemo(() => {
			const baseClasses = cn(
				'flex w-full bg-[var(--control-bg)] border border-[var(--control-border)] rounded-[var(--radius-md)] color-[var(--label)] file:border-0 file:bg-transparent file:font-medium file:text-[var(--label)] placeholder:text-[var(--secondaryLabel)] placeholder:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 font-[var(--font-sans)] -webkit-appearance-none -moz-appearance-none appearance-none',
				// Focus styles with conditional motion
				showFocusRing && 'focus:border-[var(--ring)]',
				showFocusRing &&
					!prefersReducedMotion &&
					'focus:shadow-[0_0_0_6px_color-mix(in_srgb,var(--ring)_10%,transparent)]',
				// Transition with conditional duration
				prefersReducedMotion
					? 'transition-colors duration-0'
					: 'transition-all duration-[120ms] ease-[cubic-bezier(.2,.9,.25,1)]',
				// Size-specific classes
				inputSize === 'xs' &&
					'h-7 text-xs px-2 py-1 rounded-[var(--radius-sm)]',
				inputSize === 'sm' &&
					'h-8 text-sm px-3 py-1.5 rounded-[var(--radius-md)]',
				inputSize === 'md' &&
					'h-9 text-base px-4 py-2 rounded-[var(--radius-md)]',
				inputSize === 'lg' &&
					'h-11 text-lg px-5 py-2.5 rounded-[var(--radius-lg)]',
				inputSize === 'xl' &&
					'h-12 text-xl px-6 py-3 rounded-[var(--radius-lg)]',
				// Error state
				error &&
					'border-[var(--system-red)] focus:border-[var(--system-red)] focus:ring-[var(--system-red)]',
				className,
			);

			return baseClasses;
		}, [inputSize, className, prefersReducedMotion, showFocusRing, error]);

		return (
			<div className="space-y-1">
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-medium text-[var(--label)] font-[var(--font-sans)]"
					>
						{label}
						{props.required && (
							<span
								className="text-[var(--system-red)] ml-1"
								aria-label="required"
							>
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
						className="text-sm text-[var(--system-red)] font-[var(--font-sans)]"
						role="alert"
						aria-live="polite"
					>
						{error}
					</p>
				)}

				{helperText && !error && (
					<p
						id={helperTextId}
						className="text-sm text-[var(--secondaryLabel)] font-[var(--font-sans)]"
					>
						{helperText}
					</p>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
