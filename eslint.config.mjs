import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const CYRILLIC = "/[А-Яа-яЁёҐґЄєІіЇї]/";
const noUkrainianLiterals = [
  `Literal[value=${CYRILLIC}]`,
  `TemplateElement[value.raw=${CYRILLIC}]`,
  `JSXText[value=${CYRILLIC}]`,
].map((selector) => ({
  selector,
  message:
    "Put user-visible text into src/i18n/uk.ts and read it with useTranslations/getTranslations.",
}));

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-restricted-syntax": ["error", ...noUkrainianLiterals],
    },
  },
  {
    // The dictionary, and lists of people and team names, which are data rather than copy.
    files: [
      "src/i18n/uk.ts",
      "src/lib/specialTranslators.ts",
      "src/components/collaboration/PartnersListSection.tsx",
      "src/components/donaters/LeaderboardSection.tsx",
      "src/components/donaters/SpecialThanksSection.tsx",
      "src/components/landing/PartnerSection.tsx",
    ],
    rules: { "no-restricted-syntax": "off" },
  },
]);

export default eslintConfig;
