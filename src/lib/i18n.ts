import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Locale = 'uz' | 'ru' | 'en';

export const SUPPORTED_LOCALES: Locale[] = ['uz', 'ru', 'en'];

// Translation resource types
interface TranslationResource {
	[key: string]: string | TranslationResource;
}

type LocaleResources = Record<Locale, { translation: TranslationResource }>;

// Load all translation resources dynamically
const loadResources = async (): Promise<LocaleResources> => {
	const resources: LocaleResources = {
		en: { translation: {} },
		ru: { translation: {} },
		uz: { translation: {} },
	};

	// Load global messages
	const globalModules = {
		en: () => import('@/messages/en.json'),
		ru: () => import('@/messages/ru.json'),
		uz: () => import('@/messages/uz.json'),
	} as const;

	for (const locale of SUPPORTED_LOCALES) {
		const module = await globalModules[locale]();
		resources[locale].translation = { ...module.default };
	}

	// Auto-discover and load feature messages
	const featureModules = import.meta.glob<{ default: TranslationResource }>(
		'@/features/*/messages/*.json'
	);

	for (const [path, loader] of Object.entries(featureModules)) {
		const matches = path.match(/\/features\/([^/]+)\/messages\/([^/]+)\.json$/);
		if (matches) {
			const [, featureName, locale] = matches;
			if (SUPPORTED_LOCALES.includes(locale as Locale)) {
				const module = await loader();
				resources[locale as Locale].translation[featureName] = module.default;
			}
		}
	}

	return resources;
};

// Get stored locale or default
const getStoredLocale = (): Locale => {
	const stored = localStorage.getItem('app-locale') as Locale;
	return stored && SUPPORTED_LOCALES.includes(stored) ? stored : 'uz';
};

// Initialize i18n
const initializeI18n = async () => {
	const resources = await loadResources();

	await i18n.use(initReactI18next).init({
		resources,
		lng: getStoredLocale(),
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		keySeparator: '.',
		debug: import.meta.env.DEV,
	});

	return i18n;
};

// Export initialization promise
export const i18nReady = initializeI18n();

// Helper functions
export const changeLanguage = (locale: Locale) => {
	i18n.changeLanguage(locale).then();
	localStorage.setItem('app-locale', locale);
	document.documentElement.lang = locale;
};

export const getCurrentLanguage = (): Locale => {
	return (i18n.language as Locale) || 'uz';
};
