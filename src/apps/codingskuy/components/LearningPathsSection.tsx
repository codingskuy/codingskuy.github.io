import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useT } from "@/hooks/useT";

interface LearningPathsSectionProps {
  darkMode: boolean;
}

const DEV = typeof window !== "undefined" && window.location.hostname === "localhost";
const CODINGSTUFF_BASE = DEV ? "http://localhost:4321/codingstuff" : "/codingstuff";
const ARTICLES_BASE = DEV ? "http://localhost:4322/articles" : "https://roiskhoiron.github.io/articles";

const getArticleLink = (id: string) => {
  const map: Record<string, string> = {
    flutter: `${ARTICLES_BASE}/docs/tutorials/flutter/`,
    android: `${ARTICLES_BASE}/docs/tutorials/android/`,
    backend: `${ARTICLES_BASE}/docs/tutorials/backend/`,
    python: `${ARTICLES_BASE}/docs/tutorials/python/`,
    ai: `${ARTICLES_BASE}/docs/tutorials/ai/`,
    career: `${ARTICLES_BASE}/docs/articles/career/`,
  };
  return map[id] || `${ARTICLES_BASE}/`;
};

const paths = [
  {
    id: "flutter",
    title: "Flutter Engineering",
    emoji: "📱",
    color: "#3d8bff",
    level: "Beginner → Expert",
    duration: "6 months",
    lessons: 48,
    progress: 75,
    milestones: ["Dart basics", "Widgets & layouts", "State management", "API integration", "Production deployment"],
  },
  {
    id: "android",
    title: "Android Development",
    emoji: "🤖",
    color: "#00d4ff",
    level: "Beginner → Advanced",
    duration: "5 months",
    lessons: 36,
    progress: 0,
    milestones: ["Kotlin fundamentals", "Android Studio", "Jetpack Compose", "Architecture patterns", "Play Store release"],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    emoji: "⚙️",
    color: "#8b5cf6",
    level: "Intermediate → Expert",
    duration: "4 months",
    lessons: 32,
    progress: 40,
    milestones: ["Python & FastAPI", "Database design", "Auth & security", "Docker & CI/CD", "Cloud deploy"],
  },
  {
    id: "python",
    title: "Python Programming",
    emoji: "🐍",
    color: "#ffd700",
    level: "Beginner → Intermediate",
    duration: "3 months",
    lessons: 24,
    progress: 0,
    milestones: ["Python syntax", "OOP concepts", "Libraries & packages", "Data handling", "Automation scripts"],
  },
  {
    id: "ai",
    title: "AI Engineering",
    emoji: "🤖",
    color: "#ff6b35",
    level: "Intermediate → Expert",
    duration: "5 months",
    lessons: 40,
    progress: 20,
    milestones: ["LLM fundamentals", "Prompt engineering", "RAG systems", "AI agents", "MCP protocol"],
  },
  {
    id: "career",
    title: "Career Development",
    emoji: "🚀",
    color: "#00d4ff",
    level: "All levels",
    duration: "Ongoing",
    lessons: 20,
    progress: 60,
    milestones: ["Portfolio building", "Resume & LinkedIn", "Interview prep", "Salary negotiation", "Freelancing"],
  },
];

export function LearningPathsSection({ darkMode = false }: LearningPathsSectionProps) {
  const t = useT();
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <section id="learning" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffd700]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#ff6b35" }}>
              {t.learning.title}
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ff6b35]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#ffd700] bg-clip-text text-transparent">
              {t.learning.heading}
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            {t.learning.desc}
          </p>
        </motion.div>

        {/* Paths grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group p-6 rounded-3xl cursor-pointer transition-all duration-300"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 8px 32px rgba(0,0,0,0.25)" : "0 8px 32px rgba(0,85,255,0.05)",
              }}
            >
              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${path.color}15` }}
                >
                  {path.emoji}
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: textMain }}>{path.title}</h3>
                  <span className="text-xs font-medium" style={{ color: path.color }}>{path.level}</span>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: textMuted }}>
                <span>⏱ {path.duration}</span>
                <span>📚 {path.lessons} lessons</span>
              </div>

              {/* Progress bar */}
              {path.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1" style={{ color: textMuted }}>
                    <span>Progress</span>
                    <span style={{ color: path.color }}>{path.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: darkMode ? "#131e38" : "#f0f4ff" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${path.color}, ${path.color}80)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${path.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Milestones */}
              <div className="flex flex-col gap-1.5 mb-5">
                {path.milestones.map((m, idx) => (
                  <div key={m} className="flex items-center gap-2">
                    {idx < Math.ceil((path.progress / 100) * path.milestones.length) ? (
                      <CheckCircle2 size={13} style={{ color: path.color, flexShrink: 0 }} />
                    ) : (
                      <Circle size={13} style={{ color: textMuted, flexShrink: 0 }} className="opacity-40" />
                    )}
                    <span
                      className="text-xs"
                      style={{ color: idx < Math.ceil((path.progress / 100) * path.milestones.length) ? textMain : textMuted }}
                    >
                      {m}
                    </span>
                  </div>
                ))}
              </div>

               {/* CTA */}
               <a
                 href={getArticleLink(path.id)}
                 target="_self"
                 className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                 style={{
                   background: path.progress > 0
                     ? `linear-gradient(135deg, ${path.color}, ${path.color}99)`
                     : "transparent",
                   color: path.progress > 0 ? "white" : path.color,
                   border: `1px solid ${path.color}40`,
                   boxShadow: path.progress > 0 ? `0 4px 12px ${path.color}30` : "none",
                 }}
               >
                 {path.progress > 0 ? "Lanjutkan Belajar" : "Mulai Sekarang"}
                 <ArrowRight size={15} />
               </a>
            </motion.div>
          ))}
        </div>

        {/* CTA to codingstuff */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={CODINGSTUFF_BASE}
            target="_self"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-[#ff6b35] to-[#ffd700] text-white shadow-xl shadow-[#ff6b35]/25 hover:shadow-[#ff6b35]/40 hover:scale-105 transition-all duration-200"
          >
            {t.learning.cta} <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
