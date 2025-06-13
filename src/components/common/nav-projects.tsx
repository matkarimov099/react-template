import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { projectItems } from '@/lib/sidebar-menu.tsx';
import { cn } from '@/lib/utils'; // Assuming a utility for className concatenation
import { NavLink, useLocation } from 'react-router';

export function NavProjects() {
	const location = useLocation();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projectItems.map((item) => (
					<SidebarMenuItem key={item.title}>
						<NavLink
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
									<span>{item.title}</span>
								</span>
							</SidebarMenuButton>
						</NavLink>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
