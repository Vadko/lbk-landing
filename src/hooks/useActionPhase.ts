"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ActionPhase = "idle" | "pending" | "done" | "error";

interface ActionPhaseOptions {
  doneMs?: number;
  errorMs?: number;
  /** 0 — для миттєвих дій (буфер обміну): спінер там зайвий */
  minPendingMs?: number;
}

interface RunOptions<T> {
  isSuccess?: (result: T) => boolean;
  /** успіх не завершує фазу — спінер крутиться, поки контрол не зникне (редиректи) */
  holdPending?: boolean;
}

interface AttemptOptions<T> extends RunOptions<T> {
  label: string;
}

const DONE_MS = 1600;
const ERROR_MS = 2600;
// швидкі відповіді (~100 мс) інакше перестрибують спінер — морфу в галочку не буде з чого починатись
const MIN_PENDING_MS = 900;

export function useActionPhase({
  doneMs = DONE_MS,
  errorMs = ERROR_MS,
  minPendingMs = MIN_PENDING_MS,
}: ActionPhaseOptions = {}) {
  const [phase, setPhase] = useState<ActionPhase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aliveRef = useRef(true);
  const startedAtRef = useRef(0);
  const generationRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      clearTimer();
    };
  }, [clearTimer]);

  // мінімальний спінер дотримуємо таймером, а не паузою в run(): викликач не має чекати на анімацію
  const hold = useCallback(
    (next: "done" | "error") => {
      clearTimer();
      const remaining = Math.max(
        0,
        minPendingMs - (Date.now() - startedAtRef.current)
      );
      timerRef.current = setTimeout(() => {
        if (!aliveRef.current) {
          timerRef.current = null;
          return;
        }
        setPhase(next);
        timerRef.current = setTimeout(
          () => {
            timerRef.current = null;
            if (aliveRef.current) {
              setPhase("idle");
            }
          },
          next === "done" ? doneMs : errorMs
        );
      }, remaining);
    },
    [clearTimer, doneMs, errorMs, minPendingMs]
  );

  const run = useCallback(
    async <T>(
      action: () => Promise<T>,
      options?: RunOptions<T>
    ): Promise<T> => {
      // покоління: застарілий виклик не малює свій результат поверх свіжого
      const generation = ++generationRef.current;
      clearTimer();
      startedAtRef.current = Date.now();
      setPhase("pending");
      let result: T;
      try {
        result = await action();
      } catch (error) {
        if (generation === generationRef.current) {
          hold("error");
        }
        throw error;
      }
      // предикат рахуємо поза try: його власна помилка не має ставати помилкою дії
      let failed = false;
      try {
        failed = options?.isSuccess?.(result) === false;
      } catch (predicateError) {
        console.error("[useActionPhase] isSuccess threw:", predicateError);
        failed = true;
      }
      if (
        generation === generationRef.current &&
        !(!failed && options?.holdPending)
      ) {
        hold(failed ? "error" : "done");
      }
      return result;
    },
    [clearTimer, hold]
  );

  const attempt = useCallback(
    async <T>(
      action: () => Promise<T>,
      options: AttemptOptions<T>
    ): Promise<T | undefined> => {
      try {
        return await run(action, options);
      } catch (error) {
        console.error(`[${options.label}] дія не виконалась:`, error);
        return undefined;
      }
    },
    [run]
  );

  const reset = useCallback(() => {
    generationRef.current += 1;
    clearTimer();
    setPhase("idle");
  }, [clearTimer]);

  return {
    phase,
    isPending: phase === "pending",
    /** контрол лишається на екрані, поки фаза догорає — замість затримки самих даних */
    isBusy: phase !== "idle",
    run,
    attempt,
    reset,
  };
}
