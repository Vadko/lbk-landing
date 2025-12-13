import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  project: ["src/**/*.{ts,tsx}"],
  ignore: ["src/lib/database.types.ts"],
  ignoreDependencies: [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
    "tailwindcss",
    "postcss",
  ],
};

export default config;
