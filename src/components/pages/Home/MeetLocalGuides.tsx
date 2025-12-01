import Image from "next/image";

type Guide = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string;
  image: string;
};

const guides: Guide[] = [
  {
    id: 1,
    name: "Safiye K.",
    rating: 5,
    reviews: 409,
    location: "Istanbul, Türkiye",
    languages: "Turkish, English and more",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Simonida M.",
    rating: 5,
    reviews: 86,
    location: "Siena, Italy, Florence, Italy",
    languages: "Serbocroatian, Italian and more",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Loan D.",
    rating: 5,
    reviews: 15,
    location: "Hanoi, Vietnam, Ninh Binh, Vietnam",
    languages: "Vietnamese, Mandarin and more",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Yael N.",
    rating: 5,
    reviews: 4,
    location: "Jerusalem, Israel",
    languages: "English, Hebrew and more",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
];

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-yellow-400"
    aria-hidden
    fill="currentColor"
  >
    <path d="M12 2l2.9 6.1L22 9.2l-5 4.9L18 21l-6-3.2L6 21l1-6.9-5-4.9 7.1-1.1L12 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-gray-500"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 text-gray-500"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a12 12 0 0 1 3 9 12 12 0 0 1-3 9 12 12 0 0 1-3-9 12 12 0 0 1 3-9z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-gray-400"
    aria-hidden
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 20s-5.5-3.3-8.2-6A4.8 4.8 0 0 1 12 5.3 4.8 4.8 0 0 1 20.2 14c-2.7 2.7-8.2 6-8.2 6z" />
  </svg>
);

export default function MeetLocalGuides() {
  return (
    <section className="w-full bg-[#f7f7f7] py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Small top icon */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 text-lg">
            👤
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-gray-900 mb-10">
          Meet your local guides
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {guides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative w-full h-56 sm:h-60">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 px-5 pt-4 pb-3">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                    {guide.name}
                  </h3>
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white"
                    aria-label="Save guide"
                  >
                    <HeartIcon />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm mb-2">
                  <span className="text-gray-800 font-medium">5</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs ml-1">
                    ({guide.reviews})
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-1">
                  <LocationIcon />
                  <p className="truncate">{guide.location}</p>
                </div>

                {/* Languages */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <GlobeIcon />
                  <p className="truncate">{guide.languages}</p>
                </div>
              </div>

              {/* Message button */}
              <div className="px-5 pb-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-300 py-2.5 text-sm md:text-base font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg">💬</span>
                  <span>Message</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
