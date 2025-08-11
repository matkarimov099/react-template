import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useI18n } from '@/hooks/use-i18n';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { addLocaleToPath, removeLocaleFromPath } from '@/plugins/i18n-routing.ts';
import { CheckIcon, GlobeIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import enFlag from '@/assets/flags/en.svg';
import ruFlag from '@/assets/flags/ru.svg';
// Flag images
import uzFlag from '@/assets/flags/uz.svg';

const languageOptions = [
	{
		code: 'uz' as Locale,
		name: "O'zbekcha",
		description: 'Uzbek language',
		flag: uzFlag,
		gradient: 'from-blue-500 to-cyan-500',
	},
	{
		code: 'ru' as Locale,
		name: 'Русский',
		description: 'Russian language',
		flag: ruFlag,
		gradient: 'from-red-500 to-blue-500',
	},
	{
		code: 'en' as Locale,
		name: 'English',
		description: 'English language',
		flag: enFlag,
		gradient: 'from-red-500 to-blue-600',
	},
];

export function LanguageToggle() {
	const { locale, setLocale } = useI18n();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLanguageChange = (newLocale: Locale) => {
		setLocale(newLocale);

		// Update URL with a new locale
		const currentPathWithoutLocale = removeLocaleFromPath(location.pathname);
		const newPath = addLocaleToPath(currentPathWithoutLocale, newLocale);
		navigate(newPath, { replace: true });
	};

	const currentLanguage = languageOptions.find(lang => lang.code === locale);

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
							{/* Flag or Globe icon */}
							{currentLanguage ? (
								<img
									src={currentLanguage.flag}
									alt={currentLanguage.name}
									className="h-6 w-6 rounded-sm transition-all duration-300 group-hover:scale-110"
								/>
							) : (
								<GlobeIcon className="h-6 w-6 transition-all duration-300 group-hover:scale-110" />
							)}
						</div>
						<span className="sr-only">Change language</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-64">
					<div className="border-[var(--border)]/50 border-b px-3 py-2 font-medium text-[var(--secondaryLabel)] text-xs">
						Language Settings
					</div>
					{languageOptions.map(option => {
						const isSelected = locale === option.code;

						return (
							<DropdownMenuItem
								key={option.code}
								onClick={() => handleLanguageChange(option.code)}
								className={cn(
									'group relative mx-1 my-0.5 flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-3',
									isSelected && 'bg-[var(--system-blue)]/10 text-[var(--system-blue)]'
								)}
							>
								<div className="flex flex-1 items-center gap-3">
									<div className="bder relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border-[var(--border)] bg-[var(--card-bg)]">
										<img
											src={option.flag}
											alt={option.name}
											className="relative z-10 h-6 w-6 rounded-sm"
										/>
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-sm">{option.name}</span>
										<span className="text-[var(--secondaryLabel)] text-xs">
											{option.description}
										</span>
									</div>
								</div>
								{isSelected && (
									<div className="flex items-center gap-1">
										<CheckIcon className="h-6 w-6 text-[var(--system-blue)]" />
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
