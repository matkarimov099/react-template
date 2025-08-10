import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { announceToScreenReader } from '@/lib/accessibility';
import { Slot, Slottable } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Spinner } from './spinner';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	rightIcon?: React.ReactNode;
	leftIcon?: React.ReactNode;
	hideIcon?: boolean;
	isVisible?: boolean;
	loading?: boolean;
	loadingText?: string;
	announceOnClick?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			rightIcon,
			leftIcon,
			hideIcon = false,
			isVisible = true,
			loading = false,
			loadingText,
			announceOnClick = false,
			onClick,
			children,
			...props
		},
		ref,
	) => {
		const prefersReducedMotion = useReducedMotion();
		const buttonId = React.useId();
		const loadingId = `${buttonId}-loading`;

		const handleClick = React.useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				if (announceOnClick && children) {
					announceToScreenReader(`${children} activated`);
				}
				onClick?.(event);
			},
			[onClick, announceOnClick, children],
		);

		const Comp = asChild ? Slot : 'button';

		// Apply reduced motion classes if the user prefers reduced motion
		const motionAwareClassName = React.useMemo(() => {
			if (prefersReducedMotion) {
				// Remove animation and transform classes for reduced motion
				const baseClasses = buttonVariants({ variant, size });
				const reducedMotionClasses = baseClasses
					.replace(/hover:-translate-y-\S+/g, '')
					.replace(/hover:scale-\S+/g, '')
					.replace(/active:translate-y-\S+/g, '')
					.replace(/active:scale-\S+/g, '')
					.replace(/duration-\S+/g, 'duration-0')
					.replace(/animate-\S+/g, '');

				return cn(reducedMotionClasses, className);
			}
			return cn(buttonVariants({ variant, size }), className);
		}, [variant, size, className, prefersReducedMotion]);

		return (
			isVisible && (
				<Comp
					className={motionAwareClassName}
					ref={ref}
					onClick={handleClick}
					disabled={loading || props.disabled}
					aria-describedby={loading ? loadingId : undefined}
					aria-busy={loading}
					{...props}
				>
					{loading ? (
						<div className="flex items-center justify-center">
							<Spinner
								className={cn(
									'!size-4',
									prefersReducedMotion ? '' : 'animate-spin',
								)}
								aria-hidden="true"
							/>
							{(loadingText || children) && (
								<span
									className="ml-2 opacity-70"
									id={loadingId}
									aria-live="polite"
								>
									{loadingText || children}
								</span>
							)}
						</div>
					) : (
						<div className="flex items-center justify-center gap-2">
							{!hideIcon && leftIcon && (
								<span className="flex items-center" aria-hidden="true">
									{leftIcon}
								</span>
							)}
							<Slottable>{children}</Slottable>
							{!hideIcon && rightIcon && (
								<span className="flex items-center" aria-hidden="true">
									{rightIcon}
								</span>
							)}
						</div>
					)}
				</Comp>
			)
		);
	},
);
Button.displayName = 'Button';

export { Button };
