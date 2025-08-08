import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { Locale } from '@/lib/i18n';
import { useI18n } from '@/hooks/use-i18n';
import {
	addLocaleToPath,
	removeLocaleFromPath,
} from '@/plugins/i18n-routing.ts';
import { useLocation, useNavigate } from 'react-router';
import type React from 'react';

const languageToggleVariants = cva(
	'mr-4 w-fit bg-transparent border border-border/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
	{
		variants: {
			size: {
				sm: 'h-8 px-2 text-sm gap-1',
				default: 'h-10 px-3 text-sm gap-2',
				lg: 'h-12 px-4 text-base gap-2',
				icon: 'h-10 w-10 px-0',
			},
			variant: {
				default: 'hover:shadow-md',
				primary: 'border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary',
				secondary: 'border-secondary/20 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary',
				accent: 'border-accent/20 hover:bg-accent hover:text-accent-foreground hover:border-accent',
			},
		},
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	}
);

const languages = [
	{ code: 'uz' as Locale, name: "O'zbekcha", flag: '🇺🇿' },
	{ code: 'ru' as Locale, name: 'Русский', flag: '🇷🇺' },
	{ code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
];

export interface LanguageToggleProps
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof languageToggleVariants> {
	size?: 'sm' | 'default' | 'lg' | 'icon';
	variant?: 'default' | 'primary' | 'secondary' | 'accent';
	showText?: boolean;
	className?: string;
}

export function LanguageToggle({
	size = 'default',
	variant = 'default',
	showText = true,
	className,
	...props
}: LanguageToggleProps = {}) {
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
					size={size === 'icon' ? 'icon' : 'md'}
					className={cn(languageToggleVariants({ size, variant }), className)}
					{...props}
				>
					{currentLanguage && (
						<span className={cn('flex-shrink-0', size === 'sm' && 'text-xs')}>
							{currentLanguage.flag}
						</span>
					)}
					{showText && size !== 'icon' && (
						<span className={cn(
							'truncate',
							size === 'sm' && 'text-xs',
							size === 'lg' && 'text-base'
						)}>
							{currentLanguage?.name}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent 
				align="end" 
				className="z-[9999] min-w-[140px] border-border/50 bg-card/95 backdrop-blur-sm"
			>
				{languages.map((language) => (
					<DropdownMenuItem
						key={language.code}
						onClick={() => handleLanguageChange(language.code)}
						className={cn(
							'flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							locale === language.code && 'bg-primary/10 text-primary font-medium border-l-2 border-l-primary'
						)}
					>
						<span className="flex-shrink-0 text-base">{language.flag}</span>
						<span className="truncate">{language.name}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
