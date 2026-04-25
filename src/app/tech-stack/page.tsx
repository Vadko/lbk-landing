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
      SEO: "JSON-LD, OpenGraph, динамічний Sitemap",
      UI: "FontAwesome, Lightbox, canvas-confetti",
      Деплой: "Coolify (next start)",
    },
  },
  {
    name: "Admin",
    repo: "lbk-admin",
    color: "#a8cf96",
    description: "Панель керування перекладами, іграми та користувачами",
    stack: {
      Фреймворк: "Next.js 16 (standalone), React 19",
      Стилі: "Tailwind CSS 4, PostCSS",
      Дані: "TanStack Query v5, Supabase",
      Форми: "React Hook Form + Zod",
      Email: "Resend",
      UI: "Recharts, PhotoSwipe, Lucide Icons",
      Тести: "Vitest, Testing Library",
      Workers: "Media, Steam Guides, Steam Curator, Telegram Bot",
      Деплой: "Coolify (standalone + Docker workers)",
    },
  },
  {
    name: "Launcher",
    repo: "lbk-launcher",
    color: "#ffa47a",
    description: "Десктопний додаток для встановлення українських перекладів",
    stack: {
      Фреймворк: "Electron 40, React 18, Vite 6",
      Стилі: "Tailwind CSS 3, Framer Motion",
      Стейт: "Zustand (7 stores), TanStack Query v5",
      "Локальна БД": "SQLite (better-sqlite3, worker threads, spellfix1)",
      Синхронізація: "Supabase REST + Realtime WebSocket",
      "Ігрові платформи": "Steam, Epic, GOG, Rockstar, Heroic, Lutris",
      Аналітика: "Mixpanel",
      Збірка: "electron-builder (Win / Mac / Linux)",
      Оновлення: "electron-updater (GitHub Releases)",
      E2E: "Playwright",
    },
  },
];

const SUPABASE = {
  "База даних": "PostgreSQL (137+ міграцій)",
  Автентифікація: "Email + Google OAuth",
  Сховище: "game-images, game-archives, feedback-screenshots",
  "Edge Functions":
    "track, submit-logs, submit-feedback, telegram-bot, steam-library, get-banners, kuli-sync, sync-steam-apps, get-download-url",
  Realtime: "WebSocket підписки для синхронізації лаунчера",
};

const SHARED_TECH = [
  "TypeScript 5.9",
  "TanStack Query v5",
  "Tailwind CSS",
  "Biome",
  "Knip",
];

export default function TechStackPage() {
  return (
    <>
      <section className="container page-hero">
        <h1>Технічний стек</h1>
        <p className="page-hero__description">
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
        </div>

        {/* Supabase detail */}
        <div
          className="ts-details__card ts-details__card--wide"
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
      </section>
    </>
  );
}
