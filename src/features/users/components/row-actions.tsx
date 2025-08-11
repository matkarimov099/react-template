import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';
import * as React from 'react';

import { EllipsisIcon } from 'lucide-react';
import { DeleteUser } from './actions/DeleteUser';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
	table: TanstackTable<TData>; // Table instance
}

export function DataTableRowActions<TData>({ row, table }: DataTableRowActionsProps<TData>) {
	const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
	// Function to reset all selections
	const resetSelection = () => {
		table.resetRowSelection();
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
						<EllipsisIcon className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DropdownMenuItem onClick={() => console.log(row)}>Edit</DropdownMenuItem>
					<DropdownMenuItem>Make a copy</DropdownMenuItem>
					<DropdownMenuItem>Favorite</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
						Delete
						<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteUser
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				resetSelection={resetSelection}
			/>
		</>
	);
}
