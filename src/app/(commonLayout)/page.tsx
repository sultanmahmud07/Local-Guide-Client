
import FeatureStrip from "@/components/pages/Home/FeatureStrip";
import Hero from "@/components/pages/Home/Hero";
import ImpactHero from "@/components/pages/Home/ImpactHero";
import MeetLocalGuides from "@/components/pages/Home/MeetLocalGuides";
import PopularTour from "@/components/pages/Home/PopulerToure";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureStrip />
      <PopularTour />
      <MeetLocalGuides />
      <ImpactHero />
    </div>
  );
}
