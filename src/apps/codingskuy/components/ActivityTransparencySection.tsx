import { motion } from "motion/react";
import { ExternalLink, MessageCircle, RefreshCw, ShieldCheck, Sparkles, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { ContentDialog } from "@/components/ContentDialog";

type StatusKey =
  | "todo"
  | "in_progress"
  | "review_feedback"
  | "ready_validation"
  | "ready_handover"
  | "unknown";

type ActivityEntry = {
  id: string;
  source: "project" | "discussion";
  sourceType: string;
  title: string;
  url: string;
  number: number | null;
  state: string;
  status: string;
  statusKey: StatusKey;
  updatedAt: string;
  repository: string | null;
  labels: string[];
  comments?: number;
  body?: string;
};

type FunnelStage = {
  key: StatusKey;
  label: string;
  count: number;
};

type ActivityPayload = {
  generatedAt: string;
  owner: string;
  discussionRepo: string;
  project: {
    number: number;
    title: string;
    url: string;
  };
  funnel: FunnelStage[];
  projectItems: ActivityEntry[];
  discussions: ActivityEntry[];
  warnings: string[];
};

const FALLBACK_DATA: ActivityPayload = {
  generatedAt: "2026-04-07T03:00:00.000Z",
  owner: "Coding-Skuy",
  discussionRepo: "Coding-Skuy/.github",
  project: {
    number: 9,
    title: "Public Activity Board",
    url: "https://github.com/users/roiskhoiron/projects/9",
  },
  funnel: [
    { key: "todo", label: "Todo", count: 2 },
    { key: "in_progress", label: "In Progress", count: 1 },
    { key: "review_feedback", label: "Review/Feedback", count: 1 },
    { key: "ready_validation", label: "Ready to Validation", count: 1 },
    { key: "ready_handover", label: "Ready to Handover", count: 1 },
    { key: "unknown", label: "Unmapped", count: 0 },
  ],
  projectItems: [
    {
      id: "demo-1",
      source: "project",
      sourceType: "Issue",
      title: "Publish daily sprint recap page",
      url: "https://github.com/users/roiskhoiron/projects/9",
      number: 1,
      state: "OPEN",
      status: "In Progress",
      statusKey: "in_progress",
      updatedAt: "2026-04-07T02:30:00.000Z",
      repository: "roiskhoiron/roiskhoiron.github.io",
      labels: ["daily", "public"],
    },
  ],
  discussions: [
    {
      id: "discussion-demo-1",
      source: "discussion",
      sourceType: "Discussion",
      title: "What activity detail do you want to see every day?",
      url: "https://github.com/roiskhoiron/.github/discussions",
      number: 1,
      state: "OPEN",
      status: "Ideas",
      statusKey: "review_feedback",
      updatedAt: "2026-04-07T02:00:00.000Z",
      repository: "roiskhoiron/.github",
      labels: ["feedback"],
      comments: 3,
    },
  ],
  warnings: [],
};

const STATUS_ORDER: StatusKey[] = [
  "todo",
  "in_progress",
  "review_feedback",
  "ready_validation",
  "ready_handover",
];

const STAGE_META: Record<StatusKey, {
  text: string;
  dot: string;
  line: string;
  ring: string;
  cardBorder: string;
  chip: string;
}> = {
  todo: {
    text: "text-teal-500 dark:text-teal-300",
    dot: "bg-teal-500",
    line: "bg-teal-500",
    ring: "ring-teal-500/45",
    cardBorder: "border-teal-400/40",
    chip: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25",
  },
  in_progress: {
    text: "text-amber-500 dark:text-amber-300",
    dot: "bg-amber-500",
    line: "bg-amber-500",
    ring: "ring-amber-500/45",
    cardBorder: "border-amber-400/40",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
  },
  review_feedback: {
    text: "text-fuchsia-500 dark:text-fuchsia-300",
    dot: "bg-fuchsia-500",
    line: "bg-fuchsia-500",
    ring: "ring-fuchsia-500/45",
    cardBorder: "border-fuchsia-400/40",
    chip: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/25",
  },
  ready_validation: {
    text: "text-sky-500 dark:text-sky-300",
    dot: "bg-sky-500",
    line: "bg-sky-500",
    ring: "ring-sky-500/45",
    cardBorder: "border-sky-400/40",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
  },
  ready_handover: {
    text: "text-lime-600 dark:text-lime-300",
    dot: "bg-lime-600 dark:bg-lime-500",
    line: "bg-lime-600 dark:bg-lime-500",
    ring: "ring-lime-500/45",
    cardBorder: "border-lime-500/40",
    chip: "bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/25",
  },
  unknown: {
    text: "text-slate-500 dark:text-slate-300",
    dot: "bg-slate-500",
    line: "bg-slate-500",
    ring: "ring-slate-500/40",
    cardBorder: "border-slate-400/40",
    chip: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25",
  },
};

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_OWNER = "Coding-Skuy";
const GITHUB_DISCUSSION_REPO = ".github";
const GITHUB_PROJECT_NUMBER = 9;
const GITHUB_READ_TOKEN = import.meta.env.VITE_GITHUB_READ_TOKEN as string | undefined;

const copy: Record<Language, {
  funnel: Record<StatusKey, string>;
  liveFlow: string;
  title: string;
  description: string;
  sync: string;
  viewProject: string;
  joinDiscussion: string;
  step: string;
  itemsSuffix: string;
  noStageItems: string;
  publicBoard: string;
  audienceSignal: string;
  audienceSubtitle: string;
  noDiscussions: string;
  comments: string;
  openCollab: string;
  collabDescription: string;
  missingTokenWarning: string;
  liveFetchFailed: string;
  detailEmpty: string;
  openInTab: string;
  dialogPrompt: string;
  searchPlaceholder: string;
}> = {
  id: {
    funnel: {
      todo: "Akan Dipelajari",
      in_progress: "Sedang Dipelajari",
      review_feedback: "Praktik",
      ready_validation: "Siap Direview",
      ready_handover: "Selesai",
      unknown: "Belum Dipetakan",
    },
    liveFlow: "Alur Aktivitas Belajar",
    title: "Perjalanan Belajar Hari Ini",
    description:
      "Kami membuka perjalanan belajar komunitas ke publik — agar kamu bisa melihat proses nyata, progres, dan dampak dari setiap langkah yang kami ambil bersama.",
    sync: "Sinkronisasi",
    viewProject: "Lihat Progres",
    joinDiscussion: "Mulai Diskusi",
    step: "Langkah",
    itemsSuffix: "Item",
    noStageItems: "Belum ada item pada tahap ini.",
    publicBoard: "Roadmap Publik",
    audienceSignal: "Diskusi Publik",
    audienceSubtitle: "Diskusi terbuka dari komunitas pembelajaran.",
    noDiscussions: "Belum ada diskusi.",
    comments: "komentar",
    openCollab: "Belajar Bareng",
    collabDescription: "Proses belajar publik ini dirancang agar siapa pun bisa memberi masukan, bertanya, atau berdiskusi di setiap tahap.",
    missingTokenWarning: "VITE_GITHUB_READ_TOKEN tidak ditemukan, menggunakan snapshot build.",
    liveFetchFailed: "Live fetch gagal",
    detailEmpty: "Belum ada detail konten.",
    openInTab: "Buka Tab",
    dialogPrompt: "Punya ide, pertanyaan, atau sudut pandang berbeda? Yuk diskusi di GitHub.",
    searchPlaceholder: "Cari aktivitas atau diskusi...",
  },
  en: {
    funnel: {
      todo: "To Learn",
      in_progress: "Learning",
      review_feedback: "Practice",
      ready_validation: "Ready for Review",
      ready_handover: "Completed",
      unknown: "Unmapped",
    },
    liveFlow: "Learning Activity Flow",
    title: "Today's Growing Activity",
    description:
      "We open our community activity to the public — so you can see the real process, progress, and impact of every step we take together.",
    sync: "Sync",
    viewProject: "View Progress",
    joinDiscussion: "Start Discussion",
    step: "Step",
    itemsSuffix: "Items",
    noStageItems: "There are no items in this stage yet.",
    publicBoard: "Public Roadmap",
    audienceSignal: "Public Discussion",
    audienceSubtitle: "Open discussions from the learning community.",
    noDiscussions: "No discussions yet.",
    comments: "comments",
    openCollab: "Learn Together",
    collabDescription: "This public learning process is designed for anyone to give feedback, ask questions, or discuss at every stage.",
    missingTokenWarning: "VITE_GITHUB_READ_TOKEN is missing, using snapshot build.",
    liveFetchFailed: "Live fetch failed",
    detailEmpty: "Detail content is not available.",
    openInTab: "Open Tab",
    dialogPrompt: "Have ideas, questions, or another perspective? Let's discuss on GitHub.",
    searchPlaceholder: "Search activities or discussions...",
  },
  zh: {
    funnel: {
      todo: "待学习",
      in_progress: "学习中",
      review_feedback: "实践",
      ready_validation: "待评审",
      ready_handover: "已完成",
      unknown: "未映射",
    },
    liveFlow: "学习活动流",
    title: "今日学习旅程",
    description: "我们公开社区的技术学习旅程，让大家通过真实的过程、进度和影响了解每一步的成长。",
    sync: "同步",
    viewProject: "查看进度",
    joinDiscussion: "发起讨论",
    step: "步骤",
    itemsSuffix: "条目",
    noStageItems: "该阶段暂无条目。",
    publicBoard: "公开路线图",
    audienceSignal: "公开讨论",
    audienceSubtitle: "来自学习社区的公开讨论。",
    noDiscussions: "暂无讨论。",
    comments: "条评论",
    openCollab: "一起学习",
    collabDescription: "这个公开学习过程让任何人都可以在每个阶段给予反馈、提问或讨论。",
    missingTokenWarning: "未找到 VITE_GITHUB_READ_TOKEN，已使用快照数据。",
    liveFetchFailed: "实时拉取失败",
    detailEmpty: "暂无可显示的详情内容。",
    openInTab: "新标签打开",
    dialogPrompt: "如果你有想法、问题或不同视角，欢迎到 GitHub 继续讨论。",
    searchPlaceholder: "搜索活动或讨论...",
  },
  ja: {
    funnel: {
      todo: "学習予定",
      in_progress: "学習中",
      review_feedback: "実践",
      ready_validation: "レビュー待ち",
      ready_handover: "完了",
      unknown: "未分類",
    },
    liveFlow: "学習アクティビティフロー",
    title: "今日の学習の旅",
    description: "コミュニティの学習の旅を公開し、実際のプロセス、進捗、影響を誰でも見られるようにしています。",
    sync: "同期",
    viewProject: "進捗を見る",
    joinDiscussion: "ディスカッションを開始",
    step: "ステップ",
    itemsSuffix: "項目",
    noStageItems: "このステージにはまだ項目がありません。",
    publicBoard: "公開ロードマップ",
    audienceSignal: "公開ディスカッション",
    audienceSubtitle: "学習コミュニティからのオープンディスカッションです。",
    noDiscussions: "まだディスカッションはありません。",
    comments: "コメント",
    openCollab: "一緒に学ぶ",
    collabDescription: "この公開学習プロセスは、誰でも各段階でフィードバック、質問、議論ができるように設計されています。",
    missingTokenWarning: "VITE_GITHUB_READ_TOKEN が見つからないため、スナップショットを使用します。",
    liveFetchFailed: "ライブ取得に失敗しました",
    detailEmpty: "表示できる詳細コンテンツがありません。",
    openInTab: "新しいタブで開く",
    dialogPrompt: "アイデア、質問、または別の視点があれば、GitHub で議論に参加してください。",
    searchPlaceholder: "アクティビティやディスカッションを検索...",
  },
};

function toStatusKey(value: string) {
  const raw = (value || "").trim().toLowerCase();
  if (!raw) return "unknown";
  if (raw.includes("backlog") || raw.includes("todo") || raw.includes("to do")) return "todo";
  if (raw.includes("progress") || raw.includes("doing") || raw.includes("active")) return "in_progress";
  if (raw.includes("review") || raw.includes("feedback")) return "review_feedback";
  if (raw.includes("valid") || raw.includes("qa") || raw.includes("test")) return "ready_validation";
  if (raw.includes("handover") || raw === "done" || raw.includes("complete") || raw.includes("release")) {
    return "ready_handover";
  }
  return "unknown";
}

function buildFunnel(items: ActivityEntry[], language: Language): FunnelStage[] {
  const labels = copy[language].funnel;
  const counts: Record<StatusKey, number> = {
    todo: 0,
    in_progress: 0,
    review_feedback: 0,
    ready_validation: 0,
    ready_handover: 0,
    unknown: 0,
  };

  for (const item of items) counts[item.statusKey] += 1;

  return [
    { key: "todo", label: labels.todo, count: counts.todo },
    { key: "in_progress", label: labels.in_progress, count: counts.in_progress },
    { key: "review_feedback", label: labels.review_feedback, count: counts.review_feedback },
    { key: "ready_validation", label: labels.ready_validation, count: counts.ready_validation },
    { key: "ready_handover", label: labels.ready_handover, count: counts.ready_handover },
    { key: "unknown", label: labels.unknown, count: counts.unknown },
  ];
}

async function fetchGithubGraphql<T>(token: string, query: string, variables: Record<string, unknown>) {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "rk-activity-ui",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }

  const json = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(" | "));
  }
  if (!json.data) throw new Error("GitHub API returned empty data");
  return json.data;
}

