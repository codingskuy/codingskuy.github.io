import { motion } from "motion/react";
import { ArrowRight, Sprout, Route, Lightbulb, Users } from "lucide-react";
import { useUi } from "./uiStrings";

interface JourneySectionProps {
  darkMode: boolean;
}

const steps = [
  { icon: Sprout, color: "#10b981", href: "/articles/foundation/" },
  { icon: Route, color: "#3d8bff", href: "#learning" },
  { icon: Lightbulb, color: "#ff6b35", href: "#portfolio" },
  { icon: Users, color: "#8b5cf6", href: "#community" },
];

export function JourneySection({ darkMode }: JourneySectionProps) {
  const ui = useUi();
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";

  return (
    <section id="start" aria-labelledby="journey-heading" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#10b981] to-[#3d8bff]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#10b981" }}>
              {ui.journey.eyebrow}
            </span>
          </div>
          <h2 id="journey-heading" className="text-3xl sm:text-4xl font-black mb-3" style={{ color: textMain }}>
            {ui.journey.heading}
          </h2>
          <p className="text-base" style={{ color: textMuted }}>
            {ui.journey.desc}
          </p>
        </div>

        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {/* Trail connecting the four stops on wide screens */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-8 right-8 top-[3.25rem] border-t-2 border-dashed"
            style={{ borderColor }}
          />
          {steps.map(({ icon: Icon, color, href }, i) => {
            const step = ui.journey.steps[i];
            return (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <a
                  href={href}
                  className="group flex h-full flex-col gap-3 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    boxShadow: darkMode ? "0 8px 24px rgba(0,0,0,0.25)" : "0 8px 24px rgba(0,85,255,0.06)",
                    outlineColor: color,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${color}1f`, color }}
                    >
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-xs font-bold" style={{ color: textMuted }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug" style={{ color: textMain }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: textMuted }}>
                    {step.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color }}>
                    {step.cta}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
