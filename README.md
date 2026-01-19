# LBK Launcher - Landing Page

Landing page for [LBK Launcher](https://github.com/Vadko/lbk-launcher) - a game launcher with Ukrainian translations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase
- **Data Fetching:** TanStack Query
- **Deployment:** Cloudflare Workers (via @opennextjs/cloudflare)
- **Caching:** Cloudflare KV

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (Next.js) |
| `pnpm build:cf` | Build for Cloudflare Workers |
| `pnpm preview` | Preview Cloudflare build locally |
| `pnpm deploy:cf` | Deploy to Cloudflare |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm knip` | Find unused code |
| `pnpm types:generate` | Generate Supabase types |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── github-releases/  # GitHub releases API (cached in KV)
│   ├── games/             # Games pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── landing/           # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ShowcaseSection.tsx
│   │   ├── CollaborationSection.tsx
│   │   └── FaqSection.tsx
│   ├── games/             # Game-related components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configs
└── providers/             # React context providers
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Cloudflare Configuration

KV namespace is configured in `wrangler.jsonc`:
- `NEXT_CACHE_WORKERS_KV` - used for Next.js incremental cache and GitHub releases caching

## License

MIT
