import TourCard from "@/components/module/Tour/TourCard";
import ProfileCard from "@/components/pages/GuideProfile/ProfileCard";
import ProfileContent from "@/components/pages/GuideProfile/ProfileContent";
import TopGap from "@/components/shared/TopGap";
import { getGuidProfileWithTour } from "@/services/public/guide.services";
import { ITourGet } from "@/types/booking.interface";

export default async function GuidDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const guideInfo = await getGuidProfileWithTour(id)

  console.log(guideInfo)
  return (
    <div className="ll">
      <TopGap></TopGap>
      <div className="main-container py-10 px-4 md:px-6 lg:px-8 ">
        {/* Container for the two-column layout */}
        <div className="flex flex-col md:flex-row md:space-x-12">

          {/* === Left Column (Sidebar/Card) === */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <ProfileCard guide={guideInfo} />
          </div>

          {/* === Right Column (Content/Bio) === */}
          <div className="w-full md:w-2/3">
            <ProfileContent guide={guideInfo} />
           <div className="show-profile-tour">
            <h3 className="text-xl md:text-2xl uppercase my-3 py-5">Listed Tours</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 lg:gap-8">
              {guideInfo?.tours.map((tour: ITourGet) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
