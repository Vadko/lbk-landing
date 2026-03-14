import Image from "next/image";
import { HeroClient } from "./HeroClient";

export function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-wrapper">
        <HeroClient />

        <div className="hero-visual">
          <figure className="hero-figure main-figure">
            <Image
              src="/assets/2.webp"
              alt="LBK Launcher сторінка гри"
              width={600}
              height={400}
              className="hero-img main-shot"
              priority
            />
            <figcaption className="hero-caption">Сторінка гри</figcaption>
          </figure>
          <figure className="hero-figure back-figure">
            <Image
              src="/assets/1.webp"
              alt="LBK Launcher головний екран"
              width={540}
              height={360}
              className="hero-img back-shot"
            />
            <figcaption className="hero-caption">Головний екран</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
