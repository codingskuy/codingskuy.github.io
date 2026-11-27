import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import mascotSvg from "@/assets/mascot.webp";
import { useT } from "@/hooks/useT";


interface CommunitySectionProps {
  darkMode: boolean;
}

const platforms = [
  {
    name: "GitHub",
    desc: "Open source contributions dan code collaboration",
    color: "#333",
    icon: "🐙",
    cta: "Follow",
    url: "https://github.com/codingskuy",
  },
  {
    name: "YouTube",
    desc: "Weekly tutorials, build-alongs, dan tech talks",
    color: "#FF0000",
    icon: "▶️",
    cta: "Subscribe",
    url: "https://youtube.com/@codingskuy",
  },
  {
    name: "LinkedIn",
    desc: "Diskusi karir, networking, dan update komunitas",
    color: "#0077B5",
    icon: "💼",
    cta: "Join Group",
    url: "https://www.linkedin.com/groups/17187002/",
  },
];

export function CommunitySection({ darkMode }: CommunitySectionProps) {
  const t = useT();
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 50% 100%, rgba(61,139,255,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 100%, rgba(0,85,255,0.03) 0%, transparent 70%)",
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
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d8bff] to-[#8b5cf6]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#3d8bff" }}>
              {t.community.title}
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3d8bff]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
            <span className="bg-gradient-to-r from-[#3d8bff] to-[#8b5cf6] bg-clip-text text-transparent">
              {t.community.heading}
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: textMuted }}>
            {t.community.desc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Mascot illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0055ff]/15 to-[#8b5cf6]/15 blur-2xl" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* <CodingSkuyMascot variant="celebrate" size={200} /> */}
                <img loading="lazy" decoding="async"
                                  src={mascotSvg} 
                                  alt="CodingSkuy Mascot"
                                  className="w-40 h-40 sm:w-80 sm:h-80 object-contain"
                                />
              </motion.div>
            </div>
          </motion.div>

          {/* Platform cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
            {platforms.map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-5 rounded-2xl flex flex-col gap-3 transition-all duration-300 cursor-pointer"
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,85,255,0.05)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: textMain }}>{platform.name}</p>
                    </div>
                  </div>
                  <ArrowRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: textMuted }} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{platform.desc}</p>
                <div
                  className="w-full py-2 rounded-xl text-xs font-semibold text-center text-white transition-all group-hover:opacity-90"
                  style={{ background: platform.color }}
                >
                  {platform.cta}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
