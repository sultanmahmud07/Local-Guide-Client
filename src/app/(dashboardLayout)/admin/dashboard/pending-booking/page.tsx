import GuideBookingTable from "@/components/module/Guid/Booking/GuidBookingTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyBookings } from "@/services/booking/myBooking.service";
import { IBooking } from "@/types/booking.interface";
import { Suspense } from "react";
interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}
export default async function PendingBookings({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const queryString = queryStringFormatter({...params, status: "PENDING"});
  const response = await getMyBookings(queryString);
  const bookings: IBooking[] = response?.data || [];
  // console.log("My Booking :::", response.data)
  const meta = response?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));

  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">Pending Management</h1>
      </div>
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <GuideBookingTable bookings={bookings} />
        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
