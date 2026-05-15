// Standalone script that fetches Hugging Face trending text-generation models,
// applies the weighted scoring, and writes the result to data/trending.json.
//
// Designed to run inside the GitHub Action workflow at
// .github/workflows/sync-trending.yml. Can also be run locally:
//
//   npm run sync:trending
//
// The script exits with code 0 on success (whether or not the snapshot
// changed) and non-zero on a hard failure (network, JSON parse, write
// error). The Action treats a clean run with no diff as a no-op.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  HF_API,
  SCORE_WEIGHTS,
  scoreAndPick,
  type HfRawModel,
  type TrendingSnapshot
} from "../lib/hf-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SNAPSHOT_PATH = path.join(REPO_ROOT, "data", "trending.json");

const LIMIT = 16;       // models kept in the snapshot
const FETCH_SIZE = 100; // models requested from HF before filtering

async function main() {
  // HF API does not support sort=trending — that is a website-only view.
  // Valid sorts are downloads, likes, lastModified, createdAt. We pull a
  // wide pool ranked by likes (cleaner curation signal than raw downloads)
  // and let the local scorer apply the weighted mix.
  const params = new URLSearchParams({
    pipeline_tag: "text-generation",
    sort: "likes",
    direction: "-1",
    limit: String(FETCH_SIZE),
    full: "true"
  });

  const url = `${HF_API}?${params.toString()}`;
  console.log(`[sync-trending] fetching ${url}`);

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...(process.env.HF_API_TOKEN
        ? { Authorization: `Bearer ${process.env.HF_API_TOKEN}` }
        : {})
    }
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable>");
    throw new Error(
      `Hugging Face responded ${res.status} ${res.statusText}\n  body: ${body.slice(0, 300)}`
    );
  }

  const raw = (await res.json()) as HfRawModel[];
  console.log(`[sync-trending] received ${raw.length} raw entries`);

  const picked = scoreAndPick(raw, LIMIT);
  console.log(`[sync-trending] kept ${picked.length} after filter+score`);

  const snapshot: TrendingSnapshot = {
    fetchedAt: new Date().toISOString(),
    source: url,
    weights: SCORE_WEIGHTS,
    count: picked.length,
    models: picked
  };

  // Read previous snapshot for a useful diff log.
  let previous: TrendingSnapshot | null = null;
  try {
    const prev = await fs.readFile(SNAPSHOT_PATH, "utf8");
    previous = JSON.parse(prev) as TrendingSnapshot;
  } catch {
    // First run.
  }

  await fs.mkdir(path.dirname(SNAPSHOT_PATH), { recursive: true });
  await fs.writeFile(
    SNAPSHOT_PATH,
    JSON.stringify(snapshot, null, 2) + "\n",
    "utf8"
  );

  // Log a quick diff: new entries vs entries that fell out of the list.
  if (previous) {
    const prevIds = new Set(previous.models.map((m) => m.id));
    const newIds = new Set(picked.map((m) => m.id));
    const added = picked.filter((m) => !prevIds.has(m.id)).map((m) => m.id);
    const removed = previous.models
      .filter((m) => !newIds.has(m.id))
      .map((m) => m.id);

    if (added.length === 0 && removed.length === 0) {
      console.log("[sync-trending] no membership change in top list");
    } else {
      if (added.length > 0) {
        console.log("[sync-trending] new entries:");
        added.forEach((id) => console.log(`  + ${id}`));
      }
      if (removed.length > 0) {
        console.log("[sync-trending] dropped from list:");
        removed.forEach((id) => console.log(`  - ${id}`));
      }
    }
  } else {
    console.log("[sync-trending] first run, no previous snapshot to diff");
  }

  console.log(`[sync-trending] wrote ${SNAPSHOT_PATH}`);
}

main().catch((err) => {
  console.error("[sync-trending] failed", err);
  process.exit(1);
});
