"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faApple,
  faDiscord,
  faGithub,
  faLinux,
  faSteam,
  faTelegram,
  faTiktok,
  faWindows,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowDownAZ,
  faArrowDownWideShort,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBars,
  faBook,
  faBox,
  faCalendarPlus,
  faCheck,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleInfo,
  faClock,
  faClockRotateLeft,
  faCopy,
  faDownload,
  faExclamationTriangle,
  faFileArrowDown,
  faFloppyDisk,
  faGamepad,
  faGlobe,
  faHandHoldingHeart,
  faHandshake,
  faHeart,
  faHome,
  faMagnifyingGlass,
  faRocket,
  faRotate,
  faShareNodes,
  faSpinner,
  faStar,
  faTriangleExclamation,
  faTrophy,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ICON_MAP: Record<string, IconDefinition> = {
  // Solid
  "fa-solid fa-arrow-down-a-z": faArrowDownAZ,
  "fa-solid fa-arrow-down-wide-short": faArrowDownWideShort,
  "fa-solid fa-arrow-left": faArrowLeft,
  "fa-solid fa-arrow-right": faArrowRight,
  "fa-solid fa-arrow-up": faArrowUp,
  "fa-solid fa-bars": faBars,
  "fa-solid fa-book": faBook,
  "fa-solid fa-box": faBox,
  "fa-solid fa-calendar-plus": faCalendarPlus,
  "fa-solid fa-check": faCheck,
  "fa-solid fa-check-circle": faCheckCircle,
  "fa-solid fa-chevron-down": faChevronDown,
  "fa-solid fa-chevron-left": faChevronLeft,
  "fa-solid fa-chevron-right": faChevronRight,
  "fa-solid fa-circle-info": faCircleInfo,
  "fa-solid fa-clock": faClock,
  "fa-solid fa-clock-rotate-left": faClockRotateLeft,
  "fa-solid fa-copy": faCopy,
  "fa-solid fa-download": faDownload,
  "fa-solid fa-exclamation-triangle": faExclamationTriangle,
  "fa-solid fa-file-arrow-down": faFileArrowDown,
  "fa-solid fa-floppy-disk": faFloppyDisk,
  "fa-solid fa-gamepad": faGamepad,
  "fa-solid fa-globe": faGlobe,
  "fa-solid fa-hand-holding-heart": faHandHoldingHeart,
  "fa-solid fa-handshake": faHandshake,
  "fa-solid fa-heart": faHeart,
  "fa-solid fa-home": faHome,
  "fa-solid fa-magnifying-glass": faMagnifyingGlass,
  "fa-solid fa-rotate": faRotate,
  "fa-solid fa-rocket": faRocket,
  "fa-solid fa-share-nodes": faShareNodes,
  "fa-solid fa-spinner": faSpinner,
  "fa-solid fa-star": faStar,
  "fa-solid fa-triangle-exclamation": faTriangleExclamation,
  "fa-solid fa-trophy": faTrophy,
  "fa-solid fa-user": faUser,
  "fa-solid fa-users": faUsers,
  "fa-solid fa-xmark": faXmark,
  // Brands
  "fa-brands fa-apple": faApple,
  "fa-brands fa-discord": faDiscord,
  "fa-brands fa-github": faGithub,
  "fa-brands fa-linux": faLinux,
  "fa-brands fa-steam": faSteam,
  "fa-brands fa-telegram": faTelegram,
  "fa-brands fa-tiktok": faTiktok,
  "fa-brands fa-windows": faWindows,
  "fa-brands fa-x-twitter": faXTwitter,
  "fa-brands fa-youtube": faYoutube,
};

interface FaIconProps {
  icon: string;
  className?: string;
}

export function FaIcon({ icon, className }: FaIconProps) {
  const iconDef = ICON_MAP[icon];
  if (!iconDef) return null;
  return <FontAwesomeIcon icon={iconDef} className={className} />;
}
