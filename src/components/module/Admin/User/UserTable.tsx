"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user.interface";
import { userColumns } from "./userColumns";
import UserDetailDialog from "./UserDetailDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateUserStatusDialog from "./ChangeUserStatusDialog";
import { DeleteUser } from "@/services/user/userManagment.services";

interface UserTableProps {
  users: IUser[];
}

export default function UserTable({ users = [] }: UserTableProps) {
  const router = useRouter();
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [updatingUser, setUpdatingUser] = useState<IUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null); // State for delete dialog

  const handleView = (user: IUser) => setViewingUser(user);
  const handleEdit = (user: IUser) => setUpdatingUser(user);
  
  // Open delete confirmation
  const onDeleteClick = (user: IUser) => {
    if (user.role === "SUPER_ADMIN") {
        toast.error("Super Admins cannot be deleted.");
        return;
    }
    setDeletingUser(user);
  };

  // Confirm Delete Action
  const confirmDelete = async () => {
    if (!deletingUser) return;

    try {
      const res = await DeleteUser(deletingUser._id);
      
      if (res?.success) {
        toast.success("User deleted successfully");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting");
    } finally {
      setDeletingUser(null);
    }
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={userColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={onDeleteClick} // Pass the delete handler to your table
        getRowKey={(user) => user._id}
        emptyMessage="No users found"
      />

      {/* View Dialog */}
      {viewingUser && (
        <UserDetailDialog
          user={viewingUser}
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}

      {/* Update Dialog */}
      {updatingUser && (
        <UpdateUserStatusDialog
          user={updatingUser}
          isOpen={!!updatingUser}
          onClose={() => {
            setUpdatingUser(null);
            router.refresh();
          }}
        />
      )}

      {/* Delete Confirmation Alert */}
      <AlertDialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              <span className="font-bold text-gray-900 mx-1">
                {deletingUser?.name}
              </span>
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
                onClick={confirmDelete} 
                className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}