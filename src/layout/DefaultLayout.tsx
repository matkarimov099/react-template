import { AppSidebar } from '@/components/common/app-sidebar.tsx';
import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { LanguageToggle } from '@/components/custom/language-toggle.tsx';
import { ModeToggle } from '@/components/custom/mode-toggle.tsx';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useBreadcrumb } from '@/hooks/use-breadcrumb.ts';
import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useId } from 'react';
import { Outlet } from 'react-router';

export const DefaultLayout = () => {
	const { breadcrumbItems } = useBreadcrumb();

	return (
		<div className="h-screen overflow-hidden ios-bg-primary">
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset className="flex h-full flex-col ios-bg-primary">
					{/* Fixed header */}
					<div className="shrink-0 p-2">
						<header className="relative flex h-14 shrink-0 items-center justify-between gap-2 ios-glass-strong ios-shadow-sm ios-rounded-lg z-50">
							{/* Left section */}
							<div className="flex items-center gap-3 px-4">
								<div className="flex items-center gap-3">
									<SidebarTrigger className="group relative h-8 w-8 p-0 ios-rounded-lg ios-bg-card hover:ios-bg-control-ghost hover:border-[var(--system-blue)]/30 ios-transition" />
									<div className="hidden sm:block w-px h-5 ios-border/30" />
								</div>

								<Breadcrumb className="hidden md:flex">
									<BreadcrumbList className="gap-1">
										{breadcrumbItems.map((item, index) => (
											<div key={item.url || item.title} className="flex items-center gap-1">
												<BreadcrumbItem>
													{item.isActive ? (
														<BreadcrumbPage className="ios-text-primary font-semibold max-w-[200px] truncate ios-font">
															{item.title}
														</BreadcrumbPage>
													) : item.url ? (
														<BreadcrumbLink asChild>
															<LocalizedNavLink
																to={item.url}
																className="flex items-center gap-2 ios-text-secondary hover:ios-text-primary ios-transition ios-text-sm font-medium ios-font"
															>
																{item.title}
															</LocalizedNavLink>
														</BreadcrumbLink>
													) : (
														<span className="ios-text-secondary ios-text-sm font-medium ios-font">
															{item.title}
														</span>
													)}
												</BreadcrumbItem>
												{index < breadcrumbItems.length - 1 && (
													<BreadcrumbSeparator className="ios-text-secondary" />
												)}
											</div>
										))}
									</BreadcrumbList>
								</Breadcrumb>
							</div>

							{/* Right section */}
							<div className="flex items-center px-2">
								<LanguageToggle />
								<ModeToggle />
							</div>

							{/* Glass morphism overlay */}
							<div className="absolute inset-0 bg-gradient-to-r from-[var(--card-bg)]/30 via-transparent to-[var(--card-bg)]/30 ios-rounded-lg pointer-events-none" />
						</header>
					</div>

					{/* Scrollable main content */}
					<div className="flex flex-1 flex-col gap-4 px-2">
						<Suspense
							fallback={
								<div className="flex h-full items-center justify-center ios-bg-primary">
									<Spinner size="large" className="ios-animate-pulse" />
								</div>
							}
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={useId()}
									initial={{ opacity: 0, y: 8, scale: 0.98 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -4, scale: 1.02 }}
									transition={{
										duration: 0.1,
										ease: [0.2, 0.9, 0.25, 1], // iOS cubic-bezier
									}}
								>
									<main className="flex flex-1 flex-col overflow-y-auto max-h-[calc(100vh-5rem)] p-4 ios-shadow-md ios-rounded-lg ios-bg-content">
										<Outlet />
									</main>
								</motion.div>
							</AnimatePresence>
						</Suspense>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
};
