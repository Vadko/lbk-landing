import Link from "next/link";
import type { ReactNode } from "react";

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  lastUpdated?: string;
}

export function LegalLayout({
  children,
  title,
  lastUpdated,
}: LegalLayoutProps) {
  return (
    <section className="legal-page">
      <div className="container">
        <div className="legal-content">
          <header className="legal-header">
            <h1>{title}</h1>
            {lastUpdated && (
              <p className="legal-updated">Оновлено: {lastUpdated}</p>
            )}
          </header>

          <div className="legal-body">{children}</div>

          <div className="legal-footer">
            <Link href="/" className="back-link">
              <i className="fa-solid fa-arrow-left" />
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