function normalizeLiveProjectItem(item: any): ActivityEntry {
  const statusField = item.fieldValues?.nodes?.find(
    (node: any) => node?.__typename === "ProjectV2ItemFieldSingleSelectValue" && node?.field?.name?.toLowerCase() === "status",
  );
  const status = statusField?.name || "Unknown";
  const content = item.content || {};
  const title = content.title || item.fieldValues?.nodes?.find((n: any) => typeof n?.text === "string")?.text || "Untitled";

  return {
    id: item.id,
    source: "project",
    sourceType: content.__typename || "DraftIssue",
    title,
    url: content.url || `https://github.com/users/${GITHUB_OWNER}/projects/${GITHUB_PROJECT_NUMBER}`,
    number: content.number || null,
    state: content.state || "OPEN",
    status,
    statusKey: toStatusKey(status),
    updatedAt: content.updatedAt || item.updatedAt || new Date().toISOString(),
    repository: content.repository?.nameWithOwner || null,
    labels: content.labels?.nodes?.map((label: any) => label.name) || [],
    body: content.body || "",
  };
}

function normalizeLiveDiscussion(node: any): ActivityEntry {
  return {
    id: node.id,
    source: "discussion",
    sourceType: "Discussion",
    title: node.title,
    url: node.url,
    number: node.number || null,
    state: node.closed ? "CLOSED" : "OPEN",
    status: node.category?.name || "Discussion",
    statusKey: "review_feedback",
    updatedAt: node.updatedAt,
    repository: `${GITHUB_OWNER}/${GITHUB_DISCUSSION_REPO}`,
    labels: node.labels?.nodes?.map((label: any) => label.name) || [],
    comments: node.comments?.totalCount || 0,
    body: node.body || "",
  };
}

