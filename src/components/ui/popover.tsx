import type * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const popoverContentVariants = cva(
	'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border shadow-md outline-hidden transition-all duration-200',
	{
		variants: {
			size: {
				xs: 'w-48 p-2 text-xs rounded-sm',
				sm: 'w-56 p-3 text-sm rounded-md',
				md: 'w-72 p-4 text-sm rounded-md',
				lg: 'w-80 p-5 text-base rounded-lg',
				xl: 'w-96 p-6 text-lg rounded-lg',
				'2xl': 'w-[30rem] p-8 text-xl rounded-xl',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className,
	align = 'center',
	sideOffset = 4,
	size,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & 
	VariantProps<typeof popoverContentVariants>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(popoverContentVariants({ size }), className)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, popoverContentVariants };
