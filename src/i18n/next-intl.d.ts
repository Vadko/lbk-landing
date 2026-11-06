import type { routing } from "./routing";
import type { uk } from "./uk";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof uk;
  }
}
