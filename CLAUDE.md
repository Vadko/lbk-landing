# lbk-landing

Public marketing + catalog site for LBK Launcher (`https://lbklauncher.com`): landing, game catalog, per-translation pages, donaters, collaboration, guides&tools, tech-stack, setup, legal. Next.js 16.4.2 App Router (`cacheComponents: true`) / React 19.2.6 / pnpm 11.4.0 / Node 22. Reads the **same Supabase Postgres as lbk-admin, but anon-key only**, with an ioredis key/value cache in front. All user-facing copy is served in Ukrainian through next-intl from `src/i18n/uk.ts` (with `en`/`be` kept key-for-key in sync); the only tests are the dictionary checks in `src/i18n/dictionaries.test.ts`.

## Commands

```bash
pnpm install --frozen-lockfile   # pnpm 11.4.0 exactly (packageManager + volta + CI; Railpack reads packageManager)
pnpm dev                         # localhost:3000
pnpm typecheck                   # tsc --noEmit          — CI gate 1
pnpm lint                        # eslint src            — CI gate 2
pnpm format:check                # biome format src      — CI gate 3 (formatter only!)
pnpm knip                        # dead code / unused deps — CI gate 4
pnpm test:run                    # vitest run            — CI gate 5
pnpm format                      # biome check --write . — run THIS before committing
pnpm build                       # not run in CI; the highest-value verification here
pnpm start                       # what the deploy runs after build
```

- `pnpm format:check` checks formatting only. Import ordering and the `useBlockStatements` lint rule run only under `biome check` (`pnpm format`, or the husky `npx lint-staged` pre-commit hook). CI cannot catch either.
- `pnpm lint` has no `--max-warnings 0`; it exits 0 with exactly 4 pre-existing warnings at HEAD (`src/app/advertisers/page.tsx` unused `BOT_URL`, `src/components/collaboration/PlatformAudienceSection.tsx` unused `BuildingIcon`/`GamepadIcon`, `src/components/ui/HoverCard.tsx` unused `angleRef`). Read the output, don't trust the exit code, and don't fix those as drive-by noise.
- Biome only sees `src/**` (minus `src/lib/database.types.ts`) — `files.includes` in `biome.json`. `next.config.ts`, `knip.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts` are formatted and linted by nothing.
- `tsconfig.json` includes `.next/types/**/*.ts`, so `pnpm typecheck` checks typed `<Link href>` routes only when a prior build left `.next/types/routes.d.ts`. CI has no `.next`, so it checks strictly less than your local run.
- Manual revalidation smoke test:
  `curl -X POST localhost:3000/api/revalidate -H 'x-revalidate-secret: <secret>' -H 'Content-Type: application/json' -d '{"slug":"some-game","team":"Команда","deleted":false}'`

## Architecture

Request path: `src/proxy.ts` → route segment (`src/app/**`) → `src/lib/*` server helpers → `createServerClient()` (Supabase anon) with Redis in front → HTML. Client-side catalog interaction goes browser → `src/hooks/useGames.ts` (TanStack Query) → `src/app/api/games-list/route.ts` → Supabase.

### Proxy (`src/proxy.ts`)

Next 16 renamed `middleware.ts` to `proxy.ts`. There is no `src/middleware.ts`. It exports `proxy(request)` plus `config.matcher` (excludes `api`, `_next/static`, `_next/image`, `favicon.ico`, image extensions). It does four things, in order:

1. 301 `www.` → apex.
2. When `MAINTENANCE_MODE=true` (server-only, read per request by `isMaintenanceMode()`, so a restart toggles it without a rebuild), answer every page with the `/maintenance` page at 503 + `Retry-After` (see below). That page hides the Navbar/Footer through `<BodyClass name="is-maintenance" />`.
3. `resolveGamePath()` from `src/lib/proxy-games.ts` — returns `null` for anything that is not `/games/:slug[/:team]`, so the Redis + Supabase work only happens on game URLs. **Do not hoist that check**, or every request starts paying for it.
4. `/games` with any query string → `X-Robots-Tag: noindex, follow`. It lives here because reading `searchParams` in `generateMetadata` would make `/games` dynamic.

