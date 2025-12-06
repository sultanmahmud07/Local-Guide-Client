import GuideBookingTable from "@/components/module/Guid/Booking/GuidBookingTable";
import { getMyBookings } from "@/services/booking/myBooking.service";
import { IBooking } from "@/types/booking.interface";

export default async function GuideBookings() {
  const response = await getMyBookings();
  const bookings: IBooking[] = response?.data || [];
// console.log("My Booking :::", response.data)
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">My Booking</h1>
      </div>
      <GuideBookingTable bookings={bookings} />
    </div>
  );
}
