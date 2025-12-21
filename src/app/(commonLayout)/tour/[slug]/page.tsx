import RightBookingCard from "@/components/module/Tour/BookingRequest";
import TourDetails from "@/components/module/Tour/TourDetails";
import Breadcrumb from "@/components/shared/Breadcrumb";
import TopGap from "@/components/shared/TopGap";
import { getReservedData } from "@/services/booking/myBooking.service";
import { getTourBySlug, getTours } from "@/services/tour/tour.service";
import { ITour } from "@/types/booking.interface";

export const generateStaticParams = async () => {
  const tours = await getTours("limit=100");
  return tours.data.map((tour: ITour) => ({
    slug: String(tour.slug),
  }));
};
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  return {
    title: tour?.title,
    description: tour?.description,
  };
};


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
      <Breadcrumb title={tour.title} />
      <div className="main-container flex gap-5 relative">
        <div className="w-full md:w-2/3 pb-24 md:pb-0"> {/* Add padding-bottom for mobile to prevent overlap with fixed footer */}
          <TourDetails tour={tour} />
        </div>
        
        {/* Desktop Sidebar (Hidden on Mobile) */}
        <div className="w-full md:w-1/3 hidden md:block">
          <RightBookingCard tour={tour} reservedDates={reservedDates.data} />
        </div>
      </div>

      {/* Mobile Bottom Bar Instance (Hidden on Desktop) */}
      <div className="md:hidden">
        <RightBookingCard tour={tour} reservedDates={reservedDates.data} isMobileView={true} />
      </div>
    </div>
  );
}