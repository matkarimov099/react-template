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
												'transition-all duration-200 hover:bg-primary/5 hover:text-primary',
												item.url === location.pathname && 
													'bg-primary/10 border-l-2 border-primary text-primary font-medium',
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
											'w-full transition-all duration-200 hover:bg-primary/5 hover:text-primary',
											isParentActive && 
												'bg-primary/10 border-l-2 border-primary text-primary font-medium',
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
																<SidebarMenuSubButton 
																	asChild
																	className={cn(
																		'transition-all duration-200 hover:bg-secondary/10 hover:text-secondary ml-4',
																		subItem.url === location.pathname && 
																			'bg-secondary/15 border-l-2 border-secondary text-secondary font-medium'
																	)}
																>
																	<span>
																		{subItem.icon && (
																			<span className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
																				{subItem.icon}
																			</span>
																		)}
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
