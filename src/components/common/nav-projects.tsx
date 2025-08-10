import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { useSidebar } from '@/hooks/use-sidebar';
import { projectItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router';
import { removeLocaleFromPath } from '@/plugins/i18n-routing.ts';

export function NavProjects() {
	const location = useLocation();
	const { t } = useI18n();
	const { state } = useSidebar();
	const isCollapsed = state === 'collapsed';

	return (
		<SidebarGroup className={cn('group-data-[collapsible=icon]:hidden')}>
			<SidebarGroupLabel
				className={cn(
					'px-2 text-xs font-semibold text-[var(--secondaryLabel)] uppercase tracking-wider transition-opacity duration-200',
					isCollapsed && 'opacity-0 h-0 overflow-hidden',
				)}
			>
				{t('navigation.projects')}
			</SidebarGroupLabel>

			<SidebarMenu className="space-y-1">
				{projectItems.map((item) => {
					const currentPath = removeLocaleFromPath(location.pathname);
					const isActive = item.url === currentPath;
					return (
						<SidebarMenuItem key={item.title}>
							<LocalizedNavLink to={item.url} className="block">
								<SidebarMenuButton
									tooltip={
										isCollapsed ? t(item.titleKey || item.title) : undefined
									}
									className={cn(
										'relative h-9 px-2 rounded-lg transition-all duration-200 w-full',
										'text-[var(--sidebar-foreground)] hover:!bg-blue-500 hover:!text-white',
										isActive &&
											'!text-blue-500 !font-semibold hover:!bg-blue-600',
										isCollapsed && 'w-9 p-0 justify-center',
									)}
								>
									<div
										className={cn(
											'flex items-center gap-2',
											isCollapsed && 'justify-center',
										)}
									>
										{item.icon}
										{!isCollapsed && (
											<span className="font-medium">
												{t(item.titleKey || item.title)}
											</span>
										)}
										{/* Active indicator dot for projects */}
										{!isCollapsed && isActive && (
											<div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
										)}
									</div>
								</SidebarMenuButton>
							</LocalizedNavLink>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
