import { useI18n } from '@/hooks/use-i18n';
import { footerMenuItems, mainMenuItems } from '@/lib/sidebar-menu';
import type { SidebarFooterItem, SidebarMenuItem, SidebarSubMenuItem } from '@/lib/sidebar-menu';
import { removeLocaleFromPath } from '@/plugins/i18n-routing';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

interface BreadcrumbItem {
	title: string;
	url?: string;
	isActive: boolean;
}

export const useBreadcrumb = () => {
	const location = useLocation();
	const { t } = useI18n();

	const breadcrumbItems = useMemo(() => {
		// Get the current path without a locale
		const currentPath = removeLocaleFromPath(location.pathname);
		const items: BreadcrumbItem[] = [];

		// Always start with "Project"
		items.push({
			title: 'Project',
			url: '/',
			isActive: false,
		});

		// Find the current page in the menu structure
		let foundItem: SidebarMenuItem | SidebarSubMenuItem | SidebarFooterItem | null = null;
		let parentItem: SidebarMenuItem | null = null;

		// First, check main menu items (which can have subitems)
		for (const menuItem of mainMenuItems) {
			// Check if the current path matches a main menu item directly
			if (menuItem.url && menuItem.url === currentPath) {
				foundItem = menuItem;
				break;
			}

			// Special case for a root path ("/") - should match Dashboard
			if (currentPath === '/' && menuItem.url === '') {
				foundItem = menuItem;
				break;
			}

			// Check if the current path matches a subitem
			if (menuItem.items) {
				for (const subItem of menuItem.items) {
					if (subItem.url === currentPath) {
						foundItem = subItem;
						parentItem = menuItem;
						break;
					}
				}
				if (foundItem) break;
			}
		}

		// If not found in the main menu, check footer menu items
		if (!foundItem) {
			for (const menuItem of footerMenuItems) {
				if (menuItem.url && menuItem.url === currentPath) {
					foundItem = menuItem;
					break;
				}
			}
		}

		if (foundItem) {
			// If we found a parent item (subitem case)
			if (parentItem) {
				// Add a parent menu item
				// Special handling for Dashboard (empty URL)
				const parentUrl = parentItem.url === '' ? '/' : parentItem.url;
				items.push({
					title: parentItem.titleKey ? t(parentItem.titleKey) : parentItem.title,
					url: parentUrl,
					isActive: false,
				});
			}

			// Add current page
			items.push({
				title: foundItem.titleKey ? t(foundItem.titleKey) : foundItem.title,
				isActive: true,
			});
		} else {
			// Fallback: if no match found, use path segments
			const pathSegments = currentPath.split('/').filter(Boolean);
			if (pathSegments.length > 0) {
				const lastSegment = pathSegments[pathSegments.length - 1];
				const fallbackTitle =
					lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');

				items.push({
					title: fallbackTitle,
					isActive: true,
				});
			} else {
				// Root path - show Dashboard
				items.push({
					title: t('navigation.dashboard'),
					isActive: true,
				});
			}
		}

		return items;
	}, [location.pathname, t]);

	return { breadcrumbItems };
};
