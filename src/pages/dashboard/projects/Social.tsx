import { useI18n } from '@/hooks/use-i18n';

const Social = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="mb-4 font-bold text-xl">{t('projects.social.title')}</h1>
			<div className="rounded-lg border p-4">
				<p className="text-muted-foreground">Social project feature coming soon...</p>
			</div>
		</div>
	);
};

export default Social;
