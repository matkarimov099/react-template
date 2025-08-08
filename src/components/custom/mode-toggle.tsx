import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '@/hooks/use-theme.ts';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type React from 'react';

const modeToggleVariants = cva(
	'mr-4 bg-transparent border border-border/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
	{
		variants: {
			size: {
				sm: 'h-8 w-8',
				default: 'h-10 w-10',
				lg: 'h-12 w-12',
			},
			variant: {
				default: 'hover:shadow-md',
				primary: 'border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary',
				secondary: 'border-secondary/20 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary',
				accent: 'border-accent/20 hover:bg-accent hover:text-accent-foreground hover:border-accent',
				ghost: 'border-transparent hover:bg-muted hover:border-muted',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

export interface ModeToggleProps
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof modeToggleVariants> {
	size?: 'sm' | 'default' | 'lg';
	variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
	className?: string;
}

export function ModeToggle({
	size = 'default',
	variant = 'default',
	className,
	...props
}: ModeToggleProps = {}) {
	const { theme, setTheme } = useTheme();
	const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>('light');

	// System theme'ni kuzatish
	useEffect(() => {
		if (theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

			const handleChange = (e: MediaQueryListEvent) => {
				setSystemTheme(e.matches ? 'dark' : 'light');
			};

			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	}, [theme]);

	// Actual theme'ni aniqlash
	const isDark =
		theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

	const iconSize = {
		sm: 'h-4 w-4',
		default: 'h-[1.2rem] w-[1.2rem]',
		lg: 'h-6 w-6',
	}[size];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button 
					variant="outline" 
					size="icon" 
					className={cn(modeToggleVariants({ size, variant }), className)}
					{...props}
				>
					{isDark ? (
						<SunIcon className={cn(iconSize, 'transition-transform duration-200 hover:rotate-12')} />
					) : (
						<MoonIcon className={cn(iconSize, 'transition-transform duration-200 hover:-rotate-12')} />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent 
				align="end" 
				className="z-[9999] min-w-[160px] border-border/50 bg-card/95 backdrop-blur-sm"
			>
				<DropdownMenuItem 
					onClick={() => setTheme('light')}
					className={cn(
						'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						theme === 'light' && 'bg-primary/10 text-primary font-medium border-l-2 border-l-primary'
					)}
				>
					<SunIcon className="h-4 w-4 flex-shrink-0" />
					<span>Kunduzgi</span>
				</DropdownMenuItem>
				<DropdownMenuItem 
					onClick={() => setTheme('dark')}
					className={cn(
						'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						theme === 'dark' && 'bg-primary/10 text-primary font-medium border-l-2 border-l-primary'
					)}
				>
					<MoonIcon className="h-4 w-4 flex-shrink-0" />
					<span>Tungi</span>
				</DropdownMenuItem>
				<DropdownMenuItem 
					onClick={() => setTheme('system')}
					className={cn(
						'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						theme === 'system' && 'bg-primary/10 text-primary font-medium border-l-2 border-l-primary'
					)}
				>
					<MonitorIcon className="h-4 w-4 flex-shrink-0" />
					<span>Qurilma mavzusi</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
