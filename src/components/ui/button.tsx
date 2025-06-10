import { Slot, Slottable } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	cond?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			loading = false,
			variant,
			size,
			asChild = false,
			cond = true,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		return (
			cond && (
				<Comp
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref}
					disabled={loading || props.disabled}
					{...props}
				>
					{loading && <Loader2 className={cn('mr-2 h-4 w-4 animate-spin')} />}
					<Slottable>{props.children}</Slottable>
				</Comp>
			)
		);
	},
);
Button.displayName = 'Button';

export { Button };
