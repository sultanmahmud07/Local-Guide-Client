import Image from "next/image";
import React from "react";

type Feature = {
  title: string;
  text: string;
  Icon: React.JSX.Element;
};

const ShieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden>
    <path d="M12 2l7 3v5c0 5-3.58 9.74-7 11-3.42-1.26-7-6-7-11V5l7-3z" fill="currentColor" />
  </svg>
);

const CalendarIcon = (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden>
    <path d="M7 10h5v5H7z" fill="currentColor" />
    <path d="M5 4v2M19 4v2M3 8h18M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features: Feature[] = [
  {
    title: "Safe Tour Guide",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    Icon: ShieldIcon,
  },
  {
    title: "Travelling Schedule",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    Icon: CalendarIcon,
  },
];

export default function AboutSection() {
  return (
    <section className="relative bg-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left image column */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            {/* Main tall image */}
            <div className="w-full max-w-md lg:max-w-none lg:w-[420px] overflow-hidden rounded-sm shadow-lg">
              <div className="relative w-full h-[420px] sm:h-[520px] md:h-[620px]">
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                  alt="guide walking"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Decorative clipped/rotated image - top-left */}
            <div
              className="hidden md:block absolute -top-8 -left-12 w-36 h-36 sm:w-44 sm:h-44 transform -rotate-12 overflow-hidden shadow-xl"
              aria-hidden
            >
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop"
                  alt="accent"
                  fill
                  sizes="176px"
                  style={{
                    objectFit: "cover",
                    clipPath: "polygon(10% 0%, 100% 15%, 85% 100%, 0% 85%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right content column */}
          <div className="lg:col-span-6">
            <div className="max-w-2xl lg:ml-8">
              <span className="inline-block bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded mb-4">
                ABOUT US
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
                Travelling More Easy With Our Guide Team & Our Travel Service Agency
              </h2>

              <p className="text-slate-500 mb-6 md:mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo. Phasellus faucibus urna at ligula faucibus,
                quis tincidunt urna efficitur.
              </p>

              {/* Testimonial / Quote box */}
              <div className="bg-gray-50 rounded-md border-l-4 border-amber-400 p-4 sm:p-6 mb-6 md:mb-8">
                <div className="text-3xl text-gray-200 leading-none -mt-2">“</div>
                <p className="text-slate-600 italic mb-3 sm:mb-4 text-sm sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                  ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
                <div className="text-amber-500 font-semibold text-sm">John Doe</div>
              </div>

              {/* Feature strip overlapping bottom */}
              <div className="relative">
                <div className="absolute -left-4 -bottom-10 w-full">
                  <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="bg-slate-900 text-white rounded-md px-4 py-4 sm:px-6 sm:py-6 shadow-xl flex flex-col sm:flex-row gap-4">
                      {features.map((f, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 sm:gap-4 sm:flex-1"
                          role="group"
                          aria-label={f.title}
                        >
                          <div className="bg-amber-400 text-slate-900 rounded-md p-2 sm:p-3 inline-flex items-center justify-center">
                            <span className="w-5 h-5">{f.Icon}</span>
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold">{f.title}</h4>
                            <p className="text-slate-300 text-xs sm:text-sm">{f.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* spacer so the strip doesn't cover flow content */}
                <div className="h-24 md:h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
