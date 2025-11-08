import Testimonials from "@/components/Comments";
import CoreValueStatsDemo from "@/components/DataShow";
import { Footer2Demo } from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-odyssey";
import MapDemo from "@/components/World_Map";
import SmoothScrollWrapper from "@/components/smooth-scroll-wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <SmoothScrollWrapper>
      <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <HeroSection></HeroSection>
        <MapDemo></MapDemo>
        <CoreValueStatsDemo></CoreValueStatsDemo>
        <Testimonials></Testimonials>
        <Footer2Demo></Footer2Demo>
      </div>
    </SmoothScrollWrapper>
  );
}
