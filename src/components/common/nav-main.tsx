'use client';

import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { mainMenuItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router';

export function NavMain() {
	const location = useLocation();
	const { t } = useI18n();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{t('navigation.menu')}</SidebarGroupLabel>
			<SidebarMenu>
				{mainMenuItems.map((item) => {
					const isParentActive =
						item.items?.some((subItem) => subItem.url === location.pathname) ||
						(item.url && item.url === location.pathname);

					return (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={item.isActive || Boolean(isParentActive)}
						>
							<SidebarMenuItem>
								{item.url ? (
									<LocalizedNavLink
										to={item.url}
										className={({ isActive }) =>
											cn('w-full', isActive && 'font-bold')
										}
									>
										<SidebarMenuButton
											asChild
											tooltip={t(item.titleKey || item.title)}
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
								) : (
									<SidebarMenuButton
										asChild
										tooltip={t(item.titleKey || item.title)}
										className={cn(
											'w-full',
											isParentActive && 'font-bold bg-neutral-400/10',
										)}
									>
										<span>
											{item.icon && item.icon}
											<span>{t(item.titleKey || item.title)}</span>
										</span>
									</SidebarMenuButton>
								)}
								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction className="data-[state=open]:rotate-90">
												<ChevronRight />
												<span className="sr-only">Toggle</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items.map((subItem) => {
													return (
														<SidebarMenuSubItem key={subItem.title}>
															<LocalizedNavLink
																to={subItem.url}
																className={({ isActive }) =>
																	cn('w-full', isActive && 'font-bold')
																}
															>
																<SidebarMenuSubButton asChild>
																	<span>
																		{t(subItem.titleKey || subItem.title)}
																	</span>
																</SidebarMenuSubButton>
															</LocalizedNavLink>
														</SidebarMenuSubItem>
													);
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
