import { createContext } from 'react';

interface PageTitleContextProps {
	title: string;
	setTitle: (title: string) => void;
}

export const PageTitleContext = createContext<PageTitleContextProps>({
	title: '',
	setTitle: () => {},
});
