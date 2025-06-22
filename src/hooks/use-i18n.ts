import { useTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage, type Locale } from '@/lib/i18n';

/**
 * Custom hook that wraps react-i18next's useTranslation
 * Maintains the same API as the previous custom i18n system
 */
export function useI18n() {
	const { t: translate } = useTranslation();

	// Translation function (same API as before)
	const t = (key: string): string => {
		return translate(key);
	};

	// Get current locale
	const locale = getCurrentLanguage();

	// Set locale function (same API as before)
	const setLocale = (newLocale: Locale) => {
		changeLanguage(newLocale);
	};

	return {
		locale,
		setLocale,
		t,
	};
}
