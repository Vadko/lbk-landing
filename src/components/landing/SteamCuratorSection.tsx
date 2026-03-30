"use client";

import React from "react";
import { SteamSearchIcon } from "../icons/SteamSearchIcon";
import { HoverCard } from "../ui/HoverCard";

export function SteamCuratorSection() {
  return (
    <section className="container steam-curator">
      <HoverCard className="steam-curator--wrapper">
        <div>
          <h2 className="section-title">LBK стежить за перекладами</h2>
          <p className="section-description">
            Ми ваш надійний куратор у Steam — підпишіться і не пропустіть
            жодного оновлення.
          </p>
          <div className="steam-curator--btn-wrapper">
            <a
              className="btn-neon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://steamcommunity.com/groups/LBKLauncher"
            >
              Вступити до групи
            </a>
            <a
              className="btn-main"
              target="_blank"
              rel="noopener noreferrer"
              href="https://store.steampowered.com/curator/46014434-LBK-Launcher"
            >
              Підписатись на куратора
            </a>
          </div>
        </div>
        <SteamSearchIcon aria-hidden className="steam-search-icon" />
      </HoverCard>
    </section>
  );
}
