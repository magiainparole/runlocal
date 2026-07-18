export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export const posts: PostMeta[] = [
  {
    slug: "kimi-k3-what-open-means-now",
    title: "Kimi K3 changes the definition of 'open'",
    subtitle:
      "A 2.8-trillion-parameter model with public weights that almost nobody can run. What the largest open weight ever released actually means for people who run AI locally.",
    date: "2026-07-18",
    readingTime: "9 min",
    tags: ["Frontier", "Kimi K3", "Analysis"]
  },
  {
    slug: "gguf-quantization-explained",
    title: "Choosing a GGUF quantization without lying to yourself",
    subtitle:
      "Q4, Q5, Q8 and the rest of the GGUF zoo, with a practical decision rule that holds up across hardware classes.",
    date: "2026-05-15",
    readingTime: "10 min",
    tags: ["Quantization", "llama.cpp", "Guide"]
  },
  {
    slug: "apple-silicon-vs-nvidia-local-llm",
    title: "Apple Silicon or NVIDIA for local LLMs in 2026",
    subtitle:
      "Unified memory, raw VRAM, and the workloads where each wins. A practical comparison that goes beyond benchmark snippets.",
    date: "2026-05-14",
    readingTime: "12 min",
    tags: ["Hardware", "Comparison", "Apple Silicon"]
  },
  {
    slug: "opensuse-for-ai-workloads",
    title: "Why openSUSE is a serious option for running AI locally",
    subtitle:
      "Rolling releases, immutable variants, and an honest line between community Linux and paid enterprise. A practical look at when openSUSE earns its place in an AI stack.",
    date: "2026-05-13",
    readingTime: "9 min",
    tags: ["openSUSE", "Linux", "Infrastructure"]
  },
  {
    slug: "open-weights-state-of-play-2026",
    title: "The state of open weights in May 2026",
    subtitle:
      "Five frontier-class releases in the last thirty days, three of them from Chinese labs. A short tour of where the field actually is.",
    date: "2026-05-12",
    readingTime: "9 min",
    tags: ["Models", "Ecosystem", "Analysis"]
  },
  {
    slug: "ollama-vs-llama-cpp-vs-vllm",
    title: "Which local inference engine should you actually use",
    subtitle:
      "Ollama, llama.cpp, LM Studio and vLLM solve different problems. A practical map of when to reach for which, and why it matters more than benchmark numbers.",
    date: "2026-05-05",
    readingTime: "11 min",
    tags: ["Tools", "Inference", "Guide"]
  }
];
