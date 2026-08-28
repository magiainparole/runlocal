// Verifies that every download path in the curated catalog actually exists.
//
// The catalog is hand-written, and a plausible-looking repo id is not the same
// thing as a real one: an entry can name a Hugging Face repository or an Ollama
// tag that has never existed, and nothing in the build will complain. The picker
// then sends people to a 404. This script closes that gap.
//
//   npm run check:links            # Hugging Face paths (fatal) + Ollama tags (warn)
//   npm run check:links -- --strict  # Ollama failures are fatal too
//   npm run check:links -- --list    # print what would be checked, no network
//
// Exit code 1 if any Hugging Face path is missing.

import { catalog } from "../lib/model-registry";

const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict");
const LIST_ONLY = args.has("--list");

const HF_API = "https://huggingface.co/api/models";
const OLLAMA_LIBRARY = "https://ollama.com/library";
const TIMEOUT_MS = 15_000;

type Check = { kind: "hf" | "ollama"; id: string; url: string; usedBy: string[] };

function collect(): Check[] {
  const byUrl = new Map<string, Check>();

  const add = (kind: Check["kind"], id: string, url: string, entryId: string) => {
    const existing = byUrl.get(url);
    if (existing) {
      existing.usedBy.push(entryId);
      return;
    }
    byUrl.set(url, { kind, id, url, usedBy: [entryId] });
  };

  for (const model of catalog) {
    if (model.hfPath) {
      add("hf", model.hfPath, `${HF_API}/${model.hfPath}`, model.id);
    }
    if (model.ollamaTag) {
      // "qwen2.5-coder:32b" — several entries share one library page, so key on the name.
      const [name] = model.ollamaTag.split(":");
      add("ollama", name, `${OLLAMA_LIBRARY}/${name}`, model.id);
    }
  }

  return [...byUrl.values()].sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
}

async function probe(url: string): Promise<number | string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: {
        Accept: "application/json",
        ...(process.env.HF_API_TOKEN && url.startsWith(HF_API)
          ? { Authorization: `Bearer ${process.env.HF_API_TOKEN}` }
          : {})
      },
      signal: controller.signal
    });
    return res.status;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const checks = collect();

  if (LIST_ONLY) {
    for (const c of checks) {
      console.log(`${c.kind.padEnd(6)} ${c.id.padEnd(56)} ${c.usedBy.join(", ")}`);
    }
    console.log(`\n${checks.length} paths across ${catalog.length} catalog entries.`);
    return;
  }

  const failures: string[] = [];
  const warnings: string[] = [];

  // Small concurrency: this runs weekly in CI, not in a hot loop.
  const queue = [...checks];
  const workers = Array.from({ length: 4 }, async () => {
    for (let next = queue.shift(); next; next = queue.shift()) {
      const status = await probe(next.url);
      const ok = status === 200;
      const line = `${next.id} → ${status} (${next.usedBy.join(", ")})`;

      if (ok) {
        console.log(`  ok    ${line}`);
      } else if (next.kind === "hf") {
        failures.push(line);
        console.log(`  FAIL  ${line}`);
      } else {
        warnings.push(line);
        console.log(`  warn  ${line}`);
      }
    }
  });

  await Promise.all(workers);

  if (warnings.length > 0) {
    console.log(`\n${warnings.length} Ollama tag(s) could not be confirmed:`);
    for (const w of warnings) console.log(`  - ${w}`);
    console.log("  Ollama has no public metadata API; a non-200 here can also mean the page moved.");
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} Hugging Face path(s) do not resolve:`);
    for (const f of failures) console.error(`  - ${f}`);
    console.error("\nFix the hfPath in lib/model-registry.ts, or remove the entry.");
    process.exit(1);
  }

  if (STRICT && warnings.length > 0) {
    console.error("\n--strict: unconfirmed Ollama tags treated as failures.");
    process.exit(1);
  }

  console.log(`\nAll ${checks.length} paths resolve.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
