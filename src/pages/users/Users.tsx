import { Spinner } from '@/components/ui/spinner.tsx';
import { UsersTable } from '@/features/users/components/users-table.tsx';
import { Suspense } from 'react';

export const Users = () => {
	return (
		<div>
			<h1 className="text-xl font-bold mb-4">Users List</h1>

			{/* DataTable with custom configuration */}
			<Suspense fallback={<Spinner />}>
				<UsersTable />
			</Suspense>
		</div>
	);
};
