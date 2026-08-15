// Canonical RunLocal model registry.
//
// Editorial directory, hardware picker and Frontier are all derived from this
// file. Family metadata lives here once; hardware profiles only add
// quantization/runtime-specific information.

export type LicenseTier = "permissive" | "open-weight" | "non-commercial";

export type DirectoryModel = {
  slug: string;
  name: string;
  author: string;
  origin: string;
  license: string;
  paramSizes: string[];
  contextWindow: string;
  bestFor: string[];
  notes: string;
  url: string;
  releaseYear: number;
};

export type CatalogQuant = {
  name: string;
  qualityBucket: "low" | "medium" | "high" | "near-fp16";
  memoryGb: number;
};

export type HardwareProfile = {
  id: string;
  familyId: string;
  variant: string;
  paramBillions: number;
  activeParamBillions?: number;
  isMoE: boolean;
  contextWindow?: number;
  useCase: { general: number; code: number; longContext: number; math: number };
  ollamaTag?: string;
  hfPath?: string;
  quants: CatalogQuant[];
  notes?: string;
};

export type CatalogModel = HardwareProfile & {
  family: string;
  origin: string;
  license: { tier: LicenseTier; label: string };
  contextWindow: number;
  releaseYear: number;
};

export type FrontierModel = {
  slug: string;
  name: string;
  author: string;
  origin: string;
  license: string;
  licenseTier: "permissive" | "open-weight";
  totalParams: string;
  contextWindow: string;
  released: string;
  headline: string;
  hardwareReality: string;
  accessInstead: string;
  littleSibling?: string;
  url: string;
};

type Family = {
  id: string;
  directory: DirectoryModel;
  pickerMeta: {
    family: string;
    origin: string;
    license: { tier: LicenseTier; label: string };
    contextWindow: number;
    releaseYear: number;
  };
};

