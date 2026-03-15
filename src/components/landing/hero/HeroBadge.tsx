"use client";

import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { SvgIcon } from "@/components/ui/SvgIcon";
import {
  formatDate,
  getDownloadLinks,
  useGitHubRelease,
} from "@/hooks/useGitHubRelease";

export function HeroBadge() {
  const { data: release, isLoading } = useGitHubRelease();
  const downloadLinks = getDownloadLinks(release);

  const versionText = isLoading
    ? "Завантаження..."
    : downloadLinks.version && downloadLinks.publishedAt
      ? `Версія ${downloadLinks.version} від ${formatDate(downloadLinks.publishedAt)}`
      : "Версія ...";

  return (
    <div className="badge">
      <div className="badge-icon">
        <SvgIcon icon={faRocket} />
      </div>
      <span>{versionText}</span>
    </div>
  );
}