A status the proxy puts on a **rewrite** does not survive: the page render's `200` overwrites it (`app-page-runtime.js`, `cachedData.status`), and Next can render a page only as 200/401/403/404. So for 410 and 503, `statusPageResponse()` (`src/lib/status-page.ts`) fetches the prerendered `/gone` or `/maintenance` page from this same server (`http://localhost:$PORT`; Next sets `PORT` to the port it listens on) with header `x-lbk-status-page: 1` and re-sends it with the real status and `Cache-Control: no-store`; if that fetch fails, it sends the status with an empty body and logs. Without the header, the proxy answers `/gone` and `/maintenance` with a 404, so they are not browsable directly. Both are ordinary pages styled by `globals.css`.

### 410 Gone pipeline

`deleted_games` tombstone table → cached slug set (`src/lib/deleted-slugs-cache.ts`) → on a hit, a live HEAD count on `games` (the slug may have been re-created) → then `slug_redirects` (a rename must 308, not 410) → only then `statusPageResponse("/gone", 410)` — the `src/app/gone/page.tsx` `StatusPage`, `noindex, follow`. The proxy runs outside a render, so it calls the uncached `fetchRedirect()`; `getRedirect()` wraps it in `"use cache"`, which throws in the proxy.

### Redirect semantics — keep the 308/307 split

`src/app/games/[slug]/page.tsx` (via `getRedirect()`) and `src/app/games/[slug]/[team]/page.tsx` (via `resolveMovedGamePath()`) use `permanentRedirect()` (308) so search engines transfer authority after a rename. `src/app/open/[slug]/[team]/page.tsx` uses plain `redirect()` (307) because `/open/*` is a `noindex` deep-link handler. `resolveMovedGamePath()` in `src/lib/redirects.ts` also handles a moved game slug with an unchanged team segment, and rewrites the `/games` prefix to the caller's prefix (`/open`).

### `?page=only` embed mode

The layout always renders the Navbar and Footer, so pages stay prerenderable. `src/components/layout/PageOnlyScript.tsx` is an inline script at the top of `<head>` that sets `<html data-page-only>` before first paint; `html[data-page-only]` rules in `src/app/globals.css` hide `.navbar` / `.footer` and drop the `.main-bg` background, and `src/components/layout/IframeResizeMessenger.tsx` (postMessages `{type:"resize", height}` to the parent) only starts when the attribute is set. The query value, attribute name and CSS selectors must change together across those three files. Never style the shell from page content with `:has()`: Cache Components keeps visited routes mounted (hidden) inside React `<Activity>`, so their DOM still matches after navigating away. A page that changes `<body>` renders `<BodyClass name="…" />` (`src/components/layout/BodyClass.tsx`: an inline script that runs while a full load parses, plus an effect that Activity cleans up; `<body>` carries `suppressHydrationWarning` for that class); `is-game-detail` (from `GameBanner`) and `is-open-launcher` (from `OpenInLauncher`) work this way.

### Data layer

`src/lib/supabase/server.ts` is nine lines: `createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!)` from `@supabase/supabase-js`. No `@supabase/ssr`, no browser client, no cookies, no auth, no service role. A fresh client per call. Whatever the landing needs must be readable by the anon role — there is no path to elevate.

- Every raw `games` query **must** carry `.eq("approved", true).eq("hide", false)` — see `src/lib/games.ts`, `src/app/sitemap.ts`, `src/app/api/games-teams/route.ts`, `src/lib/proxy-games.ts`. Omitting them leaks unapproved translations publicly.
- `games_grouped` queries carry no filters; the view is trusted to apply them. Keep it that way.
- `src/lib/database.types.ts` is bot-generated (`github-actions[bot]`, "chore: update database types") from the admin/Supabase side. Never hand-edit; there is no `gen:types` script here.

### Team slugs are derived, never stored

`src/lib/transliterate.ts` (`cyrillic-to-translit-js`, preset `uk`, pinned 3.2.1) transliterates → lowercases → collapses non-`[a-z0-9]` to `-` → trims. `getGameBySlugAndTeamSlug()` fetches every row for a slug and finds the one whose `teamToSlug(g.team)` matches the URL segment — there is no `team_slug` column. This file matches `lbk-admin/src/lib/transliterate.ts` character for character except quote style (admin uses single quotes), and that repo writes `slug_redirects` rows. Changing the algorithm in one repo silently 404s every existing team URL. Two team names that transliterate identically collide; the first DB row wins.

### Caching

Two independent layers:

