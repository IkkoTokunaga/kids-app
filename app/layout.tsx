import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

/* 知育アプリらしい丸みのある日本語フォント
   CJK フォントは巨大なため preload: false を指定 */
const rounded = M_PLUS_Rounded_1c({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rounded-var",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "知育アプリ ポートフォリオ",
    template: "%s | 知育アプリ ポートフォリオ",
  },
  description:
    "子どもたちが楽しみながら学べる知育アプリのポートフォリオサイト。もじあそび・かずあそび・えあそびなど、遊びながら学べるアプリを開発中。",
  keywords: ["知育", "子ども", "学習", "アプリ", "ひらがな", "算数"],
  authors: [{ name: "kids-app" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "知育アプリ ポートフォリオ",
    description: "子どもたちが楽しみながら学べる知育アプリ集",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${rounded.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
