import { type FC, type ReactNode, useState } from 'react';
import { PageTitleContext } from '../context/page-title-context.ts';

export const PageTitleProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [title, setTitle] = useState('Default Title');

	return (
		<PageTitleContext.Provider value={{ title, setTitle }}>{children}</PageTitleContext.Provider>
	);
};
