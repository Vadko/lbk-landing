"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const GALLERY_ITEMS = [
  {
    src: "/assets/2.webp",
    alt: "Головний екран LBK Launcher",
    label: "Головний екран",
    description:
      "Каталог ігор з українськими перекладами. Шукайте, фільтруйте та встановлюйте локалізації в один клац.",
    large: true,
  },
  {
    src: "/assets/1.webp",
    alt: "LBK Launcher світла тема",
    label: "Світла тема",
    description:
      "Лаунчер підтримує світлу та темну теми — обирайте те, що зручніше для ваших очей.",
  },
  {
    src: "/assets/3.webp",
    alt: "Налаштування LBK Launcher",
    label: "Налаштування",
    description:
      "Гнучкі налаштування: тема, мова інтерфейсу, шляхи до ігор та автооновлення.",
  },
  {
    src: "/assets/4.webp",
    alt: "Сповіщення LBK Launcher",
    label: "Сповіщення",
    description:
      "Отримуйте сповіщення про нові переклади та оновлення встановлених локалізацій.",
  },
  {
    src: "/assets/5.webp",
    alt: "Деталі гри в LBK Launcher",
    label: "Деталі гри",
    description:
      "Детальна інформація про переклад: прогрес, команда перекладачів, версія та опис.",
  },
  {
    src: "/assets/7.webp",
    alt: "Процес завантаження в LBK Launcher",
    label: "Процес завантаження",
    description:
      "Швидке завантаження та автоматичне встановлення перекладу прямо в папку з грою.",
  },
];

const slides = GALLERY_ITEMS.map((item) => ({
  src: item.src,
  alt: item.alt,
  title: item.label,
  description: item.description,
}));

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section id="gallery" className="gallery-sec">
      <div className="container">
        <h2 className="section-title center">Погляньте на лаунчер</h2>
        <p className="section-subtitle center">
          Сучасний дизайн, зручний інтерфейс і все потрібне для комфортної гри
          українською.
        </p>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`gallery-item ${item.large ? "large" : ""}`}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.large ? 800 : 400}
                height={item.large ? 600 : 300}
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

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Captions]}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
        carousel={{
          imageFit: "contain",
          padding: "16px",
          preload: 1,
          spacing: "100%",
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
      />
    </section>
  );
}
