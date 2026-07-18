// Frontier open-weight models: too large for consumer hardware, but worth
// knowing about. These entries power the "Frontier open weights" section on
// the /models page. The point of the section is honest expectation-setting:
// these are the models making headlines, and here is what it would actually
// take to run them yourself — plus the realistic alternatives (API access,
// cloud rental, or a distilled sibling from the same family).

export type FrontierModel = {
  slug: string;
  name: string;
  author: string;
  origin: string;
  license: string;
  licenseTier: "permissive" | "open-weight";
  totalParams: string;       // e.g. "2.8T MoE (16 of 896 experts active)"
  contextWindow: string;
  released: string;          // human-readable date
  headline: string;          // why this model matters, one sentence
  hardwareReality: string;   // what it takes to run it, in plain words
  accessInstead: string;     // realistic way to use it without the hardware
  littleSibling?: string;    // runnable model from the same family, if any
  url: string;
};

export const frontierModels: FrontierModel[] = [
  {
    slug: "kimi-k3",
    name: "Kimi K3",
    author: "Moonshot AI",
    origin: "China",
    license: "Moonshot Open License (weights expected July 27, 2026)",
    licenseTier: "open-weight",
    totalParams: "2.8T MoE (16 of 896 experts active, ~1.8%)",
    contextWindow: "1M tokens, native multimodal",
    released: "July 16, 2026",
    headline:
      "The largest open-weight model ever released. Ranked fourth among all frontier models on independent testing, ahead of several closed flagships, and first in the Frontend Code Arena.",
    hardwareReality:
      "Even at aggressive 4-bit quantization the weights alone exceed 1.4 TB. Running it means a multi-node GPU cluster — think 16+ datacenter GPUs with fast interconnect. This is not a homelab project; it is infrastructure.",
    accessInstead:
      "Moonshot's API at $3 per million input tokens and $15 per million output. Cloud GPU rental for batch workloads. Several inference providers are expected to host it once weights land.",
    littleSibling:
      "Kimi K2.7 Code (June 2026) — the agentic-coding sibling that quantized builds can run on a 96 GB+ workstation.",
    url: "https://www.moonshot.cn"
  },
  {
    slug: "glm-5-2",
    name: "GLM-5.2",
    author: "Z.ai (Zhipu)",
    origin: "China",
    license: "MIT",
    licenseTier: "permissive",
    totalParams: "744B",
    contextWindow: "1M tokens",
    released: "June 13, 2026",
    headline:
      "The current #1 open-weight model on the Artificial Analysis Intelligence Index. Beats GPT-5.5 on several long-horizon coding benchmarks at roughly one-sixth the price — under an MIT license.",
    hardwareReality:
      "Around 370–400 GB at 4-bit quantization. Technically within reach of a maxed-out Mac Studio cluster or a 4× H100 node, but far outside single consumer GPUs. Budget five figures for hardware that runs it acceptably.",
    accessInstead:
      "Z.ai's API is aggressively priced. Most inference providers (Together, Fireworks, DeepInfra) host it. The MIT license means anyone can serve it, which keeps prices competitive.",
    littleSibling:
      "GLM-4.7-Flash — the distilled fast variant that runs on a 24 GB GPU and stays in our trending list.",
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
      "Meta's frontier-tier open weight. The MoE design means inference speed comparable to a 17B dense model — if you can fit the full weights in memory.",
    hardwareReality:
      "Roughly 200–230 GB at 4-bit. A 4× A6000 workstation or a 256 GB unified-memory Mac cluster gets you there; a single consumer GPU does not. The active-parameter trick helps speed, not memory.",
    accessInstead:
      "Hosted by every major inference provider. Meta's own llama.com API. Often the cheapest frontier-class option per token because so many providers compete on it.",
    littleSibling:
      "Llama 4 Scout — same family, 109B total, runs (tightly) on a 96 GB workstation and features in our picker.",
    url: "https://llama.meta.com"
  },
  {
    slug: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    author: "DeepSeek AI",
    origin: "China",
    license: "MIT",
    licenseTier: "permissive",
    totalParams: "Large-scale MoE",
    contextWindow: "1M tokens",
    released: "May 2026",
    headline:
      "The model that has dominated our trending list since launch: top open-weight scores on SWE-Bench Verified and GPQA Diamond, MIT licensed, and the default recommendation for serious code and math work.",
    hardwareReality:
      "The full MoE needs several hundred gigabytes of memory across multiple GPUs. Community 4-bit builds exist but still demand workstation-cluster territory, not a desktop.",
    accessInstead:
      "DeepSeek's own API is famously cheap. The MIT license means third-party hosting is plentiful and prices keep falling.",
    littleSibling:
      "DeepSeek V4 Flash — the distilled variant. Quantized builds run on high-memory workstations, and it holds the #2 spot in our trending list.",
    url: "https://www.deepseek.com"
  }
];
