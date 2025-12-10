"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, ShieldCheck, User } from "lucide-react";

type ITourSimple = {
  _id: string;
  title: string;
  fee?: number;
  thumbnail?: string | null;
  images?: string[];
  author?: { _id?: string; name?: string; avatar?: string };
  durationHours?: number;
  maxGroupSize?: number;
  destinationCity?: string;
};

export default function BookingSummaryClient({
  tour,
  userInfo,
  initialPeople = 1,
  initialDate = "Date not selected",
  initialTime = "Time not selected",
}: {
  tour: ITourSimple;
  userInfo?: IUser | null;
  initialPeople?: number;
  initialDate?: string;
  initialTime?: string;
}) {
  const router = useRouter();

  // --- 1. Logic Fix: Use initialPeople for calculation ---
  const fee = typeof tour.fee === "number" ? tour.fee : Number(tour.fee ?? 0);
  const subTotal = fee * initialPeople; 
  const serviceFee = subTotal * 0.07; // 7% Service Fee
  const total = subTotal + serviceFee;

  // Image Fallback Logic
  const thumbnail = tour.thumbnail 
    ?? (Array.isArray(tour.images) && tour.images.length ? tour.images[0] : "/images/placeholder.jpg");

  return (
    <aside className="sticky top-28 w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* --- Header: Tour Info --- */}
        <div className="p-6 pb-4">
            <h3 className="text-lg font-extrabold text-gray-900 mb-4">Booking Summary</h3>
            <div className="flex gap-4 items-start">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <Image 
                        src={thumbnail} 
                        alt={tour.title} 
                        fill 
                        className="object-cover" 
                    />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">
                        {tour.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 bg-gray-50 w-fit px-2 py-1 rounded-full">
                        <User className="w-3 h-3 text-emerald-600" />
                        <span className="truncate max-w-[120px]">
                            {tour.author?.name || "Local Guide"}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-6">
            <div className="h-px w-full bg-gray-100 my-2"></div>
        </div>

        {/* --- Booking Details --- */}
        <div className="p-6 py-4 space-y-4">
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Guests</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{initialPeople} Person{initialPeople > 1 ? 's' : ''}</span>
            </div>

            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Date</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{initialDate}</span>
            </div>

            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Time</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{initialTime}</span>
            </div>
        </div>

        {/* --- Price Breakdown Section --- */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${fee.toFixed(2)} x {initialPeople} guests</span>
                    <span className="font-medium text-gray-900">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        Service fee 
                        <ShieldCheck className="w-3 h-3 text-gray-400" />
                    </span>
                    <span className="font-medium text-gray-900">${serviceFee.toFixed(2)}</span>
                </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <div className="text-right">
                    <span className="font-extrabold text-xl text-emerald-700 block">
                        ${total.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase font-medium tracking-wide">USD</span>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
                <Button 
                    className="w-full bg-secondary hover:bg-emerald-800 text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-emerald-100 transition-all hover:scale-[1.02]" 
                    onClick={() => router.push(`/message/${userInfo?._id}`)}
                >
                    Message To Guide
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                    You won&apos;t be charged yet
                </p>
            </div>
        </div>
      </div>
    </aside>
  );
}