// src/components/FeatureStrip.tsx
import React from "react";

type Feature = {
  title: string;
  subtitle: string;
  svg: React.JSX.Element;
};

const features: Feature[] = [
  {
    title: "All Tours Customizable",
    subtitle: "Start By Messaging Your Guide",
    svg: (
      <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden>
        <path
          d="M3 12l3-1 7-7 1 1-7 7-1 3-3 1v-4zM21 11c0 3-2 5-5 5-1 0-2-.3-2.9-.9l4.1-4.1C19.7 10 21 10.9 21 11z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "100% Private Tours",
    subtitle: "Just You and Your Local Tour Guide",
    svg: (
      <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden>
        <path
          d="M16 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm4 7v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="7" r="2.2" fill="currentColor" />
        <circle cx="16" cy="7" r="2.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Quality Assured Guides",
    subtitle: "Screened and Verified via Interviews",
    svg: (
      <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden>
        <path
          d="M12 2l6 3v5c0 5-3.6 9.7-6 11-2.4-1.3-6-6-6-11V5l6-3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9.2 12.5l1.9 1.9 3.7-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function FeatureStrip() {
  return (
    <section className="w-full bg-[#e6e6e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-10 py-8 md:py-10 items-start">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-5">
              {/* Icon circle */}
              <div
                className="shrink-0 text-primary w-20 h-20 rounded-md flex items-center justify-center"
                style={{ backgroundColor: "transparent" }}
                aria-hidden
              >
               {f.svg}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="text-lg font-semibold  leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm ">
                  {f.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
