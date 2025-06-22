import { useI18n } from '@/hooks/use-i18n';

const Calendar = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="text-xl font-bold mb-4">{t('calendar.title')}</h1>
			<div className="p-4 border rounded-lg">
				<p className="text-muted-foreground">Calendar feature coming soon...</p>
			</div>
		</div>
	);
};

export default Calendar;
