import * as SelectPrimitive from '@radix-ui/react-select';
import { type VariantProps, cva } from 'class-variance-authority';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const selectTriggerVariants = cva(
	"flex w-fit items-center justify-between gap-2 whitespace-nowrap font-medium select-none transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: [
					'bg-[var(--control-bg)] border border-[var(--control-border)] text-[var(--label)]',
					'hover:bg-[var(--control-ghost-bg)] hover:border-[var(--border)]',
					'focus:border-[var(--ring)] focus:ring-[6px] focus:ring-[color-mix(in_srgb,var(--ring)_10%,transparent)]',
					'data-[placeholder]:text-[var(--secondaryLabel)]',
					"[&_svg:not([class*='text-'])]:text-[var(--secondaryLabel)]",
				],
				ghost: [
					'bg-transparent border border-[var(--border)] text-[var(--label)]',
					'hover:bg-[var(--control-ghost-bg)]',
					'focus:border-[var(--ring)] focus:ring-[6px] focus:ring-[color-mix(in_srgb,var(--ring)_10%,transparent)]',
				],
			},
			size: {
				xs: 'h-7 px-2 text-xs rounded-[var(--radius-sm)]',
				sm: 'h-8 px-3 text-sm rounded-[var(--radius-sm)]',
				md: 'h-9 px-4 text-base rounded-[var(--radius-md)]',
				lg: 'h-11 px-5 text-lg rounded-[var(--radius-md)]',
				xl: 'h-12 px-6 text-xl rounded-[var(--radius-lg)]',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	}
);

function SelectTrigger({
	className,
	variant,
	size,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
	VariantProps<typeof selectTriggerVariants>) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(selectTriggerVariants({ variant, size }), className)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-60" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = 'popper',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					'border border-[var(--border)] bg-[var(--content-bg)] text-[var(--label)] shadow-[var(--shadow-lg)] saturate-150 backdrop-blur-[10px]',
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=open]:animate-in',
					'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					'relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-y-auto overflow-x-hidden rounded-[var(--radius-md)]',
					position === 'popper' &&
						'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',
					className
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'p-1',
						position === 'popper' &&
							'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn('px-2 py-1.5 font-medium text-[var(--secondaryLabel)] text-xs', className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				'relative flex w-full cursor-default select-none items-center gap-2 rounded-[var(--radius-sm)] py-1.5 pr-8 pl-2 text-sm outline-none',
				"text-[var(--label)] [&_svg:not([class*='text-'])]:text-[var(--secondaryLabel)]",
				'hover:bg-[color-mix(in_srgb,var(--system-blue)_8%,transparent)] hover:text-[var(--label)]',
				'focus:bg-[color-mix(in_srgb,var(--system-blue)_12%,transparent)] focus:text-[var(--label)]',
				'data-[highlighted]:bg-[color-mix(in_srgb,var(--system-blue)_12%,transparent)] data-[highlighted]:text-[var(--label)]',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				'transition-colors duration-150',
				className
			)}
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4 text-[var(--system-blue)]" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn('-mx-1 pointer-events-none my-1 h-px bg-[var(--border)]', className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				'flex cursor-default items-center justify-center py-1 text-[var(--secondaryLabel)]',
				className
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				'flex cursor-default items-center justify-center py-1 text-[var(--secondaryLabel)]',
				className
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
