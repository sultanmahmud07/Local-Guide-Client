import TouristBookingDetailView from "@/components/module/Dashboard/Tourist/Booking/TouristBookingDetailView";
import { getBookingById } from "@/services/booking/myBooking.service";

export default async function TouristBookingDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    return <div className="py-10 text-center text-red-500">Booking not found</div>;
  }

  console.log(booking)
  return (
    <div className="">
      <TouristBookingDetailView booking={booking} />
    </div>
  );
}
