/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ITourGet } from "@/types/booking.interface";
import React, { useEffect, useMemo, useState } from "react";
import { FaInfoCircle, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { useRouter } from "next/navigation";

type Props = {
  tour: ITourGet;
  reservedDates: string[]; // ["2025-12-15", ...] (YYYY-MM-DD)
};

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDateYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function getDaysArrayForMonth(year: number, month: number) {
  const first = startOfMonth(year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = first.getDay(); // 0-6
  const cells: (Date | null)[] = [];

  // previous month's trailing days as null (we'll show blanks)
  for (let i = 0; i < startWeekday; i++) cells.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  // pad to 7*n
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function RightBookingCard({ tour, reservedDates }: Props) {
  const router = useRouter();
  const [people, setPeople] = useState<number>(1);
  const [date, setDate] = useState<string>(""); // YYYY-MM-DD
  const [address, setAddress] = useState<string>(""); 
  const [time, setTime] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);

  // calendar state
  const today = new Date();
  const [calYear, setCalYear] = useState<number>(today.getFullYear());
  const [calMonth, setCalMonth] = useState<number>(today.getMonth()); // 0-index

  // Normalized reserved set for quick lookup
  const reservedSet = useMemo(() => new Set((reservedDates || []).map((d) => d)), [reservedDates]);

  useEffect(() => {
    // if the currently selected date becomes reserved (due to prop change), unset it
    if (date && reservedSet.has(date)) {
      setDate("");
    }
  }, [reservedSet, date]);

  const increase = () => setPeople((p) => Math.min(tour.maxGroupSize ?? 10, p + 1));
  const decrease = () => setPeople((p) => Math.max(1, p - 1));

  // times coming from tour.startTime or fallback
  const startTimes: string[] = Array.isArray(tour.startTime) && tour.startTime.length > 0
    ? tour.startTime
    : ["10:00", "11:30"];

  // Price calc
  const fee = typeof tour.fee === "number" ? tour.fee : Number(tour.fee ?? 0);
  const totalPrice = useMemo(() => +(fee * people), [fee, people]);

  // Calendar helpers
  const daysCells = useMemo(() => getDaysArrayForMonth(calYear, calMonth), [calYear, calMonth]);

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const onSelectDay = (d: Date | null) => {
    if (!d) return;
    const picked = formatDateYMD(d);
    if (reservedSet.has(picked)) return; // disabled
    setDate(picked);
    setShowCalendar(false);
  };

  const handleRequest = () => {
    if (!date) {
      alert("Please select a tour date");
      return;
    }
    if (!time) {
      alert("Please select a tour start time");
      return;
    }

    // Build query params
    const params = new URLSearchParams({
      slug: String(tour.slug ?? tour.slug ?? ""),
      people: String(people),
      date,
      time,
      fee: String(fee),
      total: String(totalPrice),
    });

    // navigate to booking-confirm with query
    router.push(`/tour/booking-request?${params.toString()}`);
  };

  return (
    <aside className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 sticky top-24">

      {/* Price Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">${totalPrice.toFixed(2)} USD</h2>
        <p className="text-xs text-gray-500 mt-1">Includes all fees</p>

        <button className="text-sm text-blue-600 hover:underline mt-2 flex items-center justify-center gap-1 mx-auto">
          Book with a 20% deposit
          <FaInfoCircle className="text-blue-500 text-xs" />
        </button>
      </div>

      <hr className="my-5" />

      {/* Tour Details */}
      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">👥 Size:</span>
          <span>Up to {tour.maxGroupSize ?? 1} people</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">⏱ Duration:</span>
          <span>{tour.durationHours ? `${tour.durationHours} hours` : "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">🚶 Transportation:</span>
          <span>{(tour.transportation || "Working")}</span>
        </div>
      </div>

      {/* Party Size */}
      <div className="mt-5">
        <p className="font-medium text-sm mb-1">Party size:</p>

        <div className="flex items-center justify-between border rounded-full px-4 py-2">
          <button
            onClick={decrease}
            aria-label="Decrease"
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full"
          >
            <HiOutlineMinusSm size={16} />
          </button>

          <span className="font-semibold text-emerald-700">{people}</span>

          <button
            onClick={increase}
            aria-label="Increase"
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full"
          >
            <HiOutlinePlusSm size={16} />
          </button>
        </div>
      </div>

      {/* Date */}
      <div className="mt-4 relative">
        <label className="text-sm font-medium mb-1 block">Select tour date</label>

        <button
          onClick={() => setShowCalendar((s) => !s)}
          className="w-full text-left border rounded-full px-4 py-2 text-sm pr-10 flex items-center justify-between"
        >
          <span className={`${date ? "text-gray-800" : "text-gray-400"}`}>{date || "Select tour date"}</span>
          <FaRegCalendarAlt className="text-gray-500" />
        </button>

        {/* Calendar popover */}
        {showCalendar && (
          <div className="absolute z-50 left-0 right-0 mt-3 bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
              <div className="font-semibold">
                {new Date(calYear, calMonth).toLocaleString(undefined, { month: "long", year: "numeric" })}
              </div>
              <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
            </div>

            <div className="grid grid-cols-7 text-center text-xs text-gray-500 gap-1">
              {weekdays.map((w) => (
                <div key={w} className="py-1">{w}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mt-2">
              {daysCells.map((cell, idx) => {
                if (!cell) {
                  return <div key={idx} className="h-10" />;
                }
                const ymd = formatDateYMD(cell);
                const isToday = ymd === formatDateYMD(new Date());
                const isDisabled = reservedSet.has(ymd);
                const isSelected = date === ymd;

                return (
                  <button
                    key={idx}
                    onClick={() => onSelectDay(cell)}
                    disabled={isDisabled}
                    className={`h-10 flex items-center justify-center rounded-full
                      ${isDisabled ? "cursor-not-allowed bg-red-50 text-red-500 " : "hover:bg-emerald-50"}
                      ${isSelected ? "ring ring-emerald-400 bg-emerald-50" : ""}
                      ${isToday && !isSelected ? "border border-gray-200" : ""}
                    `}
                    title={isDisabled ? "Not available" : ymd}
                  >
                    <span className={`${isSelected ? "text-emerald-700 font-semibold" : ""}`}>{cell.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 text-center">
              <button onClick={() => { setDate(""); setShowCalendar(false); }} className="text-sm text-gray-500 hover:underline">Clear</button>
            </div>
          </div>
        )}
      </div>

      {/* Time */}
      <div className="mt-4">
        <label className="text-sm font-medium mb-1 block">Select tour start time</label>
        <div className="relative">
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-full px-4 py-2 text-sm pr-10"
          >
            <option value="">{`Select tour start time`}</option>
            {startTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FaRegClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Request Button */}
      <button
        onClick={handleRequest}
        className="mt-6 w-full bg-emerald-700 text-white py-3 rounded-full font-semibold hover:bg-emerald-800"
      >
        Request Booking
      </button>

      {/* Policy */}
      <button className="w-full text-center mt-3 text-sm text-gray-600 hover:underline">
        View our cancellation policy
      </button>
    </aside>
  );
}
