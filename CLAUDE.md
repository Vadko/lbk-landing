# lbk-landing

Public marketing + catalog site for LBK Launcher (`https://lbklauncher.com`): landing, game catalog, per-translation pages, donaters, collaboration, guides&tools, tech-stack, setup, legal. Next.js 16.2.12 App Router / React 19.2.6 / pnpm 11.4.0 / Node 22. Reads the **same Supabase Postgres as lbk-admin, but anon-key only**, with an ioredis key/value cache in front. All user-facing copy is Ukrainian; there is no i18n library and there are **no tests**.

## Commands

```bash
pnpm install --frozen-lockfile   # pnpm 11.4.0 exactly (packageManager + volta + CI + nixpacks)
pnpm dev                         # localhost:3000
pnpm typecheck                   # tsc --noEmit          — CI gate 1
pnpm lint                        # eslint src            — CI gate 2
pnpm format:check                # biome format src      — CI gate 3 (formatter only!)
pnpm knip                        # dead code / unused deps — CI gate 4
pnpm format                      # biome check --write . — run THIS before committing
pnpm build                       # not run in CI; the highest-value verification here
pnpm start                       # what the deploy runs after build
```

- `pnpm format:check` checks formatting only. Import ordering and the `useBlockStatements` lint rule run only under `biome check` (`pnpm format`, or the husky `npx lint-staged` pre-commit hook). CI cannot catch either.
- `pnpm lint` has no `--max-warnings 0`; it exits 0 with exactly 4 pre-existing warnings at HEAD (`src/app/advertisers/page.tsx` unused `BOT_URL`, `src/components/collaboration/PlatformAudienceSection.tsx` unused `BuildingIcon`/`GamepadIcon`, `src/components/ui/HoverCard.tsx` unused `angleRef`). Read the output, don't trust the exit code, and don't fix those as drive-by noise.
- Biome only sees `src/**` (minus `src/lib/database.types.ts`) — `files.includes` in `biome.json`. `next.config.ts`, `knip.config.ts`, `eslint.config.mjs`, `postcss.config.mjs` are formatted and linted by nothing.
- `tsconfig.json` includes `.next/types/**/*.ts`, so `pnpm typecheck` checks typed `<Link href>` routes only when a prior build left `.next/types/routes.d.ts`. CI has no `.next`, so it checks strictly less than your local run.
- Manual revalidation smoke test:
  `curl -X POST localhost:3000/api/revalidate -H 'x-revalidate-secret: <secret>' -H 'Content-Type: application/json' -d '{"slug":"some-game","team":"Команда","deleted":false}'`

## Architecture

Request path: `src/proxy.ts` → route segment (`src/app/**`) → `src/lib/*` server helpers → `createServerClient()` (Supabase anon) with Redis in front → HTML. Client-side catalog interaction goes browser → `src/hooks/useGames.ts` (TanStack Query) → `src/app/api/games-list/route.ts` → Supabase.

### Proxy (`src/proxy.ts`)

Next 16 renamed `middleware.ts` to `proxy.ts`. There is no `src/middleware.ts`. It exports `proxy(request)` plus `config.matcher` (excludes `api`, `_next/static`, `_next/image`, `favicon.ico`, image extensions). It does three things, in order:

1. 301 `www.` → apex.
2. `resolveGamePath()` from `src/lib/proxy-games.ts` — returns `null` for anything that is not `/games/:slug[/:team]`, so the Redis + Supabase work only happens on game URLs. **Do not hoist that check**, or every request starts paying for it.
3. `?page=only` → sets request header `x-page-only: 1`.

### 410 Gone pipeline

`deleted_games` tombstone table → cached slug set (`src/lib/deleted-slugs-cache.ts`) → on a hit, a live HEAD count on `games` (the slug may have been re-created) → then `slug_redirects` (a rename must 308, not 410) → only then `NextResponse.rewrite("/gone", { status: 410 })` with header `x-lbk-gone: 1`. `src/app/gone/page.tsx` calls `notFound()` when that header is absent, so `/gone` is not browsable directly. Anything rendering `/gone` must set the header.

### Redirect semantics — keep the 308/307 split

