"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user.interface";
import { userColumns } from "./userColumns";
import UserDetailDialog from "./UserDetailDialog";
import UpdateUserStatusDialog from "./ChangeUserStatusDialog";

interface UserTableProps {
  users: IUser[];
}

export default function UserTable({ users = [] }: UserTableProps) {
  const router = useRouter();
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [updatingUser, setUpdatingUser] = useState<IUser | null>(null);

  const handleView = (user: IUser) => setViewingUser(user);
  const handleEdit = (user: IUser) => setUpdatingUser(user);

  return (
    <>
      <ManagementTable
        data={users}
        columns={userColumns}
        onView={handleView}
        onEdit={handleEdit}
        getRowKey={(user) => user._id}
        emptyMessage="No users found"
      />

      {viewingUser && (
        <UserDetailDialog
          user={viewingUser}
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}

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
    </>
  );
}