// Weekly watchdog for the curated model catalog.
//
// Fetches the current top of Hugging Face and produces a markdown report of:
//   1. NEW FAMILIES — popular models whose id matches none of the covered
//      family substrings in data/catalog-coverage.json. These are candidates
//      for a new entry in lib/models.ts or lib/frontier-models.ts.
//   2. NOTABLE RECENT RELEASES — models updated in the last 21 days with
//      significant traction, whatever the family. These catch new versions
//      of families we already cover (e.g. GLM-5.3 after GLM-5.2).
//   3. STALE VERSIONS — trending models whose family IS covered but whose
//      version string appears nowhere in the catalog files. Substring
//      coverage ("qwen") hides a catalog stuck two generations back
//      ("Qwen 3.5" while the Hub has moved to Qwen 3.8); this catches it.
//
// It also asserts the coverage invariant: every family listed in
// data/catalog-coverage.json must actually appear in one of the catalog
// files. Otherwise a family can be silenced forever without ever being
// documented — which is exactly how gpt-oss went a year unnoticed.
//
// The report is written to /tmp/freshness-report.md (or the path in
// REPORT_PATH). The GitHub workflow turns a non-empty report into an issue.
// Exit code 0 always — an empty report is a success, not a failure.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const REPORT_PATH = process.env.REPORT_PATH || "/tmp/freshness-report.md";

const HF_API = "https://huggingface.co/api/models";
const RECENT_DAYS = 21;
const MIN_LIKES_NEW_FAMILY = 500;
const MIN_LIKES_RECENT = 800;
// Likes accumulate slowly; downloads do not. A model can be the release of the
// month with a few hundred likes and six-figure downloads, so either signal
// qualifies it as notable.
const MIN_DOWNLOADS_RECENT = 100_000;
// A "new family" candidate must also be alive: updated within this window.
// Without this filter the list fills up with Bloom/Falcon-era models whose
// cumulative likes are high but whose relevance died years ago.
const NEW_FAMILY_MAX_AGE_DAYS = 180;

function daysBetween(iso, now = Date.now()) {
  return Math.max(0, Math.floor((now - new Date(iso).getTime()) / 86400000));
}

