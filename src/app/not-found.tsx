import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import Link from "next/link";
import { SvgIcon } from "@/components/ui/SvgIcon";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Сторінку не знайдено</h1>
        <p className="not-found-text">
          Схоже, ця сторінка не існує або була переміщена.
        </p>
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