`src/app/games/[slug]/page.tsx` (via `getRedirect()`) and `src/app/games/[slug]/[team]/page.tsx` (via `resolveMovedGamePath()`) use `permanentRedirect()` (308) so search engines transfer authority after a rename. `src/app/open/[slug]/[team]/page.tsx` uses plain `redirect()` (307) because `/open/*` is a `noindex` deep-link handler. `resolveMovedGamePath()` in `src/lib/redirects.ts` also handles a moved game slug with an unchanged team segment, and rewrites the `/games` prefix to the caller's prefix (`/open`).

### `?page=only` embed mode

Proxy sets `x-page-only: 1`; `src/app/layout.tsx` reads it with `await headers()` and renders without Navbar/Footer/FanCon banner, swaps body class `main-bg` → `page-only`, and mounts `src/components/layout/IframeResizeMessenger.tsx` (postMessages `{type:"resize", height}` to the parent). Header name, query value and body classes must change together across `src/proxy.ts`, `src/app/layout.tsx`, `src/app/globals.css`.

### Data layer

`src/lib/supabase/server.ts` is nine lines: `createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!)` from `@supabase/supabase-js`. No `@supabase/ssr`, no browser client, no cookies, no auth, no service role. A fresh client per call. Whatever the landing needs must be readable by the anon role — there is no path to elevate.

- Every raw `games` query **must** carry `.eq("approved", true).eq("hide", false)` — see `src/lib/games.ts`, `src/app/sitemap.ts`, `src/app/api/games-teams/route.ts`, `src/lib/proxy-games.ts`. Omitting them leaks unapproved translations publicly.
- `games_grouped` queries carry no filters; the view is trusted to apply them. Keep it that way.
- `src/lib/database.types.ts` is bot-generated (`github-actions[bot]`, "chore: update database types") from the admin/Supabase side. Never hand-edit; there is no `gen:types` script here.

### Team slugs are derived, never stored

`src/lib/transliterate.ts` (`cyrillic-to-translit-js`, preset `uk`, pinned 3.2.1) transliterates → lowercases → collapses non-`[a-z0-9]` to `-` → trims. `getGameBySlugAndTeamSlug()` fetches every row for a slug and finds the one whose `teamToSlug(g.team)` matches the URL segment — there is no `team_slug` column. This file matches `lbk-admin/src/lib/transliterate.ts` character for character except quote style (admin uses single quotes), and that repo writes `slug_redirects` rows. Changing the algorithm in one repo silently 404s every existing team URL. Two team names that transliterate identically collide; the first DB row wins.

### Caching

Two independent layers:

- **Redis** (`src/lib/cache/`) — a two-method `Cache` interface (`get`/`set`). There is no `del`, no scan, no prefix. Exactly four keys: `games:count` (86400s, `src/lib/games-count.ts`, only written when count > 0, and the getter is wrapped in React `cache`), `games:deleted-slugs` (86400s), `landing:stats` (86400s), `github:releases` (3600s). Invalidation is TTL-only except `games:deleted-slugs`, which `refreshDeletedSlugsCache()` recomputes from the webhook. The site-description games count and landing stats can be 24h stale with no way to bust them short of flushing Redis.
- **Next** — `export const revalidate` = 86400 on `src/app/page.tsx`, 3600 on the three `[slug]`/`[team]` routes; API routes set explicit `Cache-Control: public, s-maxage=…, stale-while-revalidate=…` (60/30 for games-list, 3600/60 for games-count, games-teams, github-releases, 86400/60 for landing-stats) and `X-Cache: HIT|MISS` on the two Redis-backed ones.

Without `REDIS_URL`, `src/lib/cache/index.ts` silently substitutes a `MemoryCache` (a per-process `Map`, with the instance parked on `globalThis`). `RedisCache` swallows every error and returns null/undefined. A broken Redis degrades to hitting Supabase on every request with no visible failure — verify with the `X-Cache` header, not by "the site is up".

### `/api/revalidate` — cross-repo contract

