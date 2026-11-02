import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

interface Call {
  method: string;
  args: unknown[];
}

interface Result {
  data: unknown[] | null;
  error: { code: string; message: string } | null;
  count: number | null;
}

interface Query {
  source: string;
  calls: Call[];
}

const db = vi.hoisted(() => {
  const state = {
    queries: [] as Query[],
    answer: (_query: Query): Result => ({ data: [], error: null, count: 0 }),
  };
  const chain = (query: Query): object =>
    new Proxy(
      {},
      {
        get: (_target, prop) => {
          if (prop === "then") {
            return (resolve: (result: Result) => void) =>
              resolve(state.answer(query));
          }
          return (...args: unknown[]) => {
            query.calls.push({ method: String(prop), args });
            return chain(query);
          };
        },
      }
    );
  const start = (source: string, calls: Call[]) => {
    const query = { source, calls };
    state.queries.push(query);
    return chain(query);
  };
  const client = {
    from: (table: string) => start(table, []),
    rpc: (fn: string, params: unknown) =>
      start(fn, [{ method: "rpc", args: [params] }]),
  };
  return { state, client };
});

vi.mock("@/lib/supabase/server", () => ({
  createServerClient: () => db.client,
}));

function row(slug: string) {
  return { slug, name: slug, translations: [] };
}

function rows(prefix: string, count: number) {
  return Array.from({ length: count }, (_, i) => row(`${prefix}_${i}`));
}

function ftsQueryOf(query: Query): string | undefined {
  const call = query.calls.find((c) => c.method === "textSearch");
  return call ? String(call.args[1]) : undefined;
}

function ordersOf(query: Query): unknown[][] {
  return query.calls.filter((c) => c.method === "order").map((c) => c.args);
}

async function get(params: Record<string, string>) {
  const url = new URL("http://localhost/api/games-list");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  const response = await GET(new NextRequest(url));
  return { status: response.status, body: await response.json() };
}

function slugsOf(body: { games: { slug: string }[] }) {
  return body.games.map((g) => g.slug);
}

const PAST_LAST_ROW = {
  data: null,
  error: { code: "PGRST103", message: "Requested range not satisfiable" },
  count: null,
};

beforeEach(() => {
  db.state.queries = [];
  db.state.answer = () => ({ data: [], error: null, count: 0 });
});

describe("GET /api/games-list", () => {
  it("answers a page past the last FTS row from the fuzzy fallback", async () => {
    const fuzzy = rows("fuzzy", 25);
    db.state.answer = (query) =>
      query.source === "fuzzy_search_games"
        ? { data: fuzzy, error: null, count: null }
        : PAST_LAST_ROW;

    const { status, body } = await get({ page: "2", search: "remastred" });

    expect(status).toBe(200);
    expect(body.total).toBe(25);
    expect(slugsOf(body)).toEqual(fuzzy.slice(20).map((r) => r.slug));
  });

  it("still fails on a page past the end of the unsearched catalog", async () => {
    db.state.answer = () => PAST_LAST_ROW;

    const { status } = await get({ page: "99" });

    expect(status).toBe(500);
  });

  it("keeps the fuzzy order under the default name sort", async () => {
    const fuzzy = [row("best"), row("almost"), row("close")];
    db.state.answer = (query) =>
      query.source === "fuzzy_search_games"
        ? { data: fuzzy, error: null, count: null }
        : { data: [], error: null, count: 0 };

    const { body } = await get({ search: "dark sols", sortBy: "name" });

    const rpc = db.state.queries.find((q) => q.source === "fuzzy_search_games");
    expect(rpc && ordersOf(rpc)).toEqual([]);
    expect(slugsOf(body)).toEqual(["best", "almost", "close"]);
  });

  it("orders fuzzy results by an explicit sort with a slug tiebreak", async () => {
    await get({ search: "dark sols", sortBy: "downloads" });

    const rpc = db.state.queries.find((q) => q.source === "fuzzy_search_games");
    expect(rpc && ordersOf(rpc)).toEqual([
      ["downloads", { ascending: false, nullsFirst: false }],
      ["slug", { ascending: true }],
    ]);
  });

  it("breaks ties by slug on the catalog page", async () => {
    db.state.answer = () => ({
      data: rows("game", 20),
      error: null,
      count: 40,
    });

    await get({});

    expect(ordersOf(db.state.queries[0])).toEqual([
      ["name", { ascending: true, nullsFirst: false }],
      ["slug", { ascending: true }],
    ]);
  });

  it("drops the number when the numbered entry is not in the catalog", async () => {
    const series = rows("fallout", 2);
    db.state.answer = (query) => {
      const ftsQuery = ftsQueryOf(query) ?? "";
      return ftsQuery.includes("'4'")
        ? { data: [], error: null, count: 0 }
        : { data: series, error: null, count: 2 };
    };

    const { body } = await get({ search: "fallout 4" });

    const ftsQueries = db.state.queries.map(ftsQueryOf);
    expect(ftsQueries).toHaveLength(2);
    expect(ftsQueries[0]).toContain("'4':*");
    expect(ftsQueries[1]).not.toContain("'4'");
    expect(slugsOf(body)).toEqual(series.map((r) => r.slug));
  });

  it("stops at the numbered query when it finds the entry", async () => {
    db.state.answer = () => ({ data: [row("gta_5")], error: null, count: 1 });

    const { body } = await get({ search: "gta 5" });

    expect(db.state.queries).toHaveLength(1);
    expect(slugsOf(body)).toEqual(["gta_5"]);
  });

  it("tries the other keyboard layout before the fuzzy fallback", async () => {
    db.state.answer = (query) =>
      ftsQueryOf(query) === "('war':*)"
        ? { data: [row("war_thunder")], error: null, count: 1 }
        : { data: [], error: null, count: 0 };

    // eslint-disable-next-line no-restricted-syntax -- "war" typed with the Ukrainian layout on
    const { body } = await get({ search: "цфк" });

    expect(db.state.queries.map((q) => q.source)).not.toContain(
      "fuzzy_search_games"
    );
    expect(slugsOf(body)).toEqual(["war_thunder"]);
  });

  it("retries without the number on the filtered path too", async () => {
    const series = [
      { ...row("fallout_nv"), translations: [{ status: "completed" }] },
    ];
    db.state.answer = (query) => {
      if (query.source === "fuzzy_search_games") {
        return { data: [], error: null, count: null };
      }
      const ftsQuery = ftsQueryOf(query) ?? "";
      return ftsQuery.includes("'4'")
        ? { data: [], error: null, count: null }
        : { data: series, error: null, count: null };
    };

    const { body } = await get({ search: "fallout 4", statuses: "completed" });

    expect(db.state.queries.map((q) => q.source)).toEqual([
      "games_grouped",
      "games_grouped",
    ]);
    expect(ordersOf(db.state.queries[0])).toEqual([
      ["name", { ascending: true, nullsFirst: false }],
      ["slug", { ascending: true }],
    ]);
    expect(slugsOf(body)).toEqual(["fallout_nv"]);
  });
});
