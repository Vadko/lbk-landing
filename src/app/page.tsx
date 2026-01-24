import { CollaborationSection } from "@/components/landing/CollaborationSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GallerySection />
      <ShowcaseSection />
      <CollaborationSection />
      <FaqSection />
    </>
  );
}
