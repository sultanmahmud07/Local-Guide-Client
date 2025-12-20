import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaStar, FaRegClock, FaUserFriends, FaCar } from "react-icons/fa";
import { Button } from "../../ui/button";
import { ITourGet } from "@/types/booking.interface";
import { MapPinCheckInside } from "lucide-react";

// Helper function to render stars based on the average rating
const renderRatingStars = (avgRating: number) => {
    const fullStars = Math.floor(avgRating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
        const isFilled = i < fullStars;
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const author = tour.author as any;
    const guideAvatar = author?.picture ?? "/default.png";
    const guideName = author?.name ?? "Unknown Guide";
    const avgRating = author?.avg_rating ?? 0;
    const reviewCount = author?.review_count ?? 0;

    return (
        <article className="group bg-white rounded-xl shadow-md overflow-hidden border border-transparent hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
            {/* Image Section (Not Linked, just Visual) */}
            <div className="relative overflow-hidden h-44 md:h-56">
                <Image
                    src={thumbnail}
                    alt={tour.title}
                    width={800}
                    height={520}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                {/* Meta strip */}
                <div className="absolute left-0 right-0 bottom-0 bg-white/95 backdrop-blur-md px-3 py-2 text-xs flex items-center justify-between text-gray-600 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><FaCar className="text-sm text-gray-400" /> |</span>

                        <span className="flex items-center gap-1">
                            <FaRegClock className="text-sm text-gray-400" />
                            {tour.durationHours ? `${tour.durationHours}h` : "N/A"} |
                        </span>

                        <span className="flex items-center gap-1">
                            <FaUserFriends className="text-sm text-gray-400" /> up to {tour.maxGroupSize ?? 1} people
                        </span>
                    </div>

                    <button className="p-1.5 rounded-full border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 transition-colors duration-200 group/heart cursor-pointer">
                        <FaRegHeart className="text-gray-500 group-hover/heart:text-red-500 transition-colors" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                {/* Guide row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm group-hover:border-primary/20 transition-colors">
                            <Image
                                src={guideAvatar}
                                alt={guideName}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-800">{guideName}</div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center text-sm">
                                    {renderRatingStars(avgRating)}
                                </div>
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

                {/* 1. Title Link */}
                <h3 className="mt-3 font-semibold text-base md:text-lg leading-snug">
                    <Link 
                        href={`/tour/${tour.slug}`} 
                        className="text-gray-900 transition-colors duration-300 hover:text-primary hover:underline"
                    >
                        {tour.title}
                    </Link>
                </h3>

                <p className="mt-2 text-sm text-gray-500 min-h-12 line-clamp-2">
                    {tour.description ?? ""}
                </p>

                <div className="text-xs flex items-center gap-1 text-secondary font-medium mt-2">
                    <span className="text-primary text-xs"> <MapPinCheckInside size={16} /></span>
                    {tour.destinationCity ?? "Unknown"}
                </div>

                {/* Price & Action */}
                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <div className="text-lg font-bold text-gray-900">
                            ${tour.fee?.toLocaleString() ?? 0}
                            <span className="text-sm font-normal text-gray-500"> USD</span>
                        </div>

                        <div className="text-xs text-gray-400">
                            Includes all fees
                        </div>
                    </div>

                    {/* 2. Button Link */}
                    <Link href={`/tour/${tour.slug}`}>
                        <Button className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded shadow-sm hover:shadow-lg hover:bg-secondary active:scale-95 transition-all duration-200 text-sm font-medium cursor-pointer">
                            View
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
}