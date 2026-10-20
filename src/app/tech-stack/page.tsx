import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TechStackDiagram } from "@/components/tech-stack/TechStackDiagram";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("techStack");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "https://lbklauncher.com/tech-stack",
    },
  };
}

const LANDING_STACK = [
  "framework",
  "styles",
  "data",
  "cache",
  "search",
  "seo",
  "ui",
  "analytics",
  "errors",
  "deploy",
] as const;

const ADMIN_STACK = [
  "framework",
  "styles",
  "data",
  "realtime",
  "forms",
  "email",
  "ui",
  "tests",
  "analytics",
  "api",
  "integrations",
  "packages",
  "workers",
  "archiveScan",
  "errors",
  "deploy",
] as const;

const LAUNCHER_STACK = [
  "framework",
  "styles",
  "state",
  "localDb",
  "sync",
  "archives",
  "workshop",
  "analytics",
  "errors",
  "build",
  "distribution",
  "updates",
  "e2e",
] as const;

const SUPABASE_STACK = [
  "database",
  "auth",
  "storage",
  "realtime",
  "edgeFunctions",
  "extensions",
] as const;

const DEPLOY_TRANSLATION_STACK = [
  "usage",
  "environment",
  "upload",
  "validation",
  "tests",
] as const;

const FLATPAK_STACK = [
  "source",
  "package",
  "repository",
  "delivery",
  "feature",
] as const;

const SHARED_TECH = [
  "TypeScript",
  "TanStack Query v5",
  "Tailwind CSS",
  "morphicons",
  "Biome",
  "Knip",
];

interface StackRow {
  key: string;
  label: string;
  value: string;
}

interface StackListProps {
  rows: StackRow[];
}

function StackList({ rows }: StackListProps) {
  return (
    <dl className="ts-details__list">
      {rows.map((row) => (
        <div key={row.key} className="ts-details__row">
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function TechStackPage() {
  const t = await getTranslations("techStack");

  const projects = [
    {
      name: "Landing",
      repo: "lbk-landing",
      color: "#00c2ff",
      description: t("landing.description"),
      stack: LANDING_STACK.map((key) => ({
        key,
        label: t(`labels.${key}`),
        value: t(`landing.stack.${key}`),
      })),
    },
    {
      name: "Admin",
      repo: "lbk-admin",
      color: "#a8cf96",
      description: t("admin.description"),
      stack: ADMIN_STACK.map((key) => ({
        key,
        label: t(`labels.${key}`),
        value: t(`admin.stack.${key}`),
      })),
    },
    {
      name: "Launcher",
      repo: "lbk-launcher",
      color: "#ffa47a",
      description: t("launcher.description"),
      stack: LAUNCHER_STACK.map((key) => ({
        key,
        label: t(`labels.${key}`),
        value: t(`launcher.stack.${key}`),
      })),
    },
  ];

  const supabaseStack = SUPABASE_STACK.map((key) => ({
    key,
    label: t(`labels.${key}`),
    value: t(`supabase.stack.${key}`),
  }));

  const auxRepos = [
    {
      name: "lbk-deploy-translation",
      color: "#a8cf96",
      description: t("deployTranslation.description"),
      stack: DEPLOY_TRANSLATION_STACK.map((key) => ({
        key,
        label: t(`labels.${key}`),
        value: t(`deployTranslation.stack.${key}`),
      })),
    },
    {
      name: "lbk-flatpak",
      color: "#ffa47a",
      description: t("flatpak.description"),
      stack: FLATPAK_STACK.map((key) => ({
        key,
        label: t(`labels.${key}`),
        value: t(`flatpak.stack.${key}`),
      })),
    },
  ];

  return (
    <>
      <section className="container page-hero">
        <h1 className="hero-title">{t("title")}</h1>
        <p className="hero-description">{t("heroDescription")}</p>
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
          <h3 className="ts-shared__title">{t("sharedTitle")}</h3>
          <div className="ts-shared__tags">
            {SHARED_TECH.map((tech) => (
              <span key={tech} className="ts-shared__badge">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed project info */}
      <section className="container ts-details">
        <div className="ts-details__grid">
          {projects.map((project) => (
            <div
              key={project.repo}
              className="ts-details__card"
              style={{ "--accent": project.color } as React.CSSProperties}
            >
              <h3 className="ts-details__name">{project.name}</h3>
              <span className="ts-details__repo">{project.repo}</span>
              <p className="ts-details__desc">{project.description}</p>
              <StackList rows={project.stack} />
            </div>
          ))}

          <div
            className="ts-details__card"
            style={{ "--accent": "#3ECF8E" } as React.CSSProperties}
          >
            <h3 className="ts-details__name">Supabase</h3>
            <span className="ts-details__repo">Self-hosted</span>
            <p className="ts-details__desc">{t("supabaseDescription")}</p>
            <StackList rows={supabaseStack} />
          </div>
        </div>
      </section>

      <section className="container ts-aux">
        <h2 className="ts-aux__title">{t("auxTitle")}</h2>
        <div className="ts-aux__grid">
          {auxRepos.map((repo) => (
            <div
              key={repo.name}
              className="ts-details__card"
              style={{ "--accent": repo.color } as React.CSSProperties}
            >
              <h3 className="ts-details__name">{repo.name}</h3>
              <p className="ts-details__desc">{repo.description}</p>
              <StackList rows={repo.stack} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
