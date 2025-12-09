'use client';
import { Card } from '@/components/ui/card';
import { MapPin, DollarSign, ArrowRight } from 'lucide-react'; // Added ArrowRight for the card link
import { format } from 'date-fns';
import Image from 'next/image';
import { renderStars } from '@/components/shared/renderStars';
import Link from 'next/link';
import { IReviewForTourist } from '@/types/review.interface';

interface TouristReviewsProps {
   
    reviews: IReviewForTourist[];
}

export default function TouristReviews({ reviews }: TouristReviewsProps) {
    const totalReviewsWritten = reviews.length;

    return (
        <div className="space-y-6 pt-5 md:pt-8">
            <h2 className="text-2xl font-bold text-gray-900">
                Reviews Written ({totalReviewsWritten})
            </h2>

            {/* --- B. Individual Review List (Now showing reviews written by the tourist) --- */}
            <div className="space-y-6 pt-2">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review._id} className="p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            
                            {/* Review Header: Now displays the GUIDE who hosted the tour */}
                            <div className="flex items-start justify-between pb-3 border-b border-dashed mb-3">
                                
                                {/* Host/Guide Details */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border-2 border-green-200">
                                        <Image 
                                            src={review?.guide?.picture || '/default-guide-avatar.png'} 
                                            alt={review.guide.name} 
                                            width={40} 
                                            height={40} 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Review left for: <span className="text-green-600">{review.guide.name}</span></p>
                                        
                                        {/* Tour Title is now inside the clickable info card below */}
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Reviewed on: <span className="font-medium text-gray-700">{format(new Date(review.createdAt), 'MMM dd, yyyy')}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Rating */}
                                <div className="text-right flex flex-col items-end">
                                    <div className="mb-1">{renderStars(review.rating, 4)}</div>
                                </div>
                            </div>
                            
                            {/* Review Comment */}
                            <p className="text-gray-700 leading-relaxed">
                                <span className="font-semibold text-gray-900 mr-1">Comment:</span> {review.comment}
                            </p>
                            
                            {/* 🎯 NEW: Tour Info Card with Link */}
                            <Link href={`/tour/${review.tour.slug}`} passHref>
                                <Card className='mt-4 p-3 bg-green-50/50 border border-green-200 hover:border-green-400 transition cursor-pointer'>
                                    <div className="flex items-center justify-between">
                                        
                                        {/* Left: Details */}
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-green-700">
                                                {review.tour.title}
                                            </p>
                                            <div className='flex items-center gap-4 text-xs text-gray-600'>
                                                <span className='flex items-center gap-1'>
                                                    <MapPin className='w-3 h-3 text-green-500' />
                                                    {review.tour.description?.substring(0, 30)}...
                                                </span>
                                                <span className='flex items-center gap-1'>
                                                    <DollarSign className='w-3 h-3 text-green-500' />
                                                    Price: ${review.tour.fee}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Right: Icon */}
                                        <ArrowRight className='w-4 h-4 text-green-600 shrink-0' />
                                    </div>
                                </Card>
                            </Link>

                        </Card>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
                        This traveler has not written any reviews yet.
                    </div>
                )}
            </div>
        </div>
    );
}