- **Redis** (`src/lib/cache/`) — a two-method `Cache` interface (`get`/`set`). There is no `del`, no scan, no prefix. Exactly four keys: `games:count` (86400s, `src/lib/games-count.ts`, only written when count > 0, and the getter is a `"use cache"` function: `cacheLife("hours")`, or `"minutes"` when the count is 0 so a failed query is not baked into prerendered pages), `games:deleted-slugs` (86400s), `landing:stats` (86400s), `github:releases` (3600s). Invalidation is TTL-only except `games:deleted-slugs`, which `refreshDeletedSlugsCache()` recomputes from the webhook. The site-description games count and landing stats can be 24h stale with no way to bust them short of flushing Redis.
- **Next** — Cache Components rejects `revalidate` / `dynamic` / `fetchCache` exports. Data is cached at the function: the five exports of `src/lib/games.ts`, `getRedirect()` and `sitemap.ts` are `"use cache"` + `cacheLife("hours")`; `LeaderboardSection` is `cacheLife("days")` because its «N днів тому» is relative to today. All `[slug]`/`[team]` pages prerender at build from `generateStaticParams`; unknown params render on demand. `partialPrefetching` is on, so a default `<Link>` prefetches only the route's shared App Shell. The three game routes read the slug at the top (it decides 404/308 before anything streams), so they export `instant = false` and have no useful shell; every `<Link>` to a game page carries `prefetch` to load the cached page before the click (`GameCard`, the translation lists, `GameDetailArticle`, `OpenInLauncher`). A new link to a game page needs it too. Cache Components fails the build when `generateStaticParams` returns `[]`, so `pnpm build` needs a reachable DB; do not add placeholder params to get around it (the Next docs advise against them). `/api/revalidate`'s `revalidatePath()` also discards these `"use cache"` entries for the revalidated paths. API routes set explicit `Cache-Control: public, s-maxage=…, stale-while-revalidate=…` (60/30 for games-list, 3600/60 for games-count, games-teams, github-releases, 86400/60 for landing-stats) and `X-Cache: HIT|MISS` on the two Redis-backed ones.

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

`metadataBase` and the `%s | LBK Launcher` title template exist only in `src/app/layout.tsx`. Game routes deliberately break out with `title: { absolute: … }`. Canonicals are hardcoded `https://lbklauncher.com/...` strings in 10 files rather than derived. Deliberate `noindex`: `/games` with any searchParam present (proxy `X-Robots-Tag`), `/games/[slug]` when there is exactly one translation, all of `/open/*`, `/gone`, `/maintenance`. JSON-LD is a raw `<script type="application/ld+json">` with `dangerouslySetInnerHTML` (root layout plus `games/[slug]/page.tsx` and `GameDetailArticle.tsx`); the root layout escapes `<` per Next's XSS guidance.

`src/lib/game-jsonld.ts` FAQ markup must repeat the visible FAQ text verbatim — `generateFAQLD` and `GameFAQ.tsx` both call `isWorkshopTranslation(game)` (`src/lib/types.ts`), and `GameInstallSteps.tsx` branches on an `isWorkshop` prop that `GameDetailArticle.tsx` computes the same way. Edit copy in one and you must edit the others.

`src/app/sitemap.ts` is hand-maintained and `"use cache"` + `cacheLife("hours")`: prerendered at build (`○`), then refreshed at most hourly. It emits `/games/{slug}` only when a slug has more than one translation, and omits `/collaboration`, `/donaters` and `/guides&tools` (`/tech-stack` is listed).

### Rendering

`src/components/landing/BelowFoldSections.tsx` lazy-loads all seven below-the-fold homepage sections with `dynamic(..., { ssr: false })`; only `HeroSection` is server-rendered. Crawlable SEO copy belongs in the hero, in metadata, or in JSON-LD — not in those sections.

Client pages that need metadata get a sibling `layout.tsx` whose only job is to export it (`src/app/(query)/setup/layout.tsx`). `src/app/legal-layout.tsx` is deliberately **not** named `layout.tsx` so Next does not treat it as a route layout; `privacy` and `terms/*` import `LegalLayout` as a plain component.

### Styling

