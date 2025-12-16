import Image from "next/image";

interface GameBannerProps {
  bannerUrl: string | null;
  logoUrl: string | null;
  name: string;
}

export function GameBanner({ bannerUrl, logoUrl, name }: GameBannerProps) {
  return (
    <div className="game-banner">
      {bannerUrl ? (
        <Image
          src={bannerUrl}
          alt={`${name} — український переклад`}
          fill
          className="object-cover"
          priority
        />
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
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
            maxHeight: "150px",
            maxWidth: "400px",
          }}
        />
      )}
    </div>
  );
}
