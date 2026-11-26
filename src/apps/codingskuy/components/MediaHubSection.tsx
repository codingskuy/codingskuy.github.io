import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion } from "motion/react";
import { BookOpen, Video, Layers, ArrowRight, Clock, Youtube, Sparkles, Users, PlayCircle, TrendingUp, Search } from "lucide-react";
import { CodingSkuyMascot } from "./CodingSkuyMascot";
import { IframeDialog } from "@/components/IframeDialog";
import imgCharacter1 from "@/assets/hqdefault.webp";
import imgCharacter2 from "@/assets/hqdefault2.webp";
import imgCharacter3 from "@/assets/hqdefault3.webp";
import { useT } from "@/hooks/useT";
import { useUi } from "./uiStrings";

interface MediaHubSectionProps {
  darkMode: boolean;
}

type CreatorVideo = {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
};

type ChannelStats = {
  subscribers: string;
  videos: string;
  views: string;
};

type Language = "id" | "en" | "zh" | "ja";

const YT_API_BASE = "https://www.googleapis.com/youtube/v3";
const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
const YT_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID as string | undefined;
const YT_CHANNEL_HANDLE = (import.meta.env.VITE_YOUTUBE_CHANNEL_HANDLE as string | undefined) || "codingskuy";

const FALLBACK_CHANNEL_LINK = "https://www.youtube.com/@codingskuy/videos";

const FALLBACK_VIDEOS: CreatorVideo[] = [
  { id: "fallback-1", videoId: "s2OFRR2ZCPc", title: "CodingSkuy Video", thumbnail: imgCharacter1 },
  { id: "fallback-2", videoId: "M7lc1UVf-VE", title: "CodingSkuy Video", thumbnail: imgCharacter2 },
  { id: "fallback-3", videoId: "rfscVS0vtbw", title: "CodingSkuy Video", thumbnail: imgCharacter3 },
  { id: "fallback-4", videoId: "s2OFRR2ZCPc", title: "CodingSkuy Video", thumbnail: imgCharacter1 },
];

const copy: Record<Language, {
  subscribers: string;
  videos: string;
  views: string;
  coverAlt: string;
  characterAlt: string;
  watchNow: string;
  loadingVideo: string;
  openInTab: string;
  searchPlaceholder: string;
  searchEmpty: string;
}> = {
  id: {
    subscribers: "Subscriber",
    videos: "Video Tutorial",
    views: "Total Tayangan",
    coverAlt: "Channel YouTube CodingSkuy",
    characterAlt: "Karakter CodingSkuy",
    watchNow: "Tonton Sekarang",
    loadingVideo: "Memuat video...",
    openInTab: "Buka Tab",
    searchPlaceholder: "Cari video...",
    searchEmpty: "Video tidak ditemukan.",
  },
  en: {
    subscribers: "Subscribers",
    videos: "Tutorial Videos",
    views: "Total Views",
    coverAlt: "CodingSkuy YouTube Channel",
    characterAlt: "CodingSkuy Character",
    watchNow: "Watch Now",
    loadingVideo: "Loading video...",
    openInTab: "Open Tab",
    searchPlaceholder: "Search videos...",
    searchEmpty: "No videos found.",
  },
  zh: {
    subscribers: "订阅者",
    videos: "教程视频",
    views: "总播放量",
    coverAlt: "CodingSkuy YouTube 频道",
    characterAlt: "CodingSkuy 角色",
    watchNow: "立即观看",
    loadingVideo: "正在加载视频...",
    openInTab: "新标签打开",
    searchPlaceholder: "搜索视频...",
    searchEmpty: "未找到视频。",
  },
  ja: {
    subscribers: "登録者",
    videos: "チュートリアル動画",
    views: "総再生数",
    coverAlt: "CodingSkuy YouTubeチャンネル",
    characterAlt: "CodingSkuy キャラクター",
    watchNow: "今すぐ見る",
    loadingVideo: "動画を読み込み中...",
    openInTab: "新しいタブで開く",
    searchPlaceholder: "動画を検索...",
    searchEmpty: "動画が見つかりません。",
  },
};

const languageKeyMap: Record<string, Language> = {
  id: "id", en: "en", zh: "zh", ja: "ja",
};

function toYouTubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function toYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

function formatCompactCount(value: string | undefined, language: Language) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return "0";
  return new Intl.NumberFormat(language === "id" ? "id-ID" : language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

const featured = [
  {
    type: "Article",
    icon: BookOpen,
    color: "#3d8bff",
    title: "Panduan Lengkap BLoC Pattern di Flutter 2024",
    desc: "Dari dasar hingga production-ready — arsitektur yang scalable untuk aplikasi Flutter kompleks.",
    readTime: "12 min read",
    category: "Flutter",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop&auto=format",
    tags: ["Flutter", "Architecture", "BLoC"],
    big: true,
  },
  {
    type: "Tutorial",
    icon: Layers,
    color: "#8b5cf6",
    title: "Build REST API dengan FastAPI & PostgreSQL",
    desc: "Full setup dari awal hingga deploy ke cloud.",
    readTime: "8 min",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop&auto=format",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    big: false,
  },
  {
    type: "Video",
    icon: Video,
    color: "#ff6b35",
    title: "Integrasi Claude API ke Flutter App",
    desc: "Bangun AI chatbot dalam 30 menit.",
    readTime: "32 min watch",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=240&fit=crop&auto=format",
    tags: ["AI", "Flutter", "Claude"],
    big: false,
  },
  {
    type: "Series",
    icon: Layers,
    color: "#00d4ff",
    title: "Flutter Mastery: 30 Hari Challenge",
    desc: "30 proyek kecil untuk jago Flutter.",
    readTime: "30-episode series",
    category: "Flutter",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop&auto=format",
    tags: ["Flutter", "Challenge"],
    big: false,
  },
];

export function MediaHubSection({ darkMode }: MediaHubSectionProps) {
  const t = useT();
  const ui = useUi();
  const cardBg = darkMode ? "#0d1629" : "#ffffff";
  const borderColor = darkMode ? "rgba(61,139,255,0.15)" : "rgba(0,85,255,0.1)";
  const textMuted = darkMode ? "#7c8db5" : "#64748b";
  const textMain = darkMode ? "#e8f0ff" : "#0d1117";

  const [language, setLanguage] = useState<Language>("en");
  const text = copy[language];

  const [videos, setVideos] = useState<CreatorVideo[]>(FALLBACK_VIDEOS);
  const [channelTitle, setChannelTitle] = useState("CodingSkuy");
  const [channelUrl, setChannelUrl] = useState(FALLBACK_CHANNEL_LINK);
  const [stats, setStats] = useState<ChannelStats>({
    subscribers: "10K+",
    videos: "100+",
    views: "50K+",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<{ title: string; embedUrl: string; watchUrl: string } | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{ isDown: boolean; startX: number; scrollLeft: number; moved: boolean }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const suppressClickUntilRef = useRef(0);

  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem("language");
      if (saved && languageKeyMap[saved]) setLanguage(languageKeyMap[saved]);
    };
    onStorage();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadYoutubeData = async () => {
      if (!YT_API_KEY) return;

      try {
        const data = await fetch(
          `${YT_API_BASE}/channels?part=snippet,statistics,contentDetails&id=${YT_CHANNEL_ID || ""}&key=${YT_API_KEY}`,
          { cache: "no-store" }
        );
        const json = await data.json();
        if (!mounted) return;
        const channel = json.items?.[0];
        if (!channel?.contentDetails?.relatedPlaylists?.uploads) return;

        const playlistId = channel.contentDetails.relatedPlaylists.uploads;
        const plData = await fetch(
          `${YT_API_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=20&key=${YT_API_KEY}`,
          { cache: "no-store" }
        );
        const plJson = await plData.json();
        if (!mounted) return;

        const fallbackImages = [imgCharacter1, imgCharacter2, imgCharacter3, imgCharacter1];
        const latestVideos: CreatorVideo[] = (plJson.items || [])
          .filter((item: any) => {
            const videoId = item.contentDetails?.videoId;
            const title = item.snippet?.title || "";
            return Boolean(videoId) && title !== "Private video" && title !== "Deleted video";
          })
          .map((item: any, index: number) => {
            const thumbs = item.snippet?.thumbnails;
            return {
              id: item.id || `yt-${index}`,
              videoId: item.contentDetails?.videoId || "",
              title: item.snippet?.title || "CodingSkuy Video",
              thumbnail: thumbs?.maxres?.url || thumbs?.high?.url || thumbs?.standard?.url || thumbs?.medium?.url || thumbs?.default?.url || fallbackImages[index % fallbackImages.length],
            };
          })
          .filter((item: any) => Boolean(item.videoId));

        if (latestVideos.length > 0) setVideos(latestVideos);

        const snippet = channel.snippet || {};
        setChannelTitle(snippet.title || "CodingSkuy");
        setChannelUrl(
          snippet.customUrl
            ? `https://www.youtube.com/${snippet.customUrl.startsWith("@") ? snippet.customUrl : `@${snippet.customUrl}`}/videos`
            : `https://www.youtube.com/channel/${channel.id}/videos`,
        );

        const stat = channel.statistics || {};
        setStats({
          subscribers: formatCompactCount(stat.subscriberCount, language),
          videos: formatCompactCount(stat.videoCount, language),
          views: formatCompactCount(stat.viewCount, language),
        });
      } catch {
        if (!mounted) return;
      }
    };

    loadYoutubeData();
    return () => { mounted = false; };
  }, [language]);

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return videos;
    const lowerQ = searchQuery.toLowerCase();
    return videos.filter((v) => v.title.toLowerCase().includes(lowerQ));
  }, [videos, searchQuery]);

  const featuredVideo = filteredVideos[0] || FALLBACK_VIDEOS[0];

  const showcaseVideos = useMemo(() => {
    const fromLatest = filteredVideos.slice(1);
    if (searchQuery) return fromLatest;
    if (fromLatest.length >= 4) return fromLatest;
    const needed = Math.max(4 - fromLatest.length, 0);
    return [...fromLatest, ...FALLBACK_VIDEOS.slice(0, needed)];
  }, [filteredVideos, searchQuery]);

  const onTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    dragStateRef.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(event.pointerId);
    el.classList.add("is-dragging");
  };

  const onTrackPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const drag = dragStateRef.current;
    if (!el || !drag.isDown) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 6) dragStateRef.current.moved = true;
    el.scrollLeft = drag.scrollLeft - delta;
  };

  const onTrackPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    if (dragStateRef.current.moved) {
      suppressClickUntilRef.current = Date.now() + 140;
    }
    dragStateRef.current.isDown = false;
    el.releasePointerCapture(event.pointerId);
    el.classList.remove("is-dragging");
  };

  return (
    <section id="media" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: darkMode
            ? "linear-gradient(to bottom right, #1e3a5f, #0f172a, #164e63)"
            : "linear-gradient(to bottom right, #eff6ff, #ffffff, #ecfeff)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnpNNDQgNDR2Mi0yem0wLTMwdjItMnptLTIwLTIwdjItMnpNMiAydjItMnoiLz48L2c+PC9nPjwvc3ZnPg==')",
            opacity: darkMode ? 0.4 : 0.15,
          }}
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${darkMode ? "bg-cyan-500/10" : "bg-cyan-500/5"}`}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${darkMode ? "bg-blue-500/10" : "bg-blue-500/5"}`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with mascot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16"
        >
          <div className="flex items-center gap-6">
            <CodingSkuyMascot variant="idea" size={80} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35]" />
                <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#8b5cf6" }}>
                  {t.mediaHub.title}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black" style={{ color: textMain }}>
                <span className="bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
                  {t.mediaHub.heading}
                </span>
              </h2>
            </div>
          </div>
          <a
            href={`https://www.youtube.com/@${YT_CHANNEL_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-all hover:scale-105"
            style={{
              borderColor: darkMode ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.2)",
              color: "#8b5cf6",
            }}
          >
            {ui.media.allContent} <ArrowRight size={15} />
          </a>
        </motion.div>

        {/* Youtube cards */}
        {filteredVideos.length === 0 && searchQuery && (
          <p className="text-center text-slate-300 mb-16">{text.searchEmpty}</p>
        )}

        {filteredVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <button
              type="button"
              className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group cursor-pointer"
              onClick={() =>
                setActiveVideo({
                  title: featuredVideo.title,
                  embedUrl: toYouTubeEmbedUrl(featuredVideo.videoId),
                  watchUrl: toYouTubeWatchUrl(featuredVideo.videoId),
                })
              }
            >
              <img loading="lazy" decoding="async"
                src={featuredVideo.thumbnail}
                alt={text.coverAlt}
                className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <PlayCircle className="w-16 h-16 text-white fill-current" />
                </motion.div>
              </div>

              <div className="absolute left-4 right-4 bottom-4 text-left">
                <p className="text-white text-sm sm:text-base line-clamp-2">{featuredVideo.title}</p>
              </div>

              <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-8 left-8"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                className="absolute top-8 right-8"
              >
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </motion.div>
            </button>
          </motion.div>
        )}

        {showcaseVideos.length > 0 && (
          <div className="mb-16">
            <div
              ref={trackRef}
              className="overflow-x-auto pb-3 creator-manual-scroll snap-x snap-mandatory cursor-grab select-none"
              onPointerDown={onTrackPointerDown}
              onPointerMove={onTrackPointerMove}
              onPointerUp={onTrackPointerUp}
              onPointerCancel={onTrackPointerUp}
            >
              <div className="flex w-max gap-0">
                {showcaseVideos.map((video, index) => (
                  <motion.button
                    type="button"
                    key={`${video.id}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="relative text-left shrink-0 w-[290px] sm:w-[330px] mx-3 snap-start"
                    onClick={() => {
                      if (Date.now() < suppressClickUntilRef.current) return;
                      setActiveVideo({
                        title: video.title,
                        embedUrl: toYouTubeEmbedUrl(video.videoId),
                        watchUrl: toYouTubeWatchUrl(video.videoId),
                      });
                    }}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-colors h-full">
                      <div className="relative overflow-hidden rounded-xl">
                        <img loading="lazy" decoding="async"
                          src={video.thumbnail}
                          alt={`${text.characterAlt} ${index + 1}`}
                          className="w-full h-auto min-h-[180px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                        <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between gap-2">
                          <p className="text-sm text-white line-clamp-2 leading-snug">{video.title}</p>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/40 px-2 py-1 text-[11px] text-white shrink-0">
                            <PlayCircle className="w-3.5 h-3.5" />
                            {text.watchNow}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`backdrop-blur-sm rounded-2xl p-6 border text-center ${darkMode ? "bg-white/10 border-white/20" : "bg-white/80 border-slate-200"}`}
          >
            <Users className={`w-10 h-10 mx-auto mb-3 ${darkMode ? "text-cyan-400" : "text-cyan-600"}`} />
            <p className={`text-3xl mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>{stats.subscribers}</p>
            <p className={`${darkMode ? "text-slate-300" : "text-slate-500"}`}>{text.subscribers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`backdrop-blur-sm rounded-2xl p-6 border text-center ${darkMode ? "bg-white/10 border-white/20" : "bg-white/80 border-slate-200"}`}
          >
            <PlayCircle className={`w-10 h-10 mx-auto mb-3 ${darkMode ? "text-blue-300" : "text-blue-600"}`} />
            <p className={`text-3xl mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>{stats.videos}</p>
            <p className={`${darkMode ? "text-slate-300" : "text-slate-500"}`}>{text.videos}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`backdrop-blur-sm rounded-2xl p-6 border text-center ${darkMode ? "bg-white/10 border-white/20" : "bg-white/80 border-slate-200"}`}
          >
            <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            <p className={`text-3xl mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>{stats.views}</p>
            <p className={`${darkMode ? "text-slate-300" : "text-slate-500"}`}>{text.views}</p>
          </motion.div>
        </div>
      </div>

      <IframeDialog
        open={Boolean(activeVideo)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setActiveVideo(null);
        }}
        title={activeVideo?.title || ""}
        description={channelTitle}
        url={activeVideo?.embedUrl || "about:blank"}
        externalUrl={activeVideo?.watchUrl}
        openLabel={text.openInTab}
        loadingLabel={text.loadingVideo}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      />
    </section>
  );
}
