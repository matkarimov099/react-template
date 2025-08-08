import type * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dialogContentVariants = cva(
	'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 transition-all',
	{
		variants: {
			size: {
				xs: 'max-w-xs p-3 gap-2',
				sm: 'max-w-sm p-4 gap-3',
				md: 'max-w-lg p-6 gap-4',
				lg: 'max-w-2xl p-8 gap-5',
				xl: 'max-w-4xl p-10 gap-6',
				'2xl': 'max-w-6xl p-12 gap-8',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

const dialogTitleVariants = cva('leading-none font-semibold transition-colors duration-200', {
	variants: {
		size: {
			xs: 'text-sm',
			sm: 'text-base',
			md: 'text-lg',
			lg: 'text-xl',
			xl: 'text-2xl',
			'2xl': 'text-3xl',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

const dialogDescriptionVariants = cva('text-muted-foreground transition-colors duration-200', {
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

function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	size,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & 
	VariantProps<typeof dialogContentVariants> & {
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(dialogContentVariants({ size }), className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-all duration-200 hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	size,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title> & 
	VariantProps<typeof dialogTitleVariants>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(dialogTitleVariants({ size }), className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	size,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description> & 
	VariantProps<typeof dialogDescriptionVariants>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(dialogDescriptionVariants({ size }), className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
	dialogContentVariants,
	dialogTitleVariants,
	dialogDescriptionVariants,
};
