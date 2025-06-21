import { DataTable } from '@/components/data-table/data-table.tsx';
import { getColumns } from '@/features/users/components/columns.tsx';
import { ToolbarOptions } from '@/features/users/components/toolbar-options.tsx';
import type { User } from '@/features/users/types.ts';
import { useExportConfig } from '@/features/users/utils/config.ts';
import { usersTableConfig } from '@/features/users/utils/table-config.ts';
import { useUsersData } from '../utils/data-fetching';

export const UsersTable = () => {
	const {
		users,
		total,
		isFetching,
		currentPage,
		pageSize,
		onPageChange,
		onPageSizeChange,
		sorting,
		onSortingChange,
		search,
		onSearchChange,
	} = useUsersData();

	const exportConfig = useExportConfig();

	return (
		<DataTable<User>
			getColumns={getColumns}
			data={users}
			totalItems={total}
			isLoading={isFetching}
			currentPage={currentPage}
			pageSize={pageSize}
			onPageChange={onPageChange}
			onPageSizeChange={onPageSizeChange}
			sorting={sorting}
			onSortingChange={onSortingChange}
			searchValue={search}
			onSearchChange={onSearchChange}
			exportConfig={exportConfig}
			idField="id"
			pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
			renderToolbarContent={({
				selectedRows,
				allSelectedIds,
				totalSelectedCount,
				resetSelection,
			}) => (
				<ToolbarOptions
					selectedUsers={selectedRows.map((row) => ({
						id: row.id,
						name: row.name,
					}))}
					allSelectedUserIds={allSelectedIds}
					totalSelectedCount={totalSelectedCount}
					resetSelection={resetSelection}
				/>
			)}
			config={usersTableConfig}
		/>
	);
};
