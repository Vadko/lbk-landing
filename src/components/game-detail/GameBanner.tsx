import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BodyClass } from "@/components/layout/BodyClass";
import { BannerParallax } from "./BannerParallax";

interface GameBannerProps {
  bannerUrl: string | null;
  logoUrl: string | null;
  name: string;
}

export async function GameBanner({
  bannerUrl,
  logoUrl,
  name,
}: GameBannerProps) {
  const t = await getTranslations("gameDetail");

  return (
    <div className="game-banner">
      <BodyClass name="is-game-detail" />
      {bannerUrl ? (
        <BannerParallax>
          <Image
            src={bannerUrl}
            alt={t("bannerAlt", { game: name })}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </BannerParallax>
      ) : (
        <div className="game-banner-placeholder" />
      )}
      <div className="game-banner-overlay" />

      {logoUrl && (
        <Image
          src={logoUrl}
          alt={name}
          width={400}
          height={200}
          className="game-banner-logo"
          priority
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
          }}
        />
      )}
    </div>
  );
}
