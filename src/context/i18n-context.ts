import { createContext } from 'react';

export type Locale = 'uz' | 'ru' | 'en';

export interface I18nContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);
