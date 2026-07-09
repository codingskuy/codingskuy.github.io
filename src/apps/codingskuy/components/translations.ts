import type { Language } from "../../contexts/LanguageContext";

export type Translations = {
  nav: {
    about: string; learning: string; projects: string; media: string;
    ailab: string; community: string; activity: string; philosophy: string; hireMe: string;
  };
  hero: {
    badge: string; titleMain: string; titleSub: string;
    desc: string; ctaStart: string; ctaExplore: string;
    joinCommunity: string; follow: string; scroll: string;
  };
  about: {
    title: string; subtitle: string; role: string; location: string;
    email: string; status: string; story1: string; story2: string;
    founder: string;
    highlights: {
      mobileDev: { label: string; desc: string };
      backend: { label: string; desc: string };
      aiExploration: { label: string; desc: string };
      techWriting: { label: string; desc: string };
      community: { label: string; desc: string };
    };
    quote: string; quoteAuthor: string;
  };
  metrics: { title: string; heading: string; items: { value: string; label: string }[] };
  learning: { title: string; heading: string; desc: string; cta: string; items: { title: string; desc: string }[] };
  showcase: { title: string; heading: string; desc: string; items: { title: string; desc: string; tech: string[] }[] };
  portfolio: { title: string; heading: string; cta: string; projects: { name: string; desc: string }[] };
  mediaHub: { title: string; heading: string; desc: string };
  contentLibrary: { title: string; heading: string; desc: string };
  aiLab: { title: string; heading: string; desc: string; items: { title: string; desc: string }[] };
  community: { title: string; heading: string; desc: string; join: string };
  openSource: { title: string; heading: string; desc: string; items: { name: string; desc: string }[] };
  newsletter: { title: string; heading: string; desc: string; placeholder: string; button: string };
  footer: {
    brand: string; tagline: string; explore: string; codingskuy: string;
    research: string; about: string; portfolio: string;
    contact: string; articles: string; tutorials: string; learningPaths: string;
    community_: string; aiLab_: string; openSource: string; githubProjects: string;
    newsletter_: string; copyright: string; madeWith: string; privacy: string;
    terms: string; sitemap: string;
  };
};

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      about: "Tentang", learning: "Pembelajaran", projects: "Proyek",
      media: "Media", ailab: "AI Lab", community: "Komunitas", activity: "Aktivitas", philosophy: "Filosofi",       hireMe: "Gabung Komunitas",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "Jurnal Pembelajaran & Repositori Engineering",
      desc: "Sebuah platform terbuka dan playground gratis dari komunitas untuk mendokumentasikan proses belajar, menulis tutorial teknis, dan membagikan keputusan arsitektur software engineering.",
      ctaStart: "Jelajahi Jurnal", ctaExplore: "Gabung Komunitas",
      joinCommunity: "Gabung Komunitas", follow: "Ikuti:", scroll: "gulir",
    },
    about: {
      title: "Tentang CodingSkuy",
      subtitle: "Mengapa Ini Ada",
      role: "",
      location: "Jakarta, Indonesia",
      email: "",
      status: "",
      story1: "CodingSkuy! bukanlah bisnis atau startup komersial. Ini adalah jurnal pembelajaran terbuka dari komunitas untuk berbagi praktik engineering — mencakup tata kelola, pengambilan keputusan, mitigasi risiko, arsitektur, dan eksplorasi teknis — kepada sesama developer secara gratis.",
      story2: "Tujuan utama kami adalah mempermudah proses belajar engineering dengan menyajikan dokumentasi yang praktis, berbasis proyek nyata, dan mudah dipahami oleh developer di Indonesia.",
      founder: "",
      highlights: {
        mobileDev: { label: "Desain Produk", desc: "UI/UX & Design Thinking" },
        backend: { label: "QA Engineering", desc: "Testing & Quality Assurance" },
        aiExploration: { label: "Manajerial", desc: "Kepemimpinan & Strategi" },
        techWriting: { label: "Dokumentasi", desc: "Technical Writing & Pengetahuan" },
        community: { label: "Komunitas", desc: "Belajar & berbagi bersama" },
        softwareEng: { label: "Software Engineering", desc: "Arsitektur & Best Practices" },
      },
      quote: "\"CodingSkuy adalah ruang bagi member hebat yang peduli dengan pertumbuhan bersama — bukan sekadar individu. Budaya gotong royong dan kolaborasi yang kami bangun membuat setiap anggota terbiasa dengan kualitas kerja tim, sehingga lebih mudah beradaptasi saat bekerja di proyek nyata di organisasi mana pun.\"",
      quoteAuthor: "",
    },
    metrics: {
      title: "Dampak & Jangkauan",
      heading: "Pencapaian dalam Angka",
      items: [
        { value: "50+", label: "Konten Teknologi" },
        { value: "12", label: "Proyek Open Source" },
        { value: "5K+", label: "Komunitas Developer" },
        { value: "∞", label: "Semangat Belajar" },
      ],
    },
    learning: {
      title: "Kursus Gratis",
      heading: "Belajar dari Karya Member Aktif",
      desc: "Kursus dan tutorial gratis karya member komunitas yang suka berbagi. Belajar, berkembang, dan berkontribusi bersama kami.",
      cta: "Jelajahi Semua Kursus Gratis",
      items: [
        { title: "Mobile Development", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "Backend & API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI & Machine Learning", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps & Tools", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "Proyek Unggulan",
      heading: "Lihat CodingSkuy dalam Aksi",
      desc: "Sekilas tentang platform, komunitas, dan ekosistem yang dibangun untuk developer Indonesia.",
      items: [
        { title: "ChefGenie", desc: "AI-powered kitchen companion.", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "Backend-as-a-Service lokal.", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "Karya Member",
      heading: "Karya Unggulan Member",
      cta: "Lihat Semua Karya Member",
      projects: [
        { name: "ChefGenie", desc: "Aplikasi dapur cerdas dengan AI." },
        { name: "CodingSkuy Platform", desc: "Platform belajar dan media teknologi." },
      ],
    },
    mediaHub: {
      title: "Media Hub",
      heading: "Learn, Build, Share",
      desc: "Artikel, tutorial, dan video tentang teknologi terkini dari CodingSkuy.",
    },
    contentLibrary: {
      title: "Karya Member",
      heading: "Kontribusi Member Aktif",
      desc: "Koleksi artikel, tutorial, dan source code karya member CodingSkuy yang suka berbagi ilmu.",
    },
    aiLab: {
      title: "Lab AI",
      heading: "Eksperimen Member",
      desc: "Hasil eksperimen dan riset AI dari member — mulai dari LLM, RAG, hingga AI agents production.",
      items: [
        { title: "LLM Playground", desc: "Eksperimen dengan berbagai Large Language Model." },
        { title: "AI Vision", desc: "Computer vision untuk deteksi objek dan OCR." },
      ],
    },
    community: {
      title: "Komunitas", heading: "Gabung Komunitas", desc: "Bergabung dengan sesama developer Indonesia.", join: "Gabung Sekarang",
    },
    openSource: {
      title: "Open Source",
      heading: "Proyek Open Source Member",
      desc: "Proyek open source yang dibuat dan dikelola oleh member CodingSkuy.",
      items: [
        { name: "lean-ctx", desc: "Context engineering tools untuk AI agent." },
        { name: "MCP Servers", desc: "Model Context Protocol implementations." },
      ],
    },
    newsletter: {
      title: "Dapatkan Update Terbaru", heading: "Update Mingguan", desc: "Dapatkan insight terbaru seputar software engineering, AI, Flutter, backend, dan eksperimen teknologi — langsung ke inbox kamu, setiap minggu.", placeholder: "email@example.com", button: "Langganan",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "Learning Technology Should Be Fun.",
      explore: "Jelajahi", codingskuy: "CodingSkuy", research: "Riset & OS",
      about: "Tentang", portfolio: "Portfolio",
      contact: "Kontak", articles: "Artikel", tutorials: "Tutorial",
      learningPaths: "Jalur Belajar", community_: "Komunitas",
      aiLab_: "AI Lab", openSource: "Open Source", githubProjects: "Proyek GitHub",
      newsletter_: "Newsletter",
      copyright: "CodingSkuy! oleh Komunitas",
      madeWith: "Dibuat dengan", privacy: "Privasi", terms: "Ketentuan", sitemap: "Peta Situs",
    },
  },
  en: {
    nav: {
      about: "About", learning: "Learning", projects: "Projects",
      media: "Media", ailab: "AI Lab", community: "Community", activity: "Activity", philosophy: "Philosophy",       hireMe: "Join Community",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "Learning Journal & Engineering Repository",
      desc: "An open platform and free playground from the community to document learning processes, write technical tutorials, and share software engineering architecture decisions.",
      ctaStart: "Explore Journal", ctaExplore: "Join Community",
      joinCommunity: "Join Community", follow: "Follow:", scroll: "scroll",
    },
    about: {
      title: "About CodingSkuy",
      subtitle: "Why It Exists",
      role: "",
      location: "Jakarta, Indonesia",
      email: "",
      status: "",
      story1: "CodingSkuy! is not a commercial business or startup. It is an open learning journal initiated by the community for sharing engineering practices — covering governance, decision-making, risk mitigation, architecture, and technical exploration — with other developers for free.",
      story2: "Our core mission is to simplify the engineering learning process by providing practical, project-based documentation that is easy for Indonesian developers to understand.",
      founder: "",
      highlights: {
        mobileDev: { label: "Product Design", desc: "UI/UX & Design Thinking" },
        backend: { label: "QA Engineering", desc: "Testing & Quality Assurance" },
        aiExploration: { label: "Managerial", desc: "Leadership & Strategy" },
        techWriting: { label: "Documentation", desc: "Technical Writing & Knowledge" },
        community: { label: "Community", desc: "Learning & sharing together" },
        softwareEng: { label: "Software Engineering", desc: "Architecture & Best Practices" },
      },
      quote: "\"CodingSkuy is a space for great members who care about growing together — not just individuals. The gotong royong culture and collaboration we build prepares every member with real team-work quality, making it easier to adapt when working on real projects in any organization.\"",
      quoteAuthor: "",
    },
    metrics: {
      title: "Impact & Reach",
      heading: "Achievements in Numbers",
      items: [
        { value: "50+", label: "Tech Contents" },
        { value: "12", label: "Open Source Projects" },
        { value: "5K+", label: "Developer Community" },
        { value: "∞", label: "Learning Spirit" },
      ],
    },
    learning: {
      title: "Free Courses",
      heading: "Learn from Active Members' Works",
      desc: "Free courses and tutorials crafted by community members who love sharing. Learn, grow, and contribute together.",
      cta: "Explore All Free Courses",
      items: [
        { title: "Mobile Development", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "Backend & API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI & Machine Learning", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps & Tools", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "Featured Projects",
      heading: "See CodingSkuy in Action",
      desc: "A glimpse into the platform, community, and ecosystem built for Indonesian developers.",
      items: [
        { title: "ChefGenie", desc: "AI-powered kitchen companion.", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "Local Backend-as-a-Service.", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "Member Works",
      heading: "Featured Member Works",
      cta: "View All Member Works",
      projects: [
        { name: "ChefGenie", desc: "Smart kitchen app with AI." },
        { name: "CodingSkuy Platform", desc: "Learning platform and tech media." },
      ],
    },
    mediaHub: {
      title: "Media Hub",
      heading: "Learn, Build, Share",
      desc: "Articles, tutorials, and videos on latest tech from CodingSkuy.",
    },
    contentLibrary: {
      title: "Member Content",
      heading: "Active Members' Contributions",
      desc: "A collection of articles, tutorials, and source code from CodingSkuy members who love sharing knowledge.",
    },
    aiLab: {
      title: "AI Lab",
      heading: "Member Experiments",
      desc: "AI experiments and research results from members — from LLMs, RAG, to production AI agents.",
      items: [
        { title: "LLM Playground", desc: "Experiments with various Large Language Models." },
        { title: "AI Vision", desc: "Computer vision for object detection and OCR." },
      ],
    },
    community: {
      title: "Community", heading: "Join Community", desc: "Join fellow Indonesian developers.", join: "Join Now",
    },
    openSource: {
      title: "Open Source",
      heading: "Members' Open Source Projects",
      desc: "Open source projects built and maintained by CodingSkuy members.",
      items: [
        { name: "lean-ctx", desc: "Context engineering tools for AI agents." },
        { name: "MCP Servers", desc: "Model Context Protocol implementations." },
      ],
    },
    newsletter: {
      title: "Get Latest Updates", heading: "Weekly Update", desc: "Get the latest insights on software engineering, AI, Flutter, backend, and tech experiments — delivered to your inbox every week.", placeholder: "email@example.com", button: "Subscribe",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "Learning Technology Should Be Fun.",
      explore: "Explore", codingskuy: "CodingSkuy", research: "Research & OS",
      about: "About", portfolio: "Portfolio",
      contact: "Contact", articles: "Articles", tutorials: "Tutorials",
      learningPaths: "Learning Paths", community_: "Community",
      aiLab_: "AI Lab", openSource: "Open Source", githubProjects: "GitHub Projects",
      newsletter_: "Newsletter",
      copyright: "CodingSkuy! by the Community",
      madeWith: "Made with", privacy: "Privacy", terms: "Terms", sitemap: "Sitemap",
    },
  },
  zh: {
    nav: {
      about: "关于", learning: "学习", projects: "项目",
      media: "媒体", ailab: "AI实验室", community: "社区", activity: "动态", philosophy: "理念",       hireMe: "加入社区",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "学习日志与工程技术仓库",
      desc: "一个由社区创建的开放平台与免费游乐场，旨在记录学习过程、编写技术教程并分享软件工程架构决策。",
      ctaStart: "探索日志", ctaExplore: "加入社区",
      joinCommunity: "加入社区", follow: "关注:", scroll: "滚动",
    },
    about: {
      title: "关于CodingSkuy",
      subtitle: "为什么存在",
      role: "",
      location: "雅加达，印度尼西亚",
      email: "",
      status: "",
      story1: "CodingSkuy! 不是商业项目或创业公司。它是一个由社区发起的开放平台，用于分享工程实践——涵盖治理、决策、风险缓解、架构和技术探索——并向其他开发者免费提供。",
      story2: "我们的核心使命是通过提供易于印尼开发者理解的、基于项目的实用文档来简化工程学习过程。",
      founder: "",
      highlights: {
        mobileDev: { label: "产品设计", desc: "UI/UX 与设计思维" },
        backend: { label: "QA 工程", desc: "测试与质量保证" },
        aiExploration: { label: "管理", desc: "领导力与战略" },
        techWriting: { label: "文档", desc: "技术写作与知识管理" },
        community: { label: "社区", desc: "共同学习与分享" },
        softwareEng: { label: "软件工程", desc: "架构与最佳实践" },
      },
      quote: "\"CodingSkuy 是一个为关心共同成长的优秀成员而设的空间——不仅仅是个人。我们建立的互助合作文化让每位成员具备真正的团队协作能力，在任何组织的真实项目中都能快速适应。\"",
      quoteAuthor: "",
    },
    metrics: {
      title: "影响与覆盖",
      heading: "数据成就",
      items: [
        { value: "50+", label: "技术内容" },
        { value: "12", label: "开源项目" },
        { value: "5K+", label: "开发者社区" },
        { value: "∞", label: "学习精神" },
      ],
    },
    learning: {
      title: "免费课程",
      heading: "向活跃成员的作品学习",
      desc: "由热爱分享的社区成员制作的免费课程和教程。一起学习、成长和贡献。",
      cta: "探索所有免费课程",
      items: [
        { title: "移动开发", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "后端与API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI与机器学习", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps与工具", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "视频展示",
      heading: "看CodingSkuy在行动",
      desc: "平台、社区和生态系统的简介，专为印尼开发者打造。",
      items: [
        { title: "ChefGenie", desc: "AI驱动的厨房助手。", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "本地后端即服务。", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "成员作品",
      heading: "精选成员作品",
      cta: "查看所有成员作品",
      projects: [
        { name: "ChefGenie", desc: "智能厨房AI应用。" },
        { name: "CodingSkuy平台", desc: "学习平台和技术媒体。" },
      ],
    },
    mediaHub: {
      title: "媒体中心",
      heading: "学习、构建、分享",
      desc: "来自CodingSkuy的最新技术文章、教程和视频。",
    },
    contentLibrary: {
      title: "成员内容",
      heading: "活跃成员的贡献",
      desc: "来自热爱分享的CodingSkuy成员的文章、教程和源代码合集。",
    },
    aiLab: {
      title: "AI实验室",
      heading: "成员实验",
      desc: "来自成员的AI实验和研究成果——从LLM、RAG到生产级AI智能体。",
      items: [
        { title: "LLM游乐场", desc: "各种大型语言模型的实验。" },
        { title: "AI视觉", desc: "用于物体检测和OCR的计算机视觉。" },
      ],
    },
    community: {
      title: "社区", heading: "加入社区", desc: "与印尼开发者同行交流。", join: "立即加入",
    },
    openSource: {
      title: "开源",
      heading: "成员的开源项目",
      desc: "由CodingSkuy成员构建和维护的开源项目。",
      items: [
        { name: "lean-ctx", desc: "AI智能体的上下文工程工具。" },
        { name: "MCP服务器", desc: "模型上下文协议实现。" },
      ],
    },
    newsletter: {
      title: "获取最新更新", heading: "每周更新", desc: "获取软件工程、AI、Flutter、后端和技术实验的最新见解——每周发送到你的邮箱。", placeholder: "email@example.com", button: "订阅",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "学习技术应该很有趣。",
      explore: "探索", codingskuy: "CodingSkuy", research: "研究与开源",
      about: "关于", portfolio: "作品集",
      contact: "联系", articles: "文章", tutorials: "教程",
      learningPaths: "学习路径", community_: "社区",
      aiLab_: "AI实验室", openSource: "开源", githubProjects: "GitHub项目",
      newsletter_: "通讯",
      copyright: "CodingSkuy! 由社区共建",
      madeWith: "用心制作", privacy: "隐私", terms: "条款", sitemap: "网站地图",
    },
  },
  ja: {
    nav: {
      about: "概要", learning: "学習", projects: "プロジェクト",
      media: "メディア", ailab: "AIラボ", community: "コミュニティ", activity: "アクティビティ", philosophy: "哲学",       hireMe: "コミュニティに参加",
    },
    hero: {
      badge: "CodingSkuy!", titleMain: "CodingSkuy!", titleSub: "学習ジャーナル & エンジニアリングリポジトリ",
      desc: "コミュニティによって作られた、学習プロセスのドキュメント化、技術チュートリアルの執筆、ソフトウェアエンジニアリングアーキテクチャの意思決定を共有するためのオープンプラットフォームおよび無料のプレイグラウンド。",
      ctaStart: "ジャーナルを探索", ctaExplore: "コミュニティに参加",
      joinCommunity: "コミュニティに参加", follow: "フォロー:", scroll: "スクロール",
    },
    about: {
      title: "CodingSkuyについて",
      subtitle: "存在理由",
      role: "",
      location: "ジャカルタ、インドネシア",
      email: "",
      status: "",
      story1: "CodingSkuy! は商業プロジェクトやスタートアップではありません。コミュニティによって始められたオープンな学習ジャーナルで、エンジニアリング実践を共有するためのプラットフォームです — ガバナンス、意思決定、リスク軽減、アーキテクチャ、技術探求をカバーし、他の開発者と無料で共有します。",
      story2: "私たちの核心ミッションは、インドネシアの開発者が理解しやすい実践的かつプロジェクトベースのドキュメントを提供することで、エンジニアリングの学習プロセスを簡素化することです。",
      founder: "",
      highlights: {
        mobileDev: { label: "プロダクトデザイン", desc: "UI/UX & デザイン思考" },
        backend: { label: "QAエンジニアリング", desc: "テスト & 品質保証" },
        aiExploration: { label: "マネジリアル", desc: "リーダーシップ & 戦略" },
        techWriting: { label: "ドキュメンテーション", desc: "テクニカルライティング & 知識" },
        community: { label: "コミュニティ", desc: "共に学び、共有する" },
        softwareEng: { label: "ソフトウェアエンジニアリング", desc: "アーキテクチャ & ベストプラクティス" },
      },
      quote: "\"CodingSkuy は共に成長することを大切にする素晴らしいメンバーのための空間です — 個人だけではありません。私たちが築く相互扶助と協力の文化は、すべてのメンバーに真のチームワーク力を養い、どの組織の実践的なプロジェクトでも適応しやすくします。\"",
      quoteAuthor: "",
    },
    metrics: {
      title: "影響とリーチ",
      heading: "数字で見る実績",
      items: [
        { value: "50+", label: "技術コンテンツ" },
        { value: "12", label: "オープンソースプロジェクト" },
        { value: "5K+", label: "開発者コミュニティ" },
        { value: "∞", label: "学習精神" },
      ],
    },
    learning: {
      title: "無料コース",
      heading: "アクティブメンバーの作品から学ぶ",
      desc: "共有を愛するコミュニティメンバーが作った無料のコースとチュートリアル。一緒に学び、成長し、貢献しましょう。",
      cta: "すべての無料コースを見る",
      items: [
        { title: "モバイル開発", desc: "Flutter, Kotlin, SwiftUI." },
        { title: "バックエンド・API", desc: "FastAPI, PostgreSQL, Firebase." },
        { title: "AI・機械学習", desc: "LLM, Vision, Speech AI." },
        { title: "DevOps・ツール", desc: "Docker, CI/CD, MCP Server." },
      ],
    },
    showcase: {
      title: "ビデオショーケース",
      heading: "CodingSkuyの動作を見る",
      desc: "インドネシアの開発者向けに構築されたプラットフォーム、コミュニティ、エコシステムの概要。",
      items: [
        { title: "ChefGenie", desc: "AI搭載キッチンコンパニオン。", tech: ["Flutter", "AI", "FastAPI"] },
        { title: "InsForge", desc: "ローカルBaaS。", tech: ["Go", "PostgreSQL"] },
      ],
    },
    portfolio: {
      title: "メンバー作品",
      heading: "厳選メンバー作品",
      cta: "すべてのメンバー作品を見る",
      projects: [
        { name: "ChefGenie", desc: "AIスマートキッチンアプリ。" },
        { name: "CodingSkuyプラットフォーム", desc: "学習プラットフォーム＆テックメディア。" },
      ],
    },
    mediaHub: {
      title: "メディアハブ",
      heading: "学ぶ、作る、共有する",
      desc: "CodingSkuyからの最新技術記事、チュートリアル、動画。",
    },
    contentLibrary: {
      title: "メンバーコンテンツ",
      heading: "アクティブメンバーの貢献",
      desc: "知識共有を愛するCodingSkuyメンバーによる記事、チュートリアル、ソースコードのコレクション。",
    },
    aiLab: {
      title: "AIラボ",
      heading: "メンバー実験",
      desc: "メンバーによるAI実験と研究結果 — LLM、RAGから本番AIエージェントまで。",
      items: [
        { title: "LLMプレイグラウンド", desc: "様々な大規模言語モデルの実験。" },
        { title: "AIビジョン", desc: "物体検出とOCRのためのコンピュータビジョン。" },
      ],
    },
    community: {
      title: "コミュニティ", heading: "コミュニティに参加", desc: "仲間のインドネシア開発者と交流。", join: "今すぐ参加",
    },
    openSource: {
      title: "オープンソース",
      heading: "メンバーのオープンソースプロジェクト",
      desc: "CodingSkuyメンバーによって構築・管理されているオープンソースプロジェクト。",
      items: [
        { name: "lean-ctx", desc: "AIエージェント向けコンテキストエンジニアリングツール。" },
        { name: "MCPサーバー", desc: "Model Context Protocolの実装。" },
      ],
    },
    newsletter: {
      title: "最新情報を受け取る", heading: "週刊アップデート", desc: "ソフトウェアエンジニアリング、AI、Flutter、バックエンド、テクノロジー実験に関する最新情報を毎週あなたの受信箱にお届けします。", placeholder: "email@example.com", button: "購読",
    },
    footer: {
      brand: "CodingSkuy!", tagline: "Learning Technology Should Be Fun.",
      explore: "探索", codingskuy: "CodingSkuy", research: "研究・OS",
      about: "概要", portfolio: "ポートフォリオ",
      contact: "お問い合わせ", articles: "記事", tutorials: "チュートリアル",
      learningPaths: "学習パス", community_: "コミュニティ",
      aiLab_: "AIラボ", openSource: "オープンソース", githubProjects: "GitHubプロジェクト",
      newsletter_: "ニュースレター",
      copyright: "CodingSkuy! コミュニティより",
      madeWith: "によって作られました", privacy: "プライバシー", terms: "利用規約", sitemap: "サイトマップ",
    },
  },
};
