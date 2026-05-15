export type GuideMeta = {
  slug: string;
  title: string;
  excerpt: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  readingTime: string;
  updated: string;
  os: string[];
};

export const guides: GuideMeta[] = [
  {
    slug: "ollama",
    title: "Install Ollama and run your first local model",
    excerpt:
      "From zero to a working local LLM in about ten minutes, with the commands that actually matter and the gotchas nobody warns you about.",
    level: "Beginner",
    readingTime: "10 min",
    updated: "May 2026",
    os: ["macOS", "Linux", "Windows"]
  },
  {
    slug: "llama-cpp",
    title: "Build and run llama.cpp from source",
    excerpt:
      "How to compile llama.cpp with the right backend for your hardware, pick a GGUF quantization that fits your RAM, and serve an OpenAI-compatible endpoint.",
    level: "Intermediate",
    readingTime: "20 min",
    updated: "May 2026",
    os: ["macOS", "Linux", "Windows"]
  },
  {
    slug: "lm-studio",
    title: "LM Studio setup and side-by-side model evaluation",
    excerpt:
      "A practical walkthrough for using LM Studio to download, compare and serve local models, plus when LM Studio is the wrong tool.",
    level: "Beginner",
    readingTime: "12 min",
    updated: "May 2026",
    os: ["macOS", "Linux", "Windows"]
  }
];
