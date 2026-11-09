import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { transformSync } from "@babel/core";
import reactCompiler, { type LoggerEvent } from "babel-plugin-react-compiler";
import { describe, expect, it } from "vitest";

const SRC = path.resolve(import.meta.dirname);

const sources = readdirSync(SRC, { recursive: true, encoding: "utf8" }).filter(
  (file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$|\.d\.ts$/.test(file)
);

const HOOK_DECLARATION =
  /^(?:export )?(?:async )?function (use[A-Z0-9]\w*)|^(?:export )?const (use[A-Z0-9]\w*)\s*=/gm;

const failuresIn = (file: string): string[] => {
  const source = readFileSync(path.join(SRC, file), "utf8");
  const events: LoggerEvent[] = [];
  transformSync(source, {
    filename: file,
    babelrc: false,
    configFile: false,
    code: false,
    parserOpts: { plugins: ["typescript", "jsx"] },
    plugins: [
      [
        reactCompiler,
        {
          logger: {
            logEvent: (_: string, event: LoggerEvent) => events.push(event),
          },
        },
      ],
    ],
  });
  // CompileSuccess names no arrow assigned to a const, so a hook is matched by the line it starts on
  const compiledLines = new Set(
    events.flatMap((event) =>
      event.kind === "CompileSuccess" ? [event.fnLoc?.start.line] : []
    )
  );
  // A use* function that calls no hook is skipped without an error and memoizes nothing
  const skippedHooks = [...source.matchAll(HOOK_DECLARATION)]
    .filter(
      (match) =>
        !compiledLines.has(source.slice(0, match.index).split("\n").length)
    )
    .map(
      (match) =>
        `${file} ${match[1] ?? match[2]}: never compiled; a function that calls no hook is not a hook`
    );
  return [
    ...skippedHooks,
    ...events.flatMap((event) => {
      if (event.kind === "CompileError") {
        return [`${file}:${event.fnLoc?.start.line} ${event.detail.reason}`];
      }
      if (event.kind === "PipelineError") {
        return [`${file}:${event.fnLoc?.start.line} ${event.data}`];
      }
      return [];
    }),
  ];
};

// Lint does not see syntax the compiler cannot lower yet, and such a component ships unmemoized
describe("React Compiler", () => {
  it("compiles every component and hook in src", { timeout: 60_000 }, () => {
    expect(sources.flatMap(failuresIn)).toEqual([]);
  });
});
