import { I18nContext, type Locale } from '@/context/i18n-context';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

// Import translation files
import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';
import uzMessages from '@/messages/uz.json';

const messages = {
	en: enMessages,
	ru: ruMessages,
	uz: uzMessages,
};

interface I18nProviderProps {
	children: ReactNode;
	initialLocale?: Locale;
}

const LOCALE_STORAGE_KEY = 'app-locale';

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
	// Get initial locale from localStorage or use initialLocale or default to 'uz'
	const getInitialLocale = (): Locale => {
		if (initialLocale) return initialLocale;

		const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
		if (stored && ['uz', 'ru', 'en'].includes(stored)) {
			return stored;
		}

		return 'uz';
	};

	const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

	// Set locale and update localStorage
	const setLocale = useCallback((newLocale: Locale) => {
		setLocaleState(newLocale);
		localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
	}, []);

	// Translation function
	const t = useCallback(
		(key: string): string => {
			const keys = key.split('.');
			let value: unknown = messages[locale];

			for (const k of keys) {
				if (value && typeof value === 'object' && k in value) {
					value = (value as Record<string, unknown>)[k];
				} else {
					// Fallback to English if key not found
					value = messages.en;
					for (const fallbackKey of keys) {
						if (value && typeof value === 'object' && fallbackKey in value) {
							value = (value as Record<string, unknown>)[fallbackKey];
						} else {
							return `Missing translation: ${key}`;
						}
					}
					break;
				}
			}

			return typeof value === 'string' ? value : `Missing translation: ${key}`;
		},
		[locale]
	);

	// Update document language attribute
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const value = useMemo(
		() => ({
			locale,
			setLocale,
			t,
		}),
		[locale, setLocale, t]
	);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
