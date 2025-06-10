import { AuthNavbar } from '@/features/auth/components/AuthNavbar';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
	return (
		<div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-white dark:bg-black">
			<div
				className={cn(
					'absolute inset-0',
					'[background-size:40px_40px]',
					'[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
					'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
				)}
			/>
			<div className="relative z-20 w-full min-h-screen flex flex-col">
				<div className="w-full flex-shrink-0">
					<AuthNavbar />
				</div>
				<div className="flex-1 flex items-center justify-center">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
