import Image from "next/image";
import { BannerParallax } from "./BannerParallax";

interface GameBannerProps {
  bannerUrl: string | null;
  logoUrl: string | null;
  name: string;
}

export function GameBanner({ bannerUrl, logoUrl, name }: GameBannerProps) {
  return (
    <div className="game-banner">
      {bannerUrl ? (
        <BannerParallax>
          <Image
            src={bannerUrl}
            alt={`${name} — український переклад`}
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
