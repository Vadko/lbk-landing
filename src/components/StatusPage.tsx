import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";

interface StatusPageProps {
  code: string;
  title: string;
  text: string;
}

export async function StatusPage({ code, title, text }: StatusPageProps) {
  const t = await getTranslations("statusPage");

  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">{code}</div>
        <h1 className="not-found-title">{title}</h1>
        <p className="not-found-text">{text}</p>
        <div className="not-found-buttons">
          <Link href="/" className="btn btn-main">
            <SvgIcon icon={faHome} />
            {t("home")}
          </Link>
          <Link href="/games" className="btn glass-bg">
            <SvgIcon icon={faGamepad} />
            {t("catalog")}
          </Link>
        </div>
      </div>
    </section>
  );
}
