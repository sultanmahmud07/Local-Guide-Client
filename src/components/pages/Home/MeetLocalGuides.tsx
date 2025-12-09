import GuideCard from "@/components/module/Guid/GuideCard/GuideCard";
import { Button } from "@/components/ui/button";
import { getFeaturedGuide } from "@/services/public/guide.services";
import { IGuide } from "@/types/user.interface";
import Link from "next/link";


export default async function MeetLocalGuides() {
  const guideData = await getFeaturedGuide()
  return (
    <section className="w-full bg-[#f7f7f7] py-12 md:py-16 md:pb-20">
      <div className="main-container">
        {/* Small top icon */}
        <div className="flex items-center justify-between my-3 pb-2 md:pb-5">
          <h2 className="font-oswald relative font-bold text-3xl md:text-4xl lg:text-5xl">
            Meet your{" "}
            <span className="text-primary">Local Guides</span>
          </h2>
          <Link href="/explore?type=guide" className="">
            <Button className="bg-secondary rounded-none shadow cursor-pointer">
              Explore All Guides
            </Button>
          </Link>
        </div>
        {/* Title */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {guideData?.data.map((guide:IGuide) => (
           <GuideCard key={guide._id} guide={guide}></GuideCard>
          ))}
        </div>
      </div>
    </section>
  );
}
