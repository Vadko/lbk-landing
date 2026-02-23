import type { ReactNode } from "react";

interface CardGridSectionProps {
  /** Заголовок секції (опціонально) */
  title?: string;
  /** Опис під заголовком (опціонально) */
  description?: string;
  /** Центрувати заголовок і опис */
  centerText?: boolean;
  /** Кількість колонок в grid (1-5) */
  columns?: 1 | 2 | 3 | 4 | 5;
  /** ID для секції (для навігації) */
  id?: string;
  /** Додаткові класи для секції */
  className?: string;
  /** Додаткові класи для grid-контейнера */
  gridClassName?: string;
  /** Вміст секції (картки) */
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
    <section id={id} className={`card-grid-section ${className}`.trim()}>
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
