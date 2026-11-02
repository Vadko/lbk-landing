import CyrillicToTranslit from "cyrillic-to-translit-js";

const translitUk = CyrillicToTranslit({ preset: "uk" });

function getTransliteration(input: string): string | null {
  const hasCyrillic = /[а-яіїєґА-ЯІЇЄҐ]/.test(input);
  const hasLatin = /[a-zA-Z]/.test(input);

  if (hasCyrillic) {
    const translit = translitUk.transform(input);
    if (translit && translit !== input) {
      return translit.toLowerCase();
    }
  }

  if (hasLatin) {
    const reverse = translitUk.reverse(input);
    if (reverse && reverse !== input) {
      return reverse.toLowerCase();
    }
  }

  return null;
}

export function getTranslitVariant(input: string): string | null {
  return getTransliteration(input);
}

function tokenize(value: string, keepDigits: boolean): string[] {
  const parts = value.toLowerCase().split(/[^\p{L}\p{N}]+/u);
  const words = parts.filter((t) => t.length >= 2);

  if (!keepDigits || words.length === 0) {
    return words;
  }
  return parts.filter((t) => t.length >= 2 || /^\p{N}+$/u.test(t));
}

function buildFtsQuery(input: string, keepDigits: boolean): string {
  if (!input) {
    return "";
  }

  const buildExpr = (tokens: string[]) =>
    tokens.map((t) => `'${t}':*`).join(" & ");

  const primary = tokenize(input, keepDigits);
  const translit = getTransliteration(input);
  const translitTokens = translit ? tokenize(translit, keepDigits) : [];

  const exprs: string[] = [];
  if (primary.length) {
    exprs.push(`(${buildExpr(primary)})`);
  }
  if (translitTokens.length) {
    exprs.push(`(${buildExpr(translitTokens)})`);
  }

  return exprs.join(" | ");
}

export function buildFtsQueries(input: string): string[] {
  const queries = [buildFtsQuery(input, true), buildFtsQuery(input, false)];
  return [...new Set(queries)].filter(Boolean);
}
