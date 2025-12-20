/* eslint-disable @typescript-eslint/no-unused-vars */
// components/booking/BookingFormClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createBooking } from "@/services/booking/myBooking.service";
import { toast } from "sonner";

type IUser = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
};

type ITourSimple = {
  _id: string;
  title: string;
  fee?: number;
  maxGroupSize?: number;
  startTime?: string[]; // available start times
  destinationCity?: string;
  author?: { _id?: string; name?: string };
  cancellationPolicy?: string[]; // optional
};

export default function BookingFormClient({
  tour,
  userInfo,
  initialPeople = 1,
  initialDate = "",
  initialTime = "",
}: {
  tour: ITourSimple;
  userInfo?: IUser | null;
  initialPeople?: number;
  initialDate?: string;
  initialTime?: string;
}) {
  const router = useRouter();

  const [meetingOption, setMeetingOption] = useState<"guide" | "later" | "place">("guide");
  const [meetingPlace, setMeetingPlace] = useState<string>(tour.destinationCity ?? "");
  const [phone, setPhone] = useState<string>(userInfo?.phone ?? "");
  const [address, setAddress] = useState<string>(userInfo?.address ?? "");
  const [people, setPeople] = useState<number>(Math.min(initialPeople, tour.maxGroupSize ?? 10));
  const [date, setDate] = useState<string>(initialDate);
  const [time, setTime] = useState<string>(initialTime);
  const [notes, setNotes] = useState<string>("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhone(userInfo?.phone ?? "");
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!phone) {
      toast.error("Phone number required");
      return;
    }
    if (!phone) {
      toast.error("Phone number required");
      return;
    }
    if (!date) {
      toast.error("Select a date");
      return;
    }
    if (!time) {
      toast.error("Select a time");
      return;
    }

    const payload = {
      tour: String(tour._id),
      guide: tour.author?._id || "",
      date,
      time,
      groupSize: people,
      meetingPlace: meetingOption === "place" ? meetingPlace : undefined,
      phone,
      address,
      notes,
    };
    const result = await createBooking(payload);

    if (result.success) {
      toast.success("Booking request successfully!");
      router.push("/dashboard/my-booking");
    } else {
      toast.error(result.message || "Failed to create tour");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Meeting location radios */}
      <div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <label className={`px-3 py-2 w-full rounded md:rounded-full border ${meetingOption === "guide" ? "ring-2 ring-emerald-300" : "bg-white"}`}>
            <input type="radio" name="meeting" value="guide" className="hidden" checked={meetingOption === "guide"} onChange={() => setMeetingOption("guide")} />
            <span className="text-sm">I&apos;ll let the guide suggest</span>
          </label>

          <label className={`px-3 py-2 w-full rounded md:rounded-full border ${meetingOption === "later" ? "ring-2 ring-emerald-300" : "bg-white"}`}>
            <input type="radio" name="meeting" value="later" className="hidden" checked={meetingOption === "later"} onChange={() => setMeetingOption("later")} />
            <span className="text-sm">I&apos;ll decide later</span>
          </label>

          <label className={`px-3 py-2 w-full rounded md:rounded-full border ${meetingOption === "place" ? "ring-2 ring-emerald-300" : "bg-white"}`}>
            <input type="radio" name="meeting" value="place" className="hidden" checked={meetingOption === "place"} onChange={() => setMeetingOption("place")} />
            <span className="text-sm">I&apos;d like to meet at</span>
          </label>
        </div>

        <div className="mt-3 border rounded-lg p-3 bg-gray-50">
          <div className="text-sm text-gray-600">Your guide will meet you at:</div>
          <div className="mt-2 text-sm font-medium">{meetingOption === "place" ? (meetingPlace || "Specify place") : `${tour.destinationCity ?? "Meeting point TBD"}`}</div>

          {meetingOption === "place" && (
            <input className="mt-3 w-full p-2 border rounded" value={meetingPlace} onChange={(e) => setMeetingPlace(e.target.value)} placeholder="Enter meeting address" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between md:py-3">
        <p className="flex items-center gap-2">
          <span>Data:</span>
          <span>{date}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>Time:</span>
          <span>{time}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>Party size:</span>
          <span>{people}</span>
        </p>
      </div>
      {/* Phone */}
      <div>
        <label className="text-sm font-medium">Phone number <span className="text-xs text-gray-400">(Required)</span></label>
        <div className="mt-2 flex items-center gap-2">
          <span className="p-2 rounded-l border bg-gray-50"><FaPhoneAlt /></span>
          <input className="flex-1 p-2 border rounded-r" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 555 5555" />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium">Address</label>
        <input className="mt-2 w-full p-2 border rounded " value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dhaka, Bangladesh?" />
      </div>
      {/* Notes */}
      <div>
        <label className="text-sm font-medium">Additional notes</label>
        <textarea className="mt-2 w-full p-2 border rounded min-h-20" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any preferences or accessibility needs?" />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <button type="submit" className="px-6 cursor-pointer py-3 bg-emerald-700 text-white rounded-md  font-medium">Confirm & Request</button>
        <button type="button" className="px-6 py-3 border border-primary cursor-pointer rounded-md text-gray-700" onClick={() => { router.back()}}>Back to tour</button>
      </div>
    </form>
  );
}
