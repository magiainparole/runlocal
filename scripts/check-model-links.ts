// Verifies that every download path in the curated catalog actually exists.
//
// The catalog is hand-written, and a plausible-looking repo id is not the same
// thing as a real one: an entry can name a Hugging Face repository or an Ollama
// tag that has never existed, and nothing in the build will complain. The picker
// then sends people to a 404. This script closes that gap.
//
//   npm run check:links                     # HF paths fatal, Ollama tags warn
//   npm run check:links -- --strict         # Ollama failures are fatal too (CI)
//   npm run check:links -- --list           # print what would be checked, no network
//   npm run check:links -- --probe a:1,b:2  # test candidate Ollama tags, nothing else
//
// --probe exists so a tag can be confirmed BEFORE it goes into the registry.
// Guessing a plausible tag and shipping it is the failure this script prevents;
// the workflow exposes it as a `probe_tags` input for exactly that check.
//
// Exit code 1 if any Hugging Face path is missing.

import { catalog } from "../lib/model-registry";

const args = new Set(process.argv.slice(2));
const argv = process.argv.slice(2);
const STRICT = args.has("--strict");
const LIST_ONLY = args.has("--list");
// --probe qwen3.8:27b,gemma4:12b  (or --probe=a,b)
const PROBE = (() => {
  const flag = argv.findIndex((a) => a === "--probe" || a.startsWith("--probe="));
  if (flag === -1) return [];
  const inline = argv[flag].includes("=") ? argv[flag].split("=").slice(1).join("=") : argv[flag + 1];
  return (inline ?? "")
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
})();

const HF_API = "https://huggingface.co/api/models";
const HF_RESOLVE = "https://huggingface.co";
// The registry answers per tag; ollama.com/library only proves the model page
// exists, which is why a wrong size suffix used to slip through unnoticed.
const OLLAMA_REGISTRY = "https://registry.ollama.ai/v2/library";
const TIMEOUT_MS = 15_000;

type Check = { kind: "hf" | "file" | "ollama"; id: string; url: string; usedBy: string[] };

// "qwen2.5-coder:32b" -> the manifest for tag "32b" of library model
// "qwen2.5-coder". A bare name means the "latest" tag.
function ollamaUrl(tag: string): string {
  const [name, version = "latest"] = tag.split(":");
  return `${OLLAMA_REGISTRY}/${name}/manifests/${version}`;
}

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
    // A repository that resolves is not the same thing as a download that
    // works. Every quant filename in the catalog is checked individually,
    // because the picker prints these paths as copy-paste commands.
    for (const quant of model.quants) {
      if (!quant.path) continue;
      const file = `${model.hfPath}/${quant.path}`;
      add("file", file, `${HF_RESOLVE}/${model.hfPath}/resolve/main/${encodeURI(quant.path)}`, model.id);
    }
    if (model.ollamaTag) {
      add("ollama", model.ollamaTag, ollamaUrl(model.ollamaTag), model.id);
    }
  }

  return [...byUrl.values()].sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
}

// GGUF files run to tens of gigabytes, so a file check must never open the
// body: HEAD asks the CDN for the headers alone. Any body that does arrive is
// cancelled explicitly, otherwise dozens of LFS connections stay open and
// later checks time out waiting for the pool.
async function probe(url: string, method: "GET" | "HEAD" = "GET"): Promise<number | string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      headers: {
        Accept: "application/json",
        ...(process.env.HF_API_TOKEN && url.startsWith(HF_API)
          ? { Authorization: `Bearer ${process.env.HF_API_TOKEN}` }
          : {})
      },
      signal: controller.signal
    });
    await res.body?.cancel().catch(() => {});
    return res.status;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  if (PROBE.length > 0) {
    console.log(`Probing ${PROBE.length} candidate Ollama tag(s). Nothing else is checked.\n`);
    let confirmed = 0;
    for (const tag of PROBE) {
      const status = await probe(ollamaUrl(tag));
      const ok = status === 200;
      if (ok) confirmed++;
      console.log(`  ${ok ? "ok    " : "MISSING"} ${tag} → ${status}`);
    }
    console.log(`\n${confirmed} of ${PROBE.length} candidate tag(s) exist. Add only those to lib/model-registry.ts.`);
    // A probe that reports MISSING and still exits green would let a bad tag
    // through the very step meant to catch it.
    if (confirmed < PROBE.length) process.exit(1);
    return;
  }

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
      const status = await probe(next.url, next.kind === "file" ? "HEAD" : "GET");
      const ok = status === 200;
      const line = `${next.id} → ${status} (${next.usedBy.join(", ")})`;

      if (ok) {
        console.log(`  ok    ${line}`);
      } else if (next.kind === "hf" || next.kind === "file") {
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
    console.log("  Each was looked up as a registry manifest, so a non-200 means that exact tag is not published.");
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} Hugging Face path(s) do not resolve:`);
    for (const f of failures) console.error(`  - ${f}`);
    console.error("\nFix the hfPath or the quant path in lib/model-registry.ts, or remove the entry.");
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
