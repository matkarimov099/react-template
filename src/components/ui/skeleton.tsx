import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="skeleton"
			className={cn('animate-pulse ios-rounded-md ios-border', className)}
			{...props}
		/>
	);
}

export { Skeleton };
