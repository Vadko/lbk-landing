import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LBK Launcher</h4>
            <p>Зручний менеджер для встановлення українських перекладів ігор</p>
          </div>

          <div className="footer-section">
            <h4>Навігація</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li>
                <Link href="/games">Каталог ігор</Link>
              </li>
              <li>
                <Link href="/setup">Встановлення</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Спільнота</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://t.me/LittleBitUA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-telegram" /> Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/LittleBitUA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-x-twitter" /> X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@UA_LittleBit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube" /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@littlebit_ua"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-tiktok" /> TikTok
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Юридична інформація</h4>
            <ul className="footer-links">
              <li>
                <Link href="/privacy">Політика приватності</Link>
              </li>
              <li>
                <Link href="/terms/players">Умови для гравців</Link>
              </li>
              <li>
                <Link href="/terms/translators">Умови для перекладачів</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2026 LB Team & GGL Studio. Зроблено з{" "}
            <i className="fa-solid fa-heart highlight" /> до рідного.
          </p>
        </div>
      </div>
    </footer>
  );
}
