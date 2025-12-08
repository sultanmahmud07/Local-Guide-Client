// components/module/TourCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar, FaRegClock, FaUserFriends, FaCar } from "react-icons/fa";
import { Button } from "../../ui/button";
import { ITourGet } from "@/types/booking.interface";

// Helper function to render stars based on the average rating
const renderRatingStars = (avgRating: number) => {
    const fullStars = Math.floor(avgRating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
        // Determine if the star should be filled
        const isFilled = i < fullStars;
        
        // Use a consistent size and color scheme
        stars.push(
            <FaStar 
                key={i} 
                className={`w-3 h-3 inline-block ${isFilled ? "text-yellow-400" : "text-gray-300"}`} 
            />
        );
    }
    return stars;
};


export default function TourCard({ tour }: { tour: ITourGet }) {
  const thumbnail =
    tour.thumbnail ||
    (Array.isArray(tour.images) && tour.images.length > 0 ? tour.images[0] : "/default.png");

  // Access the author object (which includes aggregated stats)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const author = tour.author as any; 
  console.log(tour)
  // Use optional chaining for safety when accessing aggregated fields
  const guideAvatar = author?.picture ?? "/default.png";
  const guideName = author?.name ?? "Unknown Guide";
  const avgRating = author?.avg_rating ?? 0;
  const reviewCount = author?.review_count ?? 0;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-transparent hover:shadow-xl transition">
      {/* image */}
      <div className="relative">
        <Image
          src={thumbnail}
          alt={tour.title}
          width={800}
          height={520}
          className="w-full h-44 md:h-56 object-cover"
        />

        {/* meta strip */}
        <div className="absolute left-0 right-0 bottom-0 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FaCar className="text-sm" /> |</span>

            <span className="flex items-center gap-1">
              <FaRegClock className="text-sm" />
              {tour.durationHours ? `${tour.durationHours}h` : "N/A"} |
            </span>

            <span className="flex items-center gap-1">
              <FaUserFriends className="text-sm" /> up to {tour.maxGroupSize ?? 1} people
            </span>
          </div>

          <button className="p-1 rounded-full border border-gray-200 bg-white">
            <FaRegHeart className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* body */}
      <div className="p-4">
        {/* guide row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              {/* Use guideAvatar which is sourced from author.picture */}
              <Image src={guideAvatar} alt={guideName} width={48} height={48} className="object-cover w-full h-full" /> 
            </div>

            <div>
              <div className="text-sm font-semibold">{guideName}</div>

              {/* rating row (UPDATED) */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm">
                  {/* Use the new helper to render dynamic stars */}
                  {renderRatingStars(avgRating)}
                </div>
                {/* Display the calculated average rating and count */}
                <span className="text-xs font-semibold text-gray-800">
                    {avgRating.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">
                    ({reviewCount})
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* title & description */}
        <h3 className="mt-3 font-semibold text-base md:text-lg leading-snug">
          <Link href={`/tour/${tour._id}`} className="hover:underline">
            {tour.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-gray-500 min-h-12">
          {tour.description?.slice(0, 80) ?? ""}
        </p>

          <div className="text-xs text-gray-400">
            {tour.destinationCity ?? "Unknown"}
          </div>
        {/* price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-lg font-bold">
              ${tour.fee?.toLocaleString() ?? 0}
              <span className="text-sm font-normal text-gray-500"> USD</span>
            </div>

            <div className="text-xs text-gray-400">
              Includes all fees
            </div>
          </div>

          <Link href={`/tour/${tour.slug}`}>
            <Button className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-md text-sm font-medium hover:bg-emerald-800">
              View
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}