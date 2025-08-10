/**
 * Accessibility utilities for iOS-styled components
 * Provide focus management, ARIA helpers, and keyboard navigation support
 */

/**
 * Trap focus within a container element
 * Useful for modals, dropdowns, and other overlay components
 */
export function trapFocus(container: HTMLElement): () => void {
	const focusableElements = container.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
	) as NodeListOf<HTMLElement>;

	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];

	const handleTabKey = (event: KeyboardEvent) => {
		if (event.key !== 'Tab') return;

		if (event.shiftKey) {
			// Shift + Tab
			if (document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			}
		} else {
			// Tab
			if (document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	};

	container.addEventListener('keydown', handleTabKey);

	// Focus the first element
	firstElement?.focus();

	// Return cleanup function
	return () => {
		container.removeEventListener('keydown', handleTabKey);
	};
}

/**
 * Restore focus to a previously focused element
 * Useful when closing modals or dropdowns
 */
export function restoreFocus(element: HTMLElement | null): void {
	if (element && typeof element.focus === 'function') {
		// Use setTimeout to ensure the element is visible and focusable
		setTimeout(() => {
			element.focus();
		}, 0);
	}
}

/**
 * Get the next focusable element in the DOM
 */
export function getNextFocusableElement(
	currentElement: HTMLElement,
	container?: HTMLElement,
): HTMLElement | null {
	const root = container || document.body;
	const focusableElements = root.querySelectorAll(
		'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
	) as NodeListOf<HTMLElement>;

	const currentIndex = Array.from(focusableElements).indexOf(currentElement);
	const nextIndex = currentIndex + 1;

	return focusableElements[nextIndex] || focusableElements[0] || null;
}

/**
 * Get the previous focusable element in the DOM
 */
export function getPreviousFocusableElement(
	currentElement: HTMLElement,
	container?: HTMLElement,
): HTMLElement | null {
	const root = container || document.body;
	const focusableElements = root.querySelectorAll(
		'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
	) as NodeListOf<HTMLElement>;

	const currentIndex = Array.from(focusableElements).indexOf(currentElement);
	const previousIndex = currentIndex - 1;

	return (
		focusableElements[previousIndex] ||
		focusableElements[focusableElements.length - 1] ||
		null
	);
}

/**
 * Check if an element is currently visible and focusable
 */
export function isElementFocusable(element: HTMLElement): boolean {
	if (!element) return false;

	// Check if element is disabled
	if (element.hasAttribute('disabled')) return false;

	// Check if element has tabindex="-1"
	if (element.getAttribute('tabindex') === '-1') return false;

	// Check if element is hidden
	const style = window.getComputedStyle(element);
	if (style.display === 'none' || style.visibility === 'hidden') return false;

	// Check if element is outside viewport (basic check)
	const rect = element.getBoundingClientRect();
	if (rect.width === 0 && rect.height === 0) return false;

	return true;
}

/**
 * Announce text to screen readers
 * Creates a temporary element that screen readers will read
 */
export function announceToScreenReader(
	message: string,
	priority: 'polite' | 'assertive' = 'polite',
): void {
	const announcement = document.createElement('div');
	announcement.setAttribute('aria-live', priority);
	announcement.setAttribute('aria-atomic', 'true');
	announcement.setAttribute('class', 'sr-only');
	announcement.textContent = message;

	document.body.appendChild(announcement);

	// Remove the announcement after a short delay
	setTimeout(() => {
		document.body.removeChild(announcement);
	}, 1000);
}

/**
 * Generate a unique ID for ARIA relationships
 */
export function generateId(prefix = 'ios-component'): string {
	return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if the current focus is within a specific container
 */
export function isFocusWithin(container: HTMLElement): boolean {
	return container.contains(document.activeElement);
}

/**
 * Handle keyboard navigation for lists and menus
 * Supports arrow keys, home, end, and enter/space
 */
export function handleListKeyNavigation(
	event: KeyboardEvent,
	items: HTMLElement[],
	currentIndex: number,
	onSelect?: (index: number) => void,
	orientation: 'vertical' | 'horizontal' = 'vertical',
): number {
	const { key } = event;
	let newIndex = currentIndex;

	const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
	const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

	switch (key) {
		case nextKey:
			event.preventDefault();
			newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
			break;

		case prevKey:
			event.preventDefault();
			newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
			break;

		case 'Home':
			event.preventDefault();
			newIndex = 0;
			break;

		case 'End':
			event.preventDefault();
			newIndex = items.length - 1;
			break;

		case 'Enter':
		case ' ':
			event.preventDefault();
			onSelect?.(currentIndex);
			return currentIndex;

		default:
			return currentIndex;
	}

	// Focus the new item
	items[newIndex]?.focus();
	return newIndex;
}

/**
 * Validate color contrast ratio
 * Returns true if the contrast ratio meets WCAG AA standards (4.5:1)
 */
export function validateColorContrast(
	foreground: string,
	background: string,
	level: 'AA' | 'AAA' = 'AA',
): boolean {
	// This is a simplified implementation
	// In a real application, you'd use a proper color contrast library
	const requiredRatio = level === 'AAA' ? 7 : 4.5;

	// Convert colors to RGB and calculate luminance
	const getLuminance = (_color: string): number => {
		// Simplified luminance calculation
		// This would need a proper color parsing library in production
		return 0.5; // Placeholder
	};

	const fgLuminance = getLuminance(foreground);
	const bgLuminance = getLuminance(background);

	const ratio =
		(Math.max(fgLuminance, bgLuminance) + 0.05) /
		(Math.min(fgLuminance, bgLuminance) + 0.05);

	return ratio >= requiredRatio;
}

/**
 * iOS-specific accessibility helpers
 */
export const iosA11y = {
	/**
	 * Get iOS-appropriate ARIA labels for common UI patterns
	 */
	getAriaLabel: (
		type: 'button' | 'input' | 'card' | 'sidebar',
		context?: string,
	): string => {
		const labels = {
			button: context ? `${context} button` : 'Button',
			input: context ? `${context} input field` : 'Input field',
			card: context ? `${context} card` : 'Card',
			sidebar: 'Navigation sidebar',
		};
		return labels[type];
	},

	/**
	 * Get iOS-appropriate role attributes
	 */
	getRole: (
		type: 'navigation' | 'main' | 'complementary' | 'banner',
	): string => {
		return type;
	},

	/**
	 * Check if iOS VoiceOver is likely active
	 */
	isVoiceOverActive: (): boolean => {
		// This is a heuristic check - not 100% accurate
		return (
			window.navigator.userAgent.includes('Mac') && 'speechSynthesis' in window
		);
	},
};
