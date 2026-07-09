import { motion } from "motion/react";
import { ArrowRight, Star, Zap, Github, Youtube, Linkedin } from "lucide-react";
import { DoodleBolt, DoodleBracket, DoodleCode, DoodleSpark, DoodleRocket } from "./CodingSkuyMascot";
import mascotSvg from "@/assets/hero-skuy.jpeg";
import { useT } from "@/hooks/useT";
import { ScrollingTags } from "./ScrollingTags";

interface HeroSectionProps { 
  darkMode: boolean;
}

const techPills = [
  "Flutter", "Dart", "Kotlin", "Python", "FastAPI", "PostgreSQL", "LLM", "MCP",
  "TypeScript", "React", "Next.js", "Go", "Rust", "Docker", "Kubernetes",
  "GraphQL", "Redis", "Kafka", "Terraform", "AWS", "GCP", "Tailwind CSS",
  "Prisma", "Supabase", "Firebase", "React Native", "Swift", "Vue.js",
  "NestJS", "Svelte", "SQLite", "MongoDB", "Nginx", "GitHub Actions",
];

export function HeroSection({ darkMode }: HeroSectionProps) {
  const t = useT();
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${darkMode ? "#3d8bff" : "#0055ff"} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? "#3d8bff" : "#0055ff"} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#0055ff] opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#8b5cf6] opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[#00d4ff] opacity-8 blur-[80px] pointer-events-none" />

      {/* Floating doodles */}
      <motion.div
        className="absolute top-28 left-8 md:left-24 opacity-60"
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <DoodleBolt size={36} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-8 md:right-28 opacity-50"
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <DoodleRocket size={32} />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-8 md:left-32 opacity-40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <DoodleBracket size={44} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-8 md:right-24 opacity-50"
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <DoodleCode size={48} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-12 md:right-48 opacity-60"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <DoodleSpark size={20} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#0055ff] to-[#00d4ff] text-white shadow-lg shadow-[#0055ff]/30">
                <Star size={12} fill="currentColor" /> CodingSkuy!
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20">
                Open Community
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
                style={{ color: darkMode ? "#e8f0ff" : "#0d1117" }}
              >
                <span className="bg-gradient-to-r from-[#3d8bff] via-[#00d4ff] to-[#8b5cf6] bg-clip-text text-transparent">
                  CodingSkuy!
                </span>
              </h1>
              <p
                className="mt-4 text-xl sm:text-2xl font-semibold leading-snug"
                style={{ color: darkMode ? "#7c8db5" : "#475569" }}
              >
                {t.hero.titleSub}
              </p>
            </div>

            {/* Sub */}
            <p
              className="text-base leading-relaxed max-w-lg"
              style={{ color: darkMode ? "#5a6f9a" : "#64748b" }}
            >
              {t.hero.desc}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#content"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-[#0055ff] to-[#00d4ff] text-white shadow-xl shadow-[#0055ff]/25 hover:shadow-[#0055ff]/40 hover:scale-105 transition-all duration-200"
              >
                {t.hero.ctaStart} <ArrowRight size={16} />
              </a>
              <a
                href="#community"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm border transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? "border-[#3d8bff]/30 text-[#3d8bff] hover:bg-[#3d8bff]/10"
                    : "border-[#0055ff]/30 text-[#0055ff] hover:bg-[#0055ff]/5"
                }`}
              >
                {t.hero.ctaExplore}
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-medium" style={{ color: darkMode ? "#4a5f8a" : "#94a3b8" }}>
                {t.hero.follow}
              </span>
              {[
                { icon: Github, href: "https://github.com/codingskuy", label: "GitHub" },
                { icon: Youtube, href: "https://youtube.com/@codingskuy", label: "YouTube" },
                { icon: Linkedin, href: "https://www.linkedin.com/groups/17187002/", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`p-2 rounded-lg transition-all hover:scale-110 ${
                    darkMode ? "text-[#4a5f8a] hover:text-[#3d8bff] hover:bg-[#131e38]" : "text-[#94a3b8] hover:text-[#0055ff] hover:bg-[#e8edff]"
                  }`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

          </motion.div>

          {/* Right — mascot visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center relative"
          >
            {/* Outer glow ring */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0055ff]/20 to-[#8b5cf6]/20 blur-xl scale-110" />

              {/* Main card */}
              <div
                className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl flex items-center justify-center overflow-hidden"
                style={{
                  background: darkMode
                    ? "linear-gradient(135deg, #0d1629 0%, #131e38 50%, #0d1629 100%)"
                    : "linear-gradient(135deg, #e8edff 0%, #f0f4ff 50%, #e8edff 100%)",
                  border: `1px solid ${darkMode ? "rgba(61,139,255,0.2)" : "rgba(0,85,255,0.15)"}`,
                  boxShadow: darkMode
                    ? "0 32px 80px rgba(0,85,255,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
                    : "0 32px 80px rgba(0,85,255,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                {/* Decorative background code text */}
                <div
                  className="absolute inset-0 flex items-center justify-center text-[120px] font-mono font-black select-none opacity-[0.04]"
                  style={{ color: "#3d8bff" }}
                >
                  {"</>"}
                </div>

                {/* Small floating doodles inside card */}
                <motion.div
                  className="absolute top-6 left-6 opacity-50"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <DoodleSpark size={16} />
                </motion.div>
                <motion.div
                  className="absolute bottom-8 right-8 opacity-50"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <DoodleSpark size={12} />
                </motion.div>
                <motion.div
                  className="absolute top-8 right-8 opacity-40"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <DoodleBolt size={20} />
                </motion.div>

                {/* Mascot image */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img
                    src={mascotSvg}
                    alt="CodingSkuy Mascot"
                    className="w-full h-full object-contain" 
                  />
                </motion.div>
              </div>

              {/* Floating badge — CodingSkuy */}
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-2xl text-xs font-bold shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(139,92,246,0.4)",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                🎓 CodingSkuy!
              </motion.div>

              {/* Floating badge — Open to work */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-2 rounded-2xl text-xs font-bold shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ffd700)",
                  color: "#0d1117",
                  boxShadow: "0 8px 24px rgba(255,107,53,0.4)",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              >
                ⚡ Open to Collab
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling tags */}
        <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <ScrollingTags tags={techPills} darkMode={darkMode} />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono" style={{ color: darkMode ? "#3d8bff" : "#0055ff" }}>{t.hero.scroll}</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#3d8bff] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
