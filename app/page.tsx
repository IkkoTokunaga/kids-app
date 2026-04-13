import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム",
};

/* =====================================================
   アプリカードのデータ定義
   ===================================================== */
type App = {
  id: string;
  icon: string;
  title: string;
  ruby: string;
  description: string;
  bg: string;
  iconBg: string;
  badgeColor: string;
  href?: string;
};

const apps: App[] = [
  {
    id: "moji",
    icon: "📝",
    title: "もじあそび",
    ruby: "文字あそび",
    description: "ひらがな・カタカナを楽しく練習しよう",
    bg: "bg-pastel-pink",
    iconBg: "bg-pink-100",
    badgeColor: "text-pink-700 bg-pink-100",
    href: "https://kids-quiz-meiro.vercel.app/",
  },
  {
    id: "kazu",
    icon: "🔢",
    title: "かずあそび",
    ruby: "数あそび",
    description: "数字と計算をゲーム感覚でマスターしよう",
    bg: "bg-pastel-blue",
    iconBg: "bg-blue-100",
    badgeColor: "text-blue-700 bg-blue-100",
  },
  {
    id: "e",
    icon: "🎨",
    title: "えあそび",
    ruby: "絵あそび",
    description: "絵を描いて表現力と創造力を育てよう",
    bg: "bg-pastel-orange",
    iconBg: "bg-orange-100",
    badgeColor: "text-orange-700 bg-orange-100",
    href: "https://kids-oekaki.vercel.app/",
  },
  {
    id: "oto",
    icon: "🎵",
    title: "おとあそび",
    ruby: "音あそび",
    description: "音楽とリズムで豊かな感性を磨こう",
    bg: "bg-pastel-green",
    iconBg: "bg-green-100",
    badgeColor: "text-green-700 bg-green-100",
    href: "https://kids-sound.vercel.app/",
  },
  {
    id: "katachi",
    icon: "🔷",
    title: "かたちあそび",
    ruby: "形あそび",
    description: "図形やパズルで論理的思考力をアップ",
    bg: "bg-pastel-purple",
    iconBg: "bg-purple-100",
    badgeColor: "text-purple-700 bg-purple-100",
  },
  {
    id: "iro",
    icon: "🌈",
    title: "いろあそび",
    ruby: "色あそび",
    description: "色彩感覚を育てながら楽しく学ぼう",
    bg: "bg-pastel-yellow",
    iconBg: "bg-yellow-100",
    badgeColor: "text-yellow-700 bg-yellow-100",
  },
];

/* =====================================================
   ヘッダーコンポーネント
   ===================================================== */
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <span className="text-3xl" role="img" aria-label="鉛筆">
          🎓
        </span>
        <div>
          <p className="text-xs text-ink-muted leading-none">Portfolio</p>
          <h1 className="text-lg font-bold text-ink leading-tight">
            知育アプリ ポートフォリオ
          </h1>
        </div>
      </div>
    </header>
  );
}

/* =====================================================
   ヒーローセクション
   ===================================================== */
function Hero() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="hero-heading"
    >
      {/* 背景グラデーション */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.09 95) 0%, oklch(0.93 0.06 240) 50%, oklch(0.93 0.07 175) 100%)",
        }}
        aria-hidden="true"
      />
      {/* 装飾的な円 */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 -z-10"
        style={{ background: "oklch(0.93 0.06 350)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-30 -z-10"
        style={{ background: "oklch(0.91 0.08 300)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-4xl mb-4" role="img" aria-label="星">
          🌟
        </p>
        <h2
          id="hero-heading"
          className="text-3xl sm:text-4xl font-extrabold text-ink mb-4 leading-tight"
        >
          子どもたちの
          <span className="text-brand">「好き」</span>
          を育てる
          <br />
          学習アプリのポートフォリオ
        </h2>
        <p className="text-base sm:text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
          ひらがなから算数、音楽まで。
          <br />
          遊びながら楽しく学べる知育アプリを開発中です。
        </p>
      </div>
    </section>
  );
}

/* =====================================================
   アプリカードコンポーネント
   ===================================================== */
function AppCard({ app }: { app: App }) {
  const cardBody = (
    <article
      className={`${app.bg} rounded-card p-6 flex flex-col items-center text-center gap-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md`}
      aria-label={`${app.title} - ${app.href ? "リンクあり" : "準備中"}`}
    >
      {/* アイコン */}
      <div
        className={`${app.iconBg} w-20 h-20 rounded-kids flex items-center justify-center text-4xl shadow-sm`}
        role="img"
        aria-label={app.ruby}
      >
        {app.icon}
      </div>

      {/* タイトル */}
      <div>
        <p className="text-xs text-ink-muted mb-1">{app.ruby}</p>
        <h3 className="text-xl font-bold text-ink">{app.title}</h3>
      </div>

      {/* 説明文 */}
      <p className="text-sm text-ink-muted leading-relaxed">
        {app.description}
      </p>

      {/* ステータスバッジ */}
      <span
        className={`${app.badgeColor} text-xs font-bold px-4 py-1.5 rounded-badge`}
        aria-label={app.href ? "あそんでみる" : "準備中"}
      >
        {app.href ? "▶ あそんでみる" : "🚧 Coming Soon"}
      </span>
    </article>
  );

  if (!app.href) return cardBody;

  return (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
      aria-label={`${app.title} を新しいタブで開く`}
    >
      {cardBody}
    </a>
  );
}

/* =====================================================
   フッターコンポーネント
   ===================================================== */
function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-2xl mb-2" role="img" aria-label="虹">
          🌈
        </p>
        <p className="text-sm text-ink-muted">
          子どもたちの笑顔のために、毎日コツコツ開発中
        </p>
        <p className="text-xs text-ink-muted mt-2 opacity-60">
          © {new Date().getFullYear()} 知育アプリ ポートフォリオ
        </p>
      </div>
    </footer>
  );
}

/* =====================================================
   ページルート
   ===================================================== */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* アプリ一覧 */}
        <section
          className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
          aria-labelledby="apps-heading"
        >
          <h2
            id="apps-heading"
            className="text-2xl font-extrabold text-ink text-center mb-10"
          >
            📱 アプリ一覧
          </h2>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {apps.map((app) => (
              <li key={app.id}>
                <AppCard app={app} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
