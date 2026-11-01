import * as Sentry from "@sentry/nextjs";
import { sentryV10Baseline } from "@/lib/sentry-baseline";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  ...sentryV10Baseline,
  integrations: [Sentry.captureConsoleIntegration({ levels: ["error"] })],
});
