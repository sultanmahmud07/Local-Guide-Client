import MyListingHeader from "@/components/module/Guid/GuideListing/MyListingHeader";
import MyListingTable from "@/components/module/Guid/GuideListing/MyListingTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getGuideListing } from "@/services/guide/guideListing.services";
import { Suspense } from "react";

interface GuideMyListingPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

const GuideMyListingPage = async ({
  searchParams,
}: GuideMyListingPageProps) => {
  const params = await searchParams;

  const queryString = queryStringFormatter(params);
  const listingResponse = await getGuideListing(queryString);

  const listingTours = listingResponse?.data || [];
  const meta = listingResponse?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));

  return (
    <div className="space-y-4">
      <MyListingHeader
      />
      {/* <MyListingFilters /> */}
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <MyListingTable listingTours={listingTours} />
        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default GuideMyListingPage;
