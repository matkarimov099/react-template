import { useMediaQuery } from '@/hooks/use-media-query.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import { Toaster } from '@/components/ui/sonner.tsx';
import { router } from '@/router/routers.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';

const queryClient = new QueryClient();

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const isMobile = useMediaQuery('(max-width: 767px)');
	useEffect(() => {
		setTimeout(() => setLoading(false), 500);
	}, []);
	return loading ? (
		<Spinner
			size="large"
			className="flex h-screen items-center justify-center"
		/>
	) : (
		<>
			<QueryClientProvider client={queryClient}>
				<Toaster
					richColors
					expand
					visibleToasts={8}
					closeButton
					position={isMobile ? 'top-center' : 'bottom-right'}
				/>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

export { App };
