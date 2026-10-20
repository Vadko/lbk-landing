import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "../ui/SvgIcon";

interface VideoCardProps {
  videoUrl: string;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube(?:-nocookie)?\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube(?:-nocookie)?\.com\/embed\/([^&\n?#]+)/,
    /youtube(?:-nocookie)?\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export async function GameVideo({ videoUrl }: VideoCardProps) {
  const t = await getTranslations("gameVideo");
  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    // If not a YouTube URL or can't extract ID, show a button to open link
    return (
      <>
        <h2>{t("title")}</h2>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-neon"
        >
          <SvgIcon icon={faPlay} />
          <span className="font-medium">{t("watch")}</span>
        </a>
      </>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <>
      <h2>{t("trailer")}</h2>
      <iframe
        width="100%"
        style={{ aspectRatio: "16/9" }}
        referrerPolicy="strict-origin-when-cross-origin"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
}
