import { useI18n } from '@/hooks/use-i18n';

const Help = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="mb-4 font-bold text-xl">{t('help.title')}</h1>
			<div className="rounded-lg border p-4">
				<p className="text-muted-foreground">Help feature coming soon...</p>
			</div>
		</div>
	);
};

export default Help;
