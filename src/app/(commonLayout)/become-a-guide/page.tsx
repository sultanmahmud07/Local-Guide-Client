import BecomeGuideFeatures from "@/components/pages/BeAGuide/BecomeGuideFeatures";
import GuideBanner from "@/components/pages/BeAGuide/GuideBanner";
import GuideCTA from "@/components/pages/BeAGuide/GuideCTA";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Become a Local Guide & Earn Money | NativeWays",
  description: "Turn your passion for your city into income. Join NativeWays as a local guide, set your own schedule, and share your culture with travelers worldwide.",
  keywords: [
    "become a tour guide", 
    "local guide jobs", 
    "earn money tourism", 
    "NativeWays guide registration", 
    "flexible travel jobs", 
    "host travelers"
  ]
};

// ... Rest of your page component
export default async function BecomeAGuidePage() {

  return (
    <div>
     <GuideBanner />
      <BecomeGuideFeatures />
       <GuideCTA />
    </div>
  );
}
