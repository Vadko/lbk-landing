"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="uk">
      <body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#0a0e14",
            color: "#e0e0e0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px" }}>Щось пішло не так</h2>
            <button
              onClick={reset}
              type="button"
              style={{
                padding: "12px 24px",
                backgroundColor: "#4a9eff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
