import { useI18n } from '@/hooks/use-i18n.ts';
import { usePageTitle } from '@/hooks/use-page-title.ts';
import { useEffect } from 'react';

interface PageTitleProps {
	title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
	const { setTitle } = usePageTitle();
	const { t } = useI18n();

	useEffect(() => {
		setTitle(t(title));
		document.title = t(title);
	}, [title, setTitle, t]);

	return null;
};
