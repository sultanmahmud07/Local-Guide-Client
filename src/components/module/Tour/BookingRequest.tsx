/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ITourGet } from "@/types/booking.interface";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Minus,
  Plus,
  CalendarDays,
  Clock,
  Users,
  Timer,
  Footprints,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

{/* ... inside your component ... */ }
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
  const [date, setDate] = useState<string>(""); 
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

    <aside className="w-full  bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-20 transition-all duration-300">

      {/* Price Header */}
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="flex items-baseline justify-center gap-1">
          <h2 className="text-4xl font-extrabold text-emerald-700">
            ${totalPrice.toFixed(0)}
          </h2>
          <span className="text-lg font-medium text-gray-400">USD</span>
        </div>
        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wide">
          Total price including fees
        </p>
      </div>

      {/* Tour Specs */}
      <div className="py-6 space-y-4">
        <div className="flex items-center justify-between text-sm group">
          <div className="flex items-center gap-3 text-gray-500 group-hover:text-emerald-700 transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Group Size</span>
          </div>
          <span className="font-semibold text-gray-800">Up to {tour.maxGroupSize ?? 1} people</span>
        </div>

        <div className="flex items-center justify-between text-sm group">
          <div className="flex items-center gap-3 text-gray-500 group-hover:text-emerald-700 transition-colors">
            <Timer className="w-5 h-5" />
            <span className="font-medium">Duration</span>
          </div>
          <span className="font-semibold text-gray-800">
            {tour.durationHours ? `${tour.durationHours} hours` : "Flexible"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm group">
          <div className="flex items-center gap-3 text-gray-500 group-hover:text-emerald-700 transition-colors">
            <Footprints className="w-5 h-5" />
            <span className="font-medium">Transport</span>
          </div>
          <span className="font-semibold text-gray-800 capitalize">
            {tour.transportation || "Walking"}
          </span>
        </div>
      </div>

      {/* Booking Inputs Container */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">

        {/* Party Size Counter */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
            Party Size
          </label>
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
            <button
              onClick={decrease}
              aria-label="Decrease guests"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="font-bold text-gray-900 text-lg w-8 text-center select-none">
              {people}
            </span>

            <button
              onClick={increase}
              aria-label="Increase guests"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="relative">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
            Date
          </label>
          <button
            onClick={() => setShowCalendar((s) => !s)}
            className={`w-full flex items-center justify-between bg-white border px-4 py-3 rounded-xl text-sm font-medium transition-all shadow-sm
            ${date ? "border-emerald-500 text-gray-900 ring-1 ring-emerald-100" : "border-gray-200 text-gray-500 hover:border-emerald-300"}`}
          >
            <span>{date || "Select a date"}</span>
            <CalendarDays className={`w-4 h-4 ${date ? "text-emerald-600" : "text-gray-400"}`} />
          </button>

          {/* Calendar Popover */}
          {showCalendar && (
            <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in fade-in zoom-in-95 duration-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="font-bold text-gray-800">
                  {new Date(calYear, calMonth).toLocaleString(undefined, { month: "long", year: "numeric" })}
                </div>
                <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 text-center mb-2">
                {weekdays.map((w) => (
                  <div key={w} className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    {w.substring(0, 2)}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {daysCells.map((cell, idx) => {
                  if (!cell) return <div key={idx} />;

                  const ymd = formatDateYMD(cell);
                  const isToday = ymd === formatDateYMD(new Date());
                  const isDisabled = reservedSet.has(ymd);
                  const isSelected = date === ymd;

                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectDay(cell)}
                      disabled={isDisabled}
                      className={`
                      h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                      ${isDisabled
                          ? "text-red-300 cursor-not-allowed box-decoration-slice line-through"
                          : isSelected
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-110"
                            : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"}
                      ${isToday && !isSelected ? "ring-1 ring-emerald-400 text-emerald-600 font-bold" : ""}
                    `}
                    >
                      {cell.getDate()}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => { setDate(""); setShowCalendar(false); }}
                className="w-full mt-4 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors py-1"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* Time Picker */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
            Start Time
          </label>
          <div className="relative">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full appearance-none bg-white border px-4 py-3 rounded-xl text-sm font-medium shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-100
              ${time ? "border-emerald-500 text-gray-900" : "border-gray-200 text-gray-500"}`}
            >
              <option value="" disabled>Select time</option>
              {startTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <Clock className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${time ? "text-emerald-600" : "text-gray-400"}`} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleRequest}
          disabled={!date || !time}
          className="w-full cursor-pointer bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all transform active:scale-[0.98]"
        >
          Request Booking
        </button>

        <button className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-800 underline decoration-gray-300 underline-offset-2 transition-colors">
          Read cancellation policy
        </button>
      </div>

    </aside>
  );
}
