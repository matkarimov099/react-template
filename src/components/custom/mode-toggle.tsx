import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useTheme } from '@/hooks/use-theme.ts';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ModeToggle() {
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

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="mr-4 bg-transparent">
					{isDark ? (
						<SunIcon className="h-[1.2rem] w-[1.2rem]" />
					) : (
						<MoonIcon className="h-[1.2rem] w-[1.2rem]" />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="z-[9999]">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<SunIcon className="h-4 w-4" />
					Kunduzgi
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<MoonIcon className="h-4 w-4" />
					Tungi
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<MonitorIcon className="h-4 w-4" />
					Qurilma mavzusi
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
