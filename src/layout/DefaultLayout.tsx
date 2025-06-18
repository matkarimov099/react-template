import { AppSidebar } from '@/components/common/app-sidebar.tsx';
import { ModeToggle } from '@/components/custom/mode-toggle.tsx';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner.tsx';
import { usePageTitle } from '@/hooks/use-page-title.ts';
import { AnimatePresence, motion } from 'motion/react';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router';

export const DefaultLayout = () => {
	const { title } = usePageTitle();
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<NavLink to="/">App name</NavLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>{title}</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<ModeToggle />
				</header>
				<motion.div
					className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto max-h-[calc(100vh-6rem)]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2, delay: 0.1 }}
				>
					<Suspense
						fallback={
							<Spinner
								size="large"
								className="flex h-screen items-center justify-center"
							/>
						}
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={title}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
							>
								<main className="bg-card rounded-lg p-6 shadow-sm">
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
