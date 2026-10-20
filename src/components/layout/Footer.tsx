import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faTiktok } from "@fortawesome/free-brands-svg-icons/faTiktok";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SvgIcon } from "@/components/ui/SvgIcon";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LBK Launcher</h4>
            <p>{t("tagline")}</p>
          </div>

          <div className="footer-section">
            <h4>{t("navigation")}</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              <li>
                <Link href="/games">{t("catalog")}</Link>
              </li>
              <li>
                <Link href="/setup">{t("setup")}</Link>
              </li>
              <li>
                <Link href="/donaters">{t("donaters")}</Link>
              </li>
              <li>
                <Link href="/collaboration">{t("collaboration")}</Link>
              </li>
              <li>
                <Link href="/guides&tools">{t("guides")}</Link>
              </li>
              <li>
                <Link href="/tech-stack">{t("techStack")}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t("community")}</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://t.me/LittleBitUA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SvgIcon icon={faTelegram} /> Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/LittleBitUA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SvgIcon icon={faXTwitter} /> X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@UA_LittleBit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SvgIcon icon={faYoutube} /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@littlebit_ua"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SvgIcon icon={faTiktok} /> TikTok
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t("legal")}</h4>
            <ul className="footer-links">
              <li>
                <Link href="/privacy">{t("privacy")}</Link>
              </li>
              <li>
                <Link href="/terms/players">{t("termsPlayers")}</Link>
              </li>
              <li>
                <Link href="/terms/translators">{t("termsTranslators")}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {t.rich("copyright", {
              heart: () => <SvgIcon icon={faHeart} className="highlight" />,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
