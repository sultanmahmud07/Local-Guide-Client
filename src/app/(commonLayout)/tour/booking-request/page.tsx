// app/(public)/tour/[slug]/booking-confirm/page.tsx
import BookingFormClient from "@/components/module/Tour/BookingFormClient";
import BookingSummaryClient from "@/components/module/Tour/BookingSummaryClient";
import TopGap from "@/components/shared/TopGap";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTourBySlug } from "@/services/tour/tour.service";
import React from "react";

interface BookingConfirmRequestProps {
  params: { slug: string } | Promise<{ slug: string }>;
  searchParams?: { [key: string]: string | undefined };
}

export default async function BookingConfirmRequest({
  searchParams,
}: BookingConfirmRequestProps) {
  const req = await searchParams;

  if (!req?.slug) {
    return (
      <div>
        <TopGap />
        <div className="max-w-4xl mx-auto p-6">Invalid request parameters</div>
      </div>
    );
  }

  // server fetches tour + user info
  const tour = await getTourBySlug(req?.slug);
  const userInfo = await getUserInfo(); // may be null if not logged in

  if (!tour) {
    return (
      <div>
        <TopGap />
        <div className="max-w-4xl mx-auto p-6">Tour not found</div>
      </div>
    );
  }

  // initial values from query params (optional)
  const initialPeople = req?.people ? Math.max(1, Number(req.people) || 1) : 1;
  const initialDate = req?.date ?? "";
  const initialTime = req?.time ?? "";

  return (
    <div>
      <TopGap />
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-8">
          {/* LEFT: form and booking details (col-span 8) */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">Meeting & booking details</h2>

              <BookingFormClient
                tour={tour}
                userInfo={userInfo}
                initialPeople={initialPeople}
                initialDate={initialDate}
                initialTime={initialTime}
              />
            </div>

            {/* Cancellation policy / other sections (example placeholder) */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Choose your cancellation policy</h3>
              <p className="text-sm text-gray-600">Life happens! Protect yourself by upgrading your cancellation coverage.</p>
              {/* You can render actual policy table here based on tour.cancellationPolicy */}
            </div>
          </div>

          {/* RIGHT: summary (col-span 4) */}
          <div className="w-full md:w-1/3">
            <BookingSummaryClient
             tour={tour}
                userInfo={userInfo}
                initialPeople={initialPeople}
                initialDate={initialDate}
                initialTime={initialTime} />
          </div>
        </div>
      </div>
    </div>
  );
}
