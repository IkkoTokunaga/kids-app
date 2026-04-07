"use client";

import "./globals.css";

/**
 * ルート layout をまたぐ致命エラー用。
 * html / body を自前で包む必須仕様。next/font は使わず globals.css の font-sans を利用。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const digest =
    error && typeof error === "object" && "digest" in error && error.digest
      ? String(error.digest)
      : undefined;

  return (
    <html lang="ja">
      <body className="font-sans min-h-screen flex flex-col items-center justify-center bg-pastel-blue/30 p-6 antialiased">
        <div className="max-w-md rounded-card border border-pastel-blue/40 bg-surface-card p-8 text-center shadow-lg">
          <h1 className="mb-2 text-xl font-bold text-ink">
            ちょっと問題がおきたよ
          </h1>
          <p className="mb-6 text-sm text-ink-muted">
            ページを読み込めなかったよ。もう一度試してみてね。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-kids bg-brand px-6 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              もういちど
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="rounded-kids border-2 border-brand bg-white px-6 py-3 text-sm font-bold text-brand"
            >
              いちページへ
            </button>
          </div>
          {digest ? (
            <p className="mt-6 font-mono text-xs text-ink-muted">#{digest}</p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
