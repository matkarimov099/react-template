import { useI18n } from '@/hooks/use-i18n';

const Documents = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="mb-4 font-bold text-xl">{t('documents.title')}</h1>
			<div className="rounded-lg border p-4">
				<p className="text-muted-foreground">Documents feature coming soon...</p>
			</div>
		</div>
	);
};

export default Documents;
