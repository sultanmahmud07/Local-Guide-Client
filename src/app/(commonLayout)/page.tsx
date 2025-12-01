import AboutSection from "@/components/pages/Home/AboutSection";
import FeatureStrip from "@/components/pages/Home/FeatureStrip";
import Hero from "@/components/pages/Home/Hero";
import MeetLocalGuides from "@/components/pages/Home/MeetLocalGuides";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureStrip />
      <AboutSection />
       <MeetLocalGuides />
    </div>
  );
}