async function loadSnapshotData(): Promise<ActivityPayload> {
  const cacheBust = Math.floor(Date.now() / 60_000);
  const response = await fetch(`/data/activity.json?v=${cacheBust}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load snapshot data");
  return (await response.json()) as ActivityPayload;
}

async function loadLiveGithubData(token: string): Promise<ActivityPayload> {
  const projectQuery = `
    query ProjectData($owner: String!, $projectNumber: Int!) {
      user(login: $owner) {
        projectV2(number: $projectNumber) {
          title
          url
          items(first: 100) {
            nodes {
              id
              updatedAt
              fieldValues(first: 20) {
                nodes {
                  __typename
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field { ... on ProjectV2FieldCommon { name } }
                  }
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field { ... on ProjectV2FieldCommon { name } }
                  }
                }
              }
              content {
                __typename
                ... on Issue {
                  number
                  title
                  url
                  body
                  state
                  updatedAt
                  repository { nameWithOwner }
                  labels(first: 10) { nodes { name } }
                }
                ... on PullRequest {
                  number
                  title
                  url
                  body
                  state
                  updatedAt
                  repository { nameWithOwner }
                  labels(first: 10) { nodes { name } }
                }
                ... on DraftIssue {
                  title
                  body
                }
              }
            }
          }
        }
      }
    }
  `;

  const projectData = await fetchGithubGraphql<any>(token, projectQuery, {
    owner: GITHUB_OWNER,
    projectNumber: GITHUB_PROJECT_NUMBER,
  });

  const projectNode = projectData?.user?.projectV2;
  if (!projectNode) throw new Error(`Project ${GITHUB_PROJECT_NUMBER} not found`);

  const projectItems = (projectNode.items?.nodes || []).map(normalizeLiveProjectItem);

  let discussions: ActivityEntry[] = [];
  try {
    const discussionsQuery = `
      query DiscussionData($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussions(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              id
              number
              title
              url
              body
              updatedAt
              closed
              category { name }
              labels(first: 10) { nodes { name } }
              comments { totalCount }
            }
          }
        }
      }
    `;
    const discussionData = await fetchGithubGraphql<any>(token, discussionsQuery, {
      owner: GITHUB_OWNER,
      repo: GITHUB_DISCUSSION_REPO,
    });
    discussions = (discussionData?.repository?.discussions?.nodes || []).map(normalizeLiveDiscussion);
  } catch {
    discussions = [];
  }

  return {
    generatedAt: new Date().toISOString(),
    owner: GITHUB_OWNER,
    discussionRepo: `${GITHUB_OWNER}/${GITHUB_DISCUSSION_REPO}`,
    project: {
      number: GITHUB_PROJECT_NUMBER,
      title: projectNode.title || "Activity Board",
      url: projectNode.url || `https://github.com/users/${GITHUB_OWNER}/projects/${GITHUB_PROJECT_NUMBER}`,
    },
    funnel: buildFunnel(projectItems, "en"),
    projectItems,
    discussions,
    warnings: [],
  };
}

