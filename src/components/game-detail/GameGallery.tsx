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

export default function SwiperSlider({
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
      <div className="main-slider overflow-hidden rounded-lg">
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
            <SwiperSlide key={index} className="overflow-hidden rounded-lg">
              <Image
                src={slide}
                alt={`slide-${index}`}
                className="absolute inset-0 !object-cover blur-xl opacity-40 -z-10 pointer-events-none"
              />
              <div className="swiper-zoom-container">
                <Image
                  src={slide}
                  alt={`slide-${index}`}
                  className="rounded-lg"
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
            breakpoints={{
              1441: {
                direction: "vertical",
                spaceBetween,
              },
            }}
            modules={[Thumbs, Scrollbar, A11y]}
          >
            {slidesUrls.map((thumbSrc, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <Image src={thumbSrc} alt={`thumb-${index}`} fill />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
