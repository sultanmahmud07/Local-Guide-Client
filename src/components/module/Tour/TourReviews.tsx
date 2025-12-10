import { getReviewByTourId } from '@/services/review/reviews.service';
import Image from "next/image";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { renderStars } from '@/components/shared/renderStars';

// Define the interface based on your data
interface IReview {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        _id: string;
        name: string;
        picture?: string;
    };
    guide?: {
        name: string;
    }
}

const TourReviews = async ({ tourId }: { tourId: string }) => {
    // 1. Fetch Data
    const res = await getReviewByTourId(tourId);
    const reviews: IReview[] = res || []; // Adjust based on your actual API response structure

    // 2. Calculate Stats
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
        : "0.0";

    // Calculate distribution (e.g., how many 5 stars, 4 stars...)
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
    reviews.forEach((r) => {
        const rounded = Math.round(r.rating);
        if (rounded >= 1 && rounded <= 5) counts[rounded]++;
    });

    if (totalReviews === 0) {
        return (
            <div className="py-10 text-center border-t border-gray-100 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Guest Reviews</h3>
                <div className="p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-10 border-t border-gray-100 mt-8 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Guest Reviews</h3>

            {/* --- A. Summary Section (Grid Layout) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
                
                {/* 1. Big Score */}
                <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold text-gray-900">{averageRating}</span>
                        <span className="text-gray-500 font-medium">/ 5</span>
                    </div>
                    {renderStars(Number(averageRating), 5)}
                    <p className="text-sm text-gray-500 mt-1">Based on {totalReviews} reviews</p>
                </div>

                {/* 2. Rating Distribution Bars */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = counts[star];
                        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center gap-3 text-sm">
                                <span className="w-3 font-semibold text-gray-700">{star}</span>
                                <StarIcon className="w-4 h-4 text-gray-400" />
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-green-500 rounded-full transition-all duration-500" 
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-8 text-right text-gray-500">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- B. Review List --- */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <Card key={review._id} className="p-6 border-none shadow-sm bg-white ring-1 ring-gray-100">
                        <div className="flex items-start gap-4">
                            
                            {/* User Avatar */}
                            <div className="shrink-0 relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                    <Image
                                        src={review.user.picture || "/default-avatar.png"}
                                        alt={review.user.name}
                                        width={48}
                                        height={48}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{review.user.name}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {renderStars(review.rating, 3)}
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">
                                                {format(new Date(review.createdAt), "MMMM d, yyyy")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-3">
                                    <MessageCircle className="absolute -left-1 -top-1 w-4 h-4 text-gray-100 -z-10 scale-150 opacity-50" />
                                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// Simple Star Icon component for the distribution bars if lucide is imported differently
const StarIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export default TourReviews;