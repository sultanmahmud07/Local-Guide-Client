// app/dashboard/guide/bookings/upcoming/page.tsx

import GuideBookingTable from "@/components/module/Guid/Booking/GuidBookingTable";
import { getMyBookings } from "@/services/booking/myBooking.service";
import { IBooking } from "@/types/booking.interface";

/**
 * Helper to convert an object to a URLSearchParams string (e.g., {status: "PENDING"} -> "status=PENDING")
 */
function buildQueryString(params: Record<string, string>): string {
    const urlParams = new URLSearchParams(params);
    return urlParams.toString();
}

export default async function RequestBookingsForGuide() {
  const queryParams = { status: "PENDING" };
  
  // 🎯 FIX: Convert the object to a URL-encoded string
  const queryString = buildQueryString(queryParams); 
  
  const response = await getMyBookings(queryString);
  const bookings: IBooking[] = response?.data || [];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upcoming Bookings</h1>
        {/* <p className="text-gray-600">Showing tours with status: <span className="font-semibold text-green-700">PENDING</span></p> */}
      </div>
      <GuideBookingTable bookings={bookings} />
    </div>
  );
}