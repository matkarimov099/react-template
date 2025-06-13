import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
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
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		return (
			isVisible && (
				<Comp
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref}
					{...props}
					disabled={loading || props.disabled}
				>
					{loading ? (
						<div className="flex items-center justify-center">
							<Spinner className="!size-8" />
						</div>
					) : (
						<div className="flex items-center justify-center gap-2">
							{!hideIcon && leftIcon && (
								<span className="flex items-center">{leftIcon}</span>
							)}
							<Slottable>{props.children}</Slottable>
							{!hideIcon && rightIcon && (
								<span className="flex items-center">{rightIcon}</span>
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