Authenticates on header `x-revalidate-secret` against `REVALIDATE_SECRET`; body `{ slug, team, oldTeam, deleted }`; revalidates `/games/{slug}/{teamSlug}`, `/open/{slug}/{teamSlug}`, the same pair for `oldTeam`, `/games/{slug}`, `/games`. Only `deleted: true` recomputes the deleted-slugs Redis set. The caller is **lbk-admin** (`lbk-admin/src/lib/revalidate.ts`), where the env vars are named `LB_LANDING_URL` / `LB_LANDING_REVALIDATE_SECRET` — the names do not match on the two sides, and `.env.example` here still refers to "LBK_LANDING_REVALIDATE_SECRET in lbk-translations". Change the header, secret or payload keys and cache invalidation breaks silently in both repos; `/open/*` mirrors `/games/*` and caches separately, so forgetting it leaves stale deep links.

### Catalog API and search

`src/app/api/games-list/route.ts`:
- Search is a three-tier ladder — FTS `tsquery` of `'token':*` terms (`src/lib/search-utils.ts`, tokens shorter than 2 chars dropped, ORed with the transliterated variant) via `.textSearch("name_fts", q, { config: "simple" })` → the `fuzzy_search_games` RPC (`similarity_threshold: 0.15`) when the query is < 3 chars, the FTS query is empty, or FTS returns zero rows. `config: "simple"` must match the generated column's configuration in the DB.
- Any active filter falls into `fetchWithFilter`, which selects the whole `games_grouped` view with **no `.range()`** and filters/paginates in JS. PostgREST's max-rows setting silently truncates as the catalog grows. The fuzzy path caps at `limit_val: 50`, so a fuzzy `total` is not comparable to the exact-count path.
- `sortBy` goes straight into `.order()` with no server-side allowlist; the allowlist (`name`, `created_at`, `latest_updated_at`, `downloads`) lives only in `SORT_OPTIONS` in `src/components/games/GamesSearch.tsx`. An unknown column produces a PostgREST error that the route turns into a generic 500.
- Filter params are renamed twice: URL `voice`/`achievements`/`workshop`/`sort` → hook `hasVoice=1`/`hasAchievements=1`/`fromWorkshop=1`/`sortBy` → route. Adding a filter means editing `src/components/games/GamesList.tsx`, `src/components/games/GamesSearch.tsx`, `src/hooks/useGames.ts`, `src/app/api/games-list/route.ts` (including `filterGames`) and `src/lib/queryKeys.ts`. A mismatch fails silently — the filter just does nothing.
- Catalog **search text is component state**, not URL state (`GamesList.tsx`: `useState("")`); every other filter round-trips through `router.push("/games?…")`. Search results are not shareable, and a non-empty search makes `isDefaultView` false so the SSR `initialData` is discarded. The legacy `?team=` single-author param is still honoured.

### SEO

`metadataBase` and the `%s | LBK Launcher` title template exist only in `src/app/layout.tsx`. Game routes deliberately break out with `title: { absolute: … }`. Canonicals are hardcoded `https://lbklauncher.com/...` strings in 10 files rather than derived. Deliberate `noindex`: `/games` with any searchParam present, `/games/[slug]` when there is exactly one translation, all of `/open/*`, `/gone`. JSON-LD is a raw `<script type="application/ld+json">` with `dangerouslySetInnerHTML` (root layout plus `games/[slug]/page.tsx` and `GameDetailArticle.tsx`); the root layout escapes `<` per Next's XSS guidance.

`src/lib/game-jsonld.ts` FAQ markup must repeat the visible FAQ text verbatim — `generateFAQLD` and `GameFAQ.tsx` both call `isWorkshopTranslation(game)` (`src/lib/types.ts`), and `GameInstallSteps.tsx` branches on an `isWorkshop` prop that `GameDetailArticle.tsx` computes the same way. Edit copy in one and you must edit the others.

`src/app/sitemap.ts` is hand-maintained, has no `revalidate` (Supabase hit per fetch), emits `/games/{slug}` only when a slug has more than one translation, and already omits `/collaboration`, `/donaters`, `/tech-stack` and `/guides&tools`.

### Rendering

`src/components/landing/BelowFoldSections.tsx` lazy-loads all seven below-the-fold homepage sections with `dynamic(..., { ssr: false })`; only `HeroSection` is server-rendered. Crawlable SEO copy belongs in the hero, in metadata, or in JSON-LD — not in those sections.

