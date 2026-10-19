import type { createTranslator, Messages } from "next-intl";
import { Constants } from "@/lib/database.types";
import type { Platform } from "@/lib/types";

type PlatformTranslator = ReturnType<
  typeof createTranslator<Messages, "storePlatform">
>;

const PLATFORMS: readonly string[] = Constants.public.Enums.install_source;

const isPlatform = (platform: string): platform is Platform =>
  PLATFORMS.includes(platform);

export const getReadablePlatform = (
  t: PlatformTranslator,
  platform: string
): string => (isPlatform(platform) ? t(platform) : platform);
