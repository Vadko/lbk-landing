import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { transformSync } from "@babel/core";
import reactCompiler, { type LoggerEvent } from "babel-plugin-react-compiler";
import { describe, expect, it } from "vitest";

const SRC = path.resolve(import.meta.dirname);

const sources = readdirSync(SRC, { recursive: true, encoding: "utf8" }).filter(
  (file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$|\.d\.ts$/.test(file)
);

const failuresIn = (file: string): string[] => {
  const events: LoggerEvent[] = [];
  transformSync(readFileSync(path.join(SRC, file), "utf8"), {
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
  return events.flatMap((event) => {
    if (event.kind === "CompileError") {
      return [`${file}:${event.fnLoc?.start.line} ${event.detail.reason}`];
    }
    if (event.kind === "PipelineError") {
      return [`${file}:${event.fnLoc?.start.line} ${event.data}`];
    }
    return [];
  });
};

// Lint does not see syntax the compiler cannot lower yet, and such a component ships unmemoized
describe("React Compiler", () => {
  it("compiles every component and hook in src", { timeout: 60_000 }, () => {
    expect(sources.flatMap(failuresIn)).toEqual([]);
  });
});
