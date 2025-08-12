import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import { App } from '@/App.tsx';
import { AppLoader } from '@/components/common/AppLoader.tsx';
import { PageTitleProvider } from '@/provider/page-title-provider.tsx';
import { ThemeProvider } from '@/provider/theme-provider.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="ui-theme">
			<PageTitleProvider>
				<Suspense fallback={<AppLoader />}>
					<App />
				</Suspense>
			</PageTitleProvider>
		</ThemeProvider>
	</StrictMode>
);
