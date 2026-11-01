import { getRequestConfig } from "next-intl/server";
import { uk } from "./uk";

// Ukrainian only and no locale routing: reading the request would make every page dynamic under cacheComponents.
export default getRequestConfig(async () => ({
  locale: "uk",
  timeZone: "Europe/Kyiv",
  messages: uk,
}));
