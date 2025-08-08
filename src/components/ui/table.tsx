import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tableVariants = cva('w-full caption-bottom transition-all duration-200', {
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

const tableHeadVariants = cva(
	'text-foreground text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] transition-colors duration-200',
	{
		variants: {
			size: {
				xs: 'h-6 px-1 text-xs',
				sm: 'h-8 px-1.5 text-sm',
				md: 'h-10 px-2 text-sm',
				lg: 'h-12 px-3 text-base',
				xl: 'h-14 px-4 text-lg',
				'2xl': 'h-16 px-5 text-xl',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

const tableCellVariants = cva(
	'align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] transition-colors duration-200',
	{
		variants: {
			size: {
				xs: 'p-1 text-xs',
				sm: 'p-1.5 text-sm',
				md: 'p-2 text-sm',
				lg: 'p-3 text-base',
				xl: 'p-4 text-lg',
				'2xl': 'p-5 text-xl',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

function Table({ 
	className, 
	size,
	...props 
}: React.ComponentProps<'table'> & VariantProps<typeof tableVariants>) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn(tableVariants({ size }), className)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot="table-header"
			className={cn('[&_tr]:border-b', className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr:last-child]:border-0', className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ 
	className, 
	size,
	...props 
}: React.ComponentProps<'th'> & VariantProps<typeof tableHeadVariants>) {
	return (
		<th
			data-slot="table-head"
			className={cn(tableHeadVariants({ size }), className)}
			{...props}
		/>
	);
}

function TableCell({ 
	className,
	size,
	...props 
}: React.ComponentProps<'td'> & VariantProps<typeof tableCellVariants>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(tableCellVariants({ size }), className)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot="table-caption"
			className={cn('text-muted-foreground mt-4 text-sm', className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	tableVariants,
	tableHeadVariants,
	tableCellVariants,
};
