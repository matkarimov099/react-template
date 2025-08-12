import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('', {
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
			h6: 'scroll-m-20 text-base font-semibold tracking-tight',
			p: 'leading-7 [&:not(:first-child)]:mt-6',
			code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
			blockquote: 'mt-6 border-l-2 pl-6 italic',
			small: 'text-sm font-medium leading-none',
			muted: 'text-sm text-muted-foreground',
			large: 'text-lg font-semibold',
			title: 'text-2xl font-bold tracking-tight',
		},
	},
	defaultVariants: {
		variant: 'p',
	},
});

type VariantType =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'code'
	| 'blockquote'
	| 'small'
	| 'muted'
	| 'large'
	| 'title';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	variant?: VariantType;
	asChild?: boolean;
}

const variantToElement: Record<VariantType, React.ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	p: 'p',
	code: 'code',
	blockquote: 'blockquote',
	small: 'small',
	muted: 'p',
	large: 'div',
	title: 'h1',
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	({ className, variant = 'p', asChild = false, ...props }, ref) => {
		const Component = asChild ? 'span' : variantToElement[variant];

		return (
			<Component className={cn(typographyVariants({ variant }), className)} ref={ref} {...props} />
		);
	}
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
