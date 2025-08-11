import {
	BarChart3Icon,
	CalendarIcon,
	FileTextIcon,
	LayoutDashboardIcon,
	SettingsIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface SidebarMenuItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon?: ReactNode;
	isActive?: boolean;
	disabled?: boolean;
	privileges?: string[];
	items?: SidebarSubMenuItem[];
}

export interface SidebarSubMenuItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon?: ReactNode;
	disabled?: boolean;
	privileges?: string[];
}

export interface SidebarFooterItem {
	title: string;
	titleKey?: string; // Translation key
	url: string;
	icon: ReactNode;
}

export const mainMenuItems: SidebarMenuItem[] = [
	{
		title: 'Dashboard',
		titleKey: 'navigation.dashboard',
		icon: <LayoutDashboardIcon />,
		url: '',
		items: [
			{
				title: 'Reports',
				titleKey: 'navigation.reports',
				url: '/reports',
			},
		],
	},
	{
		title: 'Users',
		titleKey: 'navigation.users',
		url: '/users',
		icon: <BarChart3Icon />,
	},
	{
		title: 'Calendar',
		titleKey: 'navigation.calendar',
		url: '/calendar',
		icon: <CalendarIcon />,
	},
	{
		title: 'Documents',
		titleKey: 'navigation.documents',
		url: '/documents',
		icon: <FileTextIcon />,
	},
];

export const footerMenuItems: SidebarFooterItem[] = [
	{
		title: 'Settings',
		titleKey: 'navigation.settings',
		url: '/settings',
		icon: <SettingsIcon />,
	},
	{
		title: 'Help',
		titleKey: 'navigation.help',
		url: '/help',
		icon: <FileTextIcon />,
	},
];
