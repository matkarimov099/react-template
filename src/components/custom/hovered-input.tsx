import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import * as React from 'react';
import { useCallback } from 'react';

const hoveredInputVariants = cva(
	'group/input rounded-lg p-[2px] transition duration-300 hover:shadow-lg',
	{
		variants: {
			size: {
				sm: 'text-sm',
				default: 'text-base',
				lg: 'text-lg',
			},
			variant: {
				default: 'focus-within:shadow-primary/20',
				primary: 'focus-within:shadow-primary/30',
				secondary: 'focus-within:shadow-secondary/30',
				accent: 'focus-within:shadow-accent/30',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

const hoveredInputInnerVariants = cva(
	'flex w-full rounded-md border-none bg-background/80 px-3 py-2 transition duration-400 file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm',
	{
		variants: {
			size: {
				sm: 'h-8 text-sm file:text-sm px-2 py-1',
				default: 'h-10 text-sm file:text-sm',
				lg: 'h-12 text-base file:text-base px-4 py-3',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof hoveredInputVariants> {
	inputSize?: 'sm' | 'default' | 'lg';
	variant?: 'default' | 'primary' | 'secondary' | 'accent';
	size?: never; // Explicitly prevent size prop to avoid conflicts
}

const HoveredInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, inputSize, variant, ...props }, ref) => {
		const radius = inputSize === 'sm' ? 80 : inputSize === 'lg' ? 120 : 100; // Dynamic radius based on size
		const [visible, setVisible] = React.useState(false);

		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		const handleMouseMove = useCallback(
			function handleMouseMove(
				event: React.MouseEvent<HTMLDivElement, MouseEvent>,
			) {
				const { left, top } = event.currentTarget.getBoundingClientRect();
				mouseX.set(event.clientX - left);
				mouseY.set(event.clientY - top);
			},
			[mouseX, mouseY],
		);

		// Get the gradient color based on variant
		const getGradientColor = () => {
			switch (variant) {
				case 'primary':
					return 'hsl(var(--primary))';
				case 'secondary':
					return 'hsl(var(--secondary))';
				case 'accent':
					return 'hsl(var(--accent))';
				default:
					return 'hsl(var(--primary))';
			}
		};
		return (
			<motion.div
				style={{
					background: useMotionTemplate`
        radial-gradient(
          ${visible ? `${radius}px` : '0px'} circle at ${mouseX}px ${mouseY}px,
          ${getGradientColor()},
          transparent 80%
        )
      `,
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className={cn(hoveredInputVariants({ size: inputSize, variant, className }))}
			>
				<input
					type={type}
					className={cn(
						hoveredInputInnerVariants({ size: inputSize }),
						className,
					)}
					ref={ref}
					{...props}
				/>
			</motion.div>
		);
	},
);
HoveredInput.displayName = 'HoveredInput';

export { HoveredInput };