function formatDate(dateString: string, language: Language) {
  const localeByLanguage: Record<Language, string> = {
    id: "id-ID",
    en: "en-US",
    zh: "zh-CN",
    ja: "ja-JP",
  };

  try {
    return new Date(dateString).toLocaleString(localeByLanguage[language], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

function sourceLabel(item: ActivityEntry, language: Language) {
  if (item.sourceType === "Issue") return language === "id" ? "Isu" : language === "zh" ? "问题" : language === "ja" ? "課題" : "Issue";
  if (item.sourceType === "PullRequest") return language === "id" ? "Pull Request" : language === "zh" ? "拉取请求" : language === "ja" ? "プルリクエスト" : "Pull Request";
  if (item.sourceType === "DraftIssue") return language === "id" ? "Draft" : language === "zh" ? "草稿" : language === "ja" ? "下書き" : "Draft";
  return item.sourceType;
}

export function ActivityTransparencySection({ darkMode }: { darkMode: boolean }) {
  const { language } = useLanguage();
  const text = copy[language];
  const [data, setData] = useState<ActivityPayload>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState<StatusKey>("todo");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailItem, setDetailItem] = useState<{ title: string; description: string; content: string; url: string } | null>(null);
  const audienceListRef = useRef<HTMLDivElement | null>(null);
  const audienceAutoPausedRef = useRef(false);
  const audienceAutoResumeRef = useRef<number | null>(null);
  const audienceDragRef = useRef<{ isDown: boolean; startY: number; scrollTop: number; moved: boolean; maxDelta: number }>({
    isDown: false,
    startY: 0,
    scrollTop: 0,
    moved: false,
    maxDelta: 0,
  });

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      let snapshot: ActivityPayload | null = null;
      try {
        snapshot = await loadSnapshotData();
      } catch {
        snapshot = null;
      }

      try {
        if (!GITHUB_READ_TOKEN) {
          if (mounted) {
            setData(
              snapshot
                ? { ...snapshot, warnings: [text.missingTokenWarning] }
                : FALLBACK_DATA,
            );
          }
          return;
        }

        const live = await loadLiveGithubData(GITHUB_READ_TOKEN);
        if (mounted) setData(live);
      } catch (error) {
        if (mounted) {
          const message = error instanceof Error ? error.message : "Unknown error";
          if (snapshot) {
            setData({ ...snapshot, warnings: [`${text.liveFetchFailed}: ${message}`] });
          } else {
            setData({ ...FALLBACK_DATA, warnings: [`${text.liveFetchFailed}: ${message}`] });
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, [text.liveFetchFailed, text.missingTokenWarning]);

  const stageEntries = useMemo(() => {
    const map = new Map<StatusKey, ActivityEntry[]>();
    for (const key of STATUS_ORDER) map.set(key, []);

    const sorted = [...data.projectItems].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    for (const item of sorted) {
      if (map.has(item.statusKey)) map.get(item.statusKey)?.push(item);
    }

    return map;
  }, [data.projectItems]);

  const timelineStages = useMemo(
    () =>
      STATUS_ORDER.map((key) => ({
        key,
        label: text.funnel[key],
        count: stageEntries.get(key)?.length || 0,
        items: stageEntries.get(key) || [],
      })),
    [stageEntries, text.funnel],
  );

  useEffect(() => {
    const firstWithData = timelineStages.find((stage) => stage.items.length > 0)?.key || "todo";
    setActiveStage(firstWithData);
  }, [timelineStages]);

  const activeItems = (stageEntries.get(activeStage) || []).filter((item) => {
    if (!searchQuery) return true;
    const lowerQ = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(lowerQ) ||
      (item.body && item.body.toLowerCase().includes(lowerQ)) ||
      item.labels.some((l) => l.toLowerCase().includes(lowerQ))
    );
  });
  const activeLabel = timelineStages.find((stage) => stage.key === activeStage)?.label || text.step;
  const filteredDiscussions = data.discussions.filter((discussion) => {
    if (discussion.state !== "OPEN") return false;
    if (!searchQuery) return true;
    const lowerQ = searchQuery.toLowerCase();
    return (
      discussion.title.toLowerCase().includes(lowerQ) ||
      (discussion.body && discussion.body.toLowerCase().includes(lowerQ)) ||
      discussion.labels.some((l) => l.toLowerCase().includes(lowerQ))
    );
  });
  const audienceRows = useMemo(() => {
    if (filteredDiscussions.length === 0) return [] as { discussion: ActivityEntry; key: string }[];
    const minRows = 10;
    const loops = Math.max(1, Math.ceil(minRows / filteredDiscussions.length));
    return Array.from({ length: loops }).flatMap((_, loopIndex) =>
      filteredDiscussions.map((discussion, index) => ({
        discussion,
        key: `${discussion.id}-loop-${loopIndex}-${index}`,
      })),
    );
  }, [filteredDiscussions]);

  useEffect(() => {
    const container = audienceListRef.current;
    if (!container || audienceRows.length <= 1) return;

    let rafId = 0;
    let lastTs = 0;

    const speedPxPerSec = 13;
    const step = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      const max = container.scrollHeight - container.clientHeight;
      if (!audienceAutoPausedRef.current && max > 0) {
        const next = container.scrollTop - (speedPxPerSec * delta) / 1000;
        container.scrollTop = next <= 0 ? max : next;
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    const maxInitial = container.scrollHeight - container.clientHeight;
    if (maxInitial > 0) {
      container.scrollTop = maxInitial;
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      if (audienceAutoResumeRef.current) {
        window.clearTimeout(audienceAutoResumeRef.current);
      }
    };
  }, [audienceRows.length]);

  const pauseAudienceAutoScroll = () => {
    audienceAutoPausedRef.current = true;
    if (audienceAutoResumeRef.current) {
      window.clearTimeout(audienceAutoResumeRef.current);
    }
    audienceAutoResumeRef.current = window.setTimeout(() => {
      audienceAutoPausedRef.current = false;
    }, 1400);
  };

  const onAudiencePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = audienceListRef.current;
    if (!el) return;
    event.preventDefault();
    audienceAutoPausedRef.current = true;
    event.currentTarget.classList.add("is-dragging-y", "dragging-cursor");
    document.body.classList.add("dragging-cursor");
    audienceDragRef.current = {
      isDown: true,
      startY: event.clientY,
      scrollTop: el.scrollTop,
      moved: false,
      maxDelta: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onAudiencePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = audienceListRef.current;
    const drag = audienceDragRef.current;
    if (!el || !drag.isDown) return;
    const deltaY = event.clientY - drag.startY;
    drag.maxDelta = Math.max(drag.maxDelta, Math.abs(deltaY));
    if (drag.maxDelta > 10) {
      drag.moved = true;
      event.preventDefault();
    }
    el.scrollTop = drag.scrollTop - deltaY;
  };

  const onAudiencePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    audienceDragRef.current.isDown = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // no-op
    }
    event.currentTarget.classList.remove("is-dragging-y", "dragging-cursor");
    document.body.classList.remove("dragging-cursor");
    pauseAudienceAutoScroll();
  };

  const onAudienceWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const el = audienceListRef.current;
    if (!el) return;
    el.scrollTop += event.deltaY;
    pauseAudienceAutoScroll();
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <section id="activity" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_55%)]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-teal-600 dark:text-teal-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            {text.liveFlow}
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl tracking-tight text-slate-900 dark:text-white">
            {text.title}
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
            {text.description}
          </p>
        </motion.div>

        <div className={`rounded-3xl border p-5 md:p-7 backdrop-blur-sm ${
          darkMode
            ? "border-white/[0.08] bg-[#090d1a]/80"
            : "border-slate-200 bg-white/85"
        }`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{text.sync}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">{formatDate(data.generatedAt, language)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={data.project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300/70 dark:border-white/[0.12] px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              >
                {text.viewProject} <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/orgs/Coding-Skuy/discussions"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-500 px-3 py-1.5 text-xs text-white transition-colors"
              >
                {text.joinDiscussion} <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="hidden md:block relative h-[380px] mb-8">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-300/85 dark:bg-white/[0.18]" />
            <div className="grid grid-cols-5 h-full">
              {timelineStages.map((stage, index) => {
                const isTop = index % 2 === 1;
                const isActive = activeStage === stage.key;
                const meta = STAGE_META[stage.key];

                return (
                  <div
                    key={stage.key}
                    className="relative"
                    onMouseEnter={() => setActiveStage(stage.key)}
                    onFocus={() => setActiveStage(stage.key)}
                  >
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.07 }}
                      onClick={() => setActiveStage(stage.key)}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <span className="relative block">
                        <span className={`absolute inset-0 rounded-full ring-1 ${meta.ring} scale-[1.75]`} />
                        <span className={`absolute inset-0 rounded-full ring-1 ${meta.ring} scale-[2.35]`} />
                        <span
                          className={`block h-5 w-5 rounded-full border-2 border-white/90 dark:border-[#090d1a] ${meta.dot} ${
                            isActive ? "scale-110" : ""
                          } transition-transform`}
                        />
                      </span>
                    </motion.button>

                    <span
                      className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-20 ${meta.line} ${
                        isTop ? "top-[calc(50%-80px)]" : "top-1/2"
                      }`}
                    />
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full ${meta.dot} ${
                        isTop ? "top-[calc(50%-88px)]" : "top-[calc(50%+80px)]"
                      }`}
                    />

                    <motion.button
                      type="button"
                      onClick={() => setActiveStage(stage.key)}
                      className={`absolute left-1/2 -translate-x-1/2 w-[180px] rounded-xl border bg-white/90 dark:bg-[#0d1424]/90 p-3 text-left transition-all ${
                        isTop ? "top-[36px]" : "bottom-[36px]"
                      } ${meta.cardBorder} ${isActive ? "shadow-lg scale-[1.02]" : "hover:scale-[1.01]"}`}
                      initial={{ opacity: 0, y: isTop ? -10 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.07 + 0.05 }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        {text.step} {index + 1}
                      </p>
                      <p className={`mt-1 text-lg leading-none ${meta.text}`}>{stage.count}</p>
                      <p className="mt-1 text-sm text-slate-900 dark:text-white leading-tight">{stage.label}</p>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:hidden mb-5 grid grid-cols-2 gap-2">
            {timelineStages.map((stage, index) => {
              const isActive = activeStage === stage.key;
              const meta = STAGE_META[stage.key];
              return (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() => setActiveStage(stage.key)}
                  className={`rounded-xl border p-3 text-left transition ${meta.cardBorder} ${
                    isActive ? "bg-white dark:bg-white/[0.07]" : "bg-slate-50 dark:bg-white/[0.02]"
                  }`}
                >
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{text.step} {index + 1}</p>
                  <p className="text-sm text-slate-900 dark:text-white">{stage.label}</p>
                  <p className={`text-lg ${meta.text}`}>{stage.count}</p>
                </button>
              );
            })}
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-white/[0.12] rounded-xl leading-5 bg-white/50 dark:bg-[#0d1424]/50 text-slate-900 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 sm:text-sm transition-colors"
                placeholder={text.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-slate-900/30 p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-slate-900 dark:text-white tracking-tight">{activeLabel} {text.itemsSuffix}</h3>
                {loading && <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />}
              </div>

              <div
                className={`space-y-2.5 ${
                  activeStage === "ready_validation"
                    ? "max-h-[420px] overflow-y-auto pr-1 no-scrollbar inertial-y"
                    : ""
                }`}
              >
                {activeItems.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{text.noStageItems}</p>
                )}
                {activeItems.map((item) => {
                  const meta = STAGE_META[item.statusKey] || STAGE_META.unknown;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() =>
                        setDetailItem({
                          title: item.title,
                          description: `${item.repository || text.publicBoard}${item.number ? ` • #${item.number}` : ""} • ${formatDate(item.updatedAt, language)}`,
                          content: item.body || text.detailEmpty,
                          url: item.url,
                        })
                      }
                      className="group block rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-3 hover:border-cyan-300 dark:hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="text-left">
                        <p className="text-sm text-slate-900 dark:text-white leading-snug group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.repository || text.publicBoard}
                          {item.number ? ` • #${item.number}` : ""} • {formatDate(item.updatedAt, language)}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${meta.chip}`}>
                            {sourceLabel(item, language)}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/[0.12] px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300">
                            {item.status}
                          </span>
                          {item.labels.slice(0, 4).map((label) => (
                            <span
                              key={`${item.id}-${label}`}
                              className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/[0.12] px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <aside className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4 md:p-5">
              <h3 className="text-lg text-slate-900 dark:text-white tracking-tight">{text.audienceSignal}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text.audienceSubtitle}</p>
              <div className="mt-3 flex items-stretch gap-2">
                <div
                  ref={audienceListRef}
                  onTouchStart={() => {
                    audienceAutoPausedRef.current = true;
                  }}
                  onTouchEnd={() => {
                    pauseAudienceAutoScroll();
                  }}
                  onMouseEnter={() => {
                    audienceAutoPausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    pauseAudienceAutoScroll();
                  }}
                  onWheel={onAudienceWheel}
                  className="flex-1 space-y-2.5 max-h-[420px] overflow-y-auto pr-1 no-scrollbar inertial-y touch-pan-y"
                >
                  {filteredDiscussions.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{text.noDiscussions}</p>
                  )}
                  {audienceRows.map(({ discussion, key }) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => {
                        setDetailItem({
                          title: discussion.title,
                          description: `${discussion.comments || 0} ${text.comments} • ${formatDate(discussion.updatedAt, language)}`,
                          content: discussion.body || text.detailEmpty,
                          url: discussion.url,
                        });
                      }}
                      className="group block w-full rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-slate-900/30 p-3 text-left hover:border-teal-300 dark:hover:border-teal-500/40 transition-colors"
                    >
                      <p className="text-sm text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors leading-snug">
                        {discussion.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {discussion.comments || 0} {text.comments} • {formatDate(discussion.updatedAt, language)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-full border border-teal-500/25 bg-teal-500/10 px-2 py-0.5 text-[11px] text-teal-700 dark:text-teal-300">
                          {discussion.status}
                        </span>
                        {discussion.labels.slice(0, 4).map((label) => (
                          <span
                            key={`${discussion.id}-${label}`}
                            className="inline-flex items-center rounded-full border border-slate-300/70 dark:border-white/[0.12] px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                <div
                  onPointerDown={onAudiencePointerDown}
                  onPointerMove={onAudiencePointerMove}
                  onPointerUp={onAudiencePointerUp}
                  onPointerCancel={onAudiencePointerUp}
                  className="audience-drag-zone max-h-[420px] w-9 shrink-0 rounded-xl border border-slate-300/70 dark:border-white/[0.12] bg-slate-100/70 dark:bg-white/[0.03] cursor-grab select-none flex flex-col items-center justify-center gap-2"
                  aria-label="Drag area for Audience Signal list"
                  role="presentation"
                >
                  <span className="h-12 w-1.5 rounded-full bg-slate-400/70 dark:bg-slate-500/70" />
                  <span className="h-12 w-1.5 rounded-full bg-slate-400/45 dark:bg-slate-500/45" />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-cyan-200/80 dark:border-cyan-500/30 bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-cyan-500/10 dark:to-emerald-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {text.openCollab}
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  {text.collabDescription}
                </p>
              </div>
            </aside>
          </div>
        </div>

        {data.warnings.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            {data.warnings.join(" | ")}
          </div>
        )}
      </div>

      <ContentDialog
        open={Boolean(detailItem)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setDetailItem(null);
        }}
        title={detailItem?.title || ""}
        description={detailItem?.description}
        content={detailItem?.content || ""}
        externalUrl={detailItem?.url}
        openLabel={text.openInTab}
        variant="discussion"
        prompt={text.dialogPrompt}
      />
    </section>
  );
}
