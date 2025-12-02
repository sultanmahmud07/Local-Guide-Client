"use client";

import React, { useState } from "react";
import { FaInfoCircle, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

const RightBookingCard = () => {
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const increase = () => setPeople((p) => Math.min(10, p + 1));
  const decrease = () => setPeople((p) => Math.max(1, p - 1));

  const handleBooking = () => {
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }

    alert(`
Booking Requested:
- People: ${people}
- Date: ${date}
- Time: ${time}
    `);
  };

  return (
    <aside className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 sticky top-24">

      {/* Price Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">$ 635.33 USD</h2>
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
          <span>Up to 6 people</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">⏱ Duration:</span>
          <span>4 hours</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">🚶 Transportation:</span>
          <span>Walking</span>
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
      <div className="mt-4">
        <label className="text-sm font-medium mb-1 block">Select tour date</label>
        <div className="relative">
          <input
            type="date"
            className="w-full border rounded-full px-4 py-2 text-sm pr-10"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <FaRegCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Time */}
      <div className="mt-4">
        <label className="text-sm font-medium mb-1 block">Select tour start time</label>
        <div className="relative">
          <input
            type="time"
            className="w-full border rounded-full px-4 py-2 text-sm pr-10"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <FaRegClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Request Button */}
      <button
        onClick={handleBooking}
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
};

export default RightBookingCard;
