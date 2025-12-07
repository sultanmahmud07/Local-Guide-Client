
import TourCard from "@/components/module/Tour/TourCard";
import { Button } from "@/components/ui/button";
import { getTours } from "@/services/tour/tour.service";
import { ITourGet } from "@/types/booking.interface";
import Link from "next/link";

export default async function PopularTour() {
  const tourData = await getTours();
  // console.log(tourData)
  return (
    <section className="w-full bg-[#f7f7f7] py-12 md:py-16 lg:py-20">
      <div className="main-container">
        {/* top */}
        <div className="flex items-center justify-between my-3 pb-2 md:pb-5">
          <h2 className="font-oswald relative font-bold text-3xl md:text-4xl lg:text-5xl">
            Popular <span className="text-emerald-700">tours</span>
          </h2>

          <Link href="/guides" className="">
            <Button className="bg-emerald-700 text-white rounded-none shadow cursor-pointer">
              Explore All Guides
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {tourData?.data?.map((tour:ITourGet) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
