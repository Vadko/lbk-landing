import type { uk } from "./uk";

declare module "next-intl" {
  interface AppConfig {
    Locale: "uk";
    Messages: typeof uk;
  }
}
