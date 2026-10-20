"use client";

import { useTranslations } from "next-intl";
import { SteamSearchIcon } from "../icons/SteamSearchIcon";
import { HoverCard } from "../ui/HoverCard";

export function SteamCuratorSection() {
  const t = useTranslations("landingCurator");

  return (
    <section className="container steam-curator">
      <HoverCard className="steam-curator--wrapper">
        <div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-description">{t("description")}</p>
          <div className="steam-curator--btn-wrapper">
            <a
              className="btn btn-neon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://steamcommunity.com/groups/LBKLauncher"
            >
              {t("joinGroup")}
            </a>
            <a
              className="btn btn-main"
              target="_blank"
              rel="noopener noreferrer"
              href="https://store.steampowered.com/curator/46014434-LBK-Launcher"
            >
              {t("followCurator")}
            </a>
          </div>
        </div>
        <SteamSearchIcon aria-hidden className="steam-search-icon" />
      </HoverCard>
    </section>
  );
}
