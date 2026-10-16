"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "@/lib/images";

const GalleryLightbox = dynamic(
  () => import("@/components/ui/GalleryLightbox"),
  {
    ssr: false,
  }
);

interface ReviewImagesProps {
  images: string[];
}

export function ReviewImages({ images }: ReviewImagesProps) {
  const [openIndex, setOpenIndex] = useState(-1);
  const urls = images
    .map((path) => getImageUrl(path))
    .filter((url): url is string => url !== null);

  if (urls.length === 0) {
    return null;
  }

  return (
    <>
      <div className="review-images">
        {urls.map((url, index) => (
          <button
            key={url}
            type="button"
            className="review-image-btn"
            onClick={() => setOpenIndex(index)}
            aria-label={`Відкрити скриншот ${index + 1}`}
          >
            <Image
              src={url}
              alt={`Скриншот ${index + 1}`}
              fill
              sizes="64px"
              unoptimized
            />
          </button>
        ))}
      </div>

      {openIndex >= 0 && (
        <GalleryLightbox
          open
          index={openIndex}
          close={() => setOpenIndex(-1)}
          slides={urls.map((src, i) => ({
            src,
            alt: `Скриншот ${i + 1}`,
            title: "",
            description: "",
          }))}
        />
      )}
    </>
  );
}
