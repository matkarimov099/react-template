import { Typography } from '@/components/ui/typography.tsx';
import { useI18n } from '@/hooks/use-i18n';

const Calendar = () => {
	const { t } = useI18n();

	return (
		<div>
			<Typography variant="h5">{t('calendar.title')}</Typography>
			<div className="rounded-lg border p-4">
				<p className="text-muted-foreground">Calendar feature coming soon...</p>
			</div>
		</div>
	);
};

export default Calendar;
