import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useTheme } from '@/hooks/use-theme.ts';
import { cn } from '@/lib/utils';
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

const themeOptions = [
	{
		value: 'light',
		label: 'Light',
		description: 'Clean and bright',
		icon: SunIcon,
		gradient: 'from-amber-400 to-orange-600',
		iconColor: 'text-amber-800 dark:text-amber-400',
	},
	{
		value: 'dark',
		label: 'Dark',
		description: 'Easy on your eyes',
		icon: MoonIcon,
		gradient: 'from-slate-600 to-slate-800',
		iconColor: 'text-slate-600 dark:text-slate-400',
	},
	{
		value: 'system',
		label: 'System',
		description: 'Adapts to your OS',
		icon: MonitorIcon,
		gradient: 'from-blue-500 to-cyan-500',
		iconColor: 'text-blue-600 dark:text-blue-400',
	},
];

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	// Actual theme'ni aniqlash
	const currentTheme = themeOptions.find(option => option.value === theme);
	const CurrentIcon = currentTheme?.icon || SunIcon;

	return (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="group relative mr-2 h-9 w-9 overflow-hidden bg-[var(--card-bg)] p-0 saturate-150 backdrop-blur-md transition-all duration-200 hover:border-[var(--system-blue)]/30 hover:bg-[var(--control-ghost-bg)]"
					>
						<div className="relative flex h-full w-full items-center justify-center">
							{/* Icon with rotation animation */}
							<CurrentIcon
								className={cn(
									'!h-5 !w-5 transition-all duration-300 group-hover:scale-110',
									currentTheme?.iconColor,
									theme === 'system' && 'animate-pulse'
								)}
							/>
						</div>
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-64">
					<div className="border-[var(--border)]/50 border-b px-3 py-2 font-medium text-[var(--secondaryLabel)] text-xs">
						Appearance Settings
					</div>
					{themeOptions.map(option => {
						const Icon = option.icon;
						const isSelected = theme === option.value;

						return (
							<DropdownMenuItem
								key={option.value}
								onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
								className={cn(
									'group relative mx-1 my-0.5 flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3',
									isSelected && 'bg-[var(--system-blue)]/10 text-[var(--system-blue)]'
								)}
							>
								<div className="flex flex-1 items-center gap-3">
									<div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)]">
										{/* Theme preview background */}
										<div
											className={cn(
												'absolute inset-0 bg-gradient-to-br opacity-20',
												option.gradient
											)}
										/>
										<Icon className={cn('relative z-10 h-6 w-6', option.iconColor)} />
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-sm">{option.label}</span>
										<span className="text-[var(--secondaryLabel)] text-xs">
											{option.description}
										</span>
									</div>
								</div>
								{isSelected && (
									<div className="flex items-center gap-1">
										<CheckIcon className="h-4 w-4 text-[var(--system-blue)]" />
									</div>
								)}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
