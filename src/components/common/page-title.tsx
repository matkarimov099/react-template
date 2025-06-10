import { useEffect } from 'react';
import { usePageTitle } from '@/hooks/use-page-title.ts';

interface PageTitleProps {
	title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
	const { setTitle } = usePageTitle();

	useEffect(() => {
		setTitle(title);
		document.title = title;
	}, [title, setTitle]);

	return null;
};
