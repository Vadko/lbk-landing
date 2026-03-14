"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface GalleryLightboxProps {
  open: boolean;
  index: number;
  close: () => void;
  slides: { src: string; alt: string; title: string; description: string }[];
}

export default function GalleryLightbox({
  open,
  index,
  close,
  slides,
}: GalleryLightboxProps) {
  return (
    <Lightbox
      open={open}
      index={index}
      close={close}
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
  );
}
