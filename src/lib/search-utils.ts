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

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length >= 2);
}

export function buildFtsQuery(input: string): string {
  if (!input) {
    return "";
  }

  const buildExpr = (tokens: string[]) =>
    tokens.map((t) => `'${t}':*`).join(" & ");

  const primary = tokenize(input);
  const translit = getTransliteration(input);
  const translitTokens = translit ? tokenize(translit) : [];

  const exprs: string[] = [];
  if (primary.length) {
    exprs.push(`(${buildExpr(primary)})`);
  }
  if (translitTokens.length) {
    exprs.push(`(${buildExpr(translitTokens)})`);
  }

  return exprs.join(" | ");
}
