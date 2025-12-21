
import PopularToursSkeleton from "@/components/module/Loaders/Home/PopularToursSkeleton";
import BecomeLocalSearch from "@/components/pages/Home/BecomeLocalSearch";
import ExperienceTravelArrow from "@/components/pages/Home/ExperienceTravelArrow";
import FaqSection from "@/components/pages/Home/FaqSection";
import FeatureStrip from "@/components/pages/Home/FeatureStrip";
import HappyTravelers from "@/components/pages/Home/HappyTravelers";
import Hero from "@/components/pages/Home/Hero";
import ImpactHero from "@/components/pages/Home/ImpactHero";
import MeetLocalGuides from "@/components/pages/Home/MeetLocalGuides";
import PopularTour from "@/components/pages/Home/PopulerToure";
import Reviews from "@/components/pages/Home/Reviews";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureStrip />
      <Suspense fallback={<PopularToursSkeleton />}>
        <PopularTour />
      </Suspense>
      <Suspense fallback={<PopularToursSkeleton />}>
        <MeetLocalGuides />
      </Suspense>
      <ExperienceTravelArrow />
      <ImpactHero />
      <Suspense fallback={<div>Loading Happy Travelers...</div>}>
        <HappyTravelers />
      </Suspense>
      <Suspense fallback={<div>Loading Reviews...</div>}>
        <Reviews />
      </Suspense>
      <FaqSection />
      <BecomeLocalSearch />
    </div>
  );
}