export const families: Family[] = [
  {
    id: "qwen-3-6",
    directory: {
      slug: "qwen-3-6", name: "Qwen 3.6", author: "Alibaba (Qwen team)", origin: "China",
      license: "Apache 2.0 on official open-weight checkpoints",
      paramSizes: ["27B dense", "35B-A3B MoE", "additional large MoE variants"],
      contextWindow: "262k native on 27B; long-context extensions available",
      bestFor: ["Coding", "Multimodal workflows", "Multilingual", "Local workstations"],
      notes: "Current open-weight Qwen generation for local use. Qwen3.6-27B is the key workstation-class checkpoint. Qwen3.8-Max-Preview is newer but cloud/API-only as of August 15, 2026 and is intentionally excluded from the local picker.",
      url: "https://huggingface.co/Qwen/Qwen3.6-27B", releaseYear: 2026
    },
    pickerMeta: { family: "Qwen 3.6", origin: "Alibaba · China", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 262_144, releaseYear: 2026 }
  },
  {
    id: "qwen-3-5",
    directory: {
      slug: "qwen-3-5", name: "Qwen 3.5", author: "Alibaba (Qwen team)", origin: "China", license: "Apache 2.0",
      paramSizes: ["2B", "9B", "27B", "35B-A3B MoE", "122B-A10B MoE", "397B-A17B MoE"],
      contextWindow: "262k native; selected variants support longer contexts",
      bestFor: ["Multimodal", "Multilingual", "Code", "Cost-sensitive deployments"],
      notes: "Released in 2026. The smaller checkpoints remain excellent local choices when Qwen 3.6 is too large.",
      url: "https://huggingface.co/Qwen/Qwen3.5-27B", releaseYear: 2026
    },
    pickerMeta: { family: "Qwen 3.5", origin: "Alibaba · China", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 262_144, releaseYear: 2026 }
  },
  {
    id: "gemma-4",
    directory: {
      slug: "gemma-4", name: "Gemma 4", author: "Google DeepMind", origin: "United States", license: "Apache 2.0",
      paramSizes: ["E2B", "E4B", "12B", "26B-A4B MoE", "31B dense"], contextWindow: "128k–256k depending on checkpoint",
      bestFor: ["On-device inference", "Multimodal", "Consumer GPUs", "Workstations"],
      notes: "Multimodal family spanning edge through workstation hardware. The 26B-A4B model activates about 4B parameters per token while retaining a 26B memory footprint.",
      url: "https://huggingface.co/google/gemma-4-31B", releaseYear: 2026
    },
    pickerMeta: { family: "Gemma 4", origin: "Google DeepMind · United States", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 256_000, releaseYear: 2026 }
  },
  {
    id: "mistral-small-4",
    directory: {
      slug: "mistral-small-4", name: "Mistral Small 4", author: "Mistral AI", origin: "France (EU)", license: "Apache 2.0",
      paramSizes: ["119B MoE (6.5B active)"], contextWindow: "256k tokens",
      bestFor: ["Reasoning", "Coding agents", "Multimodal workflows", "EU-friendly deployments"],
      notes: "Combines instruct, reasoning and coding modes in one multimodal MoE model. Low active parameters help compute speed, but the full weights still determine memory use.",
      url: "https://huggingface.co/mistralai/Mistral-Small-4-119B-2603", releaseYear: 2026
    },
    pickerMeta: { family: "Mistral Small 4", origin: "Mistral AI · France", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 256_000, releaseYear: 2026 }
  },
  {
    id: "mistral-medium-3-5",
    directory: {
      slug: "mistral-medium-3-5", name: "Mistral Medium 3.5", author: "Mistral AI", origin: "France (EU)", license: "Modified MIT / repository terms",
      paramSizes: ["128B dense"], contextWindow: "256k tokens", bestFor: ["EU-friendly deployments", "Coding", "Reasoning", "Long context"],
      notes: "Dense 128B multimodal model. Local deployment is memory-heavy and generally workstation-class.",
      url: "https://huggingface.co/mistralai/Mistral-Medium-3.5-128B", releaseYear: 2026
    },
    pickerMeta: { family: "Mistral Medium 3.5", origin: "Mistral AI · France", license: { tier: "open-weight", label: "Modified MIT / repository terms" }, contextWindow: 256_000, releaseYear: 2026 }
  },
  {
    id: "phi-4",
    directory: {
      slug: "phi-4", name: "Phi-4 family", author: "Microsoft Research", origin: "United States", license: "MIT",
      paramSizes: ["Phi-4 Mini 3.8B", "Phi-4 14B", "reasoning variants"], contextWindow: "Varies by checkpoint",
      bestFor: ["Edge devices", "Reasoning per parameter", "Cost-sensitive inference"],
      notes: "Verified Microsoft Phi family. RunLocal does not list an unverified Phi-5 family.",
      url: "https://huggingface.co/microsoft", releaseYear: 2025
    },
    pickerMeta: { family: "Phi-4", origin: "Microsoft · United States", license: { tier: "permissive", label: "MIT" }, contextWindow: 128_000, releaseYear: 2025 }
  },
  {
    id: "llama-3",
    directory: {
      slug: "llama-4", name: "Llama 4 (Scout & Maverick)", author: "Meta AI", origin: "United States", license: "Llama Community License (custom)",
      paramSizes: ["Scout 109B MoE", "Maverick 400B MoE"], contextWindow: "Up to 10M tokens (Scout)",
      bestFor: ["Long-context retrieval", "Codebase-scale RAG", "General reasoning"],
      notes: "Meta's open-weight family. Custom licensing applies; Scout and Maverick are MoE models with much smaller active parameter counts than total weights.",
      url: "https://llama.meta.com", releaseYear: 2025
    },
    pickerMeta: { family: "Llama", origin: "Meta · United States", license: { tier: "open-weight", label: "Llama Community License" }, contextWindow: 128_000, releaseYear: 2025 }
  },
  {
    id: "minicpm5",
    directory: {
      slug: "minicpm5-1b", name: "MiniCPM5-1B", author: "OpenBMB", origin: "China", license: "Apache 2.0",
      paramSizes: ["1B"], contextWindow: "128k tokens", bestFor: ["On-device inference", "Edge deployments", "Low-memory hardware"],
      notes: "Edge-first model for phones and low-memory laptops.", url: "https://huggingface.co/openbmb/MiniCPM5-1B", releaseYear: 2026
    },
    pickerMeta: { family: "MiniCPM5", origin: "OpenBMB · China", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 128_000, releaseYear: 2026 }
  },
  {
    id: "eurollm",
    directory: {
      slug: "eurollm-22b", name: "EuroLLM-22B", author: "EuroLLM Consortium", origin: "European Union", license: "Apache 2.0",
      paramSizes: ["1.7B", "9B", "22B"], contextWindow: "32k tokens", bestFor: ["EU language coverage", "Public-sector AI", "Research"],
      notes: "Transparent European family covering all 24 EU official languages plus additional languages.", url: "https://huggingface.co/utter-project", releaseYear: 2025
    },
    pickerMeta: { family: "EuroLLM", origin: "European Union", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 32_000, releaseYear: 2025 }
  },
  {
    id: "olmo-2",
    directory: {
      slug: "olmo-2", name: "OLMo 2", author: "Allen Institute for AI", origin: "United States (non-profit)", license: "Apache 2.0",
      paramSizes: ["1B", "7B", "13B"], contextWindow: "8k tokens", bestFor: ["Reproducible research", "Auditable training", "Education"],
      notes: "Weights, data, training code and intermediate checkpoints are public; transparency is the differentiator.", url: "https://allenai.org/olmo", releaseYear: 2025
    },
    pickerMeta: { family: "OLMo 2", origin: "Allen Institute for AI · United States", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 8_192, releaseYear: 2025 }
  }
];

