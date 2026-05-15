// Live fetch wrapper used by the server component as a fallback when the
// static data/trending.json snapshot is missing or stale. The primary data
// path in this project is the snapshot file written by the GitHub Action;
// this module is only invoked when that file is unavailable.

import { HF_API, scoreAndPick, type TrendingModel } from "./hf-core";
export {
  formatNumber,
  formatLastUpdate,
  type TrendingModel
} from "./hf-core";

export async function fetchTrendingModelsLive(
  limit: number = 12
): Promise<TrendingModel[]> {
  // Note: the HF API does not expose `sort=trending`; that is a website-only
  // view. Valid sort values are downloads, likes, lastModified, createdAt.
  // We pull a wide pool sorted by likes (a cleaner curation signal than raw
  // downloads) and let the local scorer mix in downloads and recency.
  const params = new URLSearchParams({
    pipeline_tag: "text-generation",
    sort: "likes",
    direction: "-1",
    limit: String(Math.max(limit * 6, 120)),
    full: "true"
  });

  const url = `${HF_API}?${params.toString()}`;
  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
    headers: {
      Accept: "application/json",
      ...(process.env.HF_API_TOKEN
        ? { Authorization: `Bearer ${process.env.HF_API_TOKEN}` }
        : {})
    }
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable>");
    console.error(
      `[hf-fetch] HF responded ${res.status} ${res.statusText} for ${url}\n  body: ${body.slice(0, 200)}`
    );
    return [];
  }

  const raw = await res.json();
  return scoreAndPick(raw, limit);
}
