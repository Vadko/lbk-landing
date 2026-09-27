import type { Metadata } from "next";
import { TechStackDiagram } from "@/components/tech-stack/TechStackDiagram";

export const metadata: Metadata = {
  title: "Технічний стек",
  description:
    "Архітектура та технічний стек екосистеми LBK Launcher — три проєкти, спільний backend та інфраструктура.",
  alternates: {
    canonical: "https://lbklauncher.com/tech-stack",
  },
};

const PROJECTS = [
  {
    name: "Landing",
    repo: "lbk-landing",
    color: "#00c2ff",
    description: "Публічний сайт з каталогом ігор та інструкціями",
    stack: {
      Фреймворк: "Next.js 16 (App Router), React 19",
      Стилі: "Tailwind CSS 4, PostCSS",
      Дані: "TanStack Query v5, Supabase",
      Кеш: "Redis (ioredis)",
      Пошук: "Postgres FTS + fuzzy RPC (pg_trgm)",
      SEO: "JSON-LD, OpenGraph, динамічний Sitemap",
      UI: "FontAwesome, Lightbox, morphicons",
      Аналітика: "Cloudflare Zaraz",
      Помилки: "Sentry SDK → self-hosted GlitchTip",
      Деплой: "Coolify (nixpacks, next start)",
    },
  },
  {
    name: "Admin",
    repo: "lbk-admin",
    color: "#a8cf96",
    description: "Панель керування перекладами, іграми та користувачами",
    stack: {
      Фреймворк: "Next.js 16 (App Router), React 19",
      Стилі: "Tailwind CSS 4, PostCSS",
      Дані: "TanStack Query v5, Supabase",
      Realtime: "Supabase broadcast для сповіщень",
      Форми: "React Hook Form + Zod",
      Email: "Resend (@lbk/email)",
      UI: "Recharts, PhotoSwipe, Lucide, morphicons",
      Тести: "Vitest, Testing Library",
      API: "Токени lbk_, OpenAPI 3.1 на Scalar",
      Інтеграції: "lbk-deploy-translation (GitHub Action)",
      Пакети: "@lbk/db-types, email, notify, scan-core, steam-workshop",
      Workers:
        "Media, Scan, Steam Guides, Steam Curator, Steam Updates, Steam Apps, Telegram, Fundraising",
      "Скан архівів": "MetaDefender Cloud (OPSWAT) + filescan.io",
      Помилки: "Sentry SDK → self-hosted GlitchTip",
      Деплой: "Coolify (nixpacks, next start)",
    },
  },
  {
    name: "Launcher",
    repo: "lbk-launcher",
    color: "#ffa47a",
    description: "Десктопний додаток для встановлення українських перекладів",
    stack: {
      Фреймворк: "Electron 39, React 19, Vite 7",
      Стилі: "Tailwind CSS 3, Framer Motion",
      Стейт: "Zustand, TanStack Query v5",
      "Локальна БД": "SQLite (better-sqlite3, worker threads, spellfix1)",
      Синхронізація: "Supabase REST + Realtime WebSocket",
      Архіви: "node-7z + 7zip-bin (zip)",
      Майстерня: "Steam Workshop",
      Аналітика: "Mixpanel",
      Помилки: "Sentry SDK (Electron) → GlitchTip",
      Збірка: "electron-builder — NSIS, portable, dmg, zip, AppImage, rpm",
      Дистрибуція: "GitHub Releases, AUR, Flatpak",
      Оновлення: "electron-updater (GitHub Releases)",
      E2E: "Playwright",
    },
  },
];

const SUPABASE = {
  "База даних": "PostgreSQL",
  Автентифікація: "Email + Google OAuth",
  Сховище: "game-images, game-archives, banner-images",
  Realtime: "WebSocket підписки для синхронізації лаунчера",
  "Edge Functions": "10 функцій на Deno — Telegram-бот, завантаження, фідбек",
  Розширення: "pg_cron, pg_net, pg_trgm, http",
};

