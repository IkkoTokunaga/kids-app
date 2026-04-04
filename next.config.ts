import type { NextConfig } from "next";

/* ==========================================================
   セキュリティヘッダー定義
   情報処理安全確保支援士の視点:
   - XSS / クリックジャッキング / MIME スニッフィング対策
   - CSP は開発環境向け (本番では nonce ベースへ強化推奨)
   ========================================================== */
const securityHeaders = [
  // DNS プリフェッチを有効化してパフォーマンス向上
  { key: "X-DNS-Prefetch-Control", value: "on" },

  // HSTS: 2 年間 HTTPS を強制 (本番のみ有効)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // クリックジャッキング対策
  { key: "X-Frame-Options", value: "SAMEORIGIN" },

  // MIME タイプスニッフィング防止
  { key: "X-Content-Type-Options", value: "nosniff" },

  // リファラー情報の制限
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // 不要な API へのアクセスを禁止
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },

  // Content Security Policy
  // 本番では 'unsafe-inline' / 'unsafe-eval' を削除し nonce を使用すること
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' ws: wss:",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Docker 本番イメージを最小化するための standalone モード
  output: "standalone",

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
