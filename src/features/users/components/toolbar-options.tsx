import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

import { AddUser } from '@/features/users/components/actions/AddUser.tsx';
import { BulkDeleteUser } from '@/features/users/components/actions/BulkDeleteUser.tsx';

interface ToolbarOptionsProps {
	// Current page selected users with name data
	selectedUsers: { id: string; name: string }[];
	// All selected user IDs across all pages (for operations that only need IDs)
	allSelectedUserIds?: (string | number)[];
	// Total count of selected items across all pages
	totalSelectedCount: number;
	resetSelection: () => void;
}

export const ToolbarOptions = ({
	selectedUsers,
	allSelectedUserIds = [],
	totalSelectedCount,
	resetSelection,
}: ToolbarOptionsProps) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	// Use total selected count if available, otherwise fall back to current page selection
	const selectionCount = totalSelectedCount || selectedUsers.length;

	// Determine which IDs to use for operations - prefer all selected IDs if available
	const selectedIds =
		allSelectedUserIds.length > 0
			? allSelectedUserIds
			: selectedUsers.map((user) => user.id);

	return (
		<div className="flex items-center gap-2">
			<AddUser />

			{selectionCount > 0 && (
				<>
					<Button
						variant="outline"
						size="default"
						onClick={() => setDeleteDialogOpen(true)}
					>
						<TrashIcon className="mr-2 size-4" aria-hidden="true" />
						Delete ({selectionCount})
					</Button>

					<BulkDeleteUser
						open={deleteDialogOpen}
						onOpenChange={setDeleteDialogOpen}
						selectedUsers={selectedUsers}
						allSelectedIds={selectedIds}
						totalSelectedCount={selectionCount}
						resetSelection={resetSelection}
					/>
				</>
			)}
		</div>
	);
};
