import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import { App } from '@/App.tsx';
import { PageTitleProvider } from '@/provider/page-title-provider.tsx';
import { ThemeProvider } from '@/provider/theme-provider.tsx';

// Initialize i18n
import '@/lib/i18n';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="ui-theme">
			<PageTitleProvider>
				<App />
			</PageTitleProvider>
		</ThemeProvider>
	</StrictMode>,
);
