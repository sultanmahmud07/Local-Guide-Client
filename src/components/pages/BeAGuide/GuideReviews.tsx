'use client';
import { IReviewForGuide } from '@/types/review.interface'; // Assume interface path
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { renderStars } from '@/components/shared/renderStars';

interface GuideReviewsProps {
    guideInfo: {
        avg_rating: number;
        review_count: number;
        picture?: string;
    };
    reviews: IReviewForGuide[];
}

export default function GuideReviews({ guideInfo, reviews }: GuideReviewsProps) {
    const { avg_rating, review_count } = guideInfo;

    return (
        <div className="space-y-6 pt-5 md:pt-14">
            <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews ({review_count})
            </h2>

            {/* --- A. Aggregated Review Summary Block --- */}
            <Card className="p-6 bg-green-50 border-green-200 shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                    
                    {/* Rating Score */}
                    <div className="text-center shrink-0">
                        <p className="text-5xl font-extrabold text-green-700">
                            {avg_rating.toFixed(1)}
                        </p>
                        <div className="mt-1">{renderStars(avg_rating, 6)}</div> {/* Large Stars */}
                        <p className="text-sm text-gray-600 mt-1">
                            out of 5
                        </p>
                    </div>

                    {/* Stats */}
                    <Separator orientation="vertical" className="hidden md:block h-16" />
                    <Separator orientation="horizontal" className="block md:hidden w-full" />
                    
                    <div className="flex flex-col justify-center space-y-2">
                        <div className="flex items-center text-gray-700">
                            <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                            <span className="font-semibold">{review_count} Total Reviews</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                             {/* You can show a distribution chart here if you had per-star counts */}
                            <Clock className="w-5 h-5 mr-2 text-green-600" />
                            <span className="font-semibold">All reviews verified via booking</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* --- B. Individual Review List --- */}
            <div className="space-y-6 pt-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review._id} className="p-5 shadow-sm border border-gray-100">
                            
                            {/* Reviewer Header */}
                            <div className="flex items-start justify-between pb-3 border-b border-dashed mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                        {/* Fallback to initials if no picture is available */}
                                        <Image 
                                            src={review.user.picture || '/default.png'} 
                                            alt={review.user.name} 
                                            width={40} 
                                            height={40} 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{review.user.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Booked: <span className="font-medium text-green-700">{review.tour.title}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="mb-1">{renderStars(review.rating, 4)}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Review Comment */}
                            <p className="text-gray-700 leading-relaxed italic">
                                {review.comment}
                            </p>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
                        This guide has no reviews yet. Be the first!
                    </div>
                )}
            </div>
        </div>
    );
}

// NOTE: Ensure renderStars utility function is available and imported correctly.