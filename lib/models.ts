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
    slug: "qwen-3-6",
    name: "Qwen 3.6",
    author: "Alibaba (Qwen team)",
    origin: "China",
    license: "Apache 2.0 on official open-weight checkpoints",
    paramSizes: ["27B dense", "35B-A3B MoE", "additional large MoE variants"],
    contextWindow: "262k native on 27B; long-context extensions available",
    bestFor: ["Coding", "Multimodal workflows", "Multilingual", "Local workstations"],
    notes:
      "Current open-weight Qwen generation for local use. Qwen3.6-27B is the key workstation-class checkpoint: dense, multimodal and explicitly published for self-hosted inference. Qwen3.8-Max-Preview is newer but cloud/API-only as of August 15, 2026, so it is intentionally not listed as a downloadable local model.",
    url: "https://huggingface.co/Qwen/Qwen3.6-27B",
    releaseYear: 2026
  },
  {
    slug: "qwen-3-5",
    name: "Qwen 3.5",
    author: "Alibaba (Qwen team)",
    origin: "China",
    license: "Apache 2.0",
    paramSizes: ["2B", "9B", "27B", "35B-A3B MoE", "122B-A10B MoE", "397B-A17B MoE"],
    contextWindow: "262k native; up to ~1M with supported scaling on selected models",
    bestFor: ["Multimodal", "Multilingual", "Code", "Cost-sensitive deployments"],
    notes:
      "Released in 2026, not 2025. Qwen3.5 introduced a unified vision-language foundation and spans small local models through large MoE checkpoints. The 2B, 9B and 27B variants are particularly relevant to local inference.",
    url: "https://huggingface.co/Qwen/Qwen3.5-27B",
    releaseYear: 2026
  },
  {
    slug: "deepseek-v4",
    name: "DeepSeek V4 (Pro & Flash)",
    author: "DeepSeek AI",
    origin: "China",
    license: "MIT",
    paramSizes: ["Flash 284B MoE (13B active)", "Pro 1.6T MoE (49B active)"],
    contextWindow: "1M tokens",
    bestFor: ["Mathematical reasoning", "Code generation", "Long-context analysis", "Agents"],
    notes:
      "DeepSeek V4 uses very large MoE checkpoints: active parameters drive much of the compute cost, while total parameters still drive memory requirements. V4 Pro is frontier-scale; Flash is the lighter sibling but still a high-memory workstation or multi-GPU model when self-hosted.",
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",
    releaseYear: 2026
  },
  {
    slug: "mistral-small-4",
    name: "Mistral Small 4",
    author: "Mistral AI",
    origin: "France (EU)",
    license: "Apache 2.0",
    paramSizes: ["119B MoE (6.5B active)"],
    contextWindow: "256k tokens",
    bestFor: ["Reasoning", "Coding agents", "Multimodal workflows", "EU-friendly deployments"],
    notes:
      "Mistral Small 4 119B-A6B combines instruct, reasoning and coding modes in one multimodal MoE model. The low active-parameter count helps inference speed, but the full 119B weights still make memory capacity the main local constraint.",
    url: "https://huggingface.co/mistralai/Mistral-Small-4-119B-2603",
    releaseYear: 2026
  },
  {
    slug: "mistral-medium-3-5",
    name: "Mistral Medium 3.5",
    author: "Mistral AI",
    origin: "France (EU)",
    license: "Modified MIT / custom repository license",
    paramSizes: ["128B dense"],
    contextWindow: "256k tokens",
    bestFor: ["EU-friendly deployments", "Coding", "Reasoning", "Long context"],
    notes:
      "A dense 128B multimodal flagship that unifies instruction following, reasoning and coding. It is substantially larger than the ~70B figure previously shown here, so local memory requirements are correspondingly higher.",
    url: "https://huggingface.co/mistralai/Mistral-Medium-3.5-128B",
    releaseYear: 2026
  },
  {
    slug: "gemma-4",
    name: "Gemma 4",
    author: "Google DeepMind",
    origin: "United States",
    license: "Apache 2.0",
    paramSizes: ["E2B", "E4B", "12B", "26B-A4B MoE", "31B dense"],
    contextWindow: "128k (E2B/E4B); 256k (12B, 26B-A4B, 31B)",
    bestFor: ["On-device inference", "Multimodal", "Consumer GPUs", "Workstations"],
    notes:
      "Gemma 4 is multimodal and spans edge through workstation hardware. The 26B-A4B variant activates about 4B parameters per token, while the 31B model is dense. Audio input is supported on E2B, E4B and 12B.",
    url: "https://huggingface.co/google/gemma-4-31B",
    releaseYear: 2026
  },
  {
    slug: "phi-4",
    name: "Phi-4 family",
    author: "Microsoft Research",
    origin: "United States",
    license: "MIT",
    paramSizes: ["Phi-4 Mini 3.8B", "Phi-4 14B", "reasoning variants"],
    contextWindow: "Varies by checkpoint",
    bestFor: ["Edge devices", "Reasoning per parameter", "Cost-sensitive inference"],
    notes:
      "RunLocal previously listed a Phi-5 family that could not be verified in Microsoft's official model releases. Until Microsoft publishes an official Phi-5 model card, the verified Phi-4 family is the correct entry.",
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
      "June 2026 update of the K2 line. For the frontier-scale Kimi K3 (2.8T), see the Frontier section.",
    url: "https://www.moonshot.cn",
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
      "Released in 2026 with a 1M-token context and native multimodality. Quantized builds remain demanding; check the memory estimates before downloading.",
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
      "GLM-5.2 is frontier-scale and belongs in the Frontier section. Smaller GLM variants remain the practical local entry points.",
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
      "The edge-first family from OpenBMB. MiniCPM5-1B is aimed at phones and low-memory laptops and is a useful alternative when larger local models do not fit.",
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
      "Fully open: weights, data pipeline, and training logs. Trained on the MareNostrum 5 supercomputer in Barcelona. Covers all 24 EU official languages plus additional languages.",
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
      "One of the most transparent families in the catalog: weights, data, training code and intermediate checkpoints are public. Capability is mid-tier; transparency is the differentiator.",
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
      "Open weights but non-commercial. Strong on retrieval-augmented generation and tool calling. A useful RAG baseline, but check license constraints before production use.",
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
      "A well-documented bilingual family with reasonable deployment options. Less current than Qwen or DeepSeek, but still useful for comparison and existing deployments.",
    url: "https://01.ai",
    releaseYear: 2024
  }
];