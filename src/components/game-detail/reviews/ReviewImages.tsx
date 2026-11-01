"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

const GameLightbox = dynamic(
  () =>
    import("../GameLightbox").then((m) => ({
      default: m.GameLightbox,
    })),
  { ssr: false }
);

interface ReviewImagesProps {
  images: string[];
}

export function ReviewImages({ images }: ReviewImagesProps) {
  const t = useTranslations("gameReviews");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const show = (next: number) => {
    setIndex(next);
    setMounted(true);
    setOpen(true);
  };

  return (
    <>
      <div className="review-images">
        {images.map((url, i) => (
          <button
            key={url}
            type="button"
            className="review-image"
            onClick={() => show(i)}
          >
            <Image
              src={url}
              alt={t("screenshotAlt", { number: String(i + 1) })}
              width={64}
              height={64}
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Stays mounted after closing, so the closing animation plays */}
      {mounted && (
        <GameLightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images}
        />
      )}
    </>
  );
}
