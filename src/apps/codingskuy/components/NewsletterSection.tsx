import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import mascotSvg from "@/assets/mascot.webp";
import { useT } from "@/hooks/useT";
import { useUi } from "./uiStrings";

interface NewsletterSectionProps {
  darkMode: boolean;
}

export function NewsletterSection({ darkMode }: NewsletterSectionProps) {
  const t = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ui = useUi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setSubmitted(true);
  };

  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";
  const inputBg = darkMode ? "#131e38" : "#f0f4ff";
  const borderColor = darkMode ? "rgba(61,139,255,0.2)" : "rgba(0,85,255,0.15)";

  return (
    <section id="newsletter" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #0d1629 0%, #131e38 50%, #0d1629 100%)"
              : "linear-gradient(135deg, #e8edff 0%, #f0f4ff 50%, #e8edff 100%)",
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? "0 24px 80px rgba(0,85,255,0.1)" : "0 24px 80px rgba(0,85,255,0.08)",
          }}
        >
          {/* BG glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0055ff]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#8b5cf6]/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row gap-10 items-center">
            {/* Mascot */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                
              >
                <img loading="lazy" decoding="async"
                  src={mascotSvg} 
                  alt="CodingSkuy Mascot"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
                />
              </motion.div>
              <div
                className="px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}
              >
                📬 4.8K subscribers
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ffd700]" />
                <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#ff6b35" }}>
                  {t.newsletter.title}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: textMain }}>
                <span className="bg-gradient-to-r from-[#ff6b35] to-[#ffd700] bg-clip-text text-transparent">
                  {t.newsletter.heading}
                </span>
              </h2>
              <p className="mb-6 leading-relaxed text-sm" style={{ color: textMuted }}>
                {t.newsletter.desc}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 p-5 rounded-2xl"
                  style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <CheckCircle2 size={24} className="text-[#22c55e] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm" style={{ color: textMain }}>Yeay! Kamu sudah terdaftar 🎉</p>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Check inbox kamu untuk email konfirmasi.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder={ui.newsletter.namePlaceholder}
                    aria-label={ui.newsletter.namePlaceholder}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: textMain,
                    }}
                  />
                  <input
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    aria-label={t.newsletter.placeholder}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: inputBg,
                      border: `1px solid ${borderColor}`,
                      color: textMain,
                    }}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-semibold text-sm text-white flex items-center gap-2 justify-center transition-all hover:scale-105 hover:shadow-lg flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #ff6b35, #ffd700)",
                      boxShadow: "0 8px 20px rgba(255,107,53,0.3)",
                    }}
                  >
                    <Send size={15} /> {t.newsletter.button}
                  </button>
                </form>
              )}

              <p className="text-xs mt-3" style={{ color: textMuted }}>
                {ui.newsletter.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
