
import UserTable from "@/components/module/Admin/User/UserTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/user/userManagment.services";
import { IUser } from "@/types/user.interface";
import { Suspense } from "react";
interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}
export default async function UserManagementPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const queryString = queryStringFormatter(params);
  const response = await getAllUsers(queryString);
  const users: IUser[] = response?.data || [];
  // console.log("My Booking :::", response.data)
  const meta = response?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">Users Management</h1>
      </div>
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <UserTable users={users} />
        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
