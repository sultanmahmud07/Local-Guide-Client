import { getReviews } from "@/services/patient/reviews.services";
import ReviewsCarousel from "./TourReviewSlider";
import { IReview } from "@/types/review.interface";

const Reviews = async () => {
  const res = await getReviews();
  const reviews: IReview[] = (res?.data || []) as IReview[];

  return (
    <section className="py-8 md:py-16 bg-pink-50/50"> {/* Added subtle background for visual separation */}
      <div className="main-container">

        {/* Improved Typography and Contrast */}
        <div className="space-y-1 text-center mb-6 md:mb-10">
          <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
            Travelers <span className="text-emerald-700">Love Our Locals</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-md mx-auto">
            Authentic reviews from guests about our tours and local hosts.
          </p>
        </div>

        {/* Passing only valid reviews to the carousel */}
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
};

export default Reviews;