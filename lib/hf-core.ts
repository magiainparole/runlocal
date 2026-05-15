// Pure logic for fetching, scoring and normalising Hugging Face Hub trending
// models. No Next.js dependencies on purpose, so the same module is used by
// both the server component (via lib/hf-fetch.ts) and the standalone GitHub
// Action script (scripts/sync-trending.ts).

import { resolveLicense, type LicenseInfo } from "./license-map";

export type HfRawModel = {
  id: string;
  modelId?: string;
  author?: string;
  downloads?: number;
  likes?: number;
  lastModified?: string;
  createdAt?: string;
  tags?: string[];
  pipeline_tag?: string;
  library_name?: string;
  cardData?: {
    license?: string;
    language?: string | string[];
    base_model?: string | string[];
    model_size?: string;
  };
};

export type TrendingModel = {
  id: string;
  name: string;
  author: string;
  url: string;
  downloads: number;
  likes: number;
  lastModified: string;
  daysSinceUpdate: number;
  license: LicenseInfo;
  tags: string[];
  paramHint: string | null;
  score: number;
};

export type TrendingSnapshot = {
  fetchedAt: string;            // ISO timestamp when the script ran
  source: string;               // the HF endpoint that produced this
  weights: typeof SCORE_WEIGHTS;
  count: number;
  models: TrendingModel[];
};

export const HF_API = "https://huggingface.co/api/models";

export const SCORE_WEIGHTS = {
  downloads: 0.4,
  likes: 0.4,
  recency: 0.2
};

const SURFACE_TAG_PREFIXES = [
  "code",
  "instruct",
  "chat",
  "reasoning",
  "multilingual",
  "moe",
  "math",
  "function-calling"
];

export function pickSurfaceTags(tags: string[] | undefined): string[] {
  if (!tags) return [];
  const out: string[] = [];
  for (const t of tags) {
    const tl = t.toLowerCase();
    if (SURFACE_TAG_PREFIXES.some((p) => tl === p || tl.startsWith(p + "-"))) {
      out.push(t);
    }
  }
  return out.slice(0, 4);
}

export function extractParamHint(id: string, tags: string[] | undefined): string | null {
  const haystack = (id + " " + (tags || []).join(" ")).toLowerCase();
  const m = haystack.match(/(\d{1,3}(?:\.\d)?)\s*[bm](?=[\W_]|$)/);
  if (!m) return null;
  return m[0].toUpperCase().replace(/\s+/g, "");
}

export function daysBetween(iso: string, now: number = Date.now()): number {
  const then = new Date(iso).getTime();
  return Math.max(0, Math.floor((now - then) / 86_400_000));
}

export function extractLicenseFromTags(tags: string[] | undefined): string | undefined {
  if (!tags) return undefined;
  const t = tags.find((x) => x.toLowerCase().startsWith("license:"));
  return t ? t.split(":")[1] : undefined;
}

export function isWorthShowing(m: HfRawModel): boolean {
  if (!m.id) return false;
  if ((m.downloads ?? 0) < 1000 && (m.likes ?? 0) < 50) return false;
  const author = m.id.split("/")[0];
  const SUSPICIOUS_AUTHOR = /^(test|tmp|demo|john|jane|user|aaa|qqq)\d*$/i;
  if (SUSPICIOUS_AUTHOR.test(author)) return false;
  return true;
}

export function buildScorer(batch: HfRawModel[]) {
  const maxDownloads = Math.max(1, ...batch.map((m) => m.downloads ?? 0));
  const maxLikes = Math.max(1, ...batch.map((m) => m.likes ?? 0));
  const logMaxDownloads = Math.log10(maxDownloads + 1);
  const logMaxLikes = Math.log10(maxLikes + 1);

  return function score(m: HfRawModel): number {
    const dl = Math.log10((m.downloads ?? 0) + 1) / logMaxDownloads;
    const lk = Math.log10((m.likes ?? 0) + 1) / logMaxLikes;
    const days = m.lastModified ? daysBetween(m.lastModified) : 365;
    const rec = Math.max(0, 1 - days / 180);
    return (
      dl * SCORE_WEIGHTS.downloads +
      lk * SCORE_WEIGHTS.likes +
      rec * SCORE_WEIGHTS.recency
    );
  };
}

export function normalise(m: HfRawModel, score: number): TrendingModel {
  const id = m.id || m.modelId || "unknown/unknown";
  const [author, ...rest] = id.split("/");
  const name = rest.join("/") || id;
  const lastModified = m.lastModified || m.createdAt || new Date().toISOString();
  const licenseRaw = m.cardData?.license || extractLicenseFromTags(m.tags);
  return {
    id,
    name,
    author,
    url: `https://huggingface.co/${id}`,
    downloads: m.downloads ?? 0,
    likes: m.likes ?? 0,
    lastModified,
    daysSinceUpdate: daysBetween(lastModified),
    license: resolveLicense(licenseRaw),
    tags: pickSurfaceTags(m.tags),
    paramHint: extractParamHint(id, m.tags),
    score
  };
}

export function scoreAndPick(raw: HfRawModel[], limit: number): TrendingModel[] {
  const filtered = raw.filter(isWorthShowing);
  const scorer = buildScorer(filtered);
  return filtered
    .map((m) => normalise(m, scorer(m)))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function formatLastUpdate(days: number): string {
  if (days < 1) return "today";
  if (days < 2) return "yesterday";
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
