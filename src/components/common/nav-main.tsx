'use client';

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
import { mainMenuItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';

export function NavMain() {
	const location = useLocation();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>MENU</SidebarGroupLabel>
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
									<NavLink
										to={item.url}
										className={({ isActive }) =>
											cn('w-full', isActive && 'font-bold')
										}
									>
										<SidebarMenuButton
											asChild
											tooltip={item.title}
											className={cn(
												'',
												item.url === location.pathname && 'bg-neutral-400/10',
											)}
										>
											<span>
												{item.icon && item.icon}
												<span>{item.title}</span>
											</span>
										</SidebarMenuButton>
									</NavLink>
								) : (
									<SidebarMenuButton
										asChild
										tooltip={item.title}
										className={cn(
											'w-full',
											isParentActive && 'font-bold bg-neutral-400/10',
										)}
									>
										<span>
											{item.icon && item.icon}
											<span>{item.title}</span>
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
															<NavLink
																to={subItem.url}
																className={({ isActive }) =>
																	cn('w-full', isActive && 'font-bold')
																}
															>
																<SidebarMenuSubButton asChild>
																	<span>{subItem.title}</span>
																</SidebarMenuSubButton>
															</NavLink>
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
