import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import Link from "next/link";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface StatusPageProps {
  code: string;
  title: string;
  text: string;
}

export function StatusPage({ code, title, text }: StatusPageProps) {
  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">{code}</div>
        <h1 className="not-found-title">{title}</h1>
        <p className="not-found-text">{text}</p>
        <div className="not-found-buttons">
          <Link href="/" className="btn-primary">
            <SvgIcon icon={faHome} />
            На головну
          </Link>
          <Link href="/games" className="btn-secondary">
            <SvgIcon icon={faGamepad} />
            Каталог ігор
          </Link>
        </div>
      </div>
    </section>
  );
}
