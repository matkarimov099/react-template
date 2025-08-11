import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Header } from '@tanstack/react-table';
import { GripVertical } from 'lucide-react';

interface DataTableResizerProps<TData> {
	header: Header<TData, unknown>;
}

export function DataTableResizer<TData>({ header }: DataTableResizerProps<TData>) {
	const isResizing = header.column.getIsResizing();

	return (
		<div
			onMouseDown={header.getResizeHandler()}
			onTouchStart={header.getResizeHandler()}
			className={cn(
				'absolute top-0 right-0 flex h-full w-4 cursor-col-resize touch-none select-none items-center justify-center',
				'z-10 opacity-0 group-hover/th:opacity-100',
				isResizing && 'opacity-100'
			)}
			aria-hidden="true"
			data-resizing={isResizing ? 'true' : undefined}
		>
			<div className="flex h-4/5 items-center justify-center">
				<Separator
					orientation="vertical"
					decorative={false}
					className={cn(
						'h-4/5 w-0.5 transition-colors duration-200',
						isResizing ? 'bg-primary' : 'bg-border'
					)}
				/>

				{/* Use the GripVertical icon for better visual indication */}
				<GripVertical
					className={cn(
						'absolute h-4 w-4 text-muted-foreground/70',
						isResizing ? 'text-primary' : 'text-muted-foreground/70'
					)}
					strokeWidth={1.5}
				/>
			</div>
		</div>
	);
}
