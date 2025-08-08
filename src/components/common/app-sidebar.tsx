import { Command } from 'lucide-react';
import type * as React from 'react';

import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { NavMain } from '@/components/common/nav-main.tsx';
import { NavProjects } from '@/components/common/nav-projects.tsx';
import { NavSecondary } from '@/components/common/nav-secondary.tsx';
import { NavUser } from '@/components/common/nav-user.tsx';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { logout, currentUser } = useAuthContext();

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<LocalizedNavLink to="/">
								<div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shadow-sm">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium text-foreground">
										Project
									</span>
									<span className="truncate text-xs text-muted-foreground">
										name
									</span>
								</div>
							</LocalizedNavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
				<NavProjects />
				<NavSecondary className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={currentUser} logout={logout} />
			</SidebarFooter>
		</Sidebar>
	);
}
