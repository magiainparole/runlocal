// Hardware-aware model recommender. Pure function, runs entirely in browser.

import { catalog, type CatalogModel, type CatalogQuant } from "./model-registry";

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
  gpuVramGb?: number;
  systemRamGb: number;
  unifiedMemoryGb?: number;
  useCase: UseCase;
  licenseFilter: LicenseFilter;
};

export type Recommendation = {
  model: CatalogModel;
  quant: CatalogQuant;
  fitMemoryGb: number;
  availableMemoryGb: number;
  headroomGb: number;
  speedBucket: "fast" | "moderate" | "slow";
  score: number;
  ollamaCommand: string;
  llamaCppCommand: string;
};

const SAFETY_MARGIN = 1.15;

export function computeAvailableMemory(spec: HardwareSpec): number {
  switch (spec.platform) {
    case "apple-silicon":
      return Math.max(0, (spec.unifiedMemoryGb ?? 0) - 6);
    case "nvidia-gpu":
    case "amd-gpu":
    case "intel-gpu":
      return Math.max(0, (spec.gpuVramGb ?? 0) - 2);
    case "cpu-only":
      return Math.max(0, spec.systemRamGb - 4);
  }
}

function activeParams(model: CatalogModel): number {
  if (!model.isMoE) return model.paramBillions;
  return model.activeParamBillions ?? model.paramBillions * 0.2;
}

function predictSpeed(
  model: CatalogModel,
  spec: HardwareSpec
): Recommendation["speedBucket"] {
  const active = activeParams(model);

  switch (spec.platform) {
    case "nvidia-gpu":
      if (active <= 9) return "fast";
      if (active <= 16) return "moderate";
      return "slow";
    case "apple-silicon":
      if (active <= 9) return "fast";
      if (active <= 32) return "moderate";
      return "slow";
    case "amd-gpu":
    case "intel-gpu":
      if (active <= 7) return "fast";
      if (active <= 14) return "moderate";
      return "slow";
    case "cpu-only":
      if (active <= 4) return "moderate";
      return "slow";
  }
}

function pickQuant(model: CatalogModel, availableGb: number): CatalogQuant | null {
  const sorted = [...model.quants].sort((a, b) => b.memoryGb - a.memoryGb);
  for (const q of sorted) {
    if (q.memoryGb * SAFETY_MARGIN <= availableGb) return q;
  }
  return null;
}

function scoreRecommendation(
  model: CatalogModel,
  quant: CatalogQuant,
  headroomGb: number,
  useCase: UseCase
): number {
  const useCaseComponent = (model.useCase[useCase] / 10) * 50;
  const qualityMap: Record<CatalogQuant["qualityBucket"], number> = {
    low: 0.6,
    medium: 0.75,
    high: 0.9,
    "near-fp16": 1.0
  };
  const qualityComponent = qualityMap[quant.qualityBucket] * 20;
  const recencyComponent = Math.max(0, model.releaseYear - 2023) * 5;
  const headroomComponent = Math.min(1, headroomGb / 8) * 15;
  return useCaseComponent + qualityComponent + recencyComponent + headroomComponent;
}

function passesLicenseFilter(model: CatalogModel, filter: LicenseFilter): boolean {
  return filter !== "permissive-only" || model.license.tier === "permissive";
}

function buildOllamaCommand(model: CatalogModel): string {
  if (!model.ollamaTag) {
    return "# No verified Ollama tag in the RunLocal catalog yet; check ollama.com/library or the model card.";
  }
  // Only the tag CI has resolved is printed. This used to append the quant
  // name to the base tag, which produced tags nobody had checked — and in
  // some cases could not exist, like glm-4.7-flash:latest-q8_0. Ollama's own
  // default for a tag is usually a 4-bit build; when you want a specific
  // quantization, the llama.cpp command below names the exact file.
  return `ollama run ${model.ollamaTag}`;
}

function buildLlamaCppCommand(model: CatalogModel, quant: CatalogQuant): string {
  if (!model.hfPath) {
    return "# No verified GGUF source in the RunLocal catalog yet; open the official model card and choose a current GGUF quantization.";
  }

  if (!/gguf/i.test(model.hfPath)) {
    return `# Official model: https://huggingface.co/${model.hfPath}\n# Choose a trusted GGUF conversion for ${quant.name}; RunLocal will not guess a download filename.`;
  }

  // The filename is never inferred from the repo name. Repositories vary too
  // much for that: some prefix the quant (Qwen3.8-27B-UD-Q4_K_M), some use a
  // dot (Phi-4-mini-instruct.Q8_0), some split a build across a subdirectory
  // of shards. A guess that looks right and 404s is worse than no command.
  if (!quant.path) {
    return [
      `# ${model.hfPath} publishes GGUF builds, but RunLocal has not verified a`,
      `# filename for ${quant.name}. Open the repository and pick the file yourself.`
    ].join("\n");
  }

  // A path with a directory component is a sharded build: fetch the whole
  // directory and point llama.cpp at the first shard, which loads the rest.
  const shardDir = quant.path.includes("/") ? quant.path.split("/")[0] : null;
  const download = shardDir
    ? `huggingface-cli download ${model.hfPath} --include "${shardDir}/*" \\`
    : `huggingface-cli download ${model.hfPath} ${quant.path} \\`;

  return [
    download,
    `  --local-dir ./models`,
    ``,
    `./build/bin/llama-server \\`,
    `  --model ./models/${quant.path} \\`,
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
  const recommendations: Recommendation[] = [];
  const excluded: { model: CatalogModel; reason: string }[] = [];

  for (const model of catalog) {
    if (!passesLicenseFilter(model, spec.licenseFilter)) {
      excluded.push({ model, reason: "Excluded by license filter." });
      continue;
    }

    const quant = pickQuant(model, available);
    if (!quant) {
      const smallest = Math.min(...model.quants.map((q) => q.memoryGb));
      excluded.push({
        model,
        reason: `Smallest listed quant (~${smallest} GB before safety margin) exceeds available inference memory (${available.toFixed(1)} GB).`
      });
      continue;
    }

    const fit = quant.memoryGb;
    const headroom = available - fit;
    recommendations.push({
      model,
      quant,
      fitMemoryGb: fit,
      availableMemoryGb: available,
      headroomGb: headroom,
      speedBucket: predictSpeed(model, spec),
      score: scoreRecommendation(model, quant, headroom, spec.useCase),
      ollamaCommand: buildOllamaCommand(model),
      llamaCppCommand: buildLlamaCppCommand(model, quant)
    });
  }

  recommendations.sort((a, b) => b.score - a.score);
  return { available, recommendations: recommendations.slice(0, limit), excluded };
}