Client pages that need metadata get a sibling `layout.tsx` whose only job is to export it (`src/app/setup/layout.tsx`). `src/app/legal-layout.tsx` is deliberately **not** named `layout.tsx` so Next does not treat it as a route layout; `privacy` and `terms/*` import `LegalLayout` as a plain component.

### Styling

`src/app/globals.css` is 5,547 lines of hand-written semantic CSS: 657 top-level class rules, 42 media queries, `:root` custom properties (`--color-main`, `--glass-bg`, `--navbar-height`, rewritten at runtime by `Navbar.tsx`), 2 `@property` rules, 9 keyframes, organized by `/* Section */` comments. There is no `tailwind.config.*` and no `@theme`; the only Tailwind line is `@import "tailwindcss";` and there are zero `@apply` directives. Add new UI styles to the matching section of `globals.css` as kebab-case semantic classes (`glass-bg`, `game-card-status`, `hover-card--big`, `section-margin`). Raw utilities appear roughly 20 times in the whole repo (mostly in `MarkdownText.tsx`) — do not reach for utility soup. Biome formats `globals.css` at 80 columns.

### Icons

No `@fortawesome/react-fontawesome` — do not add it. Import icons from the deep path (`import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad"`) and render `<SvgIcon icon={faGamepad} />` (`src/components/ui/SvgIcon.tsx` unpacks the raw `[w, h, , , path]` tuple; `path` may be a string or an array). Custom brand icons in `src/components/icons/BrandIcons.tsx` are authored in the same tuple shape. `next.config.ts` sets `optimizePackageImports` for both FA packages.

### Heavy libs are each confined to one or two files

embla-carousel → `game-detail/GameGallery.tsx`; yet-another-react-lightbox → `GameGallery.tsx` + `ui/GalleryLightbox.tsx`; `@xyflow/react` → `tech-stack/TechStackDiagram.tsx`; canvas-confetti → runtime `import()` in `landing/hero/HeroDownload.tsx`; react-markdown + remark-breaks → `ui/MarkdownText.tsx` (allowlists `p,strong,em,ul,ol,li,br,code`, rewrites headings to `<p>`). Keep them there.

### Analytics and errors

Page views go through Cloudflare Zaraz (`/cdn-cgi/zaraz/i.js` via `next/script` in the root layout). `src/lib/analytics.ts` only fires when `window.zaraz` exists, so off Cloudflare every event is a silent no-op — analytics cannot be verified in dev. The exception is `trackFailedSearch`, which POSTs to the Supabase Edge Function `/functions/v1/track` with the anon key and a `localStorage` UUID (`lb_analytics_uid`), only for queries ≥ 3 chars, debounced 1500ms in `GamesList`. Always add events as thin named wrappers in `src/lib/analytics.ts`; never call `window.zaraz.track` at a call site, and never let analytics throw.

Sentry SDK points at a self-hosted GlitchTip (`SENTRY_URL`/DSN), `enabled: NODE_ENV === "production"`, with `captureConsoleIntegration({ levels: ["error"] })` in all three configs (`instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`). Every production `console.error` becomes an issue, so a flaky Redis or Supabase floods the tracker — think before adding one to a hot path.

## Conventions

