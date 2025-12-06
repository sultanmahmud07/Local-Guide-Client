import GuideBookingTable from "@/components/module/Guid/Booking/GuidBookingTable";
import { getMyBookings } from "@/services/booking/myBooking.service";
import { IBooking } from "@/types/booking.interface";

export default async function GuideBookings() {
  const response = await getMyBookings();
  const bookings: IBooking[] = response?.data || [];
// console.log("My Booking :::", response.data)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Booking</h1>
        <p className="text-muted-foreground mt-2">
          Manage your patient bookings and prescriptions
        </p>
      </div>

      <GuideBookingTable bookings={bookings} />
    </div>
  );
}
