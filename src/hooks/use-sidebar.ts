import { SidebarContext, type SidebarContextProps } from '@/context/sidebar-context';
import { useContext } from 'react';

/**
 * A hook for accessing the sidebar context
 * @returns The sidebar context value
 */
export function useSidebar(): SidebarContextProps {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider.');
	}

	return context;
}
