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
  // Repo-relative path of the GGUF to load, verified against the Hub. The
  // first shard when a build is split; llama.cpp finds the rest. Omit only
  // when no filename has been checked: the command generator then refuses to
  // print a download line rather than guessing one that 404s.
  path?: string;
  // Set when stock llama.cpp cannot run this file and a fork is required, as
  // with Prism ML's ternary packs. The command generator then prints the fork
  // build instead of assuming an upstream binary, which would either reject
  // the file or load it and produce garbage.
  forkRepo?: string;
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
    id: "qwen-3-8",
    directory: {
      slug: "qwen-3-8", name: "Qwen 3.8", author: "Alibaba (Qwen team)", origin: "China",
      license: "Apache 2.0 on the 27B; custom Qwen licence on the 2.4T MoE",
      paramSizes: ["27B dense", "2.4T-A95B MoE"],
      contextWindow: "262k tokens",
      bestFor: ["Coding", "Multimodal workflows", "Multilingual", "Local workstations"],
      notes: "August 2026, and the most-liked open-weight release of the summer. The 27B is dense, Apache 2.0, natively multimodal, and had GGUF builds from unsloth and bartowski within days — which makes it the current default for a 24 GB card. Prism ML's Bonsai 2 build squeezes the same 27B into about 6 GB, provided you run it on their llama.cpp fork. The 2.4T MoE sibling is frontier-scale and carries a different licence.",
      url: "https://huggingface.co/Qwen/Qwen3.8-27B", releaseYear: 2026
    },
    pickerMeta: { family: "Qwen 3.8", origin: "Alibaba · China", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 262_144, releaseYear: 2026 }
  },
  {
    id: "deepseek-v4-flash",
    directory: {
      slug: "deepseek-v4-flash", name: "DeepSeek V4 Flash", author: "DeepSeek AI", origin: "China", license: "MIT",
      paramSizes: ["304B-A13B MoE (284B before the DSpark decoder)"],
      contextWindow: "1M tokens (65k native, extended 16x with YaRN)",
      bestFor: ["Agentic coding", "Long documents", "High-memory workstations"],
      notes: "The most-downloaded open-weight model on the Hub, and the largest entry here that a single machine can still load. 256 routed experts with 6 active per token means roughly 13B parameters fire on any given token, so it answers far faster than 304B suggests. The 0731 checkpoint supersedes the June preview and carries a DSpark speculative-decoding module, which is where the extra weights over the 284B base come from. Weights ship natively in FP8, so a Q8 build costs only about 7 GB more than Q4.",
      url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731", releaseYear: 2026
    },
    pickerMeta: { family: "DeepSeek V4 Flash", origin: "DeepSeek · China", license: { tier: "permissive", label: "MIT" }, contextWindow: 1_048_576, releaseYear: 2026 }
  },
  {
    id: "glm-5-3-flash",
    directory: {
      slug: "glm-5-3-flash", name: "GLM-5.3-Flash", author: "Z.ai (Zhipu)", origin: "China", license: "MIT",
      paramSizes: ["321B MoE (18B active)"],
      contextWindow: "1M tokens (three linear-attention layers for every sparse one)",
      bestFor: ["Agentic coding", "Multimodal workflows", "High-memory workstations"],
      notes: "Late August 2026, and the first natively multimodal GLM. A new base model rather than a GLM-5.2 derivative, MIT licensed, and at 5 million downloads the most pulled GLM on the Hub. unsloth's GGUF builds run from about 98 GB (UD-IQ1_M) through 109 GB (UD-Q2_K_XL) to 200 GB (UD-Q4_K_XL), which puts it in the same 128 GB class as DeepSeek V4 Flash. Not in the picker yet: the hybrid attention needs a llama.cpp pull request that has not reached a release, and we do not print commands for a build you would have to assemble by hand.",
      url: "https://huggingface.co/zai-org/GLM-5.3-Flash", releaseYear: 2026
    },
    pickerMeta: { family: "GLM-5.3-Flash", origin: "Z.ai · China", license: { tier: "permissive", label: "MIT" }, contextWindow: 1_048_576, releaseYear: 2026 }
  },
  {
    id: "qwen-3-6",
    directory: {
      slug: "qwen-3-6", name: "Qwen 3.6", author: "Alibaba (Qwen team)", origin: "China",
      license: "Apache 2.0 on official open-weight checkpoints",
      paramSizes: ["27B dense", "35B-A3B MoE", "additional large MoE variants"],
      contextWindow: "262k native on 27B; long-context extensions available",
      bestFor: ["Coding", "Multimodal workflows", "Multilingual", "Local workstations"],
      notes: "The previous open-weight Qwen generation, still widely deployed and the base for most community quantization work, including the first-generation 1-bit and ternary Bonsai builds. Qwen 3.8 supersedes it for new installs, and Bonsai 2 has moved to the 3.8 base.",
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
    id: "llama-4",
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
    id: "gpt-oss",
    directory: {
      slug: "gpt-oss", name: "gpt-oss (20B & 120B)", author: "OpenAI", origin: "United States", license: "Apache 2.0",
      paramSizes: ["20B MoE (MXFP4 weights)", "120B MoE"], contextWindow: "131k tokens",
      bestFor: ["General assistant work", "Reasoning", "Consumer GPUs"],
      notes: "OpenAI's open-weight release and, by download count, the most used open model of the past year. Ships natively in MXFP4, so the 20B fits a 16 GB card at the precision it was trained for. Apache 2.0, no usage caps, no licence acceptance step.",
      url: "https://huggingface.co/openai/gpt-oss-20b", releaseYear: 2025
    },
    pickerMeta: { family: "gpt-oss", origin: "OpenAI · United States", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 131_072, releaseYear: 2025 }
  },
  {
    id: "nemotron-3-5",
    directory: {
      slug: "nemotron-3-5-lightning", name: "Nemotron 3.5 Lightning", author: "NVIDIA", origin: "United States",
      license: "NVIDIA Open Model License (custom — read before commercial use)",
      paramSizes: ["30B-A3B hybrid Mamba/MoE (~3B active)"], contextWindow: "262k tokens",
      bestFor: ["Fast local inference", "Long documents", "24 GB GPUs"],
      notes: "August 2026. A hybrid Mamba-attention MoE: 31B of weights, roughly 3B active per token, so it answers at small-model speed. GGUF builds come from ggml-org and unsloth. The licence is custom, not OSI-approved.",
      url: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16", releaseYear: 2026
    },
    pickerMeta: { family: "Nemotron 3.5 Lightning", origin: "NVIDIA · United States", license: { tier: "open-weight", label: "NVIDIA Open Model License" }, contextWindow: 262_144, releaseYear: 2026 }
  },
  {
    id: "glm-4-7",
    directory: {
      slug: "glm-4-7-flash", name: "GLM-4.7-Flash", author: "Z.ai (Zhipu)", origin: "China", license: "MIT",
      paramSizes: ["31B MoE"], contextWindow: "202k tokens",
      bestFor: ["Bilingual EN/ZH workloads", "Agentic coding", "Workstation GPUs"],
      notes: "The runnable member of the GLM family, and the counterpart to the frontier-scale GLM-5.3: MIT licensed, 200k context, mature GGUF ecosystem, and one of the strongest agentic-coding models that fits on a single workstation GPU.",
      url: "https://huggingface.co/zai-org/GLM-4.7-Flash", releaseYear: 2026
    },
    pickerMeta: { family: "GLM 4.7", origin: "Z.ai · China", license: { tier: "permissive", label: "MIT" }, contextWindow: 202_752, releaseYear: 2026 }
  },
  {
    id: "lfm2-5",
    directory: {
      slug: "lfm2-5", name: "LFM2.5", author: "Liquid AI", origin: "United States",
      license: "Custom Liquid AI licence (check the model card)",
      paramSizes: ["2.6B"], contextWindow: "131k tokens",
      bestFor: ["Edge deployments", "Phones", "Low-memory laptops"],
      notes: "July 2026. A convolution-attention hybrid built for edge hardware, covering 16 languages at 2.6B parameters. Liquid publishes its own GGUF files, which is why it reached the llama.cpp crowd faster than most small models.",
      url: "https://huggingface.co/LiquidAI/LFM2.5-2.6B", releaseYear: 2026
    },
    pickerMeta: { family: "LFM2.5", origin: "Liquid AI · United States", license: { tier: "open-weight", label: "Custom Liquid AI licence" }, contextWindow: 131_072, releaseYear: 2026 }
  },
  {
    id: "minicpm5",
    directory: {
      slug: "minicpm5-1b", name: "MiniCPM5 (1B and 2B)", author: "OpenBMB", origin: "China", license: "Apache 2.0",
      paramSizes: ["1B", "2.5B dense (sold as 2B)"], contextWindow: "131k tokens", bestFor: ["On-device inference", "Edge deployments", "Low-memory hardware", "Tool calling"],
      notes: "Edge-first family for phones and low-memory laptops. The 2B arrived in September 2026 with the same training recipe scaled up, official GGUF files from OpenBMB, and tool calling in the chat template; its Q4_K_M file is about 1.6 GB. OpenBMB reports it competitive with 4B-class models on coding and maths, a vendor figure worth testing before relying on it.", url: "https://huggingface.co/openbmb/MiniCPM5-2B", releaseYear: 2026
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
    id: "olmo-3",
    directory: {
      slug: "olmo-3", name: "Olmo 3 / 3.1", author: "Allen Institute for AI", origin: "United States (non-profit)", license: "Apache 2.0",
      paramSizes: ["7B", "32B (Instruct and Think variants)"], contextWindow: "65k tokens", bestFor: ["Reproducible research", "Auditable training", "Education"],
      notes: "Weights, data, training code and intermediate checkpoints are public; transparency is the differentiator. Olmo 3.1 (December 2025) added reasoning-tuned Think variants at 7B and 32B, so the transparency argument costs far less capability than it did with OLMo 2.", url: "https://allenai.org/olmo", releaseYear: 2025
    },
    pickerMeta: { family: "Olmo 3", origin: "Allen Institute for AI · United States", license: { tier: "permissive", label: "Apache 2.0" }, contextWindow: 65_536, releaseYear: 2025 }
  }
];

const familyMap = new Map(families.map((f) => [f.id, f]));

export const hardwareProfiles: HardwareProfile[] = [
  { id: "minicpm5-1b", familyId: "minicpm5", variant: "1B", paramBillions: 1, isMoE: false, useCase: { general: 5, code: 4, longContext: 5, math: 4 }, hfPath: "openbmb/MiniCPM5-1B", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 1.0 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 1.2 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 1.6 }] },
  { id: "minicpm5-2b", familyId: "minicpm5", variant: "2B", paramBillions: 2.5, isMoE: false, contextWindow: 131_072, useCase: { general: 6, code: 6, longContext: 6, math: 6 }, hfPath: "openbmb/MiniCPM5-2B-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 2.0, path: "MiniCPM5-2B-Q4_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 3.2, path: "MiniCPM5-2B-Q8_0.gguf" }], notes: "Official OpenBMB GGUF files, Q4_K_M and Q8_0 only. Dense 2.5B with a 131k context, small enough for a phone-class device or any laptop." },
  { id: "phi-4-mini-3-8b", familyId: "phi-4", variant: "Mini 3.8B", paramBillions: 3.8, isMoE: false, useCase: { general: 7, code: 7, longContext: 5, math: 8 }, ollamaTag: "phi4-mini:3.8b", hfPath: "unsloth/Phi-4-mini-instruct-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 3.5, path: "Phi-4-mini-instruct-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 4.0, path: "Phi-4-mini-instruct-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 5.5, path: "Phi-4-mini-instruct.Q8_0.gguf" }] },
  { id: "qwen-3-5-9b", familyId: "qwen-3-5", variant: "9B", paramBillions: 9, isMoE: false, useCase: { general: 8, code: 8, longContext: 9, math: 8 }, ollamaTag: "qwen3.5:9b", hfPath: "unsloth/Qwen3.5-9B-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 6.0, path: "Qwen3.5-9B-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 7.0, path: "Qwen3.5-9B-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 10.0, path: "Qwen3.5-9B-Q8_0.gguf" }] },
  { id: "phi-4-14b", familyId: "phi-4", variant: "14B", paramBillions: 14, isMoE: false, contextWindow: 16_000, useCase: { general: 8, code: 8, longContext: 5, math: 9 }, ollamaTag: "phi4:14b", hfPath: "bartowski/phi-4-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 9, path: "phi-4-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 10.5, path: "phi-4-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 16, path: "phi-4-Q8_0.gguf" }] },
  { id: "gemma-4-12b", familyId: "gemma-4", variant: "12B", paramBillions: 12, isMoE: false, useCase: { general: 8, code: 7, longContext: 9, math: 7 }, ollamaTag: "gemma4:12b", hfPath: "google/gemma-4-12B-it-qat-q4_0-gguf", quants: [{ name: "Q4_0", qualityBucket: "high", memoryGb: 7, path: "gemma-4-12b-it-qat-q4_0.gguf" }], notes: "Google publishes one quantization-aware-trained q4_0 build rather than a ladder of quants, so the single entry is the whole offering." },
  { id: "qwen-3-6-27b", familyId: "qwen-3-6", variant: "27B", paramBillions: 27, isMoE: false, useCase: { general: 9, code: 9, longContext: 9, math: 9 }, ollamaTag: "qwen3.6:27b", hfPath: "unsloth/Qwen3.6-27B-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 17, path: "Qwen3.6-27B-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 20, path: "Qwen3.6-27B-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 29, path: "Qwen3.6-27B-Q8_0.gguf" }], notes: "Current open-weight Qwen generation for workstation-class local inference." },
  { id: "qwen-3-6-27b-ternary-bonsai", familyId: "qwen-3-6", variant: "27B (Ternary Bonsai, 1.71-bit)", paramBillions: 27, isMoE: false, useCase: { general: 9, code: 9, longContext: 9, math: 9 }, hfPath: "prism-ml/Ternary-Bonsai-27B-gguf", quants: [{ name: "Q2_0", qualityBucket: "medium", memoryGb: 8, path: "Ternary-Bonsai-27B-Q2_0.gguf", forkRepo: "https://github.com/PrismML-Eng/llama.cpp" }, { name: "Q2_g64", qualityBucket: "medium", memoryGb: 8.5, path: "Ternary-Bonsai-27B-Q2_g64.gguf" }], notes: "Prism ML's ternary requantization of Qwen3.6-27B: a 27B that fits where a 9B used to. Apache 2.0, and the whole language stack is genuinely ternary rather than low-bit with high-precision escape hatches. Vendor-reported: 95% of FP16 intelligence retained, 80.49 average across 15 thinking-mode benchmarks. Unverified by us — test it on your own workload before trusting it. The Q2_0 pack needs Prism ML's llama.cpp fork; Q2_g64 is the file for upstream llama.cpp." },
  { id: "qwen-3-6-27b-bonsai", familyId: "qwen-3-6", variant: "27B (Bonsai, 1.125-bit)", paramBillions: 27, isMoE: false, useCase: { general: 8, code: 8, longContext: 9, math: 8 }, hfPath: "prism-ml/Bonsai-27B-gguf", quants: [{ name: "Q1_0", qualityBucket: "low", memoryGb: 4.6, path: "Bonsai-27B-Q1_0.gguf" }], notes: "The binary build of the same model: about 3.9 GB on disk, so a 27B on an 8 GB laptop. Vendor-reported 76.11 average across the same 15 benchmarks against the ternary build's 80.49 — the extra compression costs real quality, and this is the tier where you should check the output yourself rather than take the number." },
  { id: "gemma-4-26b-a4b", familyId: "gemma-4", variant: "26B-A4B MoE", paramBillions: 26, activeParamBillions: 4, isMoE: true, useCase: { general: 9, code: 7, longContext: 9, math: 8 }, ollamaTag: "gemma4:26b", hfPath: "google/gemma-4-26B-A4B-it-qat-q4_0-gguf", quants: [{ name: "Q4_0", qualityBucket: "high", memoryGb: 15, path: "gemma-4-26B_q4_0-it.gguf" }], notes: "Quantization-aware-trained q4_0, the only build Google publishes for this size." },
  { id: "gemma-4-31b", familyId: "gemma-4", variant: "31B dense", paramBillions: 31, isMoE: false, useCase: { general: 9, code: 8, longContext: 9, math: 8 }, ollamaTag: "gemma4:31b", hfPath: "google/gemma-4-31B-it-qat-q4_0-gguf", quants: [{ name: "Q4_0", qualityBucket: "high", memoryGb: 18, path: "gemma-4-31B_q4_0-it.gguf" }], notes: "Quantization-aware-trained q4_0, the only build Google publishes for this size." },
  { id: "lfm2-5-2-6b", familyId: "lfm2-5", variant: "2.6B", paramBillions: 2.7, isMoE: false, useCase: { general: 6, code: 4, longContext: 6, math: 4 }, hfPath: "LiquidAI/LFM2.5-2.6B-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 2.0, path: "LFM2.5-2.6B-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 2.3, path: "LFM2.5-2.6B-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 3.2, path: "LFM2.5-2.6B-Q8_0.gguf" }], notes: "Convolution-attention hybrid for edge hardware. Liquid publishes its own GGUF files." },
  { id: "gpt-oss-20b", familyId: "gpt-oss", variant: "20B MoE", paramBillions: 21.5, activeParamBillions: 3.6, isMoE: true, useCase: { general: 9, code: 8, longContext: 8, math: 8 }, ollamaTag: "gpt-oss:20b", hfPath: "ggml-org/gpt-oss-20b-GGUF", quants: [{ name: "MXFP4", qualityBucket: "high", memoryGb: 12.5, path: "gpt-oss-20b-MXFP4.gguf" }], notes: "Ships natively in MXFP4, so the headline quantization is the precision it was trained for — it fits a 16 GB card without further loss." },
  { id: "qwen-3-8-27b", familyId: "qwen-3-8", variant: "27B", paramBillions: 27.8, isMoE: false, useCase: { general: 10, code: 10, longContext: 9, math: 9 }, ollamaTag: "qwen3.8:27b", hfPath: "unsloth/Qwen3.8-27B-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 17, path: "Qwen3.8-27B-UD-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 20, path: "Qwen3.8-27B-UD-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 30, path: "Qwen3.8-27B-Q8_0.gguf" }], notes: "Dense, Apache 2.0 and natively multimodal. The current default choice for a 24 GB card; bartowski publishes an imatrix build too." },
  { id: "qwen-3-8-27b-ternary-bonsai-2", familyId: "qwen-3-8", variant: "27B (Ternary Bonsai 2, 1.72-bit)", paramBillions: 27.4, isMoE: false, useCase: { general: 9, code: 9, longContext: 9, math: 9 }, hfPath: "prism-ml/Ternary-Bonsai-2-27B-gguf", quants: [{ name: "PTQ1_0", qualityBucket: "medium", memoryGb: 7, path: "Ternary-Bonsai-2-27B-PTQ1_0.gguf", forkRepo: "https://github.com/PrismML-Eng/llama.cpp" }, { name: "PQ2_0", qualityBucket: "medium", memoryGb: 8.5, path: "Ternary-Bonsai-2-27B-PQ2_0.gguf", forkRepo: "https://github.com/PrismML-Eng/llama.cpp" }], notes: "Prism ML's ternary rebuild of Qwen3.8-27B, September 2026: 5.95 GB (PTQ1_0) or 7.21 GB (PQ2_0) on disk, Apache 2.0. Vendor-reported 84.78 average across 14 thinking-mode benchmarks against 86.32 for FP16, unverified by us. Stock llama.cpp will not run either file: use Prism ML's fork. It is a reasoning model that thinks at length by default, so give it a large output limit (-n 16384) or the answer gets cut off mid-thought." },
  { id: "glm-4-7-flash-31b", familyId: "glm-4-7", variant: "Flash 31B MoE", paramBillions: 31.2, activeParamBillions: 3.4, isMoE: true, useCase: { general: 9, code: 9, longContext: 9, math: 8 }, ollamaTag: "glm-4.7-flash:latest", hfPath: "unsloth/GLM-4.7-Flash-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 19, path: "GLM-4.7-Flash-Q4_K_M.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 22.5, path: "GLM-4.7-Flash-Q5_K_M.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 34, path: "GLM-4.7-Flash-Q8_0.gguf" }], notes: "MIT licensed, 200k context, and one of the strongest agentic-coding models that fits on a single workstation GPU." },
  { id: "nemotron-3-5-lightning-30b", familyId: "nemotron-3-5", variant: "30B-A3B hybrid", paramBillions: 31.6, activeParamBillions: 3, isMoE: true, useCase: { general: 8, code: 8, longContext: 9, math: 7 }, hfPath: "ggml-org/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-GGUF", quants: [{ name: "Q4_0", qualityBucket: "high", memoryGb: 19, path: "NVIDIA-Nemotron-3.5-Lightning-30B-A3B-Q4_0.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 34, path: "NVIDIA-Nemotron-3.5-Lightning-30B-A3B-Q8_0.gguf" }], notes: "Only about 3B parameters are active per token, so it answers at small-model speed while occupying 30B of memory." },
  { id: "deepseek-v4-flash-0731", familyId: "deepseek-v4-flash", variant: "0731 (304B-A13B MoE)", paramBillions: 304, activeParamBillions: 13, isMoE: true, useCase: { general: 9, code: 10, longContext: 10, math: 9 }, hfPath: "unsloth/DeepSeek-V4-Flash-0731-GGUF", quants: [{ name: "UD-IQ2_XXS", qualityBucket: "medium", memoryGb: 91, path: "UD-IQ2_XXS/DeepSeek-V4-Flash-0731-UD-IQ2_XXS-00001-of-00003.gguf" }, { name: "UD-Q2_K_XL", qualityBucket: "medium", memoryGb: 97, path: "UD-Q2_K_XL/DeepSeek-V4-Flash-0731-UD-Q2_K_XL-00001-of-00003.gguf" }, { name: "UD-Q4_K_XL", qualityBucket: "high", memoryGb: 155, path: "UD-Q4_K_XL/DeepSeek-V4-Flash-0731-UD-Q4_K_XL-00001-of-00005.gguf" }, { name: "UD-Q8_K_XL", qualityBucket: "near-fp16", memoryGb: 162, path: "UD-Q8_K_XL/DeepSeek-V4-Flash-0731-UD-Q8_K_XL-00001-of-00005.gguf" }], notes: "Memory figures are the measured sizes of the unsloth GGUF builds on the Hub. A 128 GB machine reaches UD-Q2_K_XL; 96 GB does not fit these files — the 96 GB number quoted around DwarfStar comes from that engine’s own asymmetric recipe, not from a stock GGUF. Because the weights are natively FP8, UD-Q8_K_XL is effectively lossless at only about 7 GB more than UD-Q4_K_XL." },
  { id: "mistral-small-4-119b-a6b", familyId: "mistral-small-4", variant: "119B-A6B MoE", paramBillions: 119, activeParamBillions: 6.5, isMoE: true, useCase: { general: 9, code: 9, longContext: 9, math: 8 }, hfPath: "mistralai/Mistral-Small-4-119B-2603", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 68 }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 80 }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 125 }] },
  { id: "mistral-medium-3-5-128b", familyId: "mistral-medium-3-5", variant: "128B dense", paramBillions: 128, isMoE: false, useCase: { general: 9, code: 9, longContext: 9, math: 8 }, hfPath: "unsloth/Mistral-Medium-3.5-128B-GGUF", quants: [{ name: "Q4_K_M", qualityBucket: "high", memoryGb: 75, path: "Q4_K_M/Mistral-Medium-3.5-128B-Q4_K_M-00001-of-00003.gguf" }, { name: "Q5_K_M", qualityBucket: "high", memoryGb: 88, path: "Q5_K_M/Mistral-Medium-3.5-128B-Q5_K_M-00001-of-00003.gguf" }, { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 135, path: "Q8_0/Mistral-Medium-3.5-128B-Q8_0-00001-of-00004.gguf" }] }
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
    slug: "qwen-3-8-2-4t", name: "Qwen3.8-2.4T-A95B", author: "Alibaba (Qwen team)", origin: "China",
    license: "Custom Qwen licence — not the Apache 2.0 that covers the 27B", licenseTier: "open-weight", totalParams: "2.4T MoE (95B active)", contextWindow: "262k tokens, native multimodal",
    released: "August 2026", headline: "The largest model Alibaba has published, and the top trending release on the Hub at launch. Same generation as the Apache-licensed 27B, under a different licence.",
    hardwareReality: "Roughly 1.2 TB at 4-bit. Multi-node territory. Community GGUF conversions exist and are mostly of academic interest unless you have a cluster.",
    accessInstead: "Alibaba Cloud's API and the usual inference providers. FP8 weights are published alongside the BF16 ones if you are renting datacenter GPUs.", littleSibling: "Qwen3.8-27B — dense, Apache 2.0, multimodal, and in the picker.", url: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"
  },
  {
    slug: "kimi-k3", name: "Kimi K3", author: "Moonshot AI", origin: "China", license: "Moonshot Open License", licenseTier: "open-weight",
    totalParams: "2.8T MoE", contextWindow: "1M tokens, native multimodal", released: "June 2026 (weights public on the Hub)",
    headline: "A frontier-scale open-weight MoE whose sheer weight footprint makes it infrastructure rather than homelab software.",
    hardwareReality: "Even aggressive quantization requires well over a terabyte of memory. Practical self-hosting means a multi-node datacenter GPU cluster.",
    accessInstead: "Moonshot API or a third-party inference provider.", littleSibling: "Kimi K2.x family for smaller agentic workloads.", url: "https://huggingface.co/moonshotai/Kimi-K3"
  },
  {
    slug: "glm-5-3", name: "GLM-5.3", author: "Z.ai (Zhipu)", origin: "China", license: "GLM-5.3 License (MIT-style, with a security-review clause for the largest API providers)", licenseTier: "open-weight",
    totalParams: "753B MoE", contextWindow: "1M tokens", released: "September 2026", headline: "Same base model as GLM-5.2, with every gain coming from post-training. Z.ai reports the strongest open-weight coding scores to date; the benchmark table on the model card is vendor-run.",
    hardwareReality: "The smallest unsloth GGUF (UD-IQ1_S) is about 217 GB; UD-Q2_K_XL is 254 GB and UD-Q4_K_XL 467 GB. Even the 1-bit build needs a 256 GB machine, and anything worth running needs more.", accessInstead: "Z.ai API and most large inference providers (Together, Fireworks, DeepInfra, Novita, Baseten).", littleSibling: "GLM-5.3-Flash — 321B MoE with 18B active, MIT, around 109 GB at UD-Q2_K_XL. For a single 24 GB card, GLM-4.7-Flash is still the one in the picker.", url: "https://huggingface.co/zai-org/GLM-5.3"
  },
  {
    slug: "llama-4-maverick", name: "Llama 4 Maverick", author: "Meta AI", origin: "United States", license: "Llama 4 Community License", licenseTier: "open-weight",
    totalParams: "400B MoE (~17B active)", contextWindow: "1M tokens", released: "2025", headline: "Meta's frontier-tier open-weight MoE: relatively light compute per token, but very heavy memory requirements.",
    hardwareReality: "Roughly hundreds of gigabytes at practical quantizations; a single consumer GPU is not enough.", accessInstead: "Hosted inference or Meta-supported API access.", littleSibling: "Llama 4 Scout is smaller but still workstation-class.", url: "https://llama.meta.com"
  },
  {
    slug: "deepseek-v4-pro", name: "DeepSeek V4 Pro", author: "DeepSeek AI", origin: "China", license: "MIT", licenseTier: "permissive",
    totalParams: "1.6T MoE (49B active)", contextWindow: "1M tokens", released: "2026", headline: "Frontier-scale DeepSeek model for code, math and agents under a permissive license.",
    hardwareReality: "The full checkpoint needs several hundred gigabytes to more than a terabyte depending on precision and runtime overhead.", accessInstead: "DeepSeek API or third-party hosting.", littleSibling: "DeepSeek V4 Flash — 304B-A13B, MIT, and in the picker for machines with 128 GB or more.", url: "https://www.deepseek.com"
  }
];
