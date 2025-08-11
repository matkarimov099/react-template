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
import { removeLocaleFromPath } from '@/plugins/i18n-routing.ts';
import { useLocation } from 'react-router';

export function NavProjects() {
	const location = useLocation();
	const { t } = useI18n();
	const { state } = useSidebar();
	const isCollapsed = state === 'collapsed';

	return (
		<SidebarGroup className={cn('group-data-[collapsible=icon]:hidden')}>
			<SidebarGroupLabel
				className={cn(
					'px-2 font-semibold text-[var(--secondaryLabel)] text-xs uppercase tracking-wider transition-opacity duration-200',
					isCollapsed && 'h-0 overflow-hidden opacity-0'
				)}
			>
				{t('navigation.projects')}
			</SidebarGroupLabel>

			<SidebarMenu className="space-y-1">
				{projectItems.map(item => {
					const currentPath = removeLocaleFromPath(location.pathname);
					const isActive = item.url === currentPath;
					return (
						<SidebarMenuItem key={item.title}>
							<LocalizedNavLink to={item.url} className="block">
								<SidebarMenuButton
									tooltip={isCollapsed ? t(item.titleKey || item.title) : undefined}
									className={cn(
										'relative h-9 w-full rounded-lg px-2 transition-all duration-200',
										'hover:!bg-blue-500 hover:!text-white text-[var(--sidebar-foreground)]',
										isActive && '!text-blue-500 !font-semibold hover:!bg-blue-600',
										isCollapsed && 'w-9 justify-center p-0'
									)}
								>
									<div className={cn('flex items-center gap-2', isCollapsed && 'justify-center')}>
										{item.icon}
										{!isCollapsed && (
											<span className="font-medium">{t(item.titleKey || item.title)}</span>
										)}
										{/* Active indicator dot for projects */}
										{!isCollapsed && isActive && (
											<div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
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
