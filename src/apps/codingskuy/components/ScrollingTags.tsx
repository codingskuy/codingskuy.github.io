interface ScrollingTagsProps {
  tags: string[];
  darkMode?: boolean;
}

export function ScrollingTags({ tags, darkMode }: ScrollingTagsProps) {
  const rows = Array.from({ length: 3 }, (_, i) =>
    tags.filter((_, idx) => idx % 3 === i),
  );

  return (
    <div className="relative w-full overflow-hidden py-4">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex overflow-hidden my-1.5"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className="flex shrink-0 gap-2 pr-2"
            style={{
              animation: `scroll-tags-${rowIdx % 2 === 0 ? "ltr" : "rtl"} ${20 + rowIdx * 5}s linear infinite`,
            }}
          >
            {[...row, ...row].map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border whitespace-nowrap"
                style={{
                  background: darkMode ? "rgba(61,139,255,0.06)" : "rgba(0,85,255,0.04)",
                  borderColor: darkMode ? "rgba(61,139,255,0.2)" : "rgba(0,85,255,0.12)",
                  color: darkMode ? "#7c8db5" : "#64748b",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes scroll-tags-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-tags-rtl {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
