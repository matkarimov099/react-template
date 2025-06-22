import { useI18n } from '@/hooks/use-i18n';

const Help = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="text-xl font-bold mb-4">{t('help.title')}</h1>
			<div className="p-4 border rounded-lg">
				<p className="text-muted-foreground">Help feature coming soon...</p>
			</div>
		</div>
	);
};

export default Help;
