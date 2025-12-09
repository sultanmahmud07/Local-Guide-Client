"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

const sampleImages = [
  "/home/locals-1.jpg",
  "/home/locals-2.jpg",
  "/home/locals-3.webp",
  "/home/locals-4.jpg",
  "/home/locals-1.jpg",
  "/home/locals-2.jpg",
];

/**
 * BecomeLocalSearch
 *
 * - Responsive hero section with image collage (left) and search + copy (right)
 * - On search (button click or Enter) navigates to /explore?search=<value>
 * - Uses next/image and tailwind classes (adjust to your design system if needed)
 */
export default function BecomeLocalSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const doSearch = (value?: string) => {
    const term = (value ?? q).trim();
    const params = new URLSearchParams();
    if (term) params.set("search", term);
    router.push(`/explore?${params.toString()}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch();
  };

  return (
    <section className="py-12 md:py-20">
      <div className="main-container">
        <div className="bg-green-100 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center overflow-hidden">
          {/* Images collage - hidden on very small screens */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg grid grid-cols-2 gap-4">
              {/* large top-left */}
              <div className="row-span-2 rounded-2xl overflow-hidden relative h-full shadow-sm">
                <Image src="/home/local-1.jpg" alt="local 1" fill className="object-cover" />
              </div>

              {/* top-right small */}
              <div className="rounded-2xl overflow-hidden relative h-28 md:h-32 shadow-sm">
                <Image src="/home/local-2.jpg"  alt="local 2" fill className="object-cover" />
              </div>

              {/* middle-right tall */}
              <div className="rounded-2xl overflow-hidden relative h-28 md:h-44 shadow-sm">
                <Image src="/home/local-3.webp" alt="local 3" fill className="object-cover" />
              </div>

              {/* bottom-left small */}
              <div className="rounded-2xl overflow-hidden relative h-28 md:h-32 shadow-sm">
                <Image src="/home/local-4.jpg" alt="local 4" fill className="object-cover" />
              </div>

              {/* bottom-right small */}
              <div className="rounded-2xl overflow-hidden relative h-28 md:h-32 shadow-sm">
                <Image src="/home/local-5.webp" alt="local 5" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Text & Search */}
          <div className="md:col-span-7 lg:col-span-6 px-2 md:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800">
              Find your <span className="text-emerald-600">own local</span>
            </h2>

            <p className="mt-4 text-gray-700 max-w-2xl">
              Our local hosts can offer you a truly unique tour. Get in contact with your favourite local host for an
              offer 100% personalised to your wishes.
            </p>

            <form onSubmit={onSubmit} className="mt-8">
              <div className="flex items-center gap-3 max-w-2xl">
                <label htmlFor="local-search" className="sr-only">Search locals</label>

                <input
                  id="local-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // handled by form submit
                    }
                  }}
                  placeholder="Find your local in..."
                  className="flex-1 rounded-full border border-white bg-white shadow-lg px-6 py-3  focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  aria-label="Search destination or city"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="ml-2 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 active:scale-95 transition rounded-full px-6 py-3 shadow-lg text-emerald-900 font-semibold"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>

              {/* quick suggestions (optional) */}
              <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => doSearch("Dhaka")}
                  className="px-3 py-1 rounded-md bg-secondary text-white cursor-pointer text-sm shadow-sm"
                >
                  Dhaka
                </button>
                <button
                  type="button"
                  onClick={() => doSearch("Amsterdam")}
                  className="px-3 py-1 rounded-md bg-secondary text-white cursor-pointer text-sm shadow-sm"
                >
                  Amsterdam
                </button>
                <button
                  type="button"
                  onClick={() => doSearch("Lisbon")}
                  className="px-3 py-1 rounded-md bg-secondary text-white cursor-pointer text-sm shadow-sm"
                >
                  Lisbon
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
