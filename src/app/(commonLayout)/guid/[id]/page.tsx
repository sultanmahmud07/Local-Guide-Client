import ProfileCard from "@/components/pages/GuideProfile/ProfileCard";
import ProfileContent from "@/components/pages/GuideProfile/ProfileContent";
import TopGap from "@/components/shared/TopGap";


export default async function GuidDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  interface GuideProfile {
    name: string;
    tagline: string;
    reviews: number;
    location: string;
    languages: string;
    isVerified: boolean;
    responseTime: string;
    bio: string;
    imageUrl: string;
  }

  const hirokiData: GuideProfile = {
    name: "Hiroki",
    tagline: "I know how to enjoy trip in Japan",
    reviews: 25,
    location: "Osaka",
    languages: "English, 日本語",
    isVerified: true,
    responseTime: "less than 8 hours",
    bio: "I graduated from Foothill College, CA, US 15 years ago with a travel career degree. After returning to Japan, I served a travel agency located in Tokyo for 6-7 years. now I changed my career to tour guide. I think that many years of knowledge and experience...",
    imageUrl: "/path/to/hiroki-profile.jpg", // Replace with actual image path
  };
  return (
    <div className="ll">
      <TopGap></TopGap>
      <div className="main-container py-10 px-4 md:px-6 lg:px-8 ">
        {/* Container for the two-column layout */}
        <div className="flex flex-col md:flex-row md:space-x-12">

          {/* === Left Column (Sidebar/Card) === */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <ProfileCard guide={hirokiData} />
          </div>

          {/* === Right Column (Content/Bio) === */}
          <div className="w-full md:w-2/3">
            <ProfileContent guide={hirokiData} />
          </div>
        </div>
      </div>
    </div>
  );
}
