export type ModelEntry = {
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

export const models: ModelEntry[] = [
  {
    slug: "llama-4",
    name: "Llama 4 (Scout & Maverick)",
    author: "Meta AI",
    origin: "United States",
    license: "Llama Community License (custom)",
    paramSizes: ["Scout 109B (MoE, 17B active)", "Maverick 400B (MoE, ~17B active)"],
    contextWindow: "Up to 10M tokens (Scout)",
    bestFor: ["Long-context retrieval", "Codebase-scale RAG", "General reasoning"],
    notes:
      "Mixture-of-experts architecture. Scout pushes context to 10M tokens, Maverick targets frontier-tier reasoning. Custom license restricts use above 700M MAU and forbids training competitors.",
    url: "https://llama.meta.com",
    releaseYear: 2025
  },
  {
    slug: "qwen-3-5",
    name: "Qwen 3.5",
    author: "Alibaba (Qwen team)",
    origin: "China",
    license: "Apache 2.0 (small sizes); Qwen License (larger)",
    paramSizes: ["1.8B", "4B", "7B", "14B", "32B", "72B", "MoE variants"],
    contextWindow: "Up to 1M (long-context variant)",
    bestFor: ["Multilingual", "Code", "Cost-sensitive deployments"],
    notes:
      "The most permissive frontier-class family for smaller sizes. Strong on Asian languages, competitive on English code and reasoning benchmarks.",
    url: "https://qwenlm.github.io",
    releaseYear: 2025
  },
  {
    slug: "deepseek-v4",
    name: "DeepSeek V4 (Pro & Flash)",
    author: "DeepSeek AI",
    origin: "China",
    license: "MIT (V4) / DeepSeek License (V4 Pro variants)",
    paramSizes: ["236B MoE", "Distilled dense variants"],
    contextWindow: "1M tokens",
    bestFor: ["Mathematical reasoning", "Code generation", "Long-context analysis"],
    notes:
      "Topped open-source leaderboards on SWE-Bench and GPQA Diamond in early 2026. The MIT-licensed core variant is the most permissive of the top-tier open weights.",
    url: "https://www.deepseek.com",
    releaseYear: 2025
  },
  {
    slug: "mistral-medium-3-5",
    name: "Mistral Medium 3.5",
    author: "Mistral AI",
    origin: "France (EU)",
    license: "Apache 2.0 (open weight tier)",
    paramSizes: ["~70B class"],
    contextWindow: "256k tokens",
    bestFor: ["EU-friendly deployments", "Coding", "Compliance-sensitive workloads"],
    notes:
      "Released April 2026. The most credible non-Chinese, non-American option at frontier level. Mistral remains the leading European LLM lab by capability.",
    url: "https://mistral.ai",
    releaseYear: 2026
  },
  {
    slug: "gemma-4",
    name: "Gemma 4",
    author: "Google DeepMind",
    origin: "United States",
    license: "Gemma Terms of Use",
    paramSizes: ["2B", "9B", "27B"],
    contextWindow: "128k tokens",
    bestFor: ["On-device inference", "Apple Silicon", "Edge deployments"],
    notes:
      "Tuned for small-footprint deployment. Strong on consumer GPUs and Apple Silicon. The license is permissive for most commercial use but is not OSI-approved.",
    url: "https://ai.google.dev/gemma",
    releaseYear: 2026
  },
  {
    slug: "phi-5",
    name: "Phi-5",
    author: "Microsoft Research",
    origin: "United States",
    license: "MIT",
    paramSizes: ["3.8B", "7B", "14B"],
    contextWindow: "128k tokens",
    bestFor: ["Edge devices", "Reasoning per parameter", "Cost-sensitive inference"],
    notes:
      "Small-model series with strong reasoning-per-parameter ratios. MIT licensed, ideal for embedded and on-device scenarios.",
    url: "https://huggingface.co/microsoft",
    releaseYear: 2025
  },
  {
    slug: "kimi-k2",
    name: "Kimi K2.7 Code",
    author: "Moonshot AI",
    origin: "China",
    license: "Moonshot Open License",
    paramSizes: ["~Trillion-class MoE"],
    contextWindow: "2M tokens",
    bestFor: ["Coding agents", "Agentic workflows", "Long documents"],
    notes:
      "June 2026 update of the K2 line: +21.8% over K2.6 on Kimi Code Bench v2, plus a HighSpeed variant with ~6× faster inference. For the frontier-scale Kimi K3 (2.8T), see the Frontier section below.",
    url: "https://www.moonshot.cn",
    releaseYear: 2026
  },
  {
    slug: "qwen-3-6",
    name: "Qwen 3.6",
    author: "Alibaba (Qwen team)",
    origin: "China",
    license: "Apache 2.0 (small sizes); Qwen License (larger)",
    paramSizes: ["Ladder of sizes from sub-1B to large MoE"],
    contextWindow: "Up to 1M (long-context variants)",
    bestFor: ["Multilingual", "Code", "Cost-sensitive deployments"],
    notes:
      "Mid-2026 refresh of the Qwen family. Keeps the permissive licensing on smaller sizes that made Qwen the default choice for commercial local deployments, with improved multilingual coverage.",
    url: "https://qwenlm.github.io",
    releaseYear: 2026
  },
  {
    slug: "minimax-m3",
    name: "MiniMax M3",
    author: "MiniMax",
    origin: "China",
    license: "MiniMax License (custom)",
    paramSizes: ["Large MoE"],
    contextWindow: "1M tokens, native multimodal",
    bestFor: ["Agentic coding", "Multimodal workflows", "Long documents"],
    notes:
      "Released June 1, 2026: the first open weight to combine frontier coding (vendor-reported 59.0% on SWE-Bench Pro), a 1M-token context and native multimodality in one model. Quantized builds are demanding; check the memory estimates before downloading.",
    url: "https://www.minimax.io",
    releaseYear: 2026
  },
  {
    slug: "glm-5",
    name: "GLM 5.1 / 5.2 family",
    author: "Z.ai (Zhipu)",
    origin: "China",
    license: "MIT",
    paramSizes: ["9B", "32B", "MoE variants; 5.2 flagship is 744B"],
    contextWindow: "1M tokens",
    bestFor: ["Bilingual EN/ZH workloads", "Agentic coding"],
    notes:
      "GLM-5.2 (June 2026) is the current #1 open weight on the Artificial Analysis Intelligence Index — but at 744B it belongs in the Frontier section below. The smaller 5.1-era sizes and GLM-4.7-Flash remain the runnable entry points, all MIT licensed.",
    url: "https://chatglm.cn",
    releaseYear: 2026
  },
  {
    slug: "minicpm5-1b",
    name: "MiniCPM5-1B",
    author: "OpenBMB",
    origin: "China",
    license: "Apache 2.0 (check model card for variant terms)",
    paramSizes: ["1B (larger MiniCPM variants available)"],
    contextWindow: "128k tokens",
    bestFor: ["On-device inference", "Edge deployments", "Low-memory hardware"],
    notes:
      "The edge-first family from OpenBMB (Tsinghua-affiliated). MiniCPM5-1B runs on phones and 8 GB laptops with room to spare, and holds its own against models twice its size. Nearly 400k downloads within two months of release.",
    url: "https://huggingface.co/openbmb/MiniCPM5-1B",
    releaseYear: 2026
  },
  {
    slug: "eurollm-22b",
    name: "EuroLLM-22B",
    author: "EuroLLM Consortium",
    origin: "European Union",
    license: "Apache 2.0",
    paramSizes: ["1.7B", "9B", "22B"],
    contextWindow: "32k tokens",
    bestFor: ["EU language coverage", "Public-sector AI", "Research"],
    notes:
      "Fully open: weights, data pipeline, and training logs. Trained on the MareNostrum 5 supercomputer in Barcelona. Covers all 24 EU official languages plus 11 more. Not at frontier level on English benchmarks, but unique in its transparency.",
    url: "https://huggingface.co/utter-project",
    releaseYear: 2025
  },
  {
    slug: "olmo-2",
    name: "OLMo 2",
    author: "Allen Institute for AI",
    origin: "United States (non-profit)",
    license: "Apache 2.0",
    paramSizes: ["1B", "7B", "13B"],
    contextWindow: "8k tokens",
    bestFor: ["Reproducible research", "Auditable training", "Education"],
    notes:
      "The most truly open model in the catalog: weights, data, training code, and intermediate checkpoints are all public. Capability is mid-tier, transparency is unmatched.",
    url: "https://allenai.org/olmo",
    releaseYear: 2025
  },
  {
    slug: "command-r-plus",
    name: "Command R+ (open weights)",
    author: "Cohere",
    origin: "Canada",
    license: "CC-BY-NC 4.0 (non-commercial)",
    paramSizes: ["104B"],
    contextWindow: "128k tokens",
    bestFor: ["RAG workloads", "Tool use", "Research / personal use"],
    notes:
      "Open weights but non-commercial. Strong on retrieval-augmented generation and tool calling. A useful baseline for RAG work even if not deployable as-is in production.",
    url: "https://cohere.com",
    releaseYear: 2024
  },
  {
    slug: "yi-2",
    name: "Yi-2",
    author: "01.AI",
    origin: "China",
    license: "Yi Series License",
    paramSizes: ["6B", "9B", "34B"],
    contextWindow: "200k tokens",
    bestFor: ["Bilingual", "Cost-efficient deployments"],
    notes:
      "Steady, well-documented series with bilingual strength and reasonable license terms. Less flashy than Qwen or DeepSeek but a solid choice for many production cases.",
    url: "https://01.ai",
    releaseYear: 2024
  }
];
