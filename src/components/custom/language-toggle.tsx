import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import type { Locale } from '@/context/i18n-context';
import { useI18n } from '@/hooks/use-i18n';
import {
	addLocaleToPath,
	removeLocaleFromPath,
} from '@/plugins/i18n-routing.ts';
import { useLocation, useNavigate } from 'react-router';

const languages = [
	{ code: 'uz' as Locale, name: "O'zbekcha", flag: '🇺🇿' },
	{ code: 'ru' as Locale, name: 'Русский', flag: '🇷🇺' },
	{ code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
];

export function LanguageToggle() {
	const { locale, setLocale } = useI18n();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLanguageChange = (newLocale: Locale) => {
		setLocale(newLocale);

		// Update URL with new locale
		const currentPathWithoutLocale = removeLocaleFromPath(location.pathname);
		const newPath = addLocaleToPath(currentPathWithoutLocale, newLocale);
		navigate(newPath, { replace: true });
	};

	const currentLanguage = languages.find((lang) => lang.code === locale);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="mr-4 px-2 w-fit bg-transparent"
				>
					{currentLanguage && <span>{currentLanguage.flag}</span>}
					<span>{currentLanguage?.name}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="z-[9999]">
				{languages.map((language) => (
					<DropdownMenuItem
						key={language.code}
						onClick={() => handleLanguageChange(language.code)}
						className={locale === language.code ? 'bg-accent' : ''}
					>
						<span className="mr-1">{language.flag}</span>
						{language.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
