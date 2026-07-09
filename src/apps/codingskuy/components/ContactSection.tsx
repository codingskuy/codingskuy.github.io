import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";

interface ContactSectionProps {
  darkMode: boolean;
}

export function ContactSection({ darkMode }: ContactSectionProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const inputBg = darkMode ? "#131e38" : "#f0f4ff";
  const borderColor = darkMode ? "rgba(61,139,255,0.2)" : "rgba(0,85,255,0.12)";

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d8bff] to-[#00d4ff]" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#3d8bff" }}>
              Hubungi CodingSkuy
            </span>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#3d8bff]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: textMain }}>
            Hubungi{" "}
            <span className="bg-gradient-to-r from-[#3d8bff] to-[#00d4ff] bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: textMuted }}>
            Ada ide kolaborasi, saran konten, atau ingin bergabung dengan komunitas CodingSkuy? Kami senang mendengar dari kamu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              { icon: Mail, label: "Email", value: "hello@codingskuy.com", color: "#3d8bff" },
              { icon: MessageSquare, label: "Response Time", value: "1x24 jam", color: "#00d4ff" },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
                className="p-5 rounded-2xl flex items-center gap-4 transition-all"
                style={{
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: textMuted }}>{label}</p>
                  <p className="font-semibold text-sm" style={{ color: textMain }}>{value}</p>
                </div>
              </motion.div>
            ))}

            {/* Paper plane doodle */}
            <motion.div
              className="flex-1 flex items-center justify-center"
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path
                  d="M10 60 L110 20 L70 110 L55 70 L10 60Z"
                  fill="url(#planeGrad)"
                  opacity="0.9"
                />
                <path d="M55 70 L70 55" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <path d="M110 20 L55 70" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <defs>
                  <linearGradient id="planeGrad" x1="10" y1="20" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0055ff" />
                    <stop offset="1" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div
              className="p-7 rounded-3xl"
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? "0 12px 40px rgba(0,0,0,0.25)" : "0 12px 40px rgba(0,85,255,0.07)",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <CheckCircle2 size={48} className="text-[#22c55e]" />
                  <h3 className="text-xl font-bold" style={{ color: textMain }}>Pesan Terkirim! 🎉</h3>
                  <p className="text-sm" style={{ color: textMuted }}>
                    Terima kasih! Kami akan membalas dalam 24-48 jam.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Nama", placeholder: "John Doe", type: "text" },
                      { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: textMuted }}>{label}</label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={(form as Record<string, string>)[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ background: inputBg, border: `1px solid ${borderColor}`, color: textMain }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: textMuted }}>Subjek</label>
                    <input
                      type="text"
                      placeholder="Topik yang ingin dibahas"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: inputBg, border: `1px solid ${borderColor}`, color: textMain }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: textMuted }}>Pesan</label>
                    <textarea
                      placeholder="Ceritakan lebih detail..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: inputBg, border: `1px solid ${borderColor}`, color: textMain }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center gap-2 justify-center transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #0055ff, #00d4ff)",
                      boxShadow: "0 8px 20px rgba(0,85,255,0.3)",
                    }}
                  >
                    <Send size={16} /> Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
