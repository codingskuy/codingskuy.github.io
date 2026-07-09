import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Clock, BookOpen, Video, Layers, Code2, Brain, ArrowRight } from "lucide-react";
import { CodingSkuyMascot } from "./CodingSkuyMascot";
import { useT } from "@/hooks/useT";

interface ContentLibrarySectionProps {
  darkMode: boolean;
}

const allContent = [
  { id: 1, type: "Article", icon: BookOpen, color: "#3d8bff", title: "Panduan Lengkap BLoC Pattern di Flutter", desc: "Dibuat oleh member — dari dasar hingga production-ready, arsitektur scalable untuk Flutter dengan contoh kode nyata.", time: "12 min read", category: "Flutter", tags: ["Flutter", "BLoC", "Architecture", "State Management"] },
  { id: 2, type: "Video", icon: Video, color: "#ff6b35", title: "Integrasi Claude API ke Flutter App", desc: "Tutorial dari member: bangun AI chatbot dari Flutter app menggunakan Claude API dan streaming responses.", time: "32 min watch", category: "AI", tags: ["AI", "Flutter", "Claude", "API"] },
  { id: 3, type: "Tutorial", icon: Layers, color: "#8b5cf6", title: "Build REST API dengan FastAPI & PostgreSQL", desc: "Kontribusi member — full setup dari awal hingga deploy ke cloud dengan Python.", time: "8 min read", category: "Backend", tags: ["Python", "FastAPI", "PostgreSQL", "Docker"] },
  { id: 4, type: "Series", icon: Layers, color: "#00d4ff", title: "Flutter Mastery: 30 Hari Challenge", desc: "30 proyek kecil dari member untuk menguasai Flutter dari level beginner ke advanced.", time: "30 episodes", category: "Flutter", tags: ["Flutter", "Challenge", "Beginner"] },
  { id: 5, type: "Article", icon: BookOpen, color: "#3d8bff", title: "Memahami MCP Protocol untuk AI Agents", desc: "Penjelasan dari member tentang Model Context Protocol dan cara kerjanya untuk developer.", time: "10 min read", category: "AI", tags: ["AI", "MCP", "Protocol", "Agents"] },
  { id: 6, type: "Tutorial", icon: Layers, color: "#8b5cf6", title: "CI/CD Pipeline dengan GitHub Actions untuk Flutter", desc: "Panduan dari member: automate build, test, dan deploy Flutter app ke Play Store dan App Store.", time: "15 min read", category: "Flutter", tags: ["Flutter", "CI/CD", "GitHub Actions", "DevOps"] },
  { id: 7, type: "Video", icon: Video, color: "#ff6b35", title: "Tips Interview Software Engineer di Startup", desc: "Pengalaman dan tips dari member yang sudah lolos interview di berbagai startup.", time: "45 min watch", category: "Career", tags: ["Career", "Interview", "Tips", "Startup"] },
  { id: 8, type: "Article", icon: BookOpen, color: "#3d8bff", title: "Dart Futures & Streams: Panduan Async", desc: "Tulisan member tentang concurrency di Dart dengan Future, Stream, dan Isolate.", time: "8 min read", category: "Flutter", tags: ["Dart", "Async", "Future", "Stream"] },
  { id: 9, type: "Tutorial", icon: Layers, color: "#8b5cf6", title: "Docker & Docker Compose untuk Developer", desc: "Karya member: containerize aplikasi backend dan database dengan Docker Compose.", time: "12 min read", category: "Backend", tags: ["Docker", "Docker Compose", "DevOps"] },
  { id: 10, type: "Video", icon: Video, color: "#ff6b35", title: "Membangun RAG System dengan Python & LLM", desc: "Workshop dari member — Retrieval-Augmented Generation dari konsep hingga implementasi.", time: "55 min watch", category: "AI", tags: ["AI", "RAG", "Python", "LLM"] },
  { id: 11, type: "Article", icon: BookOpen, color: "#3d8bff", title: "Tips Negosiasi Gaji untuk Developer Indonesia", desc: "Panduan dari member berpengalaman: menentukan nilai pasar, persiapan, dan teknik negosiasi.", time: "6 min read", category: "Career", tags: ["Career", "Salary", "Negotiation"] },
  { id: 12, type: "Tutorial", icon: Layers, color: "#8b5cf6", title: "Firebase Authentication di Flutter", desc: "Tutorial dari member: integrasi login dengan email, Google, dan anonymous auth di Flutter.", time: "10 min read", category: "Flutter", tags: ["Flutter", "Firebase", "Auth"] },
  { id: 13, type: "Article", icon: BookOpen, color: "#3d8bff", title: "System Design: Scalable Backend Architecture", desc: "Catatan member tentang microservices, event-driven, CQRS, dan message queue.", time: "15 min read", category: "Backend", tags: ["Backend", "Architecture", "System Design"] },
  { id: 14, type: "Video", icon: Video, color: "#ff6b35", title: "Belajar Riverpod untuk State Management", desc: "Study case dari member: migrasi BLoC ke Riverpod di Flutter app produksi.", time: "40 min watch", category: "Flutter", tags: ["Flutter", "Riverpod", "State Management"] },
  { id: 15, type: "Series", icon: Layers, color: "#00d4ff", title: "AI Engineering Bootcamp", desc: "Kurikulum dari member — dari LLM fundamentals, prompt engineering, RAG, hingga AI agents production.", time: "40 episodes", category: "AI", tags: ["AI", "LLM", "RAG", "Agents"] },
];

