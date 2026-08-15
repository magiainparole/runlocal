// Frontier models and previews that are too large for consumer hardware or
// are not currently available as downloadable open weights. This section is
// intentionally separate from the hardware picker.

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

export const frontierModels: FrontierModel[] = [
  {
    slug: "qwen-3-8-max-preview",
    name: "Qwen3.8-Max-Preview",
    author: "Alibaba (Qwen team)",
    origin: "China",
    license: "Cloud/API preview — no verified downloadable open weights as of Aug 15, 2026",
    licenseTier: "open-weight",
    totalParams: "Not disclosed for a downloadable checkpoint",
    contextWindow: "Cloud/API model; see provider documentation",
    released: "August 2026",
    headline:
      "Qwen 3.8 is newer than the open-weight Qwen 3.6 generation, but the Max preview is currently a hosted model rather than a model RunLocal can honestly recommend for local inference.",
    hardwareReality:
      "There is no official Qwen3.8-27B or other verified downloadable Qwen 3.8 checkpoint to size for local hardware today. RunLocal will not invent a VRAM requirement for a model whose weights are not published.",
    accessInstead:
      "Use the hosted Qwen3.8-Max-Preview through Alibaba/Qwen-compatible cloud access where available, or use Qwen3.6-27B locally.",
    littleSibling:
      "Qwen3.6-27B — the current verified open-weight workstation-class Qwen model for local use.",
    url: "https://qwen.ai"
  },
  {
    slug: "kimi-k3",
    name: "Kimi K3",
    author: "Moonshot AI",
    origin: "China",
    license: "Moonshot Open License",
    licenseTier: "open-weight",
    totalParams: "2.8T MoE (16 of 896 experts active, ~1.8%)",
    contextWindow: "1M tokens, native multimodal",
    released: "July 16, 2026; weights published July 27, 2026",
    headline:
      "A frontier-scale open-weight MoE model with public weights, but far beyond a normal single-workstation deployment.",
    hardwareReality:
      "Even at aggressive 4-bit quantization the weights alone exceed 1.4 TB. Running it means a multi-node GPU cluster with fast interconnect, not a normal homelab.",
    accessInstead:
      "Use Moonshot's API or a hosted inference provider unless you operate datacenter-class multi-node hardware.",
    littleSibling:
      "Kimi K2.7 Code — a smaller agentic-coding sibling, though still demanding when self-hosted.",
    url: "https://www.moonshot.cn"
  },
  {
    slug: "glm-5-2",
    name: "GLM-5.2",
    author: "Z.ai (Zhipu)",
    origin: "China",
    license: "MIT",
    licenseTier: "permissive",
    totalParams: "~744B class",
    contextWindow: "1M tokens",
    released: "June 2026",
    headline:
      "A frontier-scale open-weight GLM release with permissive licensing and strong coding/agentic positioning.",
    hardwareReality:
      "Hundreds of gigabytes of memory are required even after aggressive quantization. This is multi-GPU or cluster territory rather than a consumer desktop.",
    accessInstead:
      "Use Z.ai's API or third-party inference providers; smaller GLM variants remain the practical local entry points.",
    littleSibling:
      "GLM-4.7-Flash and other smaller GLM variants are the realistic local alternatives.",
    url: "https://chatglm.cn"
  },
  {
    slug: "llama-4-maverick",
    name: "Llama 4 Maverick",
    author: "Meta AI",
    origin: "United States",
    license: "Llama 4 Community License",
    licenseTier: "open-weight",
    totalParams: "400B MoE (~17B active)",
    contextWindow: "1M tokens",
    released: "2025",
    headline:
      "Meta's frontier-tier open weight. MoE reduces active compute, but the full weights still have to fit in memory.",
    hardwareReality:
      "Roughly 200+ GB at 4-bit. A multi-GPU workstation or large unified-memory system is required; a single consumer GPU is not enough.",
    accessInstead:
      "Hosted by major inference providers and available through Meta-compatible hosted access.",
    littleSibling:
      "Llama 4 Scout — same family, 109B total, still demanding but materially more approachable.",
    url: "https://llama.meta.com"
  },
  {
    slug: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    author: "DeepSeek AI",
    origin: "China",
    license: "MIT",
    licenseTier: "permissive",
    totalParams: "1.6T MoE (49B active)",
    contextWindow: "1M tokens",
    released: "2026",
    headline:
      "DeepSeek's frontier V4 checkpoint: enormous total capacity with 49B active parameters per token and permissive licensing.",
    hardwareReality:
      "The full 1.6T-parameter MoE remains a cluster-scale deployment. Active parameters help compute efficiency but do not remove the need to store the full model weights.",
    accessInstead:
      "DeepSeek's API and third-party hosted inference are the realistic routes for most users.",
    littleSibling:
      "DeepSeek V4 Flash — 284B total / 13B active, substantially lighter on compute but still a high-memory local model.",
    url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
  }
];