const familyMap = new Map(families.map((f) => [f.id, f]));

export const hardwareProfiles: HardwareProfile[] = [
  { id: "minicpm5-1b", familyId: "minicpm5", variant: "1B", paramBillions: 1, isMoE: false, useCase: { general: 5, code: 4, longContext: 5, math: 4 }, hfPath: "openbmb/MiniCPM5-1B", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 1.0 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 1.2 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 1.6 }] },
  { id: "phi-4-mini-3-8b", familyId: "phi-4", variant: "Mini 3.8B", paramBillions: 3.8, isMoE: false, useCase: { general: 7, code: 7, longContext: 5, math: 8 }, ollamaTag: "phi4-mini:3.8b", hfPath: "bartowski/Phi-4-mini-instruct-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 3.5 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 4.0 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 5.5 }] },
  { id: "qwen-3-5-9b", familyId: "qwen-3-5", variant: "9B", paramBillions: 9, isMoE: false, useCase: { general: 8, code: 8, longContext: 9, math: 8 }, quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 6.0 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 7.0 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 10.0 }] },
  { id: "phi-4-14b", familyId: "phi-4", variant: "14B", paramBillions: 14, isMoE: false, contextWindow: 16_000, useCase: { general: 8, code: 8, longContext: 5, math: 9 }, ollamaTag: "phi4:14b", hfPath: "bartowski/phi-4-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 9 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 10.5 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 16 }] },
  { id: "gemma-4-12b", familyId: "gemma-4", variant: "12B", paramBillions: 12, isMoE: false, useCase: { general: 8, code: 7, longContext: 9, math: 7 }, quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 8 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 9.5 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 14 }] },
  { id: "qwen-3-6-27b", familyId: "qwen-3-6", variant: "27B", paramBillions: 27, isMoE: false, useCase: { general: 9, code: 10, longContext: 9, math: 9 }, hfPath: "Qwen/Qwen3.6-27B", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 17 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 20 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 29 }], notes: "Current open-weight Qwen generation for workstation-class local inference." },
  { id: "gemma-4-26b-a4b", familyId: "gemma-4", variant: "26B-A4B MoE", paramBillions: 26, activeParamBillions: 4, isMoE: true, useCase: { general: 9, code: 7, longContext: 9, math: 8 }, quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 17 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 20 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 29 }] },
  { id: "gemma-4-31b", familyId: "gemma-4", variant: "31B dense", paramBillions: 31, isMoE: false, useCase: { general: 9, code: 8, longContext: 9, math: 8 }, hfPath: "google/gemma-4-31B", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 20 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 23 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 34 }] },
  { id: "mistral-small-4-119b-a6b", familyId: "mistral-small-4", variant: "119B-A6B MoE", paramBillions: 119, activeParamBillions: 6.5, isMoE: true, useCase: { general: 9, code: 9, longContext: 9, math: 8 }, hfPath: "mistralai/Mistral-Small-4-119B-2603", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 68 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 80 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 125 }] },
  { id: "mistral-medium-3-5-128b", familyId: "mistral-medium-3-5", variant: "128B dense", paramBillions: 128, isMoE: false, useCase: { general: 9, code: 9, longContext: 9, math: 8 }, quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 75 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 88 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 135 }] }
];