const filterOptions = ["All", "Articles", "Tutorials", "Videos", "AI", "Flutter", "Backend", "Career"];

export function ContentLibrarySection({ darkMode }: ContentLibrarySectionProps) {
  const t = useT();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    let items = allContent;

    if (activeFilter === "Articles") items = items.filter((c) => c.type === "Article");
    else if (activeFilter === "Tutorials") items = items.filter((c) => c.type === "Tutorial");
    else if (activeFilter === "Videos") items = items.filter((c) => c.type === "Video");
    else if (activeFilter === "Series") items = items.filter((c) => c.type === "Series");
    else if (["AI", "Flutter", "Backend", "Career"].includes(activeFilter)) items = items.filter((c) => c.category === activeFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q)));
    }

    return items;
  }, [search, activeFilter]);

  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";
  const inputBg = darkMode ? "#131e38" : "#f0f4ff";

  return (
    <section id="content" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#3d8bff]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#00d4ff" }}>
              {t.contentLibrary.title}
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d8bff] to-[#00d4ff]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#3d8bff] bg-clip-text text-transparent">
              {t.contentLibrary.heading}
            </span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: textMuted }}>
            {t.contentLibrary.desc}
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          {/* Search */}
          <div className="relative mb-5">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: textMuted }}
            />
            <input
              type="text"
              placeholder="Cari artikel, tutorial, atau topik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: inputBg,
                border: `1px solid ${borderColor}`,
                color: textMain,
              }}
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: activeFilter === f
                    ? "linear-gradient(135deg, #00d4ff, #3d8bff)"
                    : darkMode ? "#131e38" : "#e8edff",
                  color: activeFilter === f ? "white" : textMuted,
                  boxShadow: activeFilter === f ? "0 4px 12px rgba(0,85,255,0.3)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-16 gap-4"
              >
                <CodingSkuyMascot variant="think" size={100} />
                <p className="text-sm font-semibold" style={{ color: textMain }}>
                  Tidak ada hasil untuk "{search}"
                </p>
                <button
                  onClick={() => { setSearch(""); setActiveFilter("All"); }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#3d8bff] border border-[#3d8bff]/30 hover:bg-[#3d8bff]/10"
                >
                  Reset Filter
                </button>
              </motion.div>
            ) : (
              filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: (i % 9) * 0.04 }}
                  whileHover={{ y: -5 }}
                  className="group p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,85,255,0.04)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                        <item.icon size={14} style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: item.color }}>{item.type}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs" style={{ color: textMuted }}>
                      <Clock size={11} /> {item.time}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-sm mb-1.5 leading-snug line-clamp-2" style={{ color: textMain }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: textMuted }}>{item.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-xs font-mono" style={{ background: `${item.color}08`, color: item.color, border: `1px solid ${item.color}15` }}>
                        {t}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs font-mono" style={{ color: textMuted }}>+{item.tags.length - 3}</span>
                    )}
                  </div>

                  {/* View link */}
                  <div className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}>
                    Read More <ArrowRight size={11} />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination placeholder */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              className="px-8 py-3 rounded-2xl font-semibold text-sm border transition-all hover:scale-105"
              style={{
                borderColor: darkMode ? "rgba(0,212,255,0.3)" : "rgba(0,212,255,0.2)",
                color: "#00d4ff",
              }}
            >
              Lihat Semua Konten →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
