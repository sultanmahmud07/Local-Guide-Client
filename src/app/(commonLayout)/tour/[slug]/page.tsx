import RightBookingCard from "@/components/module/Tour/BookingRequest";
import TourImages from "@/components/module/Tour/TourImages";
import Breadcrumb from "@/components/shared/Breadcrumb";
import TopGap from "@/components/shared/TopGap";
import { getReservedData } from "@/services/booking/myBooking.service";
import { getTourBySlug } from "@/services/tour/tour.service";

export default async function TourDetailPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const reservedDates = await getReservedData(tour.author?._id);

  return (
    <div>
      <TopGap />
      <Breadcrumb />
      <div className="main-container flex">
        <div className="w-2/3">
          <TourImages tour={tour} />
        </div>
        <div className="w-1/3">
          <RightBookingCard tour={tour} reservedDates={reservedDates.data} />
        </div>
      </div>
    </div>
  );
}
