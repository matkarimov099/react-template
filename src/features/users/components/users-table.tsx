import { DataTable } from "@/components/data-table/optimized-data-table";
import { getColumns } from "@/features/users/components/columns.tsx";
import { ToolbarOptions } from "@/features/users/components/toolbar-options.tsx";
import { UsersFilter } from "@/features/users/components/users-filter.tsx";
import {
  getUsers,
  getUsersByIds,
} from "@/features/users/services/optimized-users.service.ts";
import type { User } from "@/features/users/types.ts";
import { useExportConfig } from "@/features/users/utils/config.ts";

export const UsersTable = () => {
  return (
    <DataTable<User, unknown>
      getColumns={getColumns}
      exportConfig={useExportConfig()}
      fetchDataFn={getUsers}
      fetchByIdsFn={getUsersByIds}
      idField="id"
      pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
      filterComponent={UsersFilter}
      initialFilters={{
        page: 1,
        limit: 25,
        sort_by: "created_at",
        sort_order: "desc",
      }}
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
      config={{
        enableRowSelection: true,
        enableClickRowSelect: false,
        enableKeyboardNavigation: true,
        enableSearch: false, // Disabled because we have custom filter
        enableDateFilter: false, // Disabled because we have custom filter
        enableColumnVisibility: true,
        enableUrlState: false, // Disabled for now to avoid conflicts
        enableToolbar: true,
        enablePagination: true,
        enableExport: true,
        size: "default",
        columnResizingTableId: "users-table",
        enableColumnResizing: true,
      }}
    />
  );
};
