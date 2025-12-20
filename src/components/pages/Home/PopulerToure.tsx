
import TourCard from "@/components/module/Tour/TourCard";
import { Button } from "@/components/ui/button";
import { getTours } from "@/services/tour/tour.service";
import { ITourGet } from "@/types/booking.interface";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function PopularTour() {
  const tourData = await getTours("limit=4");
  return (
    <section className="w-full bg-[#f7f7f7] py-6 md:py-16">
      <div className="main-container">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-4">

          {/* Left: Heading & Subtitle */}
          <div className="space-y-1">
            <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
              Popular <span className="text-emerald-700">Tours</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium max-w-md">
              Curated experiences loved by travelers worldwide.
            </p>
          </div>

          {/* Right: Action Button */}
          <Link href="/explore?type=tour" className="hidden md:block">
            <Button
              className="group cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white rounded-none px-8 py-6 text-sm font-semibold shadow-md transition-all duration-300"
            >
              Explore All Tours
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {tourData?.data?.map((tour: ITourGet) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
           {/* Right: Action Button */}
          <Link href="/explore?type=tour" className="md:hidden">
            <Button
              className="group cursor-pointer bg-emerald-700 hover:bg-emerald-800 w-full mt-4 text-white rounded-none px-8 py-4 text-xs font-semibold shadow-md transition-all duration-300"
            >
              Explore All Tours
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
      </div>
    </section>
  );
}
