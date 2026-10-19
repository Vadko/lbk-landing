"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

const GalleryLightbox = dynamic(
  () => import("@/components/ui/GalleryLightbox"),
  { ssr: false }
);

const GALLERY_ITEMS = [
  { key: "main", src: "/assets/1.webp", large: true },
  { key: "translation", src: "/assets/2.webp" },
  { key: "settings", src: "/assets/3.webp" },
  { key: "notifications", src: "/assets/4.webp" },
  { key: "details", src: "/assets/5.webp" },
  { key: "download", src: "/assets/6.webp" },
] as const;

export function GallerySection() {
  const t = useTranslations("landingGallery");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const items = GALLERY_ITEMS.map((item) => ({
    ...item,
    alt: t(`items.${item.key}.alt`),
    label: t(`items.${item.key}.label`),
    description: t(`items.${item.key}.description`),
  }));

  return (
    <section id="gallery" className="section-margin">
      <div className="container">
        <h2 className="section-title center">{t("title")}</h2>
        <p className="section-description center">{t("description")}</p>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <div
              key={index}
              className={`gallery-item ${"large" in item ? "large" : ""}`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={"large" in item ? 800 : 400}
                height={"large" in item ? 600 : 300}
              />
              <div className="gallery-overlay">
                <span>{item.label}</span>
              </div>
              <div className="gallery-caption-mobile">
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex >= 0 && (
        <GalleryLightbox
          open
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={items.map((item) => ({
            src: item.src,
            alt: item.alt,
            title: item.label,
            description: item.description,
          }))}
        />
      )}
    </section>
  );
}
