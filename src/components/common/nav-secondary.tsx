import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { footerMenuItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils'; // Assuming a utility for className concatenation
import type * as React from 'react';
import { useLocation } from 'react-router';

export function NavSecondary({
	...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const location = useLocation();
	const { t } = useI18n();

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{footerMenuItems.map((item) => (
						<SidebarMenuItem key={item.title}>
							<LocalizedNavLink
								to={item.url}
								className={({ isActive }) =>
									cn('w-full', isActive && 'font-bold')
								}
							>
								<SidebarMenuButton
									asChild
									size="sm"
									className={cn(
										'',
										item.url === location.pathname && 'bg-neutral-400/10',
									)}
								>
									<span>
										{item.icon && item.icon}
										<span>{t(item.titleKey || item.title)}</span>
									</span>
								</SidebarMenuButton>
							</LocalizedNavLink>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