- Components: `export function X()` / `export const X`. `export default` is reserved for App Router files and for exactly two components — `game-detail/GameGallery.tsx` (imported statically by `GameDetailArticle.tsx`) and `ui/GalleryLightbox.tsx` (the only `dynamic()` import without a `.then` wrapper).
- Props: `interface <Component>Props` declared immediately above the component, destructured in the signature.
- `"use client"` is always literally line 1, and only where a browser API/hook is genuinely needed. Data-fetching pages and presentational game-detail components stay server components.
- `@/` alias for cross-directory imports; relative paths for siblings and intra-feature. Let Biome sort imports — never reorder by hand.
- Barrels exist for exactly three folders (`components/donaters`, `components/game-detail`, `components/icons`); the game-detail and icons ones are deliberately incomplete. Adding a component there does not mean adding it to the barrel.
- No `any`, no `as any`, and zero `eslint-disable` / `@ts-ignore` / `@ts-expect-error` / `biome-ignore` in `src/` (verified by grep). Narrow with type predicates instead (see `isValidGameRow` in `api/games-list/route.ts`, and `src/lib/games.ts`). Introducing a suppression would be the first in the repo.
- Every `if` body is braced, even one-line guard clauses — `useBlockStatements` is the single enabled Biome lint rule (`preset: "none"`).
- Formatting: 2-space indent, 80 columns, double quotes, always semicolons, `es5` trailing commas (so multi-line *parameter* lists have no trailing comma, object/array literals do).
- Errors: server helpers in `src/lib` swallow Supabase errors into a safe empty value (`[]` / `null`); API routes wrap in try/catch, `console.error("<Name> API error:", error)`, and return `NextResponse.json({ error }, { status: 500 })` — `/api/revalidate` is the one route whose catch does not log.
- React Query keys always come from `src/lib/queryKeys.ts`, never inline arrays. Defaults live once in `src/providers/QueryProvider.tsx` (staleTime 5min, gcTime 10min, no refetch on focus, retry 1); hooks override staleTime.
- `lib/` filenames are mixed (kebab for infrastructure, camelCase for data/const modules). Match the neighbours of whatever you add.
- Before hand-rolling a helper, check `package.json` — 17 runtime dependencies are already installed and something there probably does it.
- All user-facing strings are Ukrainian literals inline; there is no i18n library. Format with `uk-UA` / `Europe/Kyiv`, sort with `localeCompare(a, b, "uk")`. A translation entry is «переклад»; the Steam Workshop area is «Майстерня». Never write «айтем» in strings, comments or copy.
- Git commits: plain freeform messages. No AI co-author or attribution trailers. No commitlint, no commit-msg hook.

## Comments

Everyone here reads TS faster than prose about TS. **Default to no comment** — write one only for what the code can't say: a workaround and what breaks without it, a business or regulatory rule, a non-obvious ordering or idempotency constraint.

Never narrate a function body — no step-by-step, no `// Step 1:`, no `// loop over users` above a loop. No JSDoc restating the signature; types carry it. No divider or changelog comments, no commented-out code. TODOs need an issue number.

Keep any comment you do write to a single line; do not write multi-line comment blocks. Infrastructure/data code comments in English, product/UI logic in Ukrainian — follow the surrounding file. JSDoc appears in ~14 places in the whole repo; do not add headers to every function.

## Testing and verification

There are zero tests: no `*.test.*`, no `__tests__`, no test runner, no `test` script. CI (`.github/workflows/ci.yml`) runs only `typecheck`, `lint`, `format:check`, `knip` on Node 22 — and **never `next build`**. Server/client boundary errors, bad metadata, Supabase-at-build-time failures and Sentry plugin errors reach production unverified.

After any change: `pnpm format && pnpm typecheck && pnpm lint && pnpm knip`. For anything touching data fetching, server components, routing or metadata, also run `pnpm build` locally, and check the route table (`○` static vs `ƒ` dynamic) before optimizing anything that assumes prerendering.

`knip.config.ts` lists every file under `src/components/**` as an entry point, so unused *components* are never reported (that is why the `/advertisers` components survive). It does police unused exports in `src/lib`, `src/hooks`, `src/helpers`, `src/providers`, and unused `package.json` dependencies — a new dev dependency that no source file imports must go into `ignoreDependencies` (currently `@typescript-eslint/*`, `tailwindcss`, `postcss`). knip is clean at HEAD.

## Do not

- Do not assume ISR is working. `src/app/layout.tsx` awaits `headers()` and no PPR/`cacheComponents` flag is set, which likely opts the whole tree into dynamic rendering despite the `revalidate` exports and `generateStaticParams`. **Verify in the `next build` route table before relying on prerendering.**
- Do not add a raw `games` query without `.eq("approved", true).eq("hide", false)`.
- Do not rename or relocate `src/proxy.ts` — it is Next 16's middleware and knip's Next plugin recognizes it by name.
- Do not retype `public/assets/Logo-FanСon.png`. The `С` is U+0421 CYRILLIC CAPITAL ES, and `src/components/landing/PartnerSection.tsx` references it with the same character. Copy-paste the path; a Latin `C` is a silent 404 that looks correct in the diff.
- Do not use unquoted paths for `src/app/guides&tools/` — the route directory contains a literal ampersand and the public URL is `/guides&tools`. Always quote it in shell and grep.
- Do not point `NEXT_PUBLIC_STORAGE_IMAGES_URL` anywhere other than `supabase.lbklauncher.com` without also editing `images.remotePatterns` in `next.config.ts` — it allowlists exactly that one host and `getImageUrl()` passes through any absolute URL stored in the DB, so an off-host `banner_path` throws at render.
- Do not "fix" `src/app/advertisers/page.tsx` — it calls `notFound()` unconditionally on purpose (page body commented out, hence the unused `BOT_URL` warning) — and do not delete `components/advertisers/WhyAdvertisersChooseUs.tsx` or `components/landing/MetricSection.tsx`.
- Do not add a `game_status` value in one place: `STATUS_LABELS` is duplicated in `src/lib/constants.ts` (class prefix `game-status-badge`) and privately in `src/components/games/GameCard.tsx` (prefix `game-card-status`), plus `STATUS_OPTIONS` in `GamesSearch.tsx`. Both class families are styled separately in `globals.css`.
- Do not hand-edit `src/lib/database.types.ts`, and do not reformat it (excluded from Biome and knip).
- Do not add a UTF-8 BOM. `src/app/terms/players/page.tsx` already has a stray one; it is the only such file.
- Do not expect the donaters leaderboard, special thanks, partner logos, `src/lib/featuredTranslations.ts`, `src/lib/specialTranslators.ts` or the `/donaters` stat cards to come from Supabase — they are literal arrays in component and lib modules. Updating them is a code change plus a deploy.
- Do not treat `README.md` as a spec: it lists 3 env vars (12 are read in code), omits 4 of 6 API routes and ~10 route directories and `src/proxy.ts`, points at the old `littlebit-launcher` repo, and claims MIT with no LICENSE file.
- `src/hooks/useClientValue.ts` already wraps the hydration-safe `useSyncExternalStore` pattern; `src/app/setup/page.tsx` re-implements it inline. Use the hook. Note that file also declares a local `Platform` string-union type that shadows the unrelated `Platform` (`install_source` enum) in `src/lib/types.ts`.

## Environment and deploy

Build-time, inlined into the client bundle (rotating any of these needs a rebuild, not a restart): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STORAGE_IMAGES_URL`, `NEXT_PUBLIC_SENTRY_DSN`, plus `SENTRY_AUTH_TOKEN`/`SENTRY_ORG`/`SENTRY_PROJECT`/`SENTRY_URL` and `SOURCE_COMMIT` (Sentry release name is `${package version}-${commit.slice(0,7)}`; version is still `0.1.0` and never bumped). Server-runtime only: `REDIS_URL`, `REVALIDATE_SECRET`, `GITHUB_TOKEN` (optional, raises the GitHub API rate limit for `/api/github-releases`).

Nothing validates env vars. `src/lib/images.ts` and `src/lib/supabase/server.ts` use `!` at module scope, so a missing value yields `undefined/...` URLs rather than an error.

`pnpm-workspace.yaml` sets `minimumReleaseAge: 4320` (packages published in the last 3 days will not install) and `dangerouslyAllowAllBuilds: false` with an explicit `allowBuilds` list (`@sentry/cli`, `esbuild`, `sharp`, `unrs-resolver`, `workerd`) — a new dep with a postinstall script must be added there or its build step is skipped silently. `.npmrc` sets `save-exact=true`; pin new deps exactly (only `embla-carousel-*`, `react-markdown`, `remark-breaks` still carry carets).

Deploy is nixpacks. `nixpacks.toml` pins the nixpkgs archive and a corepack/pnpm 11.4.0 install; it defines no build/start phase, so those are auto-detected as `pnpm build` / `pnpm start`. There is no `output: "standalone"`, so the runtime needs full `node_modules`. The `.vercel`/`.open-next`/`.wrangler` entries in `.gitignore` are leftovers from an abandoned Cloudflare Workers deploy.
