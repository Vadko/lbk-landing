import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";
import { HeroBadge } from "./hero/HeroBadge";
import { HeroDownload } from "./hero/HeroDownload";
import { HeroStats } from "./hero/HeroStats";
import { TypewriterText } from "./hero/TypewriterText";

export async function HeroSection() {
  const t = await getTranslations("landingHero");

  return (
    <section id="hero" className="hero">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <HeroBadge />

          <h1 className="hero-title">
            {t("title")}
            <br />
            <TypewriterText />
          </h1>

          <p>{t.rich("lead", { br: () => <br /> })}</p>

          <div className="buttons-wrapper">
            <Link href="/games" className="btn btn-neon games-link">
              <SvgIcon icon={faGamepad} />
              <span>{t("browseGames")}</span>
              <SvgIcon icon={faArrowRight} />
            </Link>

            <HeroDownload />
          </div>

          <Link href="/setup" className="instruction-link">
            <SvgIcon icon={faBook} />
            <span>{t("setupGuide")}</span>
          </Link>

          <HeroStats />
        </div>

        <div className="hero-visual">
          <figure className="hero-figure main-figure">
            <Image
              src="/assets/2.webp"
              alt={t("mainShotAlt")}
              width={600}
              height={400}
              className="hero-img main-shot"
              priority
            />
            <figcaption className="hero-caption">
              {t("mainShotCaption")}
            </figcaption>
          </figure>
          <figure className="hero-figure back-figure">
            <Image
              src="/assets/1.webp"
              alt={t("backShotAlt")}
              width={540}
              height={360}
              className="hero-img back-shot"
            />
            <figcaption className="hero-caption">
              {t("backShotCaption")}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
