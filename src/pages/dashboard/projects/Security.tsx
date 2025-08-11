import { useI18n } from '@/hooks/use-i18n';

const Security = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="mb-4 font-bold text-xl">{t('projects.security.title')}</h1>
			<div className="rounded-lg border p-4">
				<p className="text-muted-foreground">Security project feature coming soon...</p>
			</div>
		</div>
	);
};

export default Security;
