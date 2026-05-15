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
