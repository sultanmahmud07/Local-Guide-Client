/* eslint-disable @typescript-eslint/no-explicit-any */
// components/module/TourReviewSlider.tsx
'use client';

import React, { useState } from 'react'; // Added useState
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IReview } from '@/types/review.interface';

// --- INTERFACE DEFINITION ---
interface TourReviewSliderProps {
    reviews: IReview[];
    interval?: number;
    cardsPerView?: number;
}

// --- NEW COMPONENT: Comment with Read More Logic ---
const ReviewComment = ({ comment }: { comment: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongComment = comment && comment.length > 150; // Threshold for showing button

    return (
        <div className="">
            <p className={`text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>
                {comment}
            </p>
            {isLongComment && (
                <button 
                    onClick={(e) => {
                        e.preventDefault(); // Prevent clicking the parent Link
                        e.stopPropagation(); // Stop event bubbling
                        setIsExpanded(!isExpanded);
                    }}
                    className="text-emerald-700 text-xs font-bold mt-2 hover:underline uppercase tracking-wide focus:outline-none"
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

// --- HELPER: Render Stars ---
const renderStars = (rating: number) => {
    const stars = [];
    const actualRating = Math.min(5, Math.max(0, rating));

    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= actualRating;
        stars.push(
            <Star
                key={i}
                className={`w-4 h-4 ${isFilled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-100'}`}
            />
        );
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
};

// --- ARROWS ---
const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg hover:shadow-xl z-10 opacity-90 hover:opacity-100 transition border"
            onClick={onClick}
            aria-label="Next Review"
        >
            <ChevronRight className="w-5 h-5" />
        </Button>
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg hover:shadow-xl z-10 opacity-90 hover:opacity-100 transition border"
            onClick={onClick}
            aria-label="Previous Review"
        >
            <ChevronLeft className="w-5 h-5" />
        </Button>
    );
};

// --- MAIN SLIDER COMPONENT ---
export default function TourReviewSlider({ reviews, interval = 5000, cardsPerView = 3 }: TourReviewSliderProps) {

    const validReviews = reviews.filter(r =>
        r.comment && r.comment.length > 10 && r.user && r.guide && r.tour
    );
    const totalReviews = validReviews.length;
    const slidesToShow = Math.min(cardsPerView, totalReviews || 1);

    const settings = {
        dots: false,
        infinite: totalReviews > slidesToShow,
        autoplay: totalReviews > slidesToShow,
        autoplaySpeed: interval,
        speed: 800,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        pauseOnHover: true,
        arrows: totalReviews > slidesToShow,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: Math.min(2, totalReviews), arrows: totalReviews > 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: Math.min(1.5, totalReviews), arrows: totalReviews > 1 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, arrows: totalReviews > 1 },
            },
        ],
    };

    if (totalReviews === 0) {
        return (
            <div className="main-container text-center py-8 text-gray-500 border border-dashed rounded-lg">
                No traveler reviews are available yet.
            </div>
        );
    }

    return (
        <div className="relative pb-4">
            <Slider {...settings}>
                {validReviews.map((review) => (
                    <div
                        key={review?._id}
                        className="p-3 block h-full"
                    >
                        <Card className="h-full p-6 flex flex-col justify-between border-2 border-rose-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-300">

                            {/* Top: Rating and Comment */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    {renderStars(review?.rating)}
                                    <p className="text-xs text-gray-500">
                                        {format(new Date(review?.createdAt), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                                
                                <Link href={`/tour/${review?.tour?._id}`}>
                                    <p className="text-lg hover:text-secondary hover:underline font-semibold text-gray-800 line-clamp-2 mb-3">
                                        {review?.tour?.title}
                                    </p>
                                </Link>

                                {/* ✅ REPLACED OLD COMMENT WITH NEW COMPONENT */}
                                <ReviewComment comment={review?.comment} />
                            </div>

                            {/* Bottom: Reviewer and Guide Info */}
                            <div className="mt-auto pt-4 border-t border-dashed border-gray-200">
                                <div className="flex items-center justify-between">
                                    
                                    {/* Reviewer */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                            <Image
                                                src={review?.user?.picture || '/images/avatar-placeholder.png'}
                                                alt={review?.user?.name || "Reviewer"}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <Link href={`/profile/${review?.user?._id}`}>
                                            <div>
                                                <p className="text-sm font-bold text-primary">{review?.user?.name}</p>
                                                <p className="text-xs text-gray-500">Traveler</p>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Guide */}
                                    <Link href={`/view-guide/${review?.guide?._id}`}>
                                        <div className="flex flex-col items-end">
                                            <p className="text-xs text-gray-500">Local Host</p>
                                            <p className="text-sm font-semibold text-secondary hover:text-primary">{review?.guide?.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
}