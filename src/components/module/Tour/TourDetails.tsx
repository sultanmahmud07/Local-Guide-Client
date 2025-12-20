
import Image from "next/image";
import {
    MapPin,
    Clock,
    Users,
    Globe,
    CheckCircle2,
    XCircle,
    Share2,
    Heart,
} from "lucide-react";

import ImageSlider from "./ImagesSlider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ITourGet } from "@/types/booking.interface";
import Link from "next/link";
import { Star } from "lucide-react";
import TourReviews from "./TourReviews";
import { Suspense } from "react";

const TourDetails = ({ tour }: { tour: ITourGet }) => {
    if (!tour) return null;

    return (
        <div className=" pb-20">

            {/* --- 1. Top Image Slider Section --- */}
            <div className="w-full h-[300px] md:h-[450px] relative bg-gray-100">
                <ImageSlider images={tour.images} />

                {/* Mobile-only Title Overlay (Optional style preference) */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-6 md:hidden">
                    <Badge className="bg-primary text-white mb-2">{tour.category}</Badge>
                    <h1 className="text-2xl font-bold text-white leading-tight">{tour.title}</h1>
                </div>
            </div>
            <div className=" space-y-6 md:p-0 rounded-t-3xl md:rounded-none shadow-sm md:shadow-none">

                {/* Header Info (Desktop) */}
                <div className="hidden md:block space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-primary font-medium bg-green-50 px-3 py-1 rounded-full w-fit">
                            <MapPin className="w-4 h-4" />
                            {tour.destinationCity}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Heart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {tour.title}
                    </h1>

                    {/* <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-lg" />
                            <span className="font-bold text-gray-900">5.0</span>
                            <span className="text-gray-400 underline">(115 reviews)</span>
                        </div>
                        <div>ID: <span className="font-mono">#{tour._id.slice(-6).toUpperCase()}</span></div>
                    </div> */}
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</span>
                        <span className="font-semibold text-gray-800">{tour.durationHours} Hours</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3 h-3" /> Group Size</span>
                        <span className="font-semibold text-gray-800">Max {tour.maxGroupSize} People</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Globe className="w-3 h-3" /> Language</span>
                        <span className="font-semibold text-gray-800">{tour.language}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> Meeting</span>
                        <span className="font-semibold text-gray-800 truncate" title="To be decided">{tour.meetingPoint || "Flexible"}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                    {/* whitespace-pre-line preserves the newlines from your database text */}
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {tour.description}
                    </p>
                </div>

                <Separator />

                {/* Itinerary */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
                    <div className="relative border-l-2 border-primary/20 ml-3 space-y-8 py-2">
                        {tour.itinerary.map((item, idx) => (
                            <div key={idx} className="relative pl-8">
                                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                                <h4 className="font-semibold text-gray-900">Stop {idx + 1}</h4>
                                <p className="text-gray-600">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Inclusions & Exclusions */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" /> What&apos;s Included
                        </h3>
                        <ul className="space-y-2">
                            {tour?.inclusionsAndExclusions?.inclusions.map((inc, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                    {inc}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-red-500" /> Exclusions
                        </h3>
                        <ul className="space-y-2">
                            {tour?.inclusionsAndExclusions?.exclusions.map((exc, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 shrink-0" />
                                    {exc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator />

                {/* Author / Guide Info (Mini) */}
                <Link href={`/view-guide/${tour?.author?._id}`} className="block group">
                    <div className="bg-gray-50 hover:bg-white hover:border-green-200 p-5 rounded-xl flex items-center justify-between gap-4 transition-all duration-300 shadow-sm hover:shadow border-t border-primary">

                        {/* Left Side: Image & Bio */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 shrink-0">
                                <Image
                                    src={tour?.author?.picture || "/default.png"}
                                    alt={tour?.author?.name || "Guide"}
                                    width={100}
                                    height={100}
                                    className="object-cover  w-full h-full rounded-full border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div>
                                <span className="text-[12px] font-bold text-green-600 uppercase tracking-wider mb-1">
                                    Your Local Host
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-800 transition-colors">
                                    {tour?.author?.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Speaks {tour?.author?.bio?.slice(0, 140) || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Big Rating & Count */}
                        <div className="flex flex-col items-end pl-4 border-l border-gray-200">
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-extrabold text-gray-900 leading-none">
                                    {tour?.author?.avg_rating || "0.0"}
                                </span>
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            </div>
                            <p className="text-xs font-medium text-gray-500 mt-1">
                                {tour?.author?.review_count || 0} Reviews
                            </p>
                        </div>

                    </div>
                </Link>
                <Suspense fallback={<p>Review loading...</p>}>
                    <TourReviews tourId={tour._id}></TourReviews>
                </Suspense>
            </div>
        </div>
    );
};

export default TourDetails;