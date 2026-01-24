# LBK Launcher - Landing Page

Landing page for [LBK Launcher](https://github.com/Vadko/littlebit-launcher) - a game launcher with Ukrainian translations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase
- **Data Fetching:** TanStack Query
- **Caching:** Redis
- **Formatting:** Biome

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
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Biome |
| `pnpm format:check` | Check code formatting |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm knip` | Find unused code |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── github-releases/  # GitHub releases API (cached in Redis)
│   │   └── revalidate/       # Cache revalidation endpoint
│   ├── games/             # Games catalog and detail pages
│   ├── open/              # Deep link handler for launcher
│   ├── setup/             # Setup instructions page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── game-detail/       # Game detail page components
│   ├── games/             # Games catalog components
│   ├── landing/           # Landing page sections
│   ├── layout/            # Layout components (Navbar, Footer, etc.)
│   ├── open/              # Open in launcher components
│   └── ui/                # Reusable UI components
├── helpers/               # Helper functions
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configs
└── providers/             # React context providers
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
REDIS_URL=your_redis_url
```

## License

MIT
