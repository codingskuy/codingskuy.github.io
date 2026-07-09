import { motion } from "motion/react";
import { GitBranch, Users, Brain, BarChart2 } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const copy: Record<Language, { tag: string; titleTop: string; titleBottom: string; description: string }> = {
  id: {
    tag: "Filosofi Belajar",
    titleTop: "Prinsip yang",
    titleBottom: "Mengarahkan Setiap Pembelajaran",
    description: "Pendekatan belajar yang kami terapkan di setiap langkah — dari memahami konsep dasar hingga membangun proyek nyata bersama.",
  },
  en: {
    tag: "Learning Philosophy",
    titleTop: "Principles That",
    titleBottom: "Guide Every Learning",
    description: "The learning approach we apply at every step — from understanding core concepts to building real projects together.",
  },
  zh: {
    tag: "学习理念",
    titleTop: "指导每次学习的",
    titleBottom: "核心原则",
    description: "我们从理解基础概念到构建真实项目，每一步都遵循的学习方法。",
  },
  ja: {
    tag: "学習理念",
    titleTop: "すべての学習を導く",
    titleBottom: "原則",
    description: "基本概念の理解から実際のプロジェクト構築まで、あらゆる段階でコミュニティが適用する学習アプローチです。",
  },
};

type Pillar = {
  icon: typeof GitBranch;
  color: string;
  title: string;
  description: string;
  principles: string[];
};

