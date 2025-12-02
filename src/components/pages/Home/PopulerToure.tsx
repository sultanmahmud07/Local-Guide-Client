// pages/popular-tours.tsx  (or whichever page you use)
import TourCard, { TourType } from "@/components/module/Tour/TourCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tours: TourType[] = [
  {
    id: 101,
    title: "Old Dhaka Private Tour",
    guideName: "Obaidul H.",
    guideAvatar: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    reviews: 9,
    location: "Old Dhaka, Bangladesh",
    durationLabel: "8 hours",
    maxPeople: 2,
    thumbnail: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
    price: 214,
    shortDesc: "Discover highlights of Dhaka city through the hustle and bustle!",
  },
  {
    id: 102,
    title: "Ultimate Sundarbans & UNESCO World Heritage Tour",
    guideName: "Md Zannatul",
    guideAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=640&auto=format&fit=crop",
    rating: 4,
    reviews: 0,
    location: "Sundarbans, Bangladesh",
    durationLabel: "4 days",
    maxPeople: 2,
    thumbnail: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1200&auto=format&fit=crop",
    price: 2004,
    shortDesc: "Experience the majestic Sundarbans, home of the Royal Bengal Tiger and rich mangrove life.",
  },
  {
    id: 103,
    title: "Full Day Dhaka City Tour",
    guideName: "Gobindo M.",
    guideAvatar: "https://images.unsplash.com/photo-1531123414780-f10d66f3b9c7?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    reviews: 6,
    location: "Dhaka, Bangladesh",
    durationLabel: "7 hours",
    maxPeople: 3,
    thumbnail: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c6?q=80&w=1200&auto=format&fit=crop",
    price: 193,
    shortDesc: "Explore the main attractions of Dhaka city, the capital of Bangladesh.",
  },
  {
    id: 104,
    title: "Dhaka to Sundarban Tour (4 Days)",
    guideName: "Md Shohidul",
    guideAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=640&auto=format&fit=crop",
    rating: 3,
    reviews: 0,
    location: "Dhaka → Sundarbans",
    durationLabel: "4 days",
    maxPeople: 10,
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    price: 2263,
    shortDesc: "4 Days tour with Old Dhaka, Sundarban 3 Days Private boat.",
  },

  // additional examples
  {
    id: 105,
    title: "Dhaka Food Walk & Street Bites",
    guideName: "Ayesha R.",
    guideAvatar: "https://images.unsplash.com/photo-1545996124-1b7d66f6a9b5?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    reviews: 32,
    location: "Old Dhaka, Bangladesh",
    durationLabel: "3 hours",
    maxPeople: 6,
    thumbnail: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?q=80&w=1200&auto=format&fit=crop",
    price: 55,
    shortDesc: "Taste the best street food and local specialties with a friendly local guide.",
  },
  {
    id: 106,
    title: "Heritage & Mughal Architecture Walk",
    guideName: "Rafiq K.",
    guideAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop",
    rating: 4,
    reviews: 18,
    location: "Old Dhaka, Bangladesh",
    durationLabel: "5 hours",
    maxPeople: 4,
    thumbnail: "https://images.unsplash.com/photo-1543340713-8b7b3b88f2b7?q=80&w=1200&auto=format&fit=crop",
    price: 120,
    shortDesc: "Dive into the Mughal-era sites, mosques and hidden lanes of Dhaka's heritage quarters.",
  },
  {
    id: 107,
    title: "Boat Market & River Life Experience",
    guideName: "Sultan M.",
    guideAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop",
    rating: 5,
    reviews: 8,
    location: "Buriganga River, Dhaka",
    durationLabel: "6 hours",
    maxPeople: 8,
    thumbnail: "https://images.unsplash.com/photo-1526481280698-45c6f0660ef2?q=80&w=1200&auto=format&fit=crop",
    price: 160,
    shortDesc: "A riverside tour exploring boat markets, local livelihoods and riverside temples.",
  },
];

export default function PopularTour() {
  return (
    <section className="w-full bg-[#f7f7f7] py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* top */}
        <div className="flex items-center justify-between my-3 pb-2 md:pb-5">
          <h2 className="font-oswald relative font-bold text-3xl md:text-4xl lg:text-5xl">
            Popular <span className="text-emerald-700">tours</span>
          </h2>

          <Link href="/guides" className="">
            <Button className="bg-emerald-700 text-white rounded-none shadow cursor-pointer">
              Explore All Guides
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
