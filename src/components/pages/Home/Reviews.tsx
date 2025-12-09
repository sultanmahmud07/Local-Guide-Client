import { getReviews } from "@/services/patient/reviews.services";
import ReviewsCarousel from "./TourReviewSlider";
import { IReview } from "@/types/review.interface";

const Reviews = async () => {
  const res = await getReviews();
  const reviews: IReview[] = (res?.data || []) as IReview[];

  return (
    <section className="py-12 md:py-20 bg-pink-50/50"> {/* Added subtle background for visual separation */}
      <div className="main-container">
        
        {/* Improved Typography and Contrast */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Travelers <span className="text-primary">Love Our Locals</span>
          </h2>
          <p className="text-lg text-gray-600 mt-2">
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