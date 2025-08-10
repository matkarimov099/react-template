import { useEffect, useState } from 'react';

/**
 * Hook to detect a user's reduced motion preference
 * Respects the prefers-reduced-motion media query
 */
export function useReducedMotion(): boolean {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		// Set initial value
		setPrefersReducedMotion(mediaQuery.matches);

		// Listen for changes
		const handleChange = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return prefersReducedMotion;
}
