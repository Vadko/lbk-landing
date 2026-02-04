"use client";

import { useRef, useState } from "react";
import { getSpecialTranslatorInfo } from "@/lib/specialTranslators";
import { Tooltip } from "./Tooltip";

interface AuthorNameProps {
  team: string;
  className?: string;
  maxVisible?: number;
}

export function AuthorName({
  team,
  className = "",
  maxVisible = 3,
}: AuthorNameProps) {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const authors = team.split(",").map((a) => a.trim());
  const visibleAuthors = authors.slice(0, maxVisible);
  const hiddenAuthors = authors.slice(maxVisible);
  const hasMore = hiddenAuthors.length > 0;

  const renderAuthor = (author: string, showComma: boolean) => {
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
        {showComma && ", "}
      </span>
    );
  };

  return (
    <span className={className}>
      {visibleAuthors.map((author, index) =>
        renderAuthor(author, index < visibleAuthors.length - 1 || hasMore)
      )}

      {hasMore && (
        <span className="authors-popover-container">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setShowPopover(!showPopover)}
            onBlur={(e) => {
              if (!popoverRef.current?.contains(e.relatedTarget as Node)) {
                setShowPopover(false);
              }
            }}
            className="authors-more-btn"
          >
            +{hiddenAuthors.length}
          </button>

          {showPopover && (
            <div ref={popoverRef} className="authors-popover">
              <div className="authors-popover-title">Інші автори:</div>
              <div className="authors-popover-list">
                {hiddenAuthors.map((author) => {
                  const specialInfo = getSpecialTranslatorInfo(author);
                  const isSpecial = specialInfo !== null;

                  return (
                    <div key={author} className="authors-popover-item">
                      <span className={isSpecial ? "special-author" : ""}>
                        {author}
                      </span>
                      {isSpecial && specialInfo && (
                        <Tooltip content={specialInfo.description}>
                          <i className="fa-solid fa-star special-author-star" />
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </span>
      )}
    </span>
  );
}