const AUX_REPOS = [
  {
    name: "lbk-deploy-translation",
    color: "#a8cf96",
    description:
      "GitHub Action, якою команди перекладачів заливають архіви просто з власного CI",
    stack: {
      Використання: "Vadko/lbk-deploy-translation@v1",
      Середовище: "Node 20, бандл @vercel/ncc у комітнутий dist/",
      Завантаження: "tus-js-client — resumable-аплоад у Supabase Storage",
      Валідація: "Zod, p-map для паралельних архівів",
      Тести: "Vitest, Biome, версіонування через release-please",
    },
  },
  {
    name: "lbk-flatpak",
    color: "#ffa47a",
    description:
      "Пакування лаунчера у Flatpak для Linux — власний підписаний репозиторій",
    stack: {
      Джерело: "AppImage з релізів lbk-launcher",
      Пакет: "com.lbk.launcher, runtime org.freedesktop.Platform 25.08",
      Репозиторій: "OSTree з GPG-підписом",
      Доставка: "ghcr.io + nginx:alpine → flatpak.lbklauncher.com",
      Особливість: "i386-стек для umu/Proton у пісочниці",
    },
  },
];

const SHARED_TECH = [
  "TypeScript 5.9",
  "TanStack Query v5",
  "Tailwind CSS",
  "morphicons",
  "Biome",
  "Knip",
];

export default function TechStackPage() {
  return (
    <>
      <section className="container page-hero">
        <h1 className="hero-title">Технічний стек</h1>
        <p className="hero-description">
          Архітектура та технології екосистеми LBK Launcher
        </p>
      </section>

      <section className="container tech-stack-section">
        <div className="ts-legend">
          <div className="ts-legend__item">
            <span
              className="ts-legend__dot"
              style={{ background: "#00c2ff" }}
            />
            Landing
          </div>
          <div className="ts-legend__item">
            <span
              className="ts-legend__dot"
              style={{ background: "#a8cf96" }}
            />
            Admin
          </div>
          <div className="ts-legend__item">
            <span
              className="ts-legend__dot"
              style={{ background: "#ffa47a" }}
            />
            Launcher
          </div>
          <div className="ts-legend__item">
            <span
              className="ts-legend__dot"
              style={{ background: "#3ECF8E" }}
            />
            Supabase
          </div>
        </div>

        <TechStackDiagram />

        <div className="ts-shared">
          <h3 className="ts-shared__title">Спільні технології</h3>
          <div className="ts-shared__tags">
            {SHARED_TECH.map((t) => (
              <span key={t} className="ts-shared__badge">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed project info */}
      <section className="container ts-details">
        <div className="ts-details__grid">
          {PROJECTS.map((project) => (
            <div
              key={project.repo}
              className="ts-details__card"
              style={{ "--accent": project.color } as React.CSSProperties}
            >
              <h3 className="ts-details__name">{project.name}</h3>
              <span className="ts-details__repo">{project.repo}</span>
              <p className="ts-details__desc">{project.description}</p>
              <dl className="ts-details__list">
                {Object.entries(project.stack).map(([key, value]) => (
                  <div key={key} className="ts-details__row">
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div
            className="ts-details__card"
            style={{ "--accent": "#3ECF8E" } as React.CSSProperties}
          >
            <h3 className="ts-details__name">Supabase</h3>
            <span className="ts-details__repo">Self-hosted</span>
            <p className="ts-details__desc">
              Єдиний backend для всіх трьох проєктів
            </p>
            <dl className="ts-details__list">
              {Object.entries(SUPABASE).map(([key, value]) => (
                <div key={key} className="ts-details__row">
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container ts-aux">
        <h2 className="ts-aux__title">Допоміжні репозиторії</h2>
        <div className="ts-aux__grid">
          {AUX_REPOS.map((repo) => (
            <div
              key={repo.name}
              className="ts-details__card"
              style={{ "--accent": repo.color } as React.CSSProperties}
            >
              <h3 className="ts-details__name">{repo.name}</h3>
              <p className="ts-details__desc">{repo.description}</p>
              <dl className="ts-details__list">
                {Object.entries(repo.stack).map(([key, value]) => (
                  <div key={key} className="ts-details__row">
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
