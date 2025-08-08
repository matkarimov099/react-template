import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva(
	'bg-accent animate-pulse transition-all duration-200',
	{
		variants: {
			size: {
				xs: 'h-3 rounded-sm',
				sm: 'h-4 rounded-md',
				md: 'h-5 rounded-md',
				lg: 'h-6 rounded-lg',
				xl: 'h-8 rounded-lg',
				'2xl': 'h-10 rounded-xl',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

function Skeleton({ 
	className, 
	size,
	...props 
}: React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
	return (
		<div
			data-slot="skeleton"
			className={cn(skeletonVariants({ size }), className)}
			{...props}
		/>
	);
}

export { Skeleton, skeletonVariants };
