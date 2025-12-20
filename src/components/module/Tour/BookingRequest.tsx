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
  ChevronRight,
  X 
} from 'lucide-react';

type Props = {
  tour: ITourGet;
  reservedDates: string[];
  isMobileView?: boolean; 
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
  const startWeekday = first.getDay(); 
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function RightBookingCard({ tour, reservedDates, isMobileView = false }: Props) {
  const router = useRouter();
  const [people, setPeople] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Mobile Modal State
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // calendar state
  // 1. UPDATE: Normalize today to midnight to correctly compare past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [calYear, setCalYear] = useState<number>(today.getFullYear());
  const [calMonth, setCalMonth] = useState<number>(today.getMonth());

  const reservedSet = useMemo(() => new Set((reservedDates || []).map((d) => d)), [reservedDates]);

  useEffect(() => {
    if (date && reservedSet.has(date)) {
      setDate("");
    }
  }, [reservedSet, date]);

  const increase = () => setPeople((p) => Math.min(tour.maxGroupSize ?? 10, p + 1));
  const decrease = () => setPeople((p) => Math.max(1, p - 1));

  const startTimes: string[] = Array.isArray(tour.startTime) && tour.startTime.length > 0
    ? tour.startTime
    : ["10:00", "11:30"];

  const fee = typeof tour.fee === "number" ? tour.fee : Number(tour.fee ?? 0);
  const totalPrice = useMemo(() => +(fee * people), [fee, people]);

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

    // 2. UPDATE: Block selection if date is before today
    if (d < today) return;

    const picked = formatDateYMD(d);
    if (reservedSet.has(picked)) return;
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

    const params = new URLSearchParams({
      slug: String(tour.slug ?? ""),
      people: String(people),
      date,
      time,
      fee: String(fee),
      total: String(totalPrice),
    });

    router.push(`/tour/booking-request?${params.toString()}`);
  };

  // --- REUSABLE FORM CONTENT ---
  const BookingFormContent = (
    <div className="space-y-3">
      {/* Tour Specs */}
      <div className="py-2 space-y-1 border-b border-gray-100 pb-2">
         <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><Users className="w-4 h-4"/> Max Size</span>
            <span className="font-medium">{tour.maxGroupSize ?? 1} people</span>
         </div>
         <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2"><Timer className="w-4 h-4"/> Duration</span>
            <span className="font-medium">{tour.durationHours ? `${tour.durationHours}h` : "Flexible"}</span>
         </div>
      </div>

      {/* Party Size */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Party Size</label>
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-2 py-1 shadow-sm">
          <button onClick={decrease} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-emerald-50 rounded-lg"><Minus className="w-4 h-4" /></button>
          <span className="font-bold text-gray-900 text-lg w-8 text-center">{people}</span>
          <button onClick={increase} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-emerald-50 rounded-lg"><Plus className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="relative">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Date</label>
        <button
          onClick={() => setShowCalendar((s) => !s)}
          className={`w-full flex items-center justify-between bg-white border px-4 py-2 rounded-xl text-sm font-medium shadow-sm ${date ? "border-emerald-500 text-gray-900" : "border-gray-200 text-gray-500"}`}
        >
          <span>{date || "Select a date"}</span>
          <CalendarDays className={`w-4 h-4 ${date ? "text-emerald-600" : "text-gray-400"}`} />
        </button>

        {showCalendar && (
          <div className={`absolute z-50 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 ${isMobileView ? "bottom-full mb-[-100px]" : "top-full mt-0"}`}>
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
              <div className="font-bold text-gray-800">{new Date(calYear, calMonth).toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
              <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-7 text-center mb-2">{weekdays.map((w) => <div key={w} className="text-[10px] font-bold text-gray-400 uppercase">{w.substring(0, 2)}</div>)}</div>
            <div className="grid grid-cols-7 gap-1">
              {daysCells.map((cell, idx) => {
                if (!cell) return <div key={idx} />;
                
                const ymd = formatDateYMD(cell);
                const isSelected = date === ymd;
                const isReserved = reservedSet.has(ymd);
                
                // 3. UPDATE: Determine logic for past dates
                const isPast = cell < today;
                const isDisabled = isReserved || isPast;

                return (
                  <button
                    key={idx}
                    onClick={() => onSelectDay(cell)}
                    disabled={isDisabled}
                    // 4. UPDATE: Dynamic styling for Past (Gray) vs Reserved (Red)
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium 
                      ${isReserved ? "text-red-300 line-through cursor-not-allowed" : 
                        isPast ? "text-gray-300 cursor-not-allowed" : // Gray out past dates
                        isSelected ? "bg-emerald-600 text-white" : 
                        "hover:bg-emerald-50 text-gray-700"
                      }`}
                  >
                    {cell.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Time Picker */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Start Time</label>
        <div className="relative">
          <select value={time} onChange={(e) => setTime(e.target.value)} className={`w-full appearance-none bg-white border px-4 py-2 rounded-xl text-sm font-medium shadow-sm focus:outline-none ${time ? "border-emerald-500 text-gray-900" : "border-gray-200 text-gray-500"}`}>
            <option value="" disabled>Select time</option>
            {startTimes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <Clock className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${time ? "text-emerald-600" : "text-gray-400"}`} />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleRequest}
        disabled={!date || !time}
        className="mt-3 w-full cursor-pointer bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 md:py-3 rounded md:rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all text-sm md:text-base"
      >
        Request Booking - ${totalPrice.toFixed(0)}
      </button>
    </div>
  );


  // --- RENDER LOGIC ---

  // 1. MOBILE VIEW
  if (isMobileView) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] flex items-center justify-between md:hidden">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Price</span>
            <div className="flex items-baseline gap-1">
               <span className="text-2xl font-extrabold text-emerald-700">${totalPrice.toFixed(0)}</span>
               <span className="text-sm font-medium text-gray-400">USD</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileModalOpen(true)}
            className="bg-emerald-700 text-white px-8 py-3 rounded md:rounded-xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-transform"
          >
            Check Availability
          </button>
        </div>

        {isMobileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileModalOpen(false)}></div>
            <div className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Book your tour</h3>
                  <button onClick={() => setIsMobileModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
               </div>
               {BookingFormContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // 2. DESKTOP VIEW
  return (
    <aside className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-20 transition-all duration-300">
      <div className="text-center pb-6 border-b border-gray-100">
        <div className="flex items-baseline justify-center gap-1">
          <h2 className="text-4xl font-extrabold text-emerald-700">${totalPrice.toFixed(0)}</h2>
          <span className="text-lg font-medium text-gray-400">USD</span>
        </div>
        <span className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wide">Total price including fees</span>
      </div>
      
      <div className="h-6"></div> 
      {BookingFormContent}

      <button className="w-full text-center mt-4 text-xs font-semibold text-gray-500 hover:text-gray-800 underline decoration-gray-300 underline-offset-2 transition-colors">
        Read cancellation policy
      </button>
    </aside>
  );
}