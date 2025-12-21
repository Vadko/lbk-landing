"use client";

import Link from "next/link";
import { getSpecialTranslatorInfo } from "@/lib/specialTranslators";
import { Tooltip } from "./Tooltip";

interface GameTeamLinkProps {
  team: string;
}

export function GameTeamLink({ team }: GameTeamLinkProps) {
  const authors = team.split(",").map((a) => a.trim());

  return (
    <>
      {authors.map((author, index) => {
        const specialInfo = getSpecialTranslatorInfo(author);
        const isSpecial = specialInfo !== null;

        return (
          <span key={author}>
            <Link
              href={`/games?team=${encodeURIComponent(author)}`}
              className={`game-team-link ${isSpecial ? "special-author" : ""}`}
            >
              {author}
            </Link>
            {isSpecial && specialInfo && (
              <Tooltip content={specialInfo.description}>
                <i className="fa-solid fa-star special-author-star" />
              </Tooltip>
            )}
            {index < authors.length - 1 && ", "}
          </span>
        );
      })}
    </>
  );
}
