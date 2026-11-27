import { useState } from "react";
import { motion } from "motion/react";
import { Terminal, Cpu, Bot, Workflow, FlaskConical } from "lucide-react";
import { useT } from "@/hooks/useT";

interface AILabSectionProps {
  darkMode: boolean;
}

const experiments = [
  {
    id: "mcp",
    icon: Terminal,
    title: "SkuyMCP Collection",
    tag: "MCP Protocol",
    tagColor: "#3d8bff",
    status: "Active",
    statusColor: "#00d4ff",
    desc: "A collection of MCP servers connecting AI agents to popular developer tools — GitHub, Linear, Slack, Figma, Jira.",
    tech: ["TypeScript", "MCP", "Claude", "Docker"],
    stars: 2100,
    output: `> Connecting to GitHub MCP server...
✓ Authenticated as @rois-khoiron
> list_issues --repo codingskuy/skuymcp
[1] Fix rate limiting in GitHub connector
[2] Add Linear board sync support
[3] Improve Slack formatting
> status: 3 open issues, 127 closed`,
  },
  {
    id: "agents",
    icon: Bot,
    title: "AI Dev Agents",
    tag: "Agents",
    tagColor: "#8b5cf6",
    status: "Research",
    statusColor: "#a78bfa",
    desc: "Autonomous developer agents that can write code, run tests, create PRs, and iterate based on feedback — all without human intervention.",
    tech: ["Claude API", "Python", "LangGraph", "GitHub"],
    stars: 856,
    output: `> Agent initialized: CodeWriter v2
> Task: Implement user authentication
→ Analyzing codebase structure...
→ Writing auth middleware...
→ Running test suite... 18/18 ✓
→ Creating PR: feat/user-auth
✓ PR #142 opened for review`,
  },
  {
    id: "workflow",
    icon: Workflow,
    title: "OpenCode Workflow",
    tag: "AI Workflow",
    tagColor: "#ff6b35",
    status: "Active",
    statusColor: "#ff6b35",
    desc: "AI-powered development workflow automation — from issue triage to code review, test generation, and deployment.",
    tech: ["n8n", "Claude", "GitHub Actions", "Python"],
    stars: 423,
    output: `> Workflow: issue-to-pr pipeline
[TRIGGER] New issue #89 created
[CLASSIFY] Type: bug, Priority: high
[ASSIGN] @rois-khoiron (confidence: 0.92)
[DRAFT] Generating fix suggestions...
[OUTPUT] 3 approaches ready for review`,
  },
  {
    id: "research",
    icon: FlaskConical,
    title: "Copilot Research",
    tag: "Research",
    tagColor: "#ffd700",
    status: "Ongoing",
    statusColor: "#ffd700",
    desc: "Comparative study of AI coding assistants — measuring code quality, developer experience, and productivity impact across different tools.",
    tech: ["Python", "Jupyter", "pandas", "Anthropic"],
    stars: 167,
    output: `> Research: copilot-comparison-2024
Analyzing 1,247 code completions...
Metrics: correctness, latency, UX
─────────────────────────────
Claude 3.5: 94.2% accuracy ████████
GPT-4o:     91.8% accuracy ████████
Gemini:     89.1% accuracy ███████`,
  },
  {
    id: "notes",
    icon: Cpu,
    title: "AI Engineering Notes",
    tag: "Knowledge Base",
    tagColor: "#00d4ff",
    status: "Growing",
    statusColor: "#00d4ff",
    desc: "Public notes on AI engineering — practical insights from building with LLMs, MCP, and AI agents in production.",
    tech: ["Obsidian", "MDX", "Astro", "Algolia"],
    stars: 312,
    output: `> knowledge-base stats
Total notes: 247
Topics: LLM, MCP, Agents, RAG
Last updated: 2 hours ago
Most read: "MCP vs Function Calling"
─────────────────────────────
> search "production LLM"
→ 14 related notes found`,
  },
];

export function AILabSection({ darkMode }: AILabSectionProps) {
  const t = useT();
  const [activeId, setActiveId] = useState("mcp");
  const active = experiments.find((e) => e.id === activeId)!;

  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";
  const termBg = darkMode ? "#030712" : "#0d1117";

  return (
    <section id="ailab" className="py-24 relative overflow-hidden">
      {/* Futuristic bg */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.15) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#8b5cf6" }}>
              {t.aiLab.title}
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#8b5cf6]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
              {t.aiLab.heading}
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            {t.aiLab.desc}
          </p>
        </motion.div>

        {/* Interactive lab */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left sidebar — experiment list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {experiments.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                whileHover={{ x: 4 }}
                className="w-full p-4 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: activeId === exp.id
                    ? darkMode ? "#131e38" : "#e8edff"
                    : cardBg,
                  border: `1px solid ${activeId === exp.id ? exp.tagColor + "40" : borderColor}`,
                  boxShadow: activeId === exp.id ? `0 4px 16px ${exp.tagColor}15` : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${exp.tagColor}15` }}
                  >
                    <exp.icon size={16} style={{ color: exp.tagColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: textMain }}>{exp.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs" style={{ color: exp.tagColor }}>{exp.tag}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ background: `${exp.statusColor}15`, color: exp.statusColor }}>
                        {exp.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: textMuted }}>⭐ {exp.stars.toLocaleString()}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right — active experiment detail */}
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* Detail card */}
            <div
              className="p-6 rounded-3xl"
              style={{ background: cardBg, border: `1px solid ${borderColor}` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${active.tagColor}15` }}
                  >
                    <active.icon size={22} style={{ color: active.tagColor }} />
                  </div>
                  <div>
                    <h3 className="font-bold" style={{ color: textMain }}>{active.title}</h3>
                    <span className="text-xs font-medium" style={{ color: active.statusColor }}>● {active.status}</span>
                  </div>
                </div>
</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: textMuted }}>{active.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {active.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-xs font-mono" style={{ background: `${active.tagColor}10`, color: active.tagColor, border: `1px solid ${active.tagColor}20` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Terminal output */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: termBg, border: "1px solid rgba(61,139,255,0.2)" }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-xs font-mono text-white/30">~/ai-lab/{active.id}</span>
              </div>
              {/* Terminal content */}
              <div className="p-4">
                <pre className="text-xs font-mono leading-relaxed" style={{ color: "#00d4ff", whiteSpace: "pre-wrap" }}>
                  {active.output}
                </pre>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs font-mono" style={{ color: "#00d4ff" }}>{">"}</span>
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#00d4ff]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
