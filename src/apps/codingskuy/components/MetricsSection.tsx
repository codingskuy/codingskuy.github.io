import { motion } from "motion/react";
import { useT } from "@/hooks/useT";

interface MetricsSectionProps {
  darkMode: boolean;
}

const metrics = [
  { value: "5+", label: "Years Active", desc: "Building together since 2021", color: "#3d8bff", icon: "🚀" },
  { value: "20+", label: "Mobile Apps", desc: "Shipped to production", color: "#00d4ff", icon: "📱" },
  { value: "150+", label: "Articles", desc: "Published & read by thousands", color: "#8b5cf6", icon: "✍️" },
  { value: "80+", label: "Videos", desc: "YouTube tutorials", color: "#ff6b35", icon: "🎬" },
  { value: "15+", label: "Open Source", desc: "Projects & contributions", color: "#ffd700", icon: "💻" },
  { value: "10K+", label: "Community", desc: "Members across platforms", color: "#00d4ff", icon: "👥" },
];

export function MetricsSection({ darkMode }: MetricsSectionProps) {
  const t = useT();
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background stripe */}
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "linear-gradient(180deg, transparent 0%, rgba(13,22,41,0.5) 50%, transparent 100%)"
            : "linear-gradient(180deg, transparent 0%, rgba(232,237,255,0.5) 50%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d8bff] to-[#00d4ff]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#3d8bff" }}>
              {t.metrics.title}
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black" style={{ color: textMain }}>
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#ffd700] bg-clip-text text-transparent">
              {t.metrics.heading}
            </span>
          </h2>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map(({ value, label, desc, color, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="group p-5 rounded-2xl text-center transition-all duration-300 cursor-default"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,85,255,0.05)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                style={{ background: `${color}15` }}
              >
                {icon}
              </div>
              <p
                className="text-3xl font-black mb-1 leading-none"
                style={{ color, textShadow: `0 0 20px ${color}40` }}
              >
                {value}
              </p>
              <p className="text-xs font-semibold mb-0.5" style={{ color: textMain }}>{label}</p>
              <p className="text-xs leading-snug opacity-70" style={{ color: textMuted }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
