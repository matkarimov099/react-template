import { useI18n } from '@/hooks/use-i18n';
import { lazy } from 'react';
import { LazyComponent } from '@/components/common/lazy-component.tsx';

// Lazy load the heavy users table component
const UsersTable = lazy(
	() => import('@/features/users/components/users-table.tsx'),
);

const Users = () => {
	const { t } = useI18n();

	return (
		<div>
			<h1 className="text-xl font-bold mb-4">{t('pages.users.title')}</h1>

			{/* DataTable with custom configuration */}
			<LazyComponent>
				<UsersTable />
			</LazyComponent>
		</div>
	);
};

export default Users;
