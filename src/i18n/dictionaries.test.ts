import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { isStructurallySame, parse } from "@formatjs/icu-messageformat-parser";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { be } from "./be";
import { en } from "./en";
import { uk } from "./uk";

interface Dictionary {
  [key: string]: string | Dictionary;
}

interface Template {
  pattern: RegExp;
  anchored: boolean;
}

interface Source {
  literals: Set<string>;
  propertyNames: Set<string>;
  templates: Template[];
  imports: string[];
  dynamicNamespaces: Set<string>;
  unknownDynamic: boolean;
}

const ROOT = join(import.meta.dirname, "../..");
const DICTIONARY_DIR = join(ROOT, "src/i18n");
const TRANSLATOR_FACTORIES = new Set([
  "useTranslations",
  "getTranslations",
  "createTranslator",
]);

function flatten(dictionary: Dictionary, prefix = ""): [string, string][] {
  return Object.entries(dictionary).flatMap(
    ([key, value]): [string, string][] => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof value === "string" ? [[path, value]] : flatten(value, path);
    }
  );
}

function structureError(source: string, translation: string) {
  try {
    return isStructurallySame(parse(source), parse(translation)).error?.message;
  } catch (error) {
    return String(error);
  }
}

function listSources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name.startsWith(".") || path === DICTIONARY_DIR
        ? []
        : listSources(path);
    }
    return /\.tsx?$/.test(entry.name) && !/\.(test|d)\.tsx?$/.test(entry.name)
      ? [path]
      : [];
  });
}

function resolveImport(from: string, specifier: string) {
  const base = specifier.startsWith(".")
    ? resolve(dirname(from), specifier)
    : specifier.startsWith("@/")
      ? join(ROOT, "src", specifier.slice(2))
      : null;
  if (!base) {
    return undefined;
  }
  return ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]
    .map((suffix) => `${base}${suffix}`)
    .find((path) => existsSync(path) && statSync(path).isFile());
}

function toTemplate(node: ts.TemplateExpression): Template | null {
  const parts = [
    node.head.text,
    ...node.templateSpans.map((span) => span.literal.text),
  ];
  if (!parts.some((part) => /[a-z]/i.test(part))) {
    return null;
  }
  const escape = (part: string) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    pattern: new RegExp(`^${parts.map(escape).join("(.+?)")}$`),
    anchored: Boolean(node.head.text),
  };
}

function unwrapAwait(node: ts.Expression) {
  return ts.isAwaitExpression(node) ? node.expression : node;
}

// undefined: not a translator; null: namespace not a literal; "": the root.
function translatorNamespace(node: ts.Expression): string | null | undefined {
  const call = unwrapAwait(node);
  if (
    !ts.isCallExpression(call) ||
    !ts.isIdentifier(call.expression) ||
    !TRANSLATOR_FACTORIES.has(call.expression.text)
  ) {
    return undefined;
  }
  const [arg] = call.arguments;
  if (!arg) {
    return "";
  }
  if (ts.isStringLiteralLike(arg)) {
    return arg.text;
  }
  if (!ts.isObjectLiteralExpression(arg)) {
    return null;
  }
  const namespace = arg.properties.find(
    (property) =>
      !ts.isSpreadAssignment(property) &&
      ts.isIdentifier(property.name) &&
      property.name.text === "namespace"
  );
  if (!namespace) {
    return "";
  }
  return ts.isPropertyAssignment(namespace) &&
    ts.isStringLiteralLike(namespace.initializer)
    ? namespace.initializer.text
    : null;
}

