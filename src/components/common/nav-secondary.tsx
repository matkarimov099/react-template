import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { useSidebar } from '@/hooks/use-sidebar';
import { footerMenuItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils';
import type * as React from 'react';
import { useLocation } from 'react-router';
import { removeLocaleFromPath } from '@/plugins/i18n-routing.ts';

export function NavSecondary({
	...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const location = useLocation();
	const { t } = useI18n();
	const { state } = useSidebar();
	const isCollapsed = state === 'collapsed';

	return (
		<SidebarGroup className={cn('transition-all duration-200')} {...props}>
			<SidebarGroupContent>
				<SidebarMenu className={cn('space-y-1')}>
					{footerMenuItems.map((item) => {
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
												<span className="text-xs font-medium">
													{t(item.titleKey || item.title)}
												</span>
											)}
										</div>
									</SidebarMenuButton>
								</LocalizedNavLink>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