export const catalog: CatalogModel[] = hardwareProfiles.map((profile) => {
  const family = familyMap.get(profile.familyId);
  if (!family) throw new Error(`Unknown familyId: ${profile.familyId}`);
  return {
    ...profile,
    family: family.pickerMeta.family,
    origin: family.pickerMeta.origin,
    license: family.pickerMeta.license,
    contextWindow: profile.contextWindow ?? family.pickerMeta.contextWindow,
    releaseYear: family.pickerMeta.releaseYear
  };
});

export const directoryModels: DirectoryModel[] = families.map((f) => f.directory);

export const frontierModels: FrontierModel[] = [
  {
    slug: "qwen-3-8-max-preview", name: "Qwen3.8-Max-Preview", author: "Alibaba (Qwen team)", origin: "China",
    license: "Cloud/API preview — no public open weights verified", licenseTier: "open-weight", totalParams: "Not publicly disclosed as open weights", contextWindow: "API-defined",
    released: "August 2026", headline: "The newest Qwen-branded preview is relevant to the frontier race, but it is not a local model today.",
    hardwareReality: "There are no verified public weights to download, quantize or benchmark locally. It must not appear in the hardware picker until official open weights are published.",
    accessInstead: "Use Alibaba/Qwen's hosted API or supported cloud endpoint.", littleSibling: "Qwen3.6-27B — the current verified open-weight workstation model in RunLocal's picker.", url: "https://qwen.ai"
  },
  {
    slug: "kimi-k3", name: "Kimi K3", author: "Moonshot AI", origin: "China", license: "Moonshot Open License", licenseTier: "open-weight",
    totalParams: "2.8T MoE", contextWindow: "1M tokens, native multimodal", released: "July 2026",
    headline: "A frontier-scale open-weight MoE whose sheer weight footprint makes it infrastructure rather than homelab software.",
    hardwareReality: "Even aggressive quantization requires well over a terabyte of memory. Practical self-hosting means a multi-node datacenter GPU cluster.",
    accessInstead: "Moonshot API or a third-party inference provider.", littleSibling: "Kimi K2.x family for smaller agentic workloads.", url: "https://www.moonshot.cn"
  },
  {
    slug: "glm-5-2", name: "GLM-5.2", author: "Z.ai (Zhipu)", origin: "China", license: "MIT", licenseTier: "permissive",
    totalParams: "744B", contextWindow: "1M tokens", released: "June 2026", headline: "A very large MIT-licensed open-weight model aimed at frontier coding and reasoning.",
    hardwareReality: "Hundreds of gigabytes even when quantized; multi-GPU workstation or datacenter territory.", accessInstead: "Z.ai API or third-party inference providers.", littleSibling: "Smaller GLM-family checkpoints remain practical local options.", url: "https://chatglm.cn"
  },
  {
    slug: "llama-4-maverick", name: "Llama 4 Maverick", author: "Meta AI", origin: "United States", license: "Llama 4 Community License", licenseTier: "open-weight",
    totalParams: "400B MoE (~17B active)", contextWindow: "1M tokens", released: "2025", headline: "Meta's frontier-tier open-weight MoE: relatively light compute per token, but very heavy memory requirements.",
    hardwareReality: "Roughly hundreds of gigabytes at practical quantizations; a single consumer GPU is not enough.", accessInstead: "Hosted inference or Meta-supported API access.", littleSibling: "Llama 4 Scout is smaller but still workstation-class.", url: "https://llama.meta.com"
  },
  {
    slug: "deepseek-v4-pro", name: "DeepSeek V4 Pro", author: "DeepSeek AI", origin: "China", license: "MIT", licenseTier: "permissive",
    totalParams: "1.6T MoE (49B active)", contextWindow: "1M tokens", released: "2026", headline: "Frontier-scale DeepSeek model for code, math and agents under a permissive license.",
    hardwareReality: "The full checkpoint needs several hundred gigabytes to more than a terabyte depending on precision and runtime overhead.", accessInstead: "DeepSeek API or third-party hosting.", littleSibling: "DeepSeek V4 Flash is smaller but remains high-memory workstation territory.", url: "https://www.deepseek.com"
  }
];
