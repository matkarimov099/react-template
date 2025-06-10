import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useTheme } from '@/hooks/use-theme.ts';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="mr-4 bg-transparent">
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
