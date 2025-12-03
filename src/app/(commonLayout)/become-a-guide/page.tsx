import BecomeGuideFeatures from "@/components/pages/BeAGuide/BecomeGuideFeatures";
import GuideBanner from "@/components/pages/BeAGuide/GuideBanner";
import GuideCTA from "@/components/pages/BeAGuide/GuideCTA";

export default async function BecomeAGuidePage() {

  return (
    <div>
     <GuideBanner />
      <BecomeGuideFeatures />
       <GuideCTA />
    </div>
  );
}