`src/app/globals.css` is 5,547 lines of hand-written semantic CSS: 657 top-level class rules, 42 media queries, `:root` custom properties (`--color-main`, `--glass-bg`, `--navbar-height`, rewritten at runtime by `Navbar.tsx`), 2 `@property` rules, 9 keyframes, organized by `/* Section */` comments. There is no `tailwind.config.*` and no `@theme`; the only Tailwind line is `@import "tailwindcss";` and there are zero `@apply` directives. Add new UI styles to the matching section of `globals.css` as kebab-case semantic classes (`glass-bg`, `game-card-status`, `hover-card--big`, `section-margin`). Raw utilities appear roughly 20 times in the whole repo (mostly in `MarkdownText.tsx`) — do not reach for utility soup. Biome formats `globals.css` at 80 columns.

### Icons

No `@fortawesome/react-fontawesome` — do not add it. Import icons from the deep path (`import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad"`) and render `<SvgIcon icon={faGamepad} />` (`src/components/ui/SvgIcon.tsx` unpacks the raw `[w, h, , , path]` tuple; `path` may be a string or an array). Custom brand icons in `src/components/icons/BrandIcons.tsx` are authored in the same tuple shape. `next.config.ts` sets `optimizePackageImports` for both FA packages.

### Heavy libs are each confined to one or two files

embla-carousel → `game-detail/GameGallery.tsx`; yet-another-react-lightbox → `game-detail/GameLightbox.tsx` (lazy `dynamic()` from `GameGallery.tsx`, mounted on first open) + `ui/GalleryLightbox.tsx`; `@xyflow/react` → `tech-stack/TechStackDiagram.tsx`; canvas-confetti → runtime `import()` in `landing/hero/HeroDownload.tsx`; react-markdown + remark-breaks → `ui/MarkdownText.tsx` (allowlists `p,strong,em,ul,ol,li,br,code`, rewrites headings to `<p>`). Keep them there.

### Analytics and errors

Page views go through Cloudflare Zaraz (`/cdn-cgi/zaraz/i.js` via `next/script` in the root layout). `src/lib/analytics.ts` only fires when `window.zaraz` exists, so off Cloudflare every event is a silent no-op — analytics cannot be verified in dev. The exception is `trackFailedSearch`, which POSTs to the Supabase Edge Function `/functions/v1/track` with the anon key and a `localStorage` UUID (`lb_analytics_uid`), only for queries ≥ 3 chars, debounced 1500ms in `GamesList`. Always add events as thin named wrappers in `src/lib/analytics.ts`; never call `window.zaraz.track` at a call site, and never let analytics throw.

