import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { lazy } from 'react';

// Lazy load the heavy users table component
const UsersTable = lazy(() => import('@/features/users/components/users-table.tsx'));

const Users = () => {
	return (
		<div>
			{/* DataTable with custom configuration */}
			<LazyComponent>
				<UsersTable />
			</LazyComponent>
		</div>
	);
};

export default Users;
