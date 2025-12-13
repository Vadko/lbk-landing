import { HeroSection } from "@/components/landing/HeroSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { CollaborationSection } from "@/components/landing/CollaborationSection";
import { FaqSection } from "@/components/landing/FaqSection";

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
