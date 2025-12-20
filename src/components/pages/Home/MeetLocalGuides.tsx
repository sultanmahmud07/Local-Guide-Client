import GuideCard from "@/components/module/Guid/GuideCard/GuideCard";
import { Button } from "@/components/ui/button";
import { getFeaturedGuide } from "@/services/public/guide.services";
import { IGuide } from "@/types/user.interface";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default async function MeetLocalGuides() {
  const guideData = await getFeaturedGuide("limit=4");
  return (
    <section className="w-full bg-[#f7f7f7] py-7 md:py-16">
      <div className="main-container">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-3 ">

          {/* Left: Heading & Subtitle */}
          <div className="space-y-1">
            <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
              Meet <span className="text-emerald-700">Your Guide</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium max-w-md">
              Connect with passionate locals ready to show you their world.
            </p>
          </div>

          {/* Right: Action Button */}
          <Link href="/explore?type=guide" className="hidden md:block">
            <Button
              className="group bg-emerald-700 hover:bg-emerald-800 text-white rounded-none px-8 py-6 text-sm font-semibold shadow-md transition-all duration-300"
            >
              Explore All Guides
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

        </div>
        {/* Title */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {guideData?.data.map((guide: IGuide) => (
            <GuideCard key={guide._id} guide={guide}></GuideCard>
          ))}
        </div>
        {/* Right: Action Button */}
          <Link href="/explore?type=guide" className=" md:hidden ">
            <Button
              className="group bg-emerald-700 hover:bg-emerald-800 mt-4 w-full text-white rounded-none px-8 py-6 text-sm font-semibold shadow-md transition-all duration-300"
            >
              Explore All Guides
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
      </div>
    </section>
  );
}
