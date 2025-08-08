import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const breadcrumbListVariants = cva(
	'text-muted-foreground flex flex-wrap items-center break-words transition-all duration-200',
	{
		variants: {
			size: {
				xs: 'gap-1 text-xs [&_svg]:size-2.5',
				sm: 'gap-1.5 text-sm [&_svg]:size-3',
				md: 'gap-1.5 text-sm sm:gap-2.5 [&_svg]:size-3.5',
				lg: 'gap-2 text-base sm:gap-3 [&_svg]:size-4',
				xl: 'gap-2.5 text-lg sm:gap-3.5 [&_svg]:size-5',
				'2xl': 'gap-3 text-xl sm:gap-4 [&_svg]:size-6',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

const breadcrumbLinkVariants = cva('hover:text-foreground transition-colors duration-200', {
	variants: {
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			md: 'text-sm',
			lg: 'text-base',
			xl: 'text-lg',
			'2xl': 'text-xl',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

function Breadcrumb({ ...props }: ComponentProps<'nav'>) {
	return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ 
	className, 
	size,
	...props 
}: ComponentProps<'ol'> & VariantProps<typeof breadcrumbListVariants>) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(breadcrumbListVariants({ size }), className)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn('inline-flex items-center gap-1.5', className)}
			{...props}
		/>
	);
}

function BreadcrumbLink({
	asChild,
	className,
	size,
	...props
}: ComponentProps<'a'> & 
	VariantProps<typeof breadcrumbLinkVariants> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot : 'a';

	return (
		<Comp
			data-slot="breadcrumb-link"
			className={cn(breadcrumbLinkVariants({ size }), className)}
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			tabIndex={0}
			className={cn('text-foreground font-normal', className)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: ComponentProps<'li'>) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn('[&>svg]:size-3.5', className)}
			{...props}
		>
			{children ?? <ChevronRight />}
		</li>
	);
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<MoreHorizontal className="size-4" />
			<span className="sr-only">More</span>
		</span>
	);
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
	breadcrumbListVariants,
	breadcrumbLinkVariants,
};
