import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

import { MouseEnterContext } from '@/context/mouse-enter-context';
import { useMouseEnter } from '@/hooks/use-mouse-enter.ts';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

const threeDCardVariants = cva(
	'flex items-center justify-center relative transition-all duration-200 ease-linear hover:shadow-lg',
	{
		variants: {
			size: {
				sm: 'p-4',
				default: 'p-6',
				lg: 'p-8',
				xl: 'p-12',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

const threeDCardBodyVariants = cva(
	'[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] rounded-xl border border-border/20 bg-card/50 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20',
	{
		variants: {
			size: {
				sm: 'h-64 w-64',
				default: 'h-96 w-96',
				lg: 'h-[28rem] w-[28rem]',
				xl: 'h-[32rem] w-[32rem]',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

const threeDCardItemVariants = cva(
	'w-fit transition duration-200 ease-linear hover:text-primary focus-visible:text-primary',
	{
		variants: {
			size: {
				sm: 'text-sm',
				default: 'text-base',
				lg: 'text-lg',
				xl: 'text-xl',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

export interface ThreeDCardContainerProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof threeDCardVariants> {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	size?: 'sm' | 'default' | 'lg' | 'xl';
}

export const ThreeDCardContainer = ({
	children,
	className,
	containerClassName,
	size,
	...props
}: ThreeDCardContainerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMouseEntered, setIsMouseEntered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / 25;
		const y = (e.clientY - top - height / 2) / 25;
		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	};

	const handleMouseEnter = () => {
		setIsMouseEntered(true);
		if (!containerRef.current) return;
	};

	const handleMouseLeave = () => {
		if (!containerRef.current) return;
		setIsMouseEntered(false);
		containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
	};
	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn(
					'py-20 flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20',
					containerClassName,
				)}
				style={{
					perspective: '1000px',
				}}
				{...props}
			>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(threeDCardVariants({ size, className }))}
					style={{
						transformStyle: 'preserve-3d',
					}}
				>
					{children}
				</div>
			</div>
		</MouseEnterContext.Provider>
	);
};

export interface ThreeDCardBodyProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof threeDCardBodyVariants> {
	children: React.ReactNode;
	className?: string;
	size?: 'sm' | 'default' | 'lg' | 'xl';
}

export const ThreeDCardBody = ({
	children,
	className,
	size,
	...props
}: ThreeDCardBodyProps) => {
	return (
		<div
			className={cn(threeDCardBodyVariants({ size, className }))}
			{...props}
		>
			{children}
		</div>
	);
};

export interface ThreeDCardItemProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof threeDCardItemVariants> {
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
	size?: 'sm' | 'default' | 'lg' | 'xl';
	translateX?: number | string;
	translateY?: number | string;
	translateZ?: number | string;
	rotateX?: number | string;
	rotateY?: number | string;
	rotateZ?: number | string;
	[key: string]: unknown;
}

export const ThreeDCardItem = ({
	as: Tag = 'div',
	children,
	className,
	size,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}: ThreeDCardItemProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isMouseEntered] = useMouseEnter();

	const handleAnimations = useCallback(() => {
		if (!ref.current) return;
		if (isMouseEntered) {
			ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		} else {
			ref.current.style.transform =
				'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
		}
	}, [
		isMouseEntered,
		translateX,
		translateY,
		translateZ,
		rotateX,
		rotateY,
		rotateZ,
	]);

	useEffect(() => {
		handleAnimations();
	}, [handleAnimations]);

	return (
		<Tag
			ref={ref}
			className={cn(threeDCardItemVariants({ size, className }))}
			{...rest}
		>
			{children}
		</Tag>
	);
};