const pillarData: Record<Language, Pillar[]> = {
  id: [
    {
      icon: GitBranch,
      color: "blue",
      title: "Belajar Sistematis",
      description: "Kami memandang belajar seperti merancang sistem — setiap konsep saling terhubung dan dibangun di atas fondasi yang kokoh.",
      principles: ["Belajar Bertahap", "Pemahaman Fondasi", "Latihan Konsisten", "Proyek Nyata"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "Belajar Aktif",
      description: "Belajar bukan hanya membaca, tapi mempraktikkan. Setiap teori harus diuji dalam proyek nyata untuk membangun pemahaman mendalam.",
      principles: ["Learning by Doing", "Eksperimen", "Dokumentasi", "Diskusi & Review"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "Knowledge Architecture",
      description: "Pengetahuan harus terstruktur agar mudah diakses, dihubungkan, dan dikembangkan seiring waktu.",
      principles: ["Catatan Terstruktur", "Mind Mapping", "Spaced Repetition", "Cross-Referensi"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "Pertumbuhan Berkelanjutan",
      description: "Kemajuan diukur bukan dari seberapa banyak yang dihafal, tapi dari seberapa mampu menerapkan dan mengajarkan kembali.",
      principles: ["Progress Tracking", "Portofolio", "Mengajar Orang Lain", "Umpan Balik"],
    },
  ],
  en: [
    {
      icon: GitBranch,
      color: "blue",
      title: "Systematic Learning",
      description: "We approach learning like designing a system — each concept connects and builds on a solid foundation.",
      principles: ["Step-by-Step", "Foundation First", "Consistent Practice", "Real Projects"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "Active Learning",
      description: "Learning isn't just reading — it's doing. Every theory must be tested in real projects to build deep understanding.",
      principles: ["Learning by Doing", "Experimentation", "Documentation", "Discussion & Review"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "Knowledge Architecture",
      description: "Knowledge must be structured so it's easy to access, connect, and grow over time.",
      principles: ["Structured Notes", "Mind Mapping", "Spaced Repetition", "Cross-References"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "Continuous Growth",
      description: "Progress is measured not by how much you memorize, but by how well you can apply and teach it back.",
      principles: ["Progress Tracking", "Portfolio Building", "Teaching Others", "Feedback Loops"],
    },
  ],
  zh: [
    {
      icon: GitBranch,
      color: "blue",
      title: "系统化学习",
      description: "我把学习视为设计系统——每个概念相互关联，建立在坚实基础之上。",
      principles: ["循序渐进", "打好基础", "持续练习", "真实项目"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "主动学习",
      description: "学习不只是阅读，而是实践。每个理论都必须在真实项目中测试，以建立深入理解。",
      principles: ["做中学", "实验探索", "记录总结", "讨论评审"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "知识架构",
      description: "知识必须结构化，才能便于访问、连接和随时间发展。",
      principles: ["结构化笔记", "思维导图", "间隔重复", "交叉引用"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "持续成长",
      description: "进步不是看你记住了多少，而是看你能否应用和教会他人。",
      principles: ["进度追踪", "作品积累", "教别人", "反馈循环"],
    },
  ],
  ja: [
    {
      icon: GitBranch,
      color: "blue",
      title: "システム的な学習",
      description: "学習をシステム設計のように捉え、各概念がつながり、強固な基盤の上に構築されます。",
      principles: ["段階的学習", "基礎を固める", "継続的な練習", "実践プロジェクト"],
    },
    {
      icon: Brain,
      color: "violet",
      title: "アクティブラーニング",
      description: "学ぶことは読むことではなく、実践すること。理論を実際のプロジェクトで試して深い理解を得ます。",
      principles: ["実践で学ぶ", "実験", "記録", "議論とレビュー"],
    },
    {
      icon: Users,
      color: "cyan",
      title: "知識のアーキテクチャ",
      description: "知識はアクセス、接続、成長が容易になるよう構造化されるべきです。",
      principles: ["構造化ノート", "マインドマップ", "間隔反復", "相互参照"],
    },
    {
      icon: BarChart2,
      color: "emerald",
      title: "継続的な成長",
      description: "進歩は暗記量ではなく、応用し教えられる能力で測られます。",
      principles: ["進捗トラッキング", "ポートフォリオ", "他者に教える", "フィードバック"],
    },
  ],
};

const colorStyles: Record<string, { icon: string; border: string; tag: string; line: string }> = {
  blue: {
    icon: "text-blue-500 dark:text-blue-400 bg-blue-500/10",
    border: "hover:border-blue-400/30 dark:hover:border-blue-500/25",
    tag: "bg-blue-500/8 text-blue-600 dark:text-blue-400 border-blue-500/15",
    line: "bg-blue-500",
  },
  violet: {
    icon: "text-violet-500 dark:text-violet-400 bg-violet-500/10",
    border: "hover:border-violet-400/30 dark:hover:border-violet-500/25",
    tag: "bg-violet-500/8 text-violet-600 dark:text-violet-400 border-violet-500/15",
    line: "bg-violet-500",
  },
  cyan: {
    icon: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10",
    border: "hover:border-cyan-400/30 dark:hover:border-cyan-500/25",
    tag: "bg-cyan-500/8 text-cyan-600 dark:text-cyan-400 border-cyan-500/15",
    line: "bg-cyan-500",
  },
  emerald: {
    icon: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10",
    border: "hover:border-emerald-400/30 dark:hover:border-emerald-500/25",
    tag: "bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 border-emerald-500/15",
    line: "bg-emerald-500",
  },
};

export function PhilosophySection({ darkMode }: { darkMode: boolean }) {
  const { language } = useLanguage();
  const text = copy[language];
  const pillars = pillarData[language];

  return (
    <section id="philosophy" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background tint */}
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? "bg-white/[0.015]" : ""}`} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.06] to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400">
            {text.tag}
          </span>
          <h2 className="text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white mt-3 leading-tight">
            {text.titleTop}
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              {text.titleBottom}
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl">
            {text.description}
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => {
            const styles = colorStyles[pillar.color];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className={`group relative p-6 rounded-2xl bg-white/85 dark:bg-[#090d1a]/80 border border-slate-200 dark:border-white/[0.08] ${styles.border} transition-all duration-200 hover:shadow-md dark:hover:shadow-none`}
              >
                {/* Top line accent */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] ${styles.line} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${styles.icon} flex items-center justify-center mb-5`}>
                  <pillar.icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-slate-900 dark:text-white tracking-tight mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {pillar.description}
                </p>

                {/* Principles list */}
                <ul className="space-y-1.5">
                  {pillar.principles.map((principle) => (
                    <li
                      key={principle}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${styles.tag} inline-flex items-center gap-1.5 mr-1.5 mb-1`}
                    >
                      <span className={`w-1 h-1 rounded-full ${styles.line}`} />
                      {principle}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
