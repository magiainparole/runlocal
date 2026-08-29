export type ToolEntry = {
  slug: string;
  name: string;
  category: "Runtime" | "GUI" | "Server" | "Orchestrator" | "Framework";
  platforms: string[];
  bestFor: string;
  license: string;
  pros: string[];
  cons: string[];
  url: string;
  guideSlug?: string;
};

export const tools: ToolEntry[] = [
  {
    slug: "ollama",
    name: "Ollama",
    category: "Runtime",
    platforms: ["macOS", "Linux", "Windows"],
    bestFor: "The fastest way to get a local LLM running with one command.",
    license: "MIT",
    pros: [
      "One-line install, one-line model pulls",
      "Built-in OpenAI-compatible API on localhost:11434",
      "Active model library with 4,500+ tagged variants",
      "Handles GPU offloading automatically"
    ],
    cons: [
      "Less raw throughput than vLLM under heavy concurrent load",
      "Configuration is opinionated; advanced tuning means dropping into llama.cpp anyway"
    ],
    url: "https://ollama.com",
    guideSlug: "ollama"
  },
  {
    slug: "llama-cpp",
    name: "llama.cpp",
    category: "Runtime",
    platforms: ["macOS", "Linux", "Windows", "Android", "iOS"],
    bestFor: "Maximum control and the broadest hardware coverage in the open ecosystem.",
    license: "MIT",
    pros: [
      "Runs almost anywhere: CUDA, ROCm, Metal, Vulkan, CPU-only",
      "Tight GGUF quantization control",
      "Reference implementation behind most desktop LLM tools",
      "Aggressive performance work; often the speed champion on Apple Silicon"
    ],
    cons: [
      "Command-line first; the UX assumes you read READMEs",
      "Quantization options multiply quickly, easy to pick the wrong one"
    ],
    url: "https://github.com/ggml-org/llama.cpp",
    guideSlug: "llama-cpp"
  },
  {
    slug: "dwarfstar-ds4",
    name: "DwarfStar (ds4)",
    category: "Runtime",
    platforms: ["macOS", "Linux"],
    bestFor: "Running DeepSeek V4 Flash at usable speed on one 128 GB machine, and deliberately little else.",
    license: "MIT",
    pros: [
      "Asymmetric 2-bit quantization of the routed MoE experts only, which is what puts a 300B-class model inside 128 GB",
      "Metal, CUDA and ROCm backends, with benchmarks published per machine rather than as a single headline number",
      "On-disk KV cache, so a long session survives a restart",
      "SSD streaming when the model does not fit in RAM",
      "Pipeline and tensor parallelism across two machines"
    ],
    cons: [
      "Needs 96-128 GB of RAM for the Q2 build and 256 GB or more for Q4; below that it is not an option",
      "Runs one model family on purpose: DeepSeek V4 Flash and PRO, plus GLM 5.2",
      "The author calls it beta quality and the code changes fast",
      "Distributed inference fits larger models and speeds up prefill; it does not make decode faster"
    ],
    url: "https://github.com/antirez/ds4"
  },
  {
    slug: "lm-studio",
    name: "LM Studio",
    category: "GUI",
    platforms: ["macOS", "Linux", "Windows"],
    bestFor: "Browsing, comparing and chatting with local models in a desktop GUI.",
    license: "Proprietary (free for personal and most business use)",
    pros: [
      "Polished chat UI with side-by-side model comparison",
      "Built-in Hugging Face model browser",
      "Local OpenAI-compatible API server with one click",
      "Good for evaluation workflows before production deployment"
    ],
    cons: [
      "Closed source; the engine is llama.cpp but the shell is not",
      "Less scriptable than CLI-first tools"
    ],
    url: "https://lmstudio.ai",
    guideSlug: "lm-studio"
  },
  {
    slug: "vllm",
    name: "vLLM",
    category: "Server",
    platforms: ["Linux (CUDA, ROCm)"],
    bestFor: "Production-grade inference with concurrent users and high throughput targets.",
    license: "Apache 2.0",
    pros: [
      "PagedAttention for memory-efficient KV cache",
      "Continuous batching and speculative decoding",
      "An order of magnitude more throughput than Ollama under heavy concurrency",
      "OpenAI-compatible API"
    ],
    cons: [
      "GPU-only path; not aimed at single-user desktops",
      "Operational complexity is real; budget for tuning"
    ],
    url: "https://docs.vllm.ai"
  },
  {
    slug: "open-webui",
    name: "Open WebUI",
    category: "GUI",
    platforms: ["Web (Docker), self-hosted"],
    bestFor: "A multi-user web frontend that talks to Ollama or any OpenAI-compatible backend.",
    license: "MIT",
    pros: [
      "Multi-user with authentication and chat history",
      "Tool calling, RAG and prompt templates out of the box",
      "Drop-in replacement for the ChatGPT web UI inside your network"
    ],
    cons: [
      "Needs Docker or Python plus a separate inference backend",
      "Feature breadth means a steeper config surface"
    ],
    url: "https://github.com/open-webui/open-webui"
  },
  {
    slug: "localai",
    name: "LocalAI",
    category: "Server",
    platforms: ["Linux", "macOS", "Windows (Docker)"],
    bestFor: "A self-hosted drop-in for the OpenAI API, with multi-model support.",
    license: "MIT",
    pros: [
      "OpenAI API compatibility across chat, embeddings, images, audio",
      "Pluggable backends including llama.cpp, whisper.cpp, diffusers",
      "Designed for Docker and Kubernetes deployments"
    ],
    cons: [
      "Configuration sprawls quickly as you add modalities",
      "Performance depends heavily on the underlying backend you pick"
    ],
    url: "https://localai.io"
  },
  {
    slug: "jan",
    name: "Jan",
    category: "GUI",
    platforms: ["macOS", "Linux", "Windows"],
    bestFor: "An open source desktop alternative to LM Studio.",
    license: "AGPL-3.0",
    pros: [
      "Fully open source desktop client",
      "Local-first design, no required cloud account",
      "Plugin system for extensions"
    ],
    cons: [
      "Model catalog is smaller than LM Studio's",
      "Newer project; some rough edges on Windows"
    ],
    url: "https://jan.ai"
  },
  {
    slug: "gpt4all",
    name: "GPT4All",
    category: "GUI",
    platforms: ["macOS", "Linux", "Windows"],
    bestFor: "A friendly desktop client aimed at non-technical users.",
    license: "MIT",
    pros: [
      "Lowest barrier to entry of any desktop LLM client",
      "Local document chat (RAG) built in",
      "Cross-platform installers"
    ],
    cons: [
      "Less raw control than llama.cpp",
      "Performance depends on the bundled engine version"
    ],
    url: "https://gpt4all.io"
  },
  {
    slug: "text-generation-webui",
    name: "text-generation-webui",
    category: "GUI",
    platforms: ["Linux", "Windows", "macOS"],
    bestFor: "Power users who want every knob exposed.",
    license: "AGPL-3.0",
    pros: [
      "Supports multiple backends (Transformers, llama.cpp, ExLlamaV2)",
      "Detailed sampler controls",
      "Extension ecosystem for RAG, characters, voice"
    ],
    cons: [
      "Setup can be fiddly across CUDA versions",
      "UI density is intimidating for newcomers"
    ],
    url: "https://github.com/oobabooga/text-generation-webui"
  },
  {
    slug: "kubernetes-kubeflow",
    name: "Kubernetes + Kubeflow",
    category: "Orchestrator",
    platforms: ["Linux (any cluster)"],
    bestFor: "Operating inference at scale across a fleet of GPUs.",
    license: "Apache 2.0",
    pros: [
      "Mature operator pattern for batch and online inference",
      "Pairs well with vLLM and Triton",
      "Strong story for multi-tenant workloads"
    ],
    cons: [
      "Heavyweight; only worth it past a certain scale",
      "Ops cost is non-trivial"
    ],
    url: "https://www.kubeflow.org"
  },
  {
    slug: "huggingface-tgi",
    name: "Hugging Face Text Generation Inference",
    category: "Server",
    platforms: ["Linux (CUDA, ROCm)"],
    bestFor: "A production server that pairs naturally with Hugging Face Hub.",
    license: "Apache 2.0",
    pros: [
      "Tensor parallelism, continuous batching, quantization",
      "First-class integration with HF Hub models",
      "OpenAI-compatible endpoint"
    ],
    cons: [
      "Throughput sometimes lags behind vLLM on the same hardware",
      "Less community plugin work than vLLM"
    ],
    url: "https://github.com/huggingface/text-generation-inference"
  },
  {
    slug: "langchain",
    name: "LangChain",
    category: "Framework",
    platforms: ["Python", "JavaScript"],
    bestFor: "Wiring models, tools, retrieval and memory into application logic.",
    license: "MIT",
    pros: [
      "Large community and integrations catalog",
      "Useful patterns for agents, RAG, multi-step chains",
      "Pairs with most local runtimes via OpenAI-compatible APIs"
    ],
    cons: [
      "Surface area is huge and not always cohesive",
      "Abstraction overhead is sometimes more cost than value"
    ],
    url: "https://www.langchain.com"
  },
  {
    slug: "llamaindex",
    name: "LlamaIndex",
    category: "Framework",
    platforms: ["Python", "TypeScript"],
    bestFor: "Building retrieval pipelines and document-grounded chatbots.",
    license: "MIT",
    pros: [
      "Strong primitives for indexing and retrieval",
      "Many connectors to data sources",
      "Works against any OpenAI-compatible local endpoint"
    ],
    cons: [
      "Naming and module reshuffling has been frequent",
      "Some abstractions feel premature"
    ],
    url: "https://www.llamaindex.ai"
  }
];
