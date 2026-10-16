"use client";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons/faAnglesLeft";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons/faAnglesRight";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface ReviewsPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

type PageItem = number | "ellipsis";

function getPageItems(page: number, totalPages: number): PageItem[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  if (page <= 2) {
    pages.add(3);
  }
  if (page >= totalPages - 1) {
    pages.add(totalPages - 2);
  }

  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
  const items: PageItem[] = [];
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1];
    if (prev !== undefined && p - prev === 2) {
      items.push(prev + 1);
    } else if (prev !== undefined && p - prev > 2) {
      items.push("ellipsis");
    }
    items.push(p);
  });
  return items;
}

export function ReviewsPagination({
  page,
  totalPages,
  onChange,
}: ReviewsPaginationProps) {
  return (
    <nav className="reviews-pagination" aria-label="Сторінки відгуків">
      <button
        type="button"
        className="reviews-pagination-control"
        disabled={page === 1}
        onClick={() => onChange(1)}
        aria-label="Перша сторінка"
      >
        <SvgIcon icon={faAnglesLeft} />
      </button>
      <button
        type="button"
        className="reviews-pagination-control"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Попередня сторінка"
      >
        <SvgIcon icon={faAngleLeft} />
      </button>
      {getPageItems(page, totalPages).map((item, i, items) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-after-${items[i - 1]}`}
            className="reviews-pagination-ellipsis"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`reviews-pagination-page${item === page ? " active" : ""}`}
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}
      <button
        type="button"
        className="reviews-pagination-control"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Наступна сторінка"
      >
        <SvgIcon icon={faAngleRight} />
      </button>
      <button
        type="button"
        className="reviews-pagination-control"
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
        aria-label="Остання сторінка"
      >
        <SvgIcon icon={faAnglesRight} />
      </button>
    </nav>
  );
}
