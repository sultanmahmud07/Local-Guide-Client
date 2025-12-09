
import TouristProfileCard from "@/components/pages/TouristProfile/ProfileCard";
import ProfileContent from "@/components/pages/TouristProfile/ProfileContent";
import TouristReviews from "@/components/pages/TouristProfile/TouristReviews";
import TopGap from "@/components/shared/TopGap";
import { getTouristById } from "@/services/public/guide.services";
import { getReviewByTourist } from "@/services/review/reviews.service";

export default async function TouristDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tourist = await getTouristById(id)
    const reviews = await getReviewByTourist(id)

  return (
    <div className="ll">
      <TopGap></TopGap>
      <div className="main-container py-10 ">
        {/* Container for the two-column layout */}
        <div className="flex flex-col md:flex-row md:space-x-12">

          {/* === Left Column (Sidebar/Card) === */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <TouristProfileCard user={tourist} />
          </div>

          {/* === Right Column (Content/Bio) === */}
          <div className="w-full md:w-2/3">
            <ProfileContent guide={tourist} />

                    <TouristReviews reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
