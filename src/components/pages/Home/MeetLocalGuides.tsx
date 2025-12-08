import GuideCard from "@/components/module/Guid/GuideCard/GuideCard";
import { Button } from "@/components/ui/button";
import { getFeaturedGuide } from "@/services/public/guide.services";
import { IGuide } from "@/types/user.interface";
import Image from "next/image";
import Link from "next/link";

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-yellow-400"
    aria-hidden
    fill="currentColor"
  >
    <path d="M12 2l2.9 6.1L22 9.2l-5 4.9L18 21l-6-3.2L6 21l1-6.9-5-4.9 7.1-1.1L12 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-gray-500"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-gray-500"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a12 12 0 0 1 3 9 12 12 0 0 1-3 9 12 12 0 0 1-3-9 12 12 0 0 1 3-9z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-gray-400"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 20s-5.5-3.3-8.2-6A4.8 4.8 0 0 1 12 5.3 4.8 4.8 0 0 1 20.2 14c-2.7 2.7-8.2 6-8.2 6z" />
  </svg>
);

export default async function MeetLocalGuides() {
  const guideData = await getFeaturedGuide()
  console.log(guideData)
  return (
    <section className="w-full bg-[#f7f7f7] py-12 md:py-16 md:pb-20">
      <div className="main-container">
        {/* Small top icon */}
        <div className="flex items-center justify-between my-3 pb-2 md:pb-5">
          <h2 className="font-oswald relative font-bold text-3xl md:text-4xl lg:text-5xl">
            Meet your{" "}
            <span className="text-primary">Local Guides</span>
          </h2>
          <Link href="/guides" className="">
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
