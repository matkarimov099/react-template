import { Spinner } from '@/components/ui/spinner.tsx';
import { UsersTable } from '@/features/users/components/users-table.tsx';
import { useI18n } from '@/hooks/use-i18n';
import { Suspense } from 'react';

export const Users = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="text-xl font-bold mb-4">{t('users.title')}</h1>

			{/* DataTable with custom configuration */}
			<Suspense fallback={<Spinner />}>
				<UsersTable />
			</Suspense>
		</div>
	);
};
