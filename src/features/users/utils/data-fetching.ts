import { preprocessSearch } from '@/components/data-table/utils';
import { getUsers } from '@/features/users/services/users.service.ts';
import type { UserFilter } from '@/features/users/types.ts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch users with the current filters and pagination
 */
export function useUsersData(filter: UserFilter) {
	return useQuery({
		queryKey: ['users', filter, preprocessSearch(filter?.search || '')],
		queryFn: () => getUsers(filter),
		placeholderData: keepPreviousData, // Keep previous data when fetching new data. If skeleton animation is needed when fetching data, comment this out.
	});
}

// Add a property to the function so we can use it with the DataTable component
useUsersData.isQueryHook = true;
