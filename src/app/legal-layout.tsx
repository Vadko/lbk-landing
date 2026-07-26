import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import Link from "next/link";
import type { ReactNode } from "react";
import { SvgIcon } from "@/components/ui/SvgIcon";

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
        <div className="legal-content glass-bg glass-bg--no-hover">
          <header className="legal-header">
            <h1 className="page-title">{title}</h1>
            {lastUpdated && (
              <p className="legal-updated">Оновлено: {lastUpdated}</p>
            )}
          </header>

          <div className="legal-body">{children}</div>

          <div className="legal-footer">
            <Link href="/" className="btn glass-bg legal-back-btn">
              <SvgIcon icon={faArrowLeft} />
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
