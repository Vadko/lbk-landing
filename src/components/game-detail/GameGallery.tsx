"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { getImageUrl } from "@/lib/images";

type Props = {
  slides: Array<string>;
  updated_at?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  loop?: boolean;
  pagination?: boolean;
  thumbs?: boolean;
  autoplay?: boolean;
};

export default function GameGallery({
  slides,
  loop = true,
  pagination = true,
  thumbs = false,
  autoplay = false,
  updated_at,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slidesUrls = slides
    .filter((slide): slide is string => typeof slide === "string")
    .map((slide) => getImageUrl(slide, updated_at) || "")
    .filter(Boolean);

  // Головна карусель з autoplay
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    { loop, align: "start" },
    autoplay ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : []
  );

  // Карусель мініатюр
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  // Синхронізація thumbs з головною каруселлю
  useEffect(() => {
    if (!emblaThumbsApi) return;
    emblaThumbsApi.scrollTo(selectedIndex);
  }, [emblaThumbsApi, selectedIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        className={`slider-container slider-container--same-height ${thumbs && "slider-container--thumbs"}`}
      >
        {/* Великий слайдер */}
        <div className="main-slider overflow-hidden">
          <div className="embla" ref={emblaMainRef}>
            <div className="embla__container">
              {slidesUrls.map((slide, index) => (
                <div
                  key={index}
                  className="embla__slide main-slider-slide"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={slide}
                    role="presentation"
                    alt=""
                    className="main-slider-slide__bg"
                    fill
                  />
                  <div className="embla-zoom-container">
                    <Image
                      src={slide}
                      alt={`Ігровий скріншот ${index + 1}`}
                      className="main-slider-slide__image cursor-zoom-in"
                      fill
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          {pagination && (
            <div className="embla__dots">
              {slidesUrls.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`embla__dot ${index === selectedIndex ? "embla__dot--active" : ""}`}
                  onClick={() => emblaMainApi?.scrollTo(index)}
                  aria-label={`Перейти до слайду ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Мініатюри */}
        {thumbs && (
          <div className="main-slider-thumbs overflow-hidden">
            <div className="embla embla--thumbs" ref={emblaThumbsRef}>
              <div className="embla__container embla__container--thumbs">
                {slidesUrls.map((thumbSrc, index) => (
                  <div
                    key={index}
                    className={`embla__slide embla__slide--thumb ${
                      index === selectedIndex
                        ? "embla__slide--thumb-active"
                        : ""
                    } cursor-pointer`}
                    onClick={() => onThumbClick(index)}
                  >
                    <Image
                      src={thumbSrc}
                      alt={`Мініатюра ігрового скріншоту ${index + 1}`}
                      fill
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="embla-thumbs__scrollbar">
              <div className="embla-thumbs__scrollbar-drag" />
            </div>
          </div>
        )}
      </div>

      {/* Lightbox для zoom */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slidesUrls.map((src) => ({ src }))}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </>
  );
}
