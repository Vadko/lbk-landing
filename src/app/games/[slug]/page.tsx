import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameBySlug, getAllGameSlugs } from "@/lib/games";
import { getImageUrl } from "@/lib/images";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllGameSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return {
      title: "Гру не знайдено",
    };
  }

  return {
    title: `${game.name} українською — Український переклад гри`,
    description: game.description
      ? `${game.description.slice(0, 150)}...`
      : `Завантажте українську локалізацію для ${game.name}. Грайте в ${game.name} українською мовою.`,
    keywords: [
      `${game.name} українською`,
      `${game.name} український переклад`,
      `${game.name} українізатор`,
      `${game.name} локалізація`,
      `${game.name} переклад`,
    ],
    openGraph: {
      title: `${game.name} — Український переклад | LB Launcher`,
      description: game.description || `Український переклад гри ${game.name}`,
      images: game.banner_path ? [getImageUrl(game.banner_path)!] : undefined,
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  completed: { label: "Готово", className: "game-status-badge completed" },
  "in-progress": { label: "В розробці", className: "game-status-badge in-progress" },
  planned: { label: "Заплановано", className: "game-status-badge planned" },
};

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const status = STATUS_LABELS[game.status] || STATUS_LABELS.planned;
  const bannerUrl = getImageUrl(game.banner_path);
  const logoUrl = getImageUrl(game.logo_path);

  const socialLinks = [
    { url: game.telegram, icon: "fa-brands fa-telegram", label: "Telegram" },
    { url: game.discord, icon: "fa-brands fa-discord", label: "Discord" },
    { url: game.youtube, icon: "fa-brands fa-youtube", label: "YouTube" },
    { url: game.twitter, icon: "fa-brands fa-twitter", label: "Twitter" },
    { url: game.website, icon: "fa-solid fa-globe", label: "Веб-сайт" },
  ].filter((link) => link.url);

  return (
    <article className="game-detail">
      {/* Hero Banner */}
      <div className="game-banner">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={`${game.name} — український переклад`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="game-banner-placeholder" />
        )}
        <div className="game-banner-overlay" />

        {logoUrl && (
          <Image
            src={logoUrl}
            alt={game.name}
            width={400}
            height={200}
            className="game-banner-logo"
            style={{ objectFit: "contain", width: "auto", height: "auto", maxHeight: "150px", maxWidth: "400px" }}
          />
        )}
      </div>

      <div className="game-content">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="game-breadcrumb">
            <Link href="/">Головна</Link>
            <span>/</span>
            <Link href="/games">Ігри</Link>
            <span>/</span>
            <span className="current">{game.name}</span>
          </nav>

          <div className="game-info-grid">
            {/* Main Content */}
            <div className="game-main">
              <header className="game-header">
                <div className="game-title-row">
                  <h1>{game.name}</h1>
                  <span className={status.className}>
                    {status.label}
                  </span>
                </div>
                <p className="game-meta">
                  Переклад від <strong>{game.team}</strong>
                  {game.version && ` • Версія ${game.version}`}
                </p>
              </header>

              {/* Progress */}
              <section className="game-section">
                <h2>Прогрес перекладу</h2>
                <div className="game-progress-list">
                  <div className="game-progress-item">
                    <div className="game-progress-header">
                      <span>Переклад тексту</span>
                      <span>{game.translation_progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${game.translation_progress}%` }}
                      />
                    </div>
                  </div>

                  {game.editing_progress > 0 && (
                    <div className="game-progress-item">
                      <div className="game-progress-header">
                        <span>Редагування</span>
                        <span>{game.editing_progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${game.editing_progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {game.voice_progress && game.voice_progress > 0 && (
                    <div className="game-progress-item">
                      <div className="game-progress-header">
                        <span>Озвучення</span>
                        <span>{game.voice_progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${game.voice_progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Description */}
              {game.description && (
                <section className="game-section">
                  <h2>Про переклад</h2>
                  <p className="game-description">{game.description}</p>
                </section>
              )}

              {game.game_description && (
                <section className="game-section">
                  <h2>Про гру</h2>
                  <p className="game-description">{game.game_description}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="game-sidebar">
              {/* Download CTA */}
              <div className="game-sidebar-card game-download-cta">
                <div className="game-download-header">
                  <i className="fa-solid fa-download" />
                  <h3>Встановіть переклад</h3>
                </div>
                <p>Завантажте LB Launcher і встановіть переклад в один клік</p>
                <Link href="/#hero" className="dl-btn game-dl-btn">
                  <i className="fa-brands fa-windows" />
                  <div className="dl-info">
                    <span>Завантажити лаунчер</span>
                    <small>Windows / macOS / Linux</small>
                  </div>
                </Link>
              </div>

              {/* Stats */}
              <div className="game-sidebar-card">
                <h3>Статистика</h3>
                <div className="game-stats-list">
                  {game.downloads ? game.downloads > 0 && (
                    <div className="game-stat">
                      <span>Завантажень</span>
                      <strong>{game.downloads.toLocaleString()}</strong>
                    </div>
                  ) : null}
                  {game.platforms && game.platforms.length > 0 && (
                    <div className="game-stat">
                      <span>Платформи</span>
                      <strong>{game.platforms.join(", ")}</strong>
                    </div>
                  )}
                  <div className="game-stat">
                    <span>Оновлено</span>
                    <strong>{new Date(game.updated_at).toLocaleDateString("uk-UA")}</strong>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="game-sidebar-card">
                  <h3>Посилання</h3>
                  <div className="game-social-links">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="game-social-link"
                        title={link.label}
                      >
                        <i className={link.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Support */}
              {game.support_url && (
                <div className="game-sidebar-card">
                  <h3>Підтримати команду</h3>
                  <a
                    href={game.support_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-support"
                  >
                    <i className="fa-solid fa-heart" />
                    Підтримати
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `${game.name} — Український переклад`,
            description:
              game.description || `Український переклад гри ${game.name}`,
            applicationCategory: "GameApplication",
            operatingSystem: game.platforms?.join(", ") || "Windows",
            author: {
              "@type": "Organization",
              name: game.team,
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "UAH",
            },
            inLanguage: "uk",
          }),
        }}
      />
    </article>
  );
}
