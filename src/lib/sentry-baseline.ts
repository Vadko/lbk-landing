import type { init } from "@sentry/nextjs";

type SentryOptions = NonNullable<Parameters<typeof init>[0]>;

const SENSITIVE_KEY_DENYLIST = ["forwarded", "-ip", "remote-", "via", "-user"];

// SDK v11 collects more by default; this pins the v10 behaviour (sendDefaultPii off, no synthetic stack traces)
export const sentryV10Baseline = {
  attachStacktrace: false,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: {
      request: { deny: SENSITIVE_KEY_DENYLIST },
      response: { deny: SENSITIVE_KEY_DENYLIST },
    },
    httpBodies: [],
    urlQueryParams: { deny: SENSITIVE_KEY_DENYLIST },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    graphQL: { document: false, variables: false },
    frameContextLines: 7,
  },
} satisfies Pick<SentryOptions, "attachStacktrace" | "dataCollection">;
