// Hardware-aware model recommender. Pure function, runs entirely in the
// browser. Given a HardwareSpec, returns a ranked list of Recommendation
// objects that fit within a safety margin of the user's available memory,
// scored by use-case fit, recency, and quality of the chosen quantization.

import { catalog, type CatalogModel, type CatalogQuant } from "./model-catalog";

export type Platform =
  | "apple-silicon"
  | "nvidia-gpu"
  | "amd-gpu"
  | "intel-gpu"
  | "cpu-only";

export type UseCase = "general" | "code" | "longContext" | "math";
export type LicenseFilter = "any" | "permissive-only";

export type HardwareSpec = {
  platform: Platform;
  /** VRAM in GB for discrete GPU platforms */
  gpuVramGb?: number;
  /** System RAM in GB, used when running on CPU or as overflow */
  systemRamGb: number;
  /** Apple Silicon unified memory in GB */
  unifiedMemoryGb?: number;
  useCase: UseCase;
  licenseFilter: LicenseFilter;
};

export type Recommendation = {
  model: CatalogModel;
  quant: CatalogQuant;
  fitMemoryGb: number;       // memory the model+context will use
  availableMemoryGb: number; // memory the user has
  headroomGb: number;        // available − fit (positive)
  speedBucket: "fast" | "moderate" | "slow";
  score: number;             // overall score, used for sorting
  ollamaCommand: string;
  llamaCppCommand: string;
};

const SAFETY_MARGIN = 1.15; // require 15% headroom over the model's footprint

/**
 * Computes the usable memory for model inference based on platform conventions.
 * The numbers reflect a single-user inference workload at 8k context.
 */
export function computeAvailableMemory(spec: HardwareSpec): number {
  switch (spec.platform) {
    case "apple-silicon": {
      // Unified memory: reserve ~6 GB for the OS and apps, leave the rest
      // for the model. macOS will page if needed, but performance suffers.
      const unified = spec.unifiedMemoryGb ?? 0;
      return Math.max(0, unified - 6);
    }
    case "nvidia-gpu":
    case "amd-gpu":
    case "intel-gpu": {
      // Discrete GPU: model lives in VRAM, reserve ~2 GB for KV cache and
      // overhead. CPU offload is possible but kills throughput, so we
      // base recommendations on VRAM alone.
      const vram = spec.gpuVramGb ?? 0;
      return Math.max(0, vram - 2);
    }
    case "cpu-only": {
      // CPU only: reserve ~4 GB for the OS, take the rest from system RAM.
      // Throughput is much lower, but the memory math is the same.
      return Math.max(0, spec.systemRamGb - 4);
    }
  }
}

/**
 * Predicts a rough speed bucket for a model on the given platform. The
 * predictions are intentionally coarse and reflect common consumer-tier
 * configurations.
 */
function predictSpeed(
  model: CatalogModel,
  spec: HardwareSpec
): Recommendation["speedBucket"] {
  const size = model.paramBillions;
  const activeSize = model.isMoE ? size * 0.2 : size;

  switch (spec.platform) {
    case "nvidia-gpu":
      if (activeSize <= 9) return "fast";
      if (activeSize <= 16) return "moderate";
      return "slow";
    case "apple-silicon":
      if (activeSize <= 9) return "fast";
      if (activeSize <= 32) return "moderate";
      return "slow";
    case "amd-gpu":
    case "intel-gpu":
      if (activeSize <= 7) return "fast";
      if (activeSize <= 14) return "moderate";
      return "slow";
    case "cpu-only":
      if (activeSize <= 4) return "moderate";
      return "slow";
  }
}

/**
 * Picks the best quantization that fits within the safety margin. Prefers
 * Q8 if it fits, then Q5, then Q4. Anything smaller than Q4 is rejected
 * upstream so users do not get pushed to low-quality quantizations.
 */
function pickQuant(
  model: CatalogModel,
  availableGb: number
): CatalogQuant | null {
  // Sort by descending quality and take the best one that fits.
  const sorted = [...model.quants].sort((a, b) => b.memoryGb - a.memoryGb);
  for (const q of sorted) {
    if (q.memoryGb * SAFETY_MARGIN <= availableGb) return q;
  }
  return null;
}

