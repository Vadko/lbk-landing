"use client";

import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { useTranslations } from "next-intl";
import { SvgIcon } from "@/components/ui/SvgIcon";
import {
  formatDate,
  getDownloadLinks,
  useGitHubRelease,
} from "@/hooks/useGitHubRelease";

export function HeroBadge() {
  const t = useTranslations("landingHero.badge");
  const { data: release, isLoading } = useGitHubRelease();
  const downloadLinks = getDownloadLinks(release);

  const versionText = isLoading
    ? t("loading")
    : downloadLinks.version && downloadLinks.publishedAt
      ? t("version", {
          version: downloadLinks.version,
          date: formatDate(downloadLinks.publishedAt),
        })
      : t("versionUnknown");

  return (
    <div className="badge">
      <div className="badge-icon">
        <SvgIcon icon={faRocket} />
      </div>
      <span>{versionText}</span>
    </div>
  );
}
