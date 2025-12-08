// app/message/[id]/page.tsx
import GuideContactCard from "@/components/pages/MessageRequest/GuideContactCard";
import MessageRequestForm from "@/components/pages/MessageRequest/MessageRequestForm";
import TopGap from "@/components/shared/TopGap";
import { getGuidProfileWithTour } from "@/services/public/guide.services";
import { IGuide } from "@/types/user.interface"; // Assuming IGuide is in this path

interface MessageRequestPageProps {
  params: { id: string };
}

export default async function MessageRequestPage({
  params,
}: MessageRequestPageProps) {
  const { id } = await params;

  // Assuming getGuidProfileWithTour returns the combined IGuide object
  const guideInfo = await getGuidProfileWithTour(id);
  
  if (!guideInfo) {
    return (
      <div className="main-container py-10 text-center">
        <TopGap></TopGap>
        <h3 className="text-xl font-semibold text-red-500">
          Error: Could not find the guide requested.
        </h3>
      </div>
    );
  }
  const guide: IGuide = guideInfo;

  return (
    <div className="main-container py-8">
      <TopGap></TopGap>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 1. Left Column: Message/Booking Request Form */}
        <div className="lg:col-span-2">
          <MessageRequestForm guideId={guide._id as string} />
        </div>
        
        {/* 2. Right Column: Guide Information Sidebar */}
        <div className="lg:col-span-1">
          <GuideContactCard guide={guide} />
        </div>
      </div>
    </div>
  );
}