Sentry SDK points at a self-hosted GlitchTip (`SENTRY_URL`/DSN), `enabled: NODE_ENV === "production"`, with `captureConsoleIntegration({ levels: ["error"] })` in all three configs (`instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`). Every production `console.error` becomes an issue, so a flaky Redis or Supabase floods the tracker — think before adding one to a hot path. All three spread `sentryV10Baseline` from `src/lib/sentry-baseline.ts`: SDK v11 collects more by default (user info/IP, cookies, headers, bodies) and attaches synthetic stack traces, and that module pins the v10 behaviour — loosening it is a privacy decision, not a cleanup. `bundleSizeOptimizations` in `next.config.ts` does apply under Turbopack on SDK v11 (through its bundler plugin; it did nothing on v10): it is what drops the unused tracing, replay and debug code (measured, Sentry client code 75.9 → 50.0 KB). Keep `excludeTracing` only while no config sets `tracesSampleRate`.

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
- Action feedback — `useActionPhase` (`src/hooks/useActionPhase.ts`) + `ActionIcon`: the hook is mirrored, in substance byte-for-byte, in lbk-admin (`src/hooks`) and lbk-launcher (`src/renderer/hooks`), so a change here is a change in all three; contract tests live only in lbk-admin. Timings: `DONE_MS` 1000 / `ERROR_MS` 1800 / `MIN_PENDING_MS` 600 in the hook, `PENDING_DELAY_MS` 100 / `SPIN_DELAY_MS` 180 in `ActionIcon.tsx`, `MORPH_SPRING` (`{ stiffness: 800, damping: 42 }`) in `MorphSvgIcon.tsx` — the morph is a morphicons spring, not a CSS transition, and the glyphs here are FontAwesome paths fed through `fitFaIcon`. There is no `settle()` on purpose; `isBusy` keeps a control mounted while the phase burns down.
- React Query keys always come from `src/lib/queryKeys.ts`, never inline arrays. Defaults live once in `src/providers/QueryProvider.tsx` (staleTime 5min, gcTime 10min, no refetch on focus, retry 1); hooks override staleTime. `QueryProvider` is **not** in the root layout. It lives in the route group layout `src/app/(query)/layout.tsx`, which holds exactly the routes that call query hooks (`/`, `/games`, `/collaboration`, `/setup`), so every other route ships no `@tanstack/*` and those four share one chunk. A route that starts using a query hook must move into `(query)`, or it throws "No QueryClient set" at render. Do not wrap individual pages instead: that gives each page its own copy of query-core, so navigating between them downloads it again. The browser `QueryClient` is a module-level singleton, so the cache survives leaving and re-entering the group. `/games/[slug]/**` stays outside the group under `src/app/games/`.
- `lib/` filenames are mixed (kebab for infrastructure, camelCase for data/const modules). Match the neighbours of whatever you add.
- Before hand-rolling a helper, check `package.json` — 17 runtime dependencies are already installed and something there probably does it.
- **i18n is next-intl, only `uk` served, no locale routing — but there are always three dictionaries with the same keys**: `src/i18n/uk.ts`, `en.ts`, `be.ts`, and a key is added, renamed, removed or reworded in all three in the same change (no check catches a translation left stale by a uk rewording). `uk.ts` is the source (`as const`, groups named after what the user sees: `navbar`, `gameSidebar`, `privacyPolicy`, `catalogSearch.sort.*`, never code modules) and exports `Messages` (its keys, any text); `en` and `be` are declared `as const satisfies Messages`, so a key missing from or extra in either fails `pnpm typecheck`. `src/i18n/dictionaries.test.ts` (`pnpm test:run`, a CI step) fails on an `en`/`be` message that drops, adds or changes the ICU arguments and tags of its uk message or is empty where uk has text, on a plural that picks by category but lacks a form `Intl.PluralRules` gives its locale (only `=N` cases plus `other`, with no `#`, is a switch), and on a uk key nothing in `src` reads: the full key as a literal; a namespace literal plus the rest in one file or in the modules it imports; any literal as the rest of a namespace whose translator gets a computed key (`useTranslations(ns)`, then `t(item.key)`); or a template like `` `gameStatus.${status}` `` whose `${…}` values are literals or property names somewhere: all count as reads, so delete a key in the change that removes its last reader. `src/i18n/request.ts` returns `locale: "uk"` and the messages statically — it must never read headers or cookies, or every page turns dynamic under `cacheComponents`. `src/i18n/next-intl.d.ts` types `AppConfig.Messages`, so a wrong key or a missing/misnamed ICU argument fails `pnpm typecheck`. Server components, `generateMetadata` and `"use cache"` functions use `await getTranslations("group")` (`next-intl/server`); client components `useTranslations("group")` — the root layout's `NextIntlClientProvider` passes the whole dictionary, and `global-error.tsx` renders outside it, so it has its own provider with `uk`. Lib code (`game-jsonld.ts`, `getReadablePlatform()`) takes the translator from its caller. Values are ICU: `{name}` arguments (strings — pass numbers through `String()`), `{count, plural, one {…} few {…} many {…} other {…}}`, `select` for word variants (camelCase select keys: ICU rejects `in-progress`), and `t.rich` with named tags for markup. An apostrophe right before `{`, `}` or `<` starts an ICU quote, so wrap arguments in «» or write `''`. A closed union maps onto keys named after its members, read with a typed template key (`` t(`gameStatus.${status}`) ``); a table carrying more than text keeps its classes/icons and loses only its labels; no constants that only hold a `t()` result. Copy that must match across pages (FAQ ↔ JSON-LD) reads the same keys. ESLint (`no-restricted-syntax` in `eslint.config.mjs`) fails `pnpm lint` on any Cyrillic string, template or JSX text outside the dictionary; only the files that list people and team names are exempt (regex literals are not checked, except in tests). Tests read text by key from the dictionary, never as a Cyrillic literal. Format with `uk-UA` / `Europe/Kyiv`, sort with `localeCompare(a, b, "uk")`. A translation entry is «переклад»; the Steam Workshop area is «майстерня». Never write «айтем» in strings, comments or copy.
- Git commits: plain freeform messages. No AI co-author or attribution trailers. No commitlint, no commit-msg hook.

## Comments