async function fetchHf(params) {
  const url = `${HF_API}?${new URLSearchParams(params).toString()}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...(process.env.HF_API_TOKEN
        ? { Authorization: `Bearer ${process.env.HF_API_TOKEN}` }
        : {})
    }
  });
  if (!res.ok) throw new Error(`HF ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

const coverage = JSON.parse(
  await readFile(path.join(REPO_ROOT, "data", "catalog-coverage.json"), "utf8")
);

// The catalog files, concatenated and lowercased. Used for two things: proving
// every covered family is actually documented, and spotting versions that are
// trending but absent from our pages.
const CATALOG_FILES = [
  "lib/model-registry.ts"
];
const catalogText = (
  await Promise.all(
    CATALOG_FILES.map((f) => readFile(path.join(REPO_ROOT, f), "utf8"))
  )
)
  .join("\n")
  // Drop line comments first: the type definitions carry example values
  // ("Qwen 3.5", "DeepSeek V4") that would otherwise read as documentation.
  // The leading group keeps "https://" from being mistaken for a comment.
  .replace(/(^|[^:])\/\/.*$/gm, "$1")
  .toLowerCase();
// Collapse separators so "Qwen 3.8", "Qwen3.8" and "qwen-3-8" all compare equal.
const catalogNormalized = catalogText.replace(/[\s._-]/g, "");
const covered = coverage.coveredFamilies.map((s) => s.toLowerCase());
// Alias families match model ids but are exempt from the documentation
// invariant: they are Hub naming conventions, not names we write in prose.
const aliases = (coverage.aliasFamilies || []).map((s) => s.toLowerCase());
const matchable = [...covered, ...aliases];
const ignoredAuthors = new Set(
  (coverage.ignoredAuthors || []).map((s) => s.toLowerCase())
);

function isCovered(id) {
  const idl = id.toLowerCase();
  return matchable.some((fam) => idl.includes(fam));
}

// "Qwen/Qwen3.8-27B" -> "qwen3.8"; "zai-org/GLM-5.2" -> "glm5.2".
// Deliberately conservative: only dotted versions count. Matching bare integers
// would collide with parameter counts ("Qwen3-30B") and drown the report in
// false positives, at the cost of missing single-digit families like Phi-5.
// Returns null when the name carries no version number to compare.
function versionToken(id) {
  const name = (id.split("/")[1] || "").toLowerCase();
  const match = name.match(/([a-z]+)[-_ ]?v?(\d+(?:\.\d+)+)/);
  if (!match) return null;
  return { family: match[1], version: match[2], token: `${match[1]}${match[2]}` };
}

// True when the catalog mentions this exact family+version anywhere.
function versionIsDocumented(token) {
  return catalogNormalized.includes(token.replace(/[\s._-]/g, ""));
}

function looksLikePersonalFinetune(id) {
  // Heuristic: org accounts are usually short and brand-like; personal
  // fine-tunes tend to have long hyphen-soup names. Not perfect, flags only.
  const name = id.split("/")[1] || "";
  return (name.match(/-/g) || []).length >= 5;
}

// Invariant: a silenced family must be a documented one.
const ghostFamilies = covered.filter((fam) => !catalogText.includes(fam));
if (ghostFamilies.length > 0) {
  console.error(
    "coveredFamilies lists entries that appear in no catalog file: " +
      ghostFamilies.join(", ") +
      "\nEither add the model to lib/models.ts, or drop the family from data/catalog-coverage.json."
  );
  process.exitCode = 1;
}

// Pool: top by likes (established) + recently created with traction.
const byLikes = await fetchHf({
  pipeline_tag: "text-generation",
  sort: "likes",
  direction: "-1",
  limit: "100",
  full: "true"
});

// Trending score is the Hub's own "what is hot right now" signal. Without this
// pool a release like Nemotron 3.5 (170k downloads, 146 likes) never surfaces.
const byTrending = await fetchHf({
  pipeline_tag: "text-generation",
  sort: "trendingScore",
  direction: "-1",
  limit: "50",
  full: "true"
});

const seen = new Set();
const pool = [...byLikes, ...byTrending].filter((m) => {
  if (!m.id || seen.has(m.id)) return false;
  seen.add(m.id);
  return true;
});

const models = pool.filter(
  (m) =>
    m.id &&
    !ignoredAuthors.has(m.id.split("/")[0].toLowerCase()) &&
    (m.likes ?? 0) >= 100
);

const newFamilies = [];
const recentNotable = [];
const staleVersions = [];

for (const m of models) {
  const likes = m.likes ?? 0;
  const dl = m.downloads ?? 0;
  const days = m.lastModified ? daysBetween(m.lastModified) : 9999;

  if (
    !isCovered(m.id) &&
    likes >= MIN_LIKES_NEW_FAMILY &&
    days <= NEW_FAMILY_MAX_AGE_DAYS
  ) {
    newFamilies.push({ ...m, _days: days, _finetune: looksLikePersonalFinetune(m.id) });
  }
  if (days <= RECENT_DAYS && (likes >= MIN_LIKES_RECENT || dl >= MIN_DOWNLOADS_RECENT)) {
    recentNotable.push({ ...m, _days: days, _covered: isCovered(m.id) });
  }

  // Covered family, undocumented version: the blind spot substring matching
  // creates. Only worth reporting for models with real traction.
  if (isCovered(m.id) && (likes >= 200 || dl >= MIN_DOWNLOADS_RECENT)) {
    const v = versionToken(m.id);
    if (v && !versionIsDocumented(v.token)) {
      staleVersions.push({ ...m, _days: days, _token: v.token });
    }
  }
}

let report = "";

if (newFamilies.length > 0) {
  report += "## New families not in the curated catalog\n\n";
  report += "These match none of the covered families in `data/catalog-coverage.json`. ";
  report += "Consider an entry in `lib/models.ts` (runnable) or `lib/frontier-models.ts` (too big), or add the family to the coverage list to silence.\n\n";
  for (const m of newFamilies) {
    const ft = m._finetune ? " · ⚠ looks like a personal fine-tune" : "";
    report += `- [\`${m.id}\`](https://huggingface.co/${m.id}) — ♥${m.likes} · ↓${(m.downloads ?? 0).toLocaleString()} · updated ${m._days}d ago${ft}\n`;
  }
  report += "\n";
}

if (staleVersions.length > 0) {
  report += "## Covered families with an undocumented version\n\n";
  report += "The family is in `coveredFamilies`, so the check above stays quiet — but this specific version appears in none of the catalog files. Usually means the catalog entry is a generation or two behind.\n\n";
  for (const m of staleVersions) {
    report += `- [\`${m.id}\`](https://huggingface.co/${m.id}) — \`${m._token}\` not found in catalog · ♥${m.likes} · ↓${(m.downloads ?? 0).toLocaleString()} · updated ${m._days}d ago\n`;
  }
  report += "\n";
}

if (recentNotable.length > 0) {
  report += "## Notable releases in the last 3 weeks\n\n";
  report += "High-traction models updated recently. New versions of covered families show up here too — check whether catalog notes (versions, dates, 'weights expected' claims) are stale.\n\n";
  for (const m of recentNotable) {
    const cov = m._covered ? "covered family" : "NOT covered";
    report += `- [\`${m.id}\`](https://huggingface.co/${m.id}) — ♥${m.likes} · ↓${(m.downloads ?? 0).toLocaleString()} · updated ${m._days}d ago · ${cov}\n`;
  }
  report += "\n";
}

if (report) {
  report =
    `Weekly catalog freshness check — ${new Date().toISOString().slice(0, 10)}\n\n` +
    report +
    "---\n_Generated by `.github/workflows/catalog-freshness.yml`. " +
    "Update `lib/models.ts`, `lib/frontier-models.ts` and `data/catalog-coverage.json` as needed, then close this issue._\n";
  await writeFile(REPORT_PATH, report, "utf8");
  console.log(`Report written to ${REPORT_PATH}:`);
  console.log(report);
} else {
  console.log("Catalog looks fresh — no report generated.");
}
