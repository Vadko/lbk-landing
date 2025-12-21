"use client";

import { getSpecialTranslatorInfo } from "@/lib/specialTranslators";
import { Tooltip } from "./Tooltip";

interface AuthorNameProps {
  team: string;
  className?: string;
}

export function AuthorName({ team, className = "" }: AuthorNameProps) {
  const authors = team.split(",").map((a) => a.trim());

  return (
    <span className={className}>
      {authors.map((author, index) => {
        const specialInfo = getSpecialTranslatorInfo(author);
        const isSpecial = specialInfo !== null;

        return (
          <span key={author}>
            <span className={isSpecial ? "special-author" : ""}>
              {author}
              {isSpecial && specialInfo && (
                <Tooltip content={specialInfo.description}>
                  <i className="fa-solid fa-star special-author-star" />
                </Tooltip>
              )}
            </span>
            {index < authors.length - 1 && ", "}
          </span>
        );
      })}
    </span>
  );
}
