import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { projectItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils'; // Assuming a utility for className concatenation
import { useLocation } from 'react-router';

export function NavProjects() {
	const location = useLocation();
	const { t } = useI18n();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>{t('navigation.projects')}</SidebarGroupLabel>
			<SidebarMenu>
				{projectItems.map((item) => (
					<SidebarMenuItem key={item.title}>
						<LocalizedNavLink
							to={item.url}
							className={({ isActive }) => {
								return isActive ? 'w-full font-bold' : 'w-full';
							}}
						>
							<SidebarMenuButton
								asChild
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
		</SidebarGroup>
	);
}
