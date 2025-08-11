import type * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card"
			className={cn(
				'flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card-bg)] py-6 text-[var(--label)] shadow-[var(--shadow-sm)] backdrop-blur-[10px] backdrop-saturate-150 backdrop-filter',
				className
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
				className
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				'font-[var(--font-sans)] font-semibold text-[var(--label)] leading-none',
				className
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('font-[var(--font-sans)] text-[var(--secondaryLabel)] text-sm', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn('px-6 text-[var(--label)]', className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				'flex items-center px-6 text-[var(--label)] [.border-t]:border-[var(--border)] [.border-t]:pt-6',
				className
			)}
			{...props}
		/>
	);
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
