import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBulkDeleteUsers } from "@/features/users/hooks/use-users";
import { toast } from "sonner";

interface BulkDeletePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUsers: { id: string; name: string }[];
  allSelectedIds?: (string | number)[];
  totalSelectedCount?: number;
  resetSelection: () => void;
}

export function BulkDeleteUser({
  open,
  onOpenChange,
  selectedUsers,
  allSelectedIds,
  totalSelectedCount,
  resetSelection,
}: BulkDeletePopupProps) {
  // Mavjud hook dan foydalanish
  const deleteMutation = useBulkDeleteUsers();

  // Use allSelectedIds if available, otherwise fallback to selectedUsers ids
  const idsToDelete = allSelectedIds || selectedUsers.map((user) => user.id);

  // Use total count if available, otherwise fallback to visible items count
  const itemCount = totalSelectedCount ?? selectedUsers.length;

  const handleDelete = async () => {
    if (idsToDelete.length === 0) {
      toast.error("No users selected for deletion");
      return;
    }

    try {
      await deleteMutation.mutateAsync(idsToDelete);

      // Show success message
      toast.success(
        itemCount === 1
          ? "User deleted successfully"
          : `${itemCount} users deleted successfully`
      );

      // Reset selection and close dialog
      resetSelection();
      onOpenChange(false);
    } catch (error) {
      console.error("Bulk delete failed:", error);
      toast.error(
        itemCount === 1 ? "Failed to delete user" : "Failed to delete users"
      );
    }
  };

  const getDialogTitle = () => {
    if (itemCount === 1) {
      return "Delete User";
    }
    return "Delete Users";
  };

  const getDialogDescription = () => {
    if (itemCount === 1 && selectedUsers.length === 1) {
      return `Are you sure you want to delete "${selectedUsers[0].name}"? This action cannot be undone.`;
    }
    return `Are you sure you want to delete ${itemCount} user${
      itemCount > 1 ? "s" : ""
    }? This action cannot be undone.`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
