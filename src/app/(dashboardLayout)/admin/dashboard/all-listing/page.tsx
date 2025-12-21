import AdminAllListingTable from "@/components/module/Admin/Listing/AllListingTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllListing } from "@/services/admin/listManagement";
import { Suspense } from "react";

interface AdminAllListManagementPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

const AdminAllListManagementPage = async ({
  searchParams,
}: AdminAllListManagementPageProps) => {
  const params = await searchParams;

  const queryString = queryStringFormatter(params);
  const listingResponse = await getAllListing(queryString);

  const listingTours = listingResponse?.data || [];
  const meta = listingResponse?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">All Listings</h2>
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <AdminAllListingTable listingTours={listingTours} />
        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminAllListManagementPage;
