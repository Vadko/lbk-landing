import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import Image from "next/image";
import Link from "next/link";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { HeroBadge } from "./hero/HeroBadge";
import { HeroDownload } from "./hero/HeroDownload";
import { HeroStats } from "./hero/HeroStats";
import { TypewriterText } from "./hero/TypewriterText";

export function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <HeroBadge />

          <h1>
            Ігри українською —<br />
            <TypewriterText />
          </h1>

          <p>
            Грайте в улюблені ігри рідною мовою в один клік. <br />
            LBK Launcher — це безкоштовний інструмент з відкритим кодом, який
            автоматизує пошук, встановлення та оновлення українських перекладів
            для вашої ігрової бібліотеки.
          </p>

          <Link href="/games" className="btn-neon games-link">
            <SvgIcon icon={faGamepad} />
            <span>Переглянути всі ігри</span>
            <SvgIcon icon={faArrowRight} />
          </Link>

          <HeroDownload />

          <Link href="/setup" className="instruction-link">
            <SvgIcon icon={faBook} />
            <span>Інструкція зі встановлення</span>
          </Link>

          <HeroStats />
        </div>

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
