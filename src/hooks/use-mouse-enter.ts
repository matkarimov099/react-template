import { MouseEnterContext } from '@/context/mouse-enter-context.ts';
// Create a hook to use the context
import { useContext } from 'react';

export const useMouseEnter = () => {
	const context = useContext(MouseEnterContext);
	if (context === undefined) {
		throw new Error('useMouseEnter must be used within a MouseEnterProvider');
	}
	return context;
};
