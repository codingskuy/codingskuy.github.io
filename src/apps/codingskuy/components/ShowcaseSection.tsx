import { motion } from "motion/react";
import { Play, Film } from "lucide-react";
import showcaseVideo from "@/assets/showcase.mp4";
import showcasePoster from "@/assets/showcase-poster.webp";
import { useT } from "@/hooks/useT";
import { useRef, useEffect } from "react";

interface ShowcaseSectionProps {
  darkMode: boolean;
}

export function ShowcaseSection({ darkMode }: ShowcaseSectionProps) {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // The file is only fetched once playback starts, so visitors who never
    // reach this section (or prefer reduced motion) download just the poster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "radial-gradient(ellipse at 50% 0%, rgba(61,139,255,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(0,85,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d8bff] to-[#8b5cf6]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#3d8bff" }}>
              <Film size={14} className="inline mr-1.5" />
              {t.showcase.title}
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3d8bff]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
            <span className="bg-gradient-to-r from-[#3d8bff] to-[#8b5cf6] bg-clip-text text-transparent">
              {t.showcase.heading}
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            {t.showcase.desc}
          </p>
        </motion.div>
      </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden w-4/5 mx-auto"
          style={{
            background: darkMode ? "#0d1629" : "#ffffff",
            border: `1px solid ${darkMode ? "rgba(61,139,255,0.2)" : "rgba(0,85,255,0.12)"}`,
            boxShadow: darkMode
              ? "0 32px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 32px 80px rgba(0,85,255,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <video
            ref={videoRef}
            loop
            playsInline
            muted
            controls
            preload="none"
            poster={showcasePoster}
            className="w-full aspect-video object-cover"
          >
            <source src={showcaseVideo} type="video/mp4" />
          </video>
        </motion.div>
    </section>
  );
}
