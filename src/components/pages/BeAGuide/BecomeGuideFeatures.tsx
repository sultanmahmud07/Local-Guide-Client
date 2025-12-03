// components/BecomeGuideFeatures.tsx
import React from "react";

type Feature = {
  id: string;
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const IconWelcome: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" {...props} aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#F3F7F6" />
    <g transform="translate(12,10)">
      <circle cx="20" cy="14" r="10" fill="#FFD7B5" />
      <rect x="6" y="28" width="28" height="14" rx="6" fill="#FFEBD0" />
      <path d="M8 24c6 4 20 4 28 0" stroke="#F8B07A" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

const IconPrice: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" {...props} aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#F3F7F6" />
    <g transform="translate(12,12)" fill="none" stroke="none">
      <circle cx="20" cy="20" r="12" fill="#FFE6B3" />
      <path d="M20 14v6" stroke="#F4A300" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 20h8" stroke="#F4A300" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="32" cy="10" r="6" fill="#E6F9E6" />
    </g>
  </svg>
);

const IconOffers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" {...props} aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#F3F7F6" />
    <g transform="translate(8,14)">
      <rect x="6" y="8" width="40" height="28" rx="4" fill="#FFF6E6" />
      <path d="M8 10l20 14 20-14" stroke="#F3B24A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="48" cy="6" r="6" fill="#E6F9E6" />
    </g>
  </svg>
);

const IconMoney: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" {...props} aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#F3F7F6" />
    <g transform="translate(10,14)">
      <rect x="6" y="12" width="36" height="20" rx="4" fill="#E8FFF3" />
      <path d="M18 22a6 6 0 0012 0" stroke="#2DB36A" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="6" cy="6" r="6" fill="#FFF0D9" />
    </g>
  </svg>
);

const FEATURES: Feature[] = [
  {
    id: "welcome",
    title: "Become a Local",
    description:
      "Share what you love about your city. You don’t need to be an expert — a warm personality, local knowledge and a sense of fun are all it takes to start hosting.",
    Icon: IconWelcome,
  },
  {
    id: "price",
    title: "Set your price",
    description:
      "Decide how much you want to earn. Set hourly rates or custom prices for private experiences — you stay in control of your earnings and availability.",
    Icon: IconPrice,
  },
  {
    id: "offers",
    title: "Receive offers you like",
    description:
      "Accept bookings that match your schedule and interests. Chat with guests before their booking and create a memorable experience together.",
    Icon: IconOffers,
  },
  {
    id: "money",
    title: "Grow your earnings",
    description:
      "Build a great profile and collect positive reviews. As your reputation grows, you’ll appear higher in search results and receive more requests.",
    Icon: IconMoney,
  },
];

const FeatureRow: React.FC<{ feature: Feature; reverse?: boolean }> = ({ feature, reverse }) => {
  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-7 md:py-10">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${reverse ? "md:grid-flow-col-dense" : ""}`}>
          {/* Icon column */}
          <div className={`md:col-span-4 flex justify-center md:justify-${reverse ? "start" : "end"} ${reverse ? "md:order-2" : ""}`}>
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              <feature.Icon className="w-32 h-32" />
            </div>
          </div>

          {/* Text column */}
          <div className="md:col-span-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-4 text-gray-600 max-w-3xl">{feature.description}</p>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100" />
    </div>
  );
};

const BecomeGuideFeatures: React.FC = () => {
  return (
    <section className="bg-gray-50">
      <div className="py-8 md:py-12">
        <div className="main-container md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why become a NativeWays guide?</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Share your local knowledge, meet travelers, and earn on your terms — flexible, simple, and rewarding.
            </p>
          </div>
        </div>

        {/* features */}
        <div className="space-y-0">
          {FEATURES.map((f, idx) => (
            <FeatureRow key={f.id} feature={f} reverse={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BecomeGuideFeatures;
