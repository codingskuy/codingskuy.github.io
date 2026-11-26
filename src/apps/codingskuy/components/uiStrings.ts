import { useLanguage, type Language } from "@/contexts/LanguageContext";

type UiStrings = {
  journey: {
    eyebrow: string;
    heading: string;
    desc: string;
    steps: { title: string; desc: string; cta: string }[];
  };
  learning: { continue: string; start: string };
  content: { searchPlaceholder: string; showMore: string; showLess: string; browseAll: string };
  newsletter: { namePlaceholder: string; note: string };
  media: { allContent: string };
  nav: { menu: string; toggleTheme: string; skip: string; backToTop: string };
};

const strings: Record<Language, UiStrings> = {
  id: {
    journey: {
      eyebrow: "Mulai dari sini",
      heading: "Kamu lagi di tahap mana?",
      desc: "Pilih titik berangkatmu — setiap jalur langsung membawamu ke bagian yang paling relevan.",
      steps: [
        { title: "Baru mulai ngoding", desc: "Pahami fondasi software engineering dari nol, tanpa jargon.", cta: "Baca fondasi" },
        { title: "Mau belajar terarah", desc: "Ikuti learning path Flutter, Backend, Python, sampai AI.", cta: "Pilih jalur" },
        { title: "Butuh inspirasi proyek", desc: "Lihat karya nyata member dan bedah cara mereka membangunnya.", cta: "Lihat karya" },
        { title: "Siap tumbuh bareng", desc: "Gabung diskusi, review kode, dan belajar bareng komunitas.", cta: "Gabung komunitas" },
      ],
    },
    learning: { continue: "Lanjutkan Belajar", start: "Mulai Sekarang" },
    content: {
      searchPlaceholder: "Cari artikel, tutorial, atau topik...",
      showMore: "Tampilkan lebih banyak",
      showLess: "Tampilkan lebih sedikit",
      browseAll: "Buka semua artikel",
    },
    newsletter: { namePlaceholder: "Nama kamu", note: "Tanpa spam. Berhenti langganan kapan saja." },
    media: { allContent: "Semua Konten" },
    nav: { menu: "Menu", toggleTheme: "Ganti tema terang/gelap", skip: "Lompat ke konten", backToTop: "Kembali ke atas" },
  },
  en: {
    journey: {
      eyebrow: "Start here",
      heading: "Where are you on your journey?",
      desc: "Pick your starting point — each path takes you straight to the part that matters most.",
      steps: [
        { title: "New to coding", desc: "Learn software engineering foundations from scratch, jargon-free.", cta: "Read the basics" },
        { title: "Want a guided path", desc: "Follow learning paths for Flutter, Backend, Python, and AI.", cta: "Pick a path" },
        { title: "Need project ideas", desc: "Explore real member projects and how they were built.", cta: "See the work" },
        { title: "Ready to grow together", desc: "Join discussions, code reviews, and community study groups.", cta: "Join the community" },
      ],
    },
    learning: { continue: "Continue Learning", start: "Start Now" },
    content: {
      searchPlaceholder: "Search articles, tutorials, or topics...",
      showMore: "Show more",
      showLess: "Show less",
      browseAll: "Browse all articles",
    },
    newsletter: { namePlaceholder: "Your name", note: "No spam. Unsubscribe anytime." },
    media: { allContent: "All Content" },
    nav: { menu: "Menu", toggleTheme: "Toggle light/dark theme", skip: "Skip to content", backToTop: "Back to top" },
  },
  zh: {
    journey: {
      eyebrow: "从这里开始",
      heading: "你现在处于哪个阶段？",
      desc: "选择你的起点——每条路径都会直接带你到最相关的内容。",
      steps: [
        { title: "刚开始学编程", desc: "从零理解软件工程基础，没有术语堆砌。", cta: "阅读基础" },
        { title: "想要系统学习", desc: "跟随 Flutter、后端、Python 到 AI 的学习路径。", cta: "选择路径" },
        { title: "需要项目灵感", desc: "看看成员的真实作品，了解他们如何构建。", cta: "查看作品" },
        { title: "准备一起成长", desc: "加入讨论、代码评审和社区共学。", cta: "加入社区" },
      ],
    },
    learning: { continue: "继续学习", start: "立即开始" },
    content: {
      searchPlaceholder: "搜索文章、教程或主题...",
      showMore: "显示更多",
      showLess: "收起",
      browseAll: "浏览全部文章",
    },
    newsletter: { namePlaceholder: "你的名字", note: "无垃圾邮件，可随时退订。" },
    media: { allContent: "全部内容" },
    nav: { menu: "菜单", toggleTheme: "切换明暗主题", skip: "跳到正文", backToTop: "回到顶部" },
  },
  ja: {
    journey: {
      eyebrow: "ここからスタート",
      heading: "いまどの段階にいますか？",
      desc: "出発点を選ぶと、いちばん役立つセクションへ直接移動できます。",
      steps: [
        { title: "コーディングを始めたばかり", desc: "ソフトウェアエンジニアリングの基礎をゼロから学べます。", cta: "基礎を読む" },
        { title: "体系的に学びたい", desc: "Flutter・バックエンド・Python・AI のラーニングパス。", cta: "パスを選ぶ" },
        { title: "プロジェクトのヒントが欲しい", desc: "メンバーの実例と、その作り方を見てみましょう。", cta: "作品を見る" },
        { title: "一緒に成長したい", desc: "ディスカッションやコードレビュー、勉強会に参加。", cta: "コミュニティに参加" },
      ],
    },
    learning: { continue: "学習を続ける", start: "今すぐ始める" },
    content: {
      searchPlaceholder: "記事・チュートリアル・トピックを検索...",
      showMore: "もっと見る",
      showLess: "折りたたむ",
      browseAll: "すべての記事を見る",
    },
    newsletter: { namePlaceholder: "お名前", note: "スパムなし。いつでも解除できます。" },
    media: { allContent: "すべてのコンテンツ" },
    nav: { menu: "メニュー", toggleTheme: "ライト/ダークを切り替え", skip: "本文へスキップ", backToTop: "トップへ戻る" },
  },
};

export function useUi(): UiStrings {
  const { language } = useLanguage();
  return strings[language];
}
