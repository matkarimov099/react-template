import { Toaster } from '@/components/ui/sonner.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useMediaQuery } from '@/hooks/use-media-query.ts';
import { router } from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';

function App() {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minute
						retry: 1,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);
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
