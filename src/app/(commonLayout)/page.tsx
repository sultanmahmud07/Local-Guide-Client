
import BecomeLocalSearch from "@/components/pages/Home/BecomeLocalSearch";
import ExperienceTravelArrow from "@/components/pages/Home/ExperienceTravelArrow";
import FeatureStrip from "@/components/pages/Home/FeatureStrip";
import HappyTravelers from "@/components/pages/Home/HappyTravelers";
import Hero from "@/components/pages/Home/Hero";
import ImpactHero from "@/components/pages/Home/ImpactHero";
import MeetLocalGuides from "@/components/pages/Home/MeetLocalGuides";
import PopularTour from "@/components/pages/Home/PopulerToure";
import Reviews from "@/components/pages/Home/Reviews";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureStrip />
      <PopularTour />
      <MeetLocalGuides />
      <ExperienceTravelArrow />
      <ImpactHero />
      <HappyTravelers />
      <Reviews />
      <BecomeLocalSearch />
    </div>
  );
}
