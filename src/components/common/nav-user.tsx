import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from 'lucide-react';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useSidebar } from '@/hooks/use-sidebar';
import { useI18n } from '@/hooks/use-i18n';
import { cn } from '@/lib/utils';
import type { CurrentUser } from '@/features/auth/types.ts';

interface NavUserProps {
	user?: CurrentUser | null;
	logout: () => void;
}
export function NavUser({ user, logout }: NavUserProps) {
	const { isMobile, state } = useSidebar();
	const { t } = useI18n();
	const isCollapsed = state === 'collapsed';

	return (
		<div
			className={cn(
				'relative',
				'before:absolute before:-top-3 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--border)]/50 before:to-transparent',
			)}
		>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size={isCollapsed ? 'sm' : 'lg'}
								className={cn(
									'group relative transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
									'bg-[var(--card-bg)] border border-[var(--border)]/60 rounded-lg',
									'hover:bg-[var(--control-ghost-bg)] hover:border-[var(--system-blue)]/30 hover:shadow-md',
									'data-[state=open]:bg-[var(--control-ghost-bg)] data-[state=open]:border-[var(--system-blue)]/40',
									isCollapsed && 'justify-center h-8 w-8 p-0',
								)}
							>
								<div className="relative">
									<Avatar
										className={cn(
											'rounded-lg border border-[var(--border)]/30 transition-all duration-200',
											isCollapsed ? 'h-8 w-8' : 'h-8 w-8',
										)}
									>
										<AvatarFallback
											className={cn(
												'rounded-lg bg-gradient-to-br from-[var(--system-blue)]/10 to-[var(--system-blue)]/5 text-[var(--system-blue)] font-semibold flex items-center justify-center',
												isCollapsed && 'text-xs',
											)}
										>
											{`${user?.firstname?.[0] ?? ''}${
												user?.lastname?.[0] ?? ''
											}`.toUpperCase() || 'SU'}
										</AvatarFallback>
										<AvatarImage src={user?.firstname} alt={user?.firstname} />
									</Avatar>
								</div>
								{!isCollapsed && (
									<>
										<div className="grid flex-1 text-left text-sm leading-tight transition-all duration-300">
											<span className="truncate font-medium text-[var(--label)]">
												{user?.firstname || 'USERNAME'}
											</span>
											<span className="truncate text-xs text-[var(--secondaryLabel)]">
												{user?.lastname}
											</span>
										</div>
										<ChevronsUpDown className="ml-auto size-4 text-[var(--tertiaryLabel)] group-hover:text-[var(--secondaryLabel)] transition-colors" />
									</>
								)}
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? 'bottom' : 'right'}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage src={user?.firstname} alt={user?.lastname} />
										<AvatarFallback className="rounded-lg">
											{`${user?.firstname?.[0] ?? ''}${
												user?.lastname?.[0] ?? ''
											}`.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{`${user?.firstname} ${user?.lastname}`}
										</span>
										<span className="truncate text-xs">{user?.phone}</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									{t('navigation.upgrade')}
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<BadgeCheck />
									{t('navigation.account')}
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									{t('navigation.billing')}
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
									{t('navigation.notifications')}
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>
								<LogOut />
								{t('navigation.logout')}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</div>
	);
}
