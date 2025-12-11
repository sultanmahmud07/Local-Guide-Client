// src/components/FeatureStrip.tsx
import React from "react";
import { Settings2, Users, ShieldCheck, LucideIcon } from "lucide-react";

type Feature = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "All Tours Customizable",
    subtitle: "Start by messaging your guide to tailor your trip.",
    icon: Settings2,
  },
  {
    title: "100% Private Tours",
    subtitle: "Just you and your local tour guide.",
    icon: Users,
  },
  {
    title: "Quality Assured Guides",
    subtitle: "Screened and verified via strict interviews.",
    icon: ShieldCheck,
  },
];

export default function FeatureStrip() {
  return (
    <section className="w-full bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-12 py-12 md:py-16">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-5 group">
              {/* Icon Circle */}
              <div className="shrink-0 relative">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                  <f.icon 
                    className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" 
                    strokeWidth={1.5} 
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="pt-1">
                <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
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