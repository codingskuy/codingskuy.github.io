import { motion } from "motion/react";
import { Star, GitFork, ExternalLink, CircleDot } from "lucide-react";
import { useT } from "@/hooks/useT";

interface OpenSourceSectionProps {
  darkMode: boolean;
}

const repos = [
  {
    name: "skuy-mcp",
    desc: "MCP server collection for AI agents — GitHub, Linear, Slack, Figma integrations",
    stars: 2100,
    forks: 234,
    lang: "TypeScript",
    langColor: "#3178c6",
    category: "AI Tools",
    status: "Active",
    statusColor: "#22c55e",
    topics: ["mcp", "ai-agents", "claude", "developer-tools"],
  },
  {
    name: "flutter-bloc-generator",
    desc: "VS Code extension to scaffold BLoC pattern files instantly in Flutter projects",
    stars: 847,
    forks: 91,
    lang: "Dart",
    langColor: "#00B4AB",
    category: "Flutter",
    status: "Active",
    statusColor: "#22c55e",
    topics: ["flutter", "bloc", "vscode", "code-generation"],
  },
  {
    name: "fastapi-starter",
    desc: "Production-ready FastAPI boilerplate with auth, RBAC, testing, Docker, and CI/CD",
    stars: 523,
    forks: 112,
    lang: "Python",
    langColor: "#3572A5",
    category: "Backend",
    status: "Active",
    statusColor: "#22c55e",
    topics: ["fastapi", "python", "boilerplate", "postgresql"],
  },
  {
    name: "codingskuy-ui",
    desc: "React component library built for the CodingSkuy design system — 50+ components",
    stars: 312,
    forks: 45,
    lang: "TypeScript",
    langColor: "#3178c6",
    category: "Design System",
    status: "Beta",
    statusColor: "#f59e0b",
    topics: ["react", "tailwind", "components", "design-system"],
  },
  {
    name: "dart-ai-sdk",
    desc: "Unofficial Dart SDK for Claude, OpenAI, and Gemini APIs with streaming support",
    stars: 289,
    forks: 38,
    lang: "Dart",
    langColor: "#00B4AB",
    category: "SDK",
    status: "Active",
    statusColor: "#22c55e",
    topics: ["dart", "flutter", "ai", "claude", "openai"],
  },
  {
    name: "devdash",
    desc: "Flutter-based developer productivity dashboard — GitHub, CI/CD, deployments in one place",
    stars: 189,
    forks: 27,
    lang: "Dart",
    langColor: "#00B4AB",
    category: "SaaS",
    status: "WIP",
    statusColor: "#6366f1",
    topics: ["flutter", "dashboard", "github", "developer-tools"],
  },
];

export function OpenSourceSection({ darkMode }: OpenSourceSectionProps) {
  const t = useT();
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <section id="opensource" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#3d8bff]" />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#00d4ff" }}>
                {t.openSource.title}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: textMain }}>
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#3d8bff] bg-clip-text text-transparent">
                {t.openSource.heading}
              </span>
            </h2>
          </div>
          <a
            href="https://github.com/Coding-Skuy"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-all hover:scale-105"
            style={{
              borderColor: darkMode ? "rgba(0,212,255,0.3)" : "rgba(0,212,255,0.2)",
              color: "#00d4ff",
            }}
          >
            GitHub Profile
            <ExternalLink size={14} />
          </a>
        </motion.div>

        {/* Repo grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group p-5 rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,85,255,0.04)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CircleDot size={14} style={{ color: "#3d8bff" }} />
                    <h3 className="font-mono font-bold text-sm" style={{ color: "#3d8bff" }}>
                      {repo.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{ background: `${repo.statusColor}15`, color: repo.statusColor }}
                    >
                      {repo.status}
                    </span>
                    <span className="text-xs" style={{ color: textMuted }}>{repo.category}</span>
                  </div>
                </div>
                <a href="#" className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all" style={{ color: textMuted }}>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>{repo.desc}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {repo.topics.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: darkMode ? "#131e38" : "#f0f4ff", color: textMuted }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: repo.langColor }} />
                  <span className="text-xs font-medium" style={{ color: textMuted }}>{repo.lang}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs" style={{ color: textMuted }}>
                    <Star size={12} fill="currentColor" className="text-[#ffd700]" /> {repo.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: textMuted }}>
                    <GitFork size={12} /> {repo.forks}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