Everyone here reads TS faster than prose about TS. **Default to no comment** — write one only for what the code can't say: a workaround and what breaks without it, a business or regulatory rule, a non-obvious ordering or idempotency constraint.

Never narrate a function body — no step-by-step, no `// Step 1:`, no `// loop over users` above a loop. No JSDoc restating the signature; types carry it. No divider or changelog comments, no commented-out code. TODOs need an issue number.

Keep any comment you do write to a single line; do not write multi-line comment blocks. Infrastructure/data code comments in English, product/UI logic in Ukrainian — follow the surrounding file. JSDoc appears in ~14 places in the whole repo; do not add headers to every function.

## Testing and verification

The only test file is `src/i18n/dictionaries.test.ts` (Vitest, node environment; `vitest.config.ts` collects only `src/**/*.test.{ts,tsx}` and resolves `@/` from tsconfig; `pnpm test:run`, or `pnpm vitest run <path>`). Nothing else — components, routes, data fetching — is tested. CI (`.github/workflows/ci.yml`) runs only `typecheck`, `lint`, `format:check`, `knip`, `test:run` on Node 22 — and **never `next build`**. Server/client boundary errors, bad metadata, Supabase-at-build-time failures and Sentry plugin errors reach production unverified.

After any change: `pnpm format && pnpm typecheck && pnpm lint && pnpm knip && pnpm test:run`. For anything touching data fetching, server components, routing or metadata, also run `pnpm build` locally, and check the route table (`○` static vs `ƒ` dynamic) before optimizing anything that assumes prerendering.

`knip.config.ts` lists every file under `src/components/**` as an entry point, so unused *components* are never reported (that is why the `/advertisers` components survive). It does police unused exports in `src/lib`, `src/hooks`, `src/helpers`, `src/providers`, and unused `package.json` dependencies — a new dev dependency that no source file imports must go into `ignoreDependencies` (currently `@typescript-eslint/*`, `tailwindcss`, `postcss`). knip is clean at HEAD.

## Do not

- Do not write user-visible text as a literal — not in JSX, metadata, JSON-LD, aria-labels or toasts. Add the key to `src/i18n/uk.ts`, `en.ts` and `be.ts` and read it with `useTranslations` / `getTranslations`, even for one word. Tests read it by key too.
- Do not read `headers()` / `cookies()` / `searchParams` or call `new Date()` outside `"use cache"` in the layout or a page: under Cache Components it either fails `next build` or turns a prerendered route dynamic. Check the `next build` route table (`○` / `●` / `◐`) after any layout or data-layer change.
- Do not leave a client component that calls `useSearchParams()` with a spinner as its only `<Suspense>` fallback on an indexed page: a static prerender skips that whole subtree, so the HTML ships the fallback. `GamesList` renders the unfiltered catalog (`GamesCatalog` from `initialData`) as its own fallback for that reason, which keeps the catalog in `/games`' HTML. The fallback cannot call React Query (`useQuery` reads `Date.now()`, which the prerender rejects). Check against `pnpm build && pnpm start` (dev does not prerender): `curl -s localhost:3000/games | grep -o 'href="/games/[^"]*"' | sort -u | wc -l` must match production (20).
- Do not add a raw `games` query without `.eq("approved", true).eq("hide", false)`.
- Do not rename or relocate `src/proxy.ts` — it is Next 16's middleware and knip's Next plugin recognizes it by name.
- Do not retype `public/assets/Logo-FanСon.png`. The `С` is U+0421 CYRILLIC CAPITAL ES, and `src/components/landing/PartnerSection.tsx` references it with the same character. Copy-paste the path; a Latin `C` is a silent 404 that looks correct in the diff.
- Do not use unquoted paths for `src/app/guides&tools/` — the route directory contains a literal ampersand and the public URL is `/guides&tools`. Always quote it in shell and grep. The same goes for the `src/app/(query)/` route group (parentheses).
- Do not point `NEXT_PUBLIC_STORAGE_IMAGES_URL` anywhere other than `supabase.lbklauncher.com` without also editing `images.remotePatterns` in `next.config.ts` — it allowlists exactly that one host and `getImageUrl()` passes through any absolute URL stored in the DB, so an off-host `banner_path` throws at render.
- Do not "fix" `src/app/advertisers/page.tsx` — it calls `notFound()` unconditionally on purpose (page body commented out, hence the unused `BOT_URL` warning) — and do not delete `components/advertisers/WhyAdvertisersChooseUs.tsx` or `components/landing/MetricSection.tsx`.
- Do not add a `game_status` value in one place: `STATUS_LABELS` is duplicated in `src/lib/constants.ts` (class prefix `game-status-badge`) and privately in `src/components/games/GameCard.tsx` (prefix `game-card-status`), plus `STATUS_OPTIONS` in `GamesSearch.tsx`. Both class families are styled separately in `globals.css`.
- Do not hand-edit `src/lib/database.types.ts`, and do not reformat it (excluded from Biome and knip).
- Do not add a UTF-8 BOM. `src/app/terms/players/page.tsx` already has a stray one; it is the only such file.
- Do not expect the donaters leaderboard, special thanks, partner logos, `src/lib/featuredTranslations.ts`, `src/lib/specialTranslators.ts` or the `/donaters` stat cards to come from Supabase — they are literal arrays in component and lib modules. Updating them is a code change plus a deploy.
- Do not treat `README.md` as a spec: it lists 3 env vars (12 are read in code), omits 4 of 6 API routes and ~10 route directories and `src/proxy.ts`, points at the old `littlebit-launcher` repo, and claims MIT with no LICENSE file.
- `src/hooks/useClientValue.ts` already wraps the hydration-safe `useSyncExternalStore` pattern; `src/app/(query)/setup/page.tsx` re-implements it inline. Use the hook. Note that file also declares a local `Platform` string-union type that shadows the unrelated `Platform` (`install_source` enum) in `src/lib/types.ts`.

