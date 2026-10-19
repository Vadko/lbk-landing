"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface GameLightboxProps {
  open: boolean;
  index: number;
  close: () => void;
  slides: string[];
}

export function GameLightbox({
  open,
  index,
  close,
  slides,
}: GameLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides.map((src) => ({ src }))}
      plugins={[Zoom]}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
    />
  );
}
