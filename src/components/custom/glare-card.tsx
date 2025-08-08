import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { useRef } from 'react';
import type React from 'react';

const glareCardVariants = cva(
	'relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform rounded-xl hover:shadow-2xl hover:scale-[1.02]',
	{
		variants: {
			size: {
				sm: 'w-[240px] [aspect-ratio:4/5]',
				default: 'w-[320px] [aspect-ratio:17/21]',
				lg: 'w-[400px] [aspect-ratio:3/4]',
				xl: 'w-[480px] [aspect-ratio:2/3]',
			},
			variant: {
				default: 'shadow-lg',
				primary: 'shadow-primary/20 shadow-lg',
				secondary: 'shadow-secondary/20 shadow-lg',
				accent: 'shadow-accent/20 shadow-lg',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

export interface GlareCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof glareCardVariants> {
	children: React.ReactNode;
	className?: string;
	size?: 'sm' | 'default' | 'lg' | 'xl';
	variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

export const GlareCard = ({
	children,
	className,
	size,
	variant,
	...props
}: GlareCardProps) => {
	const isPointerInside = useRef(false);
	const refElement = useRef<HTMLDivElement>(null);
	const state = useRef({
		glare: {
			x: 50,
			y: 50,
		},
		background: {
			x: 50,
			y: 50,
		},
		rotate: {
			x: 0,
			y: 0,
		},
	});
	const containerStyle = {
		'--m-x': '50%',
		'--m-y': '50%',
		'--r-x': '0deg',
		'--r-y': '0deg',
		'--bg-x': '50%',
		'--bg-y': '50%',
		'--duration': '300ms',
		'--foil-size': '100%',
		'--opacity': '0',
		'--radius': '48px',
		'--easing': 'ease',
		'--transition': 'var(--duration) var(--easing)',
	} as React.CSSProperties;

	// Education theme colors for the holographic effect
	const getEducationGradient = () => {
		switch (variant) {
			case 'primary':
				return 'repeating-linear-gradient(0deg, hsl(260, 100%, 70%) calc(var(--step) * 1), hsl(260, 80%, 60%) calc(var(--step) * 2), hsl(150, 80%, 70%) calc(var(--step) * 3), hsl(300, 80%, 70%) calc(var(--step) * 4), hsl(260, 100%, 80%) calc(var(--step) * 5), hsl(260, 100%, 70%) calc(var(--step) * 6))';
			case 'secondary':
				return 'repeating-linear-gradient(0deg, hsl(150, 100%, 70%) calc(var(--step) * 1), hsl(150, 80%, 60%) calc(var(--step) * 2), hsl(260, 80%, 70%) calc(var(--step) * 3), hsl(300, 80%, 70%) calc(var(--step) * 4), hsl(150, 100%, 80%) calc(var(--step) * 5), hsl(150, 100%, 70%) calc(var(--step) * 6))';
			case 'accent':
				return 'repeating-linear-gradient(0deg, hsl(300, 100%, 70%) calc(var(--step) * 1), hsl(300, 80%, 60%) calc(var(--step) * 2), hsl(260, 80%, 70%) calc(var(--step) * 3), hsl(150, 80%, 70%) calc(var(--step) * 4), hsl(300, 100%, 80%) calc(var(--step) * 5), hsl(300, 100%, 70%) calc(var(--step) * 6))';
			default:
				return 'repeating-linear-gradient(0deg, hsl(260, 90%, 70%) calc(var(--step) * 1), hsl(150, 90%, 70%) calc(var(--step) * 2), hsl(300, 90%, 70%) calc(var(--step) * 3), hsl(260, 80%, 60%) calc(var(--step) * 4), hsl(150, 80%, 60%) calc(var(--step) * 5), hsl(300, 80%, 60%) calc(var(--step) * 6))';
		}
	};

	const backgroundStyle = {
		'--step': '5%',
		'--foil-svg': `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
		'--pattern': 'var(--foil-svg) center/100% no-repeat',
		'--rainbow': `${getEducationGradient()} 0% var(--bg-y)/200% 700% no-repeat`,
		'--diagonal':
			'repeating-linear-gradient(128deg, hsl(var(--background)) 0%, hsl(var(--muted)) 3.8%, hsl(var(--muted)) 4.5%, hsl(var(--muted)) 5.2%, hsl(var(--background)) 10%, hsl(var(--background)) 12%) var(--bg-x) var(--bg-y)/300% no-repeat',
		'--shade':
			'radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.1) 12%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 120%) var(--bg-x) var(--bg-y)/300% no-repeat',
		backgroundBlendMode: 'hue, hue, hue, overlay',
	};

	const updateStyles = () => {
		if (refElement.current) {
			console.log(state.current);
			const { background, rotate, glare } = state.current;
			refElement.current?.style.setProperty('--m-x', `${glare.x}%`);
			refElement.current?.style.setProperty('--m-y', `${glare.y}%`);
			refElement.current?.style.setProperty('--r-x', `${rotate.x}deg`);
			refElement.current?.style.setProperty('--r-y', `${rotate.y}deg`);
			refElement.current?.style.setProperty('--bg-x', `${background.x}%`);
			refElement.current?.style.setProperty('--bg-y', `${background.y}%`);
		}
	};
	return (
		<div
			style={containerStyle}
			className={cn(glareCardVariants({ size, variant, className }))}
			ref={refElement}
			{...props}
			onPointerMove={(event) => {
				const rotateFactor = 0.4;
				const rect = event.currentTarget.getBoundingClientRect();
				const position = {
					x: event.clientX - rect.left,
					y: event.clientY - rect.top,
				};
				const percentage = {
					x: (100 / rect.width) * position.x,
					y: (100 / rect.height) * position.y,
				};
				const delta = {
					x: percentage.x - 50,
					y: percentage.y - 50,
				};

				const { background, rotate, glare } = state.current;
				background.x = 50 + percentage.x / 4 - 12.5;
				background.y = 50 + percentage.y / 3 - 16.67;
				rotate.x = -(delta.x / 3.5);
				rotate.y = delta.y / 2;
				rotate.x *= rotateFactor;
				rotate.y *= rotateFactor;
				glare.x = percentage.x;
				glare.y = percentage.y;

				updateStyles();
			}}
			onPointerEnter={() => {
				isPointerInside.current = true;
				if (refElement.current) {
					setTimeout(() => {
						if (isPointerInside.current) {
							refElement.current?.style.setProperty('--duration', '0s');
						}
					}, 300);
				}
			}}
			onPointerLeave={() => {
				isPointerInside.current = false;
				if (refElement.current) {
					refElement.current.style.removeProperty('--duration');
					refElement.current?.style.setProperty('--r-x', '0deg');
					refElement.current?.style.setProperty('--r-y', '0deg');
				}
			}}
		>
			<div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border border-border/30 hover:border-primary/50 hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden bg-card/80 backdrop-blur-sm">
				<div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
					<div className={cn('h-full w-full bg-background/90 text-card-foreground')}>
						{children}
					</div>
				</div>
				<div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
				<div
					className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] relative after:content-[''] after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]"
					style={{ ...backgroundStyle }}
				/>
			</div>
		</div>
	);
};
