import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import existing translation files
import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';
import uzMessages from '@/messages/uz.json';

export type Locale = 'uz' | 'ru' | 'en';

// Available languages
export const SUPPORTED_LOCALES: Locale[] = ['uz', 'ru', 'en'];

// Get locale from localStorage or URL
const getStoredLocale = (): Locale => {
	const stored = localStorage.getItem('app-locale') as Locale;
	if (stored && SUPPORTED_LOCALES.includes(stored)) {
		return stored;
	}
	return 'uz'; // default locale
};

// Initialize i18next
i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		// Resources (translations)
		resources: {
			en: { translation: enMessages },
			ru: { translation: ruMessages },
			uz: { translation: uzMessages },
		},

		// Language settings
		lng: getStoredLocale(),
		fallbackLng: 'en',

		// Interpolation settings
		interpolation: {
			escapeValue: false, // React already escapes values
		},

		// Key separator (for nested keys like "user.name")
		keySeparator: '.',

		// Debug mode (only in development)
		debug: import.meta.env.DEV,

		// Save language preference
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
		},
	});

// Helper function to change language and save to localStorage
export const changeLanguage = (locale: Locale) => {
	i18n.changeLanguage(locale);
	localStorage.setItem('app-locale', locale);
	document.documentElement.lang = locale;
};

// Helper function to get current language
export const getCurrentLanguage = (): Locale => {
	return i18n.language as Locale;
};

export default i18n;
