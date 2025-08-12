import { Toaster } from '@/components/ui/sonner.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useMediaQuery } from '@/hooks/use-media-query.ts';
import { i18nReady } from '@/lib/i18n';
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
			})
	);
	const [i18nLoaded, setI18nLoaded] = useState<boolean>(false);
	const isMobile = useMediaQuery('(max-width: 767px)');

	useEffect(() => {
		i18nReady.then(() => setI18nLoaded(true)).catch(console.error);
	}, []);
	return !i18nLoaded ? (
		<Spinner size="large" className="flex h-screen items-center justify-center" />
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