function parseSource(path: string): Source {
  const source: Source = {
    literals: new Set(),
    propertyNames: new Set(),
    templates: [],
    imports: [],
    dynamicNamespaces: new Set(),
    unknownDynamic: false,
  };
  const translators = new Map<string, string | null>();
  const dynamicCallees = new Set<string>();
  const bind = (name: ts.BindingName, initializer: ts.Expression) => {
    const namespace = translatorNamespace(initializer);
    const call = unwrapAwait(initializer);
    if (namespace !== undefined && ts.isIdentifier(name)) {
      translators.set(name.text, namespace);
    } else if (
      ts.isArrayBindingPattern(name) &&
      ts.isCallExpression(call) &&
      call.arguments[0] &&
      ts.isArrayLiteralExpression(call.arguments[0])
    ) {
      const items = call.arguments[0].elements;
      name.elements.forEach((element, index) => {
        if (ts.isBindingElement(element) && items[index]) {
          bind(element.name, items[index]);
        }
      });
    }
  };
  const visit = (node: ts.Node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const target = resolveImport(path, node.moduleSpecifier.text);
      if (target) {
        source.imports.push(target);
      }
      return;
    }
    if (ts.isStringLiteralLike(node)) {
      source.literals.add(node.text);
    } else if (ts.isTemplateExpression(node)) {
      const template = toTemplate(node);
      if (template) {
        source.templates.push(template);
      }
    } else if (ts.isVariableDeclaration(node) && node.initializer) {
      bind(node.name, node.initializer);
    } else if (
      (ts.isPropertyAssignment(node) ||
        ts.isShorthandPropertyAssignment(node) ||
        ts.isPropertySignature(node)) &&
      ts.isIdentifier(node.name)
    ) {
      source.propertyNames.add(node.name.text);
    } else if (ts.isCallExpression(node) && node.arguments[0]) {
      const [key] = node.arguments;
      const callee = ts.isPropertyAccessExpression(node.expression)
        ? node.expression.expression
        : node.expression;
      const computed =
        !ts.isStringLiteralLike(key) &&
        !(ts.isTemplateExpression(key) && toTemplate(key));
      if (computed && ts.isIdentifier(callee)) {
        dynamicCallees.add(callee.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(
    ts.createSourceFile(
      path,
      readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest,
      true
    )
  );
  for (const callee of dynamicCallees) {
    const namespace = translators.get(callee);
    if (namespace) {
      source.dynamicNamespaces.add(namespace);
    } else if (
      namespace === null ||
      (callee === "t" && !translators.has(callee))
    ) {
      source.unknownDynamic = true;
    }
  }
  return source;
}

function findUnusedKeys(keys: string[]) {
  const paths = listSources(join(ROOT, "src"));
  const sources = new Map(paths.map((path) => [path, parseSource(path)]));
  const all = [...sources.values()];
  const literals = new Set(all.flatMap((source) => [...source.literals]));
  const values = new Set([
    ...literals,
    ...all.flatMap((source) => [...source.propertyNames]),
  ]);
  const anchored = all.flatMap((source) =>
    source.templates.filter((template) => template.anchored)
  );
  // A file sees what it imports: a bound translator, or a child given `t`.
  const scopes = all.map((source) => {
    const neighbours = [
      source,
      ...source.imports.flatMap((path) => sources.get(path) ?? []),
    ];
    return {
      ...source,
      words: new Set(neighbours.flatMap((item) => [...item.literals])),
      templates: neighbours.flatMap((item) => item.templates),
    };
  });
  const matches = ({ pattern }: Template, key: string) =>
    pattern
      .exec(key)
      ?.slice(1)
      .every((part) => values.has(part)) ?? false;

  return keys.filter((key) => {
    if (
      literals.has(key) ||
      anchored.some((template) => matches(template, key))
    ) {
      return false;
    }
    const parts = key.split(".");
    return !parts.slice(1).some((_, index) => {
      const namespace = parts.slice(0, index + 1).join(".");
      const rest = parts.slice(index + 1).join(".");
      return scopes.some(
        (scope) =>
          (scope.dynamicNamespaces.has(namespace) && values.has(rest)) ||
          (scope.words.has(namespace) &&
            (scope.words.has(rest) ||
              scope.templates.some((template) => matches(template, rest)) ||
              (scope.unknownDynamic && values.has(rest))))
      );
    });
  });
}

const messages = flatten(uk);

describe.each(
  Object.entries({ be, en })
)("%s dictionary", (_locale, dictionary) => {
  const translated = new Map(flatten(dictionary));

  it("keeps the arguments and tags of every uk message", () => {
    const mismatches = messages.flatMap(([key, text]) => {
      const error = structureError(text, translated.get(key) ?? "");
      return error ? [`${key}: ${error}`] : [];
    });
    expect(mismatches).toEqual([]);
  });

  it("has no empty message where uk has text", () => {
    const empty = messages
      .filter(([key, text]) => text.trim() && !translated.get(key)?.trim())
      .map(([key]) => key);
    expect(empty).toEqual([]);
  });
});

describe("uk dictionary", () => {
  it("has no key the code never reads", () => {
    expect(findUnusedKeys(messages.map(([key]) => key))).toEqual([]);
  });
});
