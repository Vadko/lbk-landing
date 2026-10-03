import type { ReactNode } from "react";

interface CardGridSectionProps {
  /** Section heading (optional) */
  title?: string;
  /** Description under the heading (optional) */
  description?: string;
  /** Center the heading and the description */
  centerText?: boolean;
  /** Number of grid columns (1-5) */
  columns?: 1 | 2 | 3 | 4 | 5;
  /** Section id (for navigation) */
  id?: string;
  /** Extra classes for the section */
  className?: string;
  /** Extra classes for the grid container */
  gridClassName?: string;
  /** Section content (the cards) */
  children: ReactNode;
}

export function CardGridSection({
  title,
  description,
  centerText = true,
  columns = 4,
  id,
  className = "",
  gridClassName = "",
  children,
}: CardGridSectionProps) {
  const textAlignClass = centerText ? "center" : "";
  const gridColumnsClass = `card-grid-cols-${columns}`;

  return (
    <section id={id} className={`section-margin ${className}`.trim()}>
      <div className="container">
        {title && (
          <h2 className={`section-title ${textAlignClass}`.trim()}>{title}</h2>
        )}
        {description && (
          <p className={`section-description ${textAlignClass}`.trim()}>
            {description}
          </p>
        )}

        <div
          className={`card-grid ${gridColumnsClass} ${gridClassName}`.trim()}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
