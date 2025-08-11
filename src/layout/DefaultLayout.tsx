import { AppSidebar } from '@/components/common/app-sidebar.tsx';
import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { LanguageToggle } from '@/components/custom/language-toggle.tsx';
import { ModeToggle } from '@/components/custom/mode-toggle.tsx';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner.tsx';
import { usePageTitle } from '@/hooks/use-page-title.ts';
import { AnimatePresence, motion } from 'motion/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export const DefaultLayout = () => {
	const { title } = usePageTitle();
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="bg-ios-background">
				{/* Floating header with a gap */}
				<div className="p-2">
					<header className="relative flex h-14 shrink-0 items-center justify-between gap-2 bg-[var(--content-bg)] backdrop-blur-xl saturate-150 border border-[var(--border)]/50 shadow-sm rounded-xl z-50">
						{/* Left section */}
						<div className="flex items-center gap-3 px-4">
							<div className="flex items-center gap-3">
								<SidebarTrigger className="group relative h-8 w-8 p-0 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--control-ghost-bg)] hover:border-[var(--system-blue)]/30 transition-all duration-200" />
								<div className="hidden sm:block w-px h-5 bg-[var(--border)]/30" />
							</div>

							<Breadcrumb className="hidden md:flex">
								<BreadcrumbList className="gap-1">
									<BreadcrumbItem>
										<LocalizedNavLink
											to="/"
											className="flex items-center gap-2 text-[var(--secondaryLabel)] hover:text-[var(--label)] transition-colors duration-200 text-sm font-medium"
										>
											Project
										</LocalizedNavLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="text-[var(--secondaryLabel)]" />
									<BreadcrumbItem>
										<BreadcrumbPage className="text-[var(--label)] font-semibold max-w-[200px] truncate">
											{title}
										</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>

						{/* Right section */}
						<div className="flex items-center px-2">
							<LanguageToggle />
							<ModeToggle />
						</div>

						{/* Glassmorphism overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-[var(--card-bg)]/30 via-transparent to-[var(--card-bg)]/30 rounded-xl pointer-events-none" />
					</header>
				</div>
				<motion.div
					className="flex flex-1 flex-col gap-4 px-2 pb-4 overflow-y-auto max-h-[calc(100vh-7rem)] bg-ios-background"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.1,
						delay: 0.08,
						ease: [0.2, 0.9, 0.25, 1], // iOS cubic-bezier
					}}
				>
					<Suspense
						fallback={
							<div className="flex h-screen items-center justify-center bg-ios-background">
								<Spinner size="large" className="ios-loading-pulse" />
							</div>
						}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 12, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -8, scale: 1.02 }}
								transition={{
									duration: 0.1,
									ease: [0.2, 0.9, 0.25, 1], // iOS cubic-bezier
								}}
								className="ios-page-enter ios-page-enter-active"
							>
								<main className="bg-ios-card rounded-ios-lg p-6 shadow-ios-sm border border-ios backdrop-blur-sm">
									<Outlet />
								</main>
							</motion.div>
						</AnimatePresence>
					</Suspense>
				</motion.div>
			</SidebarInset>
		</SidebarProvider>
	);
};
