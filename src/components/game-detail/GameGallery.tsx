"use client";

import Image from "next/image";
import { useState } from "react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  Zoom,
} from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/zoom";
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
  spaceBetween = 10,
  slidesPerView = 1,
  loop = true,
  pagination = true,
  thumbs = false,
  autoplay = false,
  updated_at,
}: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const slidesUrls = slides
    .filter((slide): slide is string => typeof slide === "string")
    .map((slide) => getImageUrl(slide, updated_at) || "")
    .filter(Boolean);

  return (
    <div
      className={`slider-container slider-container--same-height ${thumbs && "slider-container--thumbs"}`}
    >
      {/* Великий слайдер */}
      <div className="main-slider overflow-hidden">
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={thumbs ? 1 : slidesPerView}
          loop={loop}
          pagination={pagination ? { clickable: true } : false}
          navigation={false}
          zoom={true}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={
            autoplay ? { delay: 3000, disableOnInteraction: false } : false
          }
          modules={[Navigation, Pagination, Autoplay, Thumbs, Zoom]}
        >
          {slidesUrls.map((slide, index) => (
            <SwiperSlide key={index} className="main-slider-slide">
              <Image
                src={slide}
                role="presentation"
                alt=""
                className="main-slider-slide__bg"
                fill
              />
              <div className="swiper-zoom-container">
                <Image
                  src={slide}
                  alt={`Ігровий скріншот ${index + 1}`}
                  className="main-slider-slide__image"
                  fill
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Вертикальні прев’ю */}
      {thumbs && (
        <div className="main-slider-thumbs overflow-hidden">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={spaceBetween - 10}
            slidesPerView={slidesPerView}
            watchSlidesProgress
            scrollbar={{ draggable: true }}
            modules={[Thumbs, Scrollbar, A11y]}
          >
            {slidesUrls.map((thumbSrc, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <Image
                  src={thumbSrc}
                  alt={`Мініатюра ігрового скріншоту ${index + 1}`}
                  fill
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
