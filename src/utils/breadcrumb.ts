import { mainMenuItems } from '@/lib/sidebar-menu';
import { removeLocaleFromPath } from '@/plugins/i18n-routing';

export interface BreadcrumbItem {
	title: string;
	titleKey?: string;
	url?: string;
	isActive?: boolean;
}

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
	const currentPath = removeLocaleFromPath(pathname);
	const breadcrumbs: BreadcrumbItem[] = [];

	// Always start with "Project"
	breadcrumbs.push({
		title: 'Project',
		titleKey: 'navigation.project',
		url: '/',
	});

	// Find the current page in the menu structure
	for (const item of mainMenuItems) {
		// Check if current path matches a main menu item
		if (item.url && item.url === currentPath) {
			// Direct main menu item (no parent)
			breadcrumbs.push({
				title: item.title,
				titleKey: item.titleKey,
				isActive: true,
			});
			return breadcrumbs;
		}

		// Check if current path matches a sub-item
		if (item.items) {
			for (const subItem of item.items) {
				if (subItem.url === currentPath) {
					// Sub-item found - add parent first, then sub-item
					breadcrumbs.push({
						title: item.title,
						titleKey: item.titleKey,
						url: item.url || undefined,
					});
					breadcrumbs.push({
						title: subItem.title,
						titleKey: subItem.titleKey,
						isActive: true,
					});
					return breadcrumbs;
				}
			}
		}
	}

	// If no match found, try to infer from path
	const pathSegments = currentPath.split('/').filter(Boolean);
	if (pathSegments.length > 0) {
		const lastSegment = pathSegments[pathSegments.length - 1];
		breadcrumbs.push({
			title: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1),
			isActive: true,
		});
	}

	return breadcrumbs;
}
