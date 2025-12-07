
"use client";
import Image from "next/image";
import { FaRegHeart, FaShareAlt, FaStar } from "react-icons/fa";
import { ITourGet } from "@/types/booking.interface";

const images = [
  "/images/amsterdam-1.jpg",
  "/images/amsterdam-2.jpg",
  "/images/amsterdam-3.jpg",
  "/images/amsterdam-4.jpg",
  "/images/amsterdam-5.jpg",
];

const TourImages = ({tour}:{tour:ITourGet}) => {

  console.log(tour)

  return (
    <div className="lg:col-span-8 space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">Highlights of Amsterdam Private Walking Tour</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div>Tour #587868</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-400">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div>(115)</div>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
              <Image src={images[0]} alt="hero" width={1200} height={800} className="object-cover w-full h-full rounded-xl" />
            </div>

            <div className="rounded-xl overflow-hidden">
              <Image src={images[1]} alt="img2" width={600} height={400} className="object-cover w-full h-full" />
            </div>

            <div className="rounded-xl overflow-hidden">
              <Image src={images[2]} alt="img3" width={600} height={400} className="object-cover w-full h-full" />
            </div>

            <div className="rounded-xl overflow-hidden">
              <Image src={images[3]} alt="img4" width={600} height={400} className="object-cover w-full h-full" />
            </div>

            <div className="rounded-xl overflow-hidden">
              <Image src={images[4]} alt="img5" width={600} height={400} className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Buttons (heart / share) */}
          <div className="flex gap-3 mt-3">
            <button className="p-2 border rounded-full"><FaRegHeart /></button>
            <button className="p-2 border rounded-full"><FaShareAlt /></button>
          </div>

          {/* long description (placeholder) */}
          <section className="mt-6 prose prose-sm prose-neutral">
            <h2>About this tour</h2>
            <p>
              This private walking tour covers Amsterdam&apos;s main highlights with a friendly local guide. Explore historic canals, secret courtyards, and sample local snacks.
            </p>
            <p>
              Pickup points, accessibility information and more are provided when you request a booking.
            </p>
          </section>
        </div>
  );
};

export default TourImages;
