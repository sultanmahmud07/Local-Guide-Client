
import { IGuide } from "@/types/user.interface";
import { ITourGet } from "@/types/booking.interface";
import ExploreClientLayout from "@/components/pages/Explore/ExploreClientLayout";
import { getAllGuides, getAllTours } from "@/services/search/search.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Authentic Local Tours | NativeWays",
  description: "Discover unique travel experiences led by passionate local guides. Browse tours, check reviews, and book your next native adventure today.",
  keywords: [
    "local tours",
    "travel guides",
    "authentic experiences",
    "NativeWays",
    "book local guide",
    "travel activities",
    "cultural tours"
  ]
};

// ... Rest of your page component
interface exploreToursProps {
  searchParams: Promise<{
    search?: string;
    priceRange?: string;
    category?: string;
    type?: string;
    language?: string;
  }>;
}

const ExploreToursPage = async ({
  searchParams,
}: exploreToursProps) => {
  const params = await searchParams;

  // Determine the type of data to fetch (default to 'tour')
  const type = params.type || 'tour';

  let results: ITourGet[] | IGuide[] = [];
  let meta = {};

  try {
    if (type === 'guide') {
      const res = await getAllGuides(params); // Your service should accept query parameters
      results = res.data;
      meta = res.meta;
    } else {
      // Default: Fetch Tours
      const res = await getAllTours(params);
      results = res.data;
      meta = res.meta;
    }
  } catch (error) {
    console.error("Failed to fetch explore data:", error);
    // Handle error state gracefully
  }

  return (
    <ExploreClientLayout
      initialResults={results}
      initialMeta={meta}
      initialType={type}
    />
  );
}

export default ExploreToursPage;