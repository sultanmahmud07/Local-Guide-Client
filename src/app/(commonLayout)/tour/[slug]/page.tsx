import RightBookingCard from "@/components/module/Tour/BookingRequest";
import TourImages from "@/components/module/Tour/TourImages";
import Breadcrumb from "@/components/shared/Breadcrumb";
import TopGap from "@/components/shared/TopGap";

export default function TourDetailPage() {
  return (
    <div>
      <TopGap />
      <Breadcrumb />
      <div className="main-container flex">
        <div className="w-2/3">
         <TourImages />
        </div>
        <div className="w-1/3">
          <RightBookingCard />
        </div>
      </div>
    </div>
  );
}