/**
 * Computes a 0..100 score that ranks how good a recommendation is for the
 * user's stated use case, accounting for headroom, model recency and
 * quality of the chosen quantization.
 */
function scoreRecommendation(
  model: CatalogModel,
  quant: CatalogQuant,
  headroomGb: number,
  useCase: UseCase
): number {
  // Use-case fit (0..10 from the catalog).
  const useCaseScore = model.useCase[useCase];
  const useCaseComponent = (useCaseScore / 10) * 50; // weight: 50

  // Quality of the chosen quantization.
  const qualityMap: Record<CatalogQuant["qualityBucket"], number> = {
    low: 0.6,
    medium: 0.75,
    high: 0.9,
    "near-fp16": 1.0
  };
  const qualityComponent = qualityMap[quant.qualityBucket] * 20; // weight: 20

  // Recency: newer releases get a small boost.
  const recencyComponent = Math.max(0, model.releaseYear - 2023) * 5; // weight: ~15

  // Headroom: a model that just barely fits is risky; one with breathing
  // room gets a small bonus, capped to avoid favouring tiny models on
  // huge machines.
  const headroomRatio = Math.min(1, headroomGb / 8);
  const headroomComponent = headroomRatio * 15; // weight: 15

  return useCaseComponent + qualityComponent + recencyComponent + headroomComponent;
}

function passesLicenseFilter(
  model: CatalogModel,
  filter: LicenseFilter
): boolean {
  if (filter === "permissive-only") {
    return model.license.tier === "permissive";
  }
  return true;
}

/**
 * Builds the Ollama pull/run command for a recommendation. Ollama tags
 * vary in quantization granularity, so we default to the family tag and
 * let users append the quant suffix from the tag list on ollama.com.
 */
function buildOllamaCommand(model: CatalogModel, quant: CatalogQuant): string {
  if (!model.ollamaTag) return "# No official Ollama tag yet; use llama.cpp.";
  const base = model.ollamaTag;
  // If the tag already includes a quant suffix we leave it as is; otherwise
  // we append the quantization name as a hint.
  const hasQuant = /q\d/i.test(base);
  const tag = hasQuant ? base : `${base}-${quant.name.toLowerCase()}`;
  return `ollama run ${tag}`;
}

function buildLlamaCppCommand(model: CatalogModel, quant: CatalogQuant): string {
  if (!model.hfPath) return "# No reference GGUF path; check Hugging Face.";
  const fileGuess = `${model.hfPath.split("/").pop()?.replace("-GGUF", "")}-${quant.name}.gguf`;
  return [
    `huggingface-cli download ${model.hfPath} ${fileGuess} \\`,
    `  --local-dir ./models`,
    ``,
    `./build/bin/llama-server \\`,
    `  --model ./models/${fileGuess} \\`,
    `  --ctx-size 8192 \\`,
    `  --n-gpu-layers 999 \\`,
    `  --port 8080`
  ].join("\n");
}

export function recommend(spec: HardwareSpec, limit = 6): {
  available: number;
  recommendations: Recommendation[];
  excluded: { model: CatalogModel; reason: string }[];
} {
  const available = computeAvailableMemory(spec);
  const recs: Recommendation[] = [];
  const excluded: { model: CatalogModel; reason: string }[] = [];

  for (const model of catalog) {
    if (!passesLicenseFilter(model, spec.licenseFilter)) {
      excluded.push({ model, reason: "Excluded by license filter." });
      continue;
    }
    const quant = pickQuant(model, available);
    if (!quant) {
      excluded.push({
        model,
        reason: `Smallest quant (${model.quants[0]?.memoryGb} GB) exceeds available memory (${available.toFixed(1)} GB).`
      });
      continue;
    }
    const fit = quant.memoryGb;
    const headroom = available - fit;
    const score = scoreRecommendation(model, quant, headroom, spec.useCase);
    recs.push({
      model,
      quant,
      fitMemoryGb: fit,
      availableMemoryGb: available,
      headroomGb: headroom,
      speedBucket: predictSpeed(model, spec),
      score,
      ollamaCommand: buildOllamaCommand(model, quant),
      llamaCppCommand: buildLlamaCppCommand(model, quant)
    });
  }

  recs.sort((a, b) => b.score - a.score);
  return { available, recommendations: recs.slice(0, limit), excluded };
}
