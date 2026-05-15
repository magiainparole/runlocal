// Reads the trending snapshot committed by the GitHub Action. Falls back to
// a live HF fetch if the snapshot is missing — useful for the first deploy
// before the Action has run, and for local dev when you haven't synced yet.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fetchTrendingModelsLive } from "./hf-fetch";
import type { TrendingModel, TrendingSnapshot } from "./hf-core";

const SNAPSHOT_PATH = path.join(process.cwd(), "data", "trending.json");

export async function readTrendingSnapshot(): Promise<TrendingSnapshot | null> {
  try {
    const raw = await fs.readFile(SNAPSHOT_PATH, "utf8");
    return JSON.parse(raw) as TrendingSnapshot;
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code !== "ENOENT") {
      console.error("[hf-static] failed to read snapshot", err);
    }
    return null;
  }
}

export async function getTrendingModels(limit: number = 12): Promise<{
  models: TrendingModel[];
  source: "snapshot" | "live" | "empty";
  fetchedAt: string | null;
}> {
  const snap = await readTrendingSnapshot();
  if (snap && snap.models?.length > 0) {
    return {
      models: snap.models.slice(0, limit),
      source: "snapshot",
      fetchedAt: snap.fetchedAt
    };
  }

  // Fallback: live fetch.
  try {
    const live = await fetchTrendingModelsLive(limit);
    return {
      models: live,
      source: live.length > 0 ? "live" : "empty",
      fetchedAt: null
    };
  } catch (err) {
    console.error("[hf-static] live fallback failed", err);
    return { models: [], source: "empty", fetchedAt: null };
  }
}
