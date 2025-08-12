import { type Locale, changeLanguage, getCurrentLanguage } from '@/lib/i18n';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook that wraps react-i18next's useTranslation
 * Supports feature-based and global translations
 *
 * @param featureScope - Feature name (e.g., 'users', 'auth') or nested scope (e.g., 'users.validations')
 * @returns Translation function and utilities
 */
export function useI18n(featureScope?: string) {
	const { t: translate } = useTranslation();

	// Translation function based on feature scope
	const t = (key: string): string => {
		if (featureScope) {
			// Feature-based translation: users.title, auth.loginTitle, etc.
			return translate(`${featureScope}.${key}`);
		}
		// Global translation: common.loading, navigation.dashboard, etc.
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
