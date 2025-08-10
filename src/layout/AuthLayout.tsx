import { cn } from '@/lib/utils';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
	return (
		<div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-ios-background">
			<div
				className={cn(
					'absolute inset-0',
					'[background-size:40px_40px]',
					'[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]',
					'opacity-20',
				)}
			/>
			{/* Gradient overlay for depth */}
			<div className="absolute inset-0 bg-gradient-to-br from-[var(--card-bg)]/20 via-transparent to-[var(--card-bg)]/20" />

			<div className="relative z-20 w-full h-full flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
