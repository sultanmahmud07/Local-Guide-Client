
import ProfileCard from "@/components/pages/GuideProfile/ProfileCard";
import ProfileContent from "@/components/pages/GuideProfile/ProfileContent";
import TopGap from "@/components/shared/TopGap";
import { getGuidProfileWithTour } from "@/services/public/guide.services";
import { getReviewByGuid } from "@/services/review/reviews.service";
export default async function TouristDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tourist = await getGuidProfileWithTour(id)
  const reviews = await getReviewByGuid(id)

  // console.log("Review data", reviews)
  return (
    <div className="ll">
      <TopGap></TopGap>
      <div className="main-container py-10 ">
        {/* Container for the two-column layout */}
        <div className="flex flex-col md:flex-row md:space-x-12">

          {/* === Left Column (Sidebar/Card) === */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <ProfileCard guide={tourist} />
          </div>

          {/* === Right Column (Content/Bio) === */}
          <div className="w-full md:w-2/3">
            <ProfileContent guide={tourist} />
          </div>
        </div>
        {/* <GuideReviews tourist={tourist} reviews={reviews} /> */}
      </div>
    </div>
  );
}