## Environment and deploy

Build-time, inlined into the client bundle (rotating any of these needs a rebuild, not a restart): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STORAGE_IMAGES_URL`, `NEXT_PUBLIC_SENTRY_DSN`, plus `SENTRY_AUTH_TOKEN`/`SENTRY_ORG`/`SENTRY_PROJECT`/`SENTRY_URL` and `SOURCE_COMMIT` (Sentry release name is `${package version}-${commit.slice(0,7)}`; version is still `0.1.0` and never bumped). Server-runtime only: `REDIS_URL`, `REVALIDATE_SECRET`, `GITHUB_TOKEN` (optional, raises the GitHub API rate limit for `/api/github-releases`).

Nothing validates env vars. `src/lib/images.ts` and `src/lib/supabase/server.ts` use `!` at module scope, so a missing value yields `undefined/...` URLs rather than an error.

`pnpm-workspace.yaml` sets `minimumReleaseAge: 4320` (packages published in the last 3 days will not install) and `dangerouslyAllowAllBuilds: false` with an explicit `allowBuilds` list (`@sentry/cli`, `esbuild`, `sharp`, `unrs-resolver`, `workerd`) — a new dep with a postinstall script must be added there or its build step is skipped silently. `.npmrc` sets `save-exact=true`; pin new deps exactly (only `embla-carousel-*`, `react-markdown`, `remark-breaks` still carry carets).

Deploy is Coolify 4.5 with Railpack 0.40.1. It installs exactly the `.nvmrc` Node through mise (volta is not read; without `.nvmrc` it takes its own `lts`), pnpm from `packageManager`, and runs `pnpm run build` / `pnpm run start`. There is no `output: "standalone"`, so the runtime needs full `node_modules`, which Railpack keeps (no pruning). `railpack.json` keeps pnpm's cache (`/root/.cache/pnpm`) in a BuildKit cache rather than the image, so an install with an unchanged `pnpm-lock.yaml` skips the supply-chain check until Coolify's Docker cleanup (`docker buildx prune`, nightly by default) wipes it; its `deployOutputs: []` stops that config step from adding its whole `/app` as an extra image layer. Coolify hands build-time variables to Railpack as BuildKit secrets, so none of them reach the image (Nixpacks baked them in as `ENV`): every variable the server reads at runtime (`REDIS_URL`, `REVALIDATE_SECRET`, `MAINTENANCE_MODE`, `GITHUB_TOKEN`) needs Runtime checked in Coolify. `REDIS_URL` stays off at build time: the build runs inside the BuildKit container, which cannot resolve Coolify's internal container names (Railpack ignores Coolify's `--add-host`), and the code falls back to its in-memory cache. The `.vercel`/`.open-next`/`.wrangler` entries in `.gitignore` are leftovers from an abandoned Cloudflare Workers deploy.
