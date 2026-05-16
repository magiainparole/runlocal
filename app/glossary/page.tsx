import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — local AI in plain English",
  description:
    "Definitions of the terms you keep seeing in local AI discussions: open weight, quantization, VRAM, context window, tokens, inference, and the rest."
};

type Term = {
  term: string;
  short: string;
  long: string;
};

const terms: Term[] = [
  {
    term: "LLM (Large Language Model)",
    short: "The kind of AI behind ChatGPT, Claude, and the models on this site.",
    long: "A neural network trained on huge amounts of text to predict the next word in a sentence. When you chat with one, you are watching that prediction happen many times in a row, fast."
  },
  {
    term: "Open weight",
    short: "A model whose internal numbers are public, so you can download and run it yourself.",
    long: "When a model is 'open weight', the company that trained it has published the file containing the model's parameters. You can download that file, run the model on your computer, and inspect or modify it. Open weight is not the same as 'open source': the training code and data may still be private. The licence on the weights also varies, from very permissive (MIT, Apache 2.0) to restrictive (some commercial uses forbidden)."
  },
  {
    term: "Open source",
    short: "Stricter than open weight: code, data, and training process are also public.",
    long: "An OSI-approved open source licence covers the source code or, in the AI case, also the training data, the training code and the intermediate checkpoints. Very few LLMs qualify under this strict definition. OLMo from the Allen Institute and EuroLLM are two examples."
  },
  {
    term: "Inference",
    short: "Running a trained model to get an answer to a prompt.",
    long: "Training a model is the expensive part: it can cost millions of dollars and take weeks. Inference is the cheap part: you give the trained model a prompt and it produces a response. This site is entirely about inference. Training is a different sport."
  },
  {
    term: "Tokens",
    short: "The pieces a model breaks text into. Roughly one token per 3–4 characters of English.",
    long: "Models do not read words exactly as you do. They split text into 'tokens', which are usually a few characters each. 'Hello' might be one token, 'tokenization' might be three. The number of tokens matters because it sets the size of the model's context window and how much memory inference uses."
  },
  {
    term: "Context window",
    short: "How much text the model can keep in mind at once, measured in tokens.",
    long: "A context window of 8.000 tokens roughly equals 6.000 English words: a long article. 128.000 tokens is closer to a short book. 1 million tokens is the entire Lord of the Rings trilogy. The larger the window, the more memory and time the model needs to process it."
  },
  {
    term: "Quantization",
    short: "Compressing the model so it takes less memory, at a small quality cost.",
    long: "A model is a long list of numbers. Each number takes 16 or 32 bits when the model is first trained. Quantization rewrites those numbers using fewer bits (4, 5, or 8 is common) so the model file shrinks. The trade-off is precision: a 4-bit version uses about a quarter of the memory of a 16-bit one, with a small but measurable quality loss. For most users, a 4-bit or 5-bit quantization is the sweet spot."
  },
  {
    term: "GGUF",
    short: "The file format used by llama.cpp and most desktop LLM tools.",
    long: "GGUF is the binary container that holds a quantized model plus the metadata needed to load it. When you download a 'GGUF model' from Hugging Face, you are downloading one file per quantization variant. The format works on macOS, Windows, Linux, Android, and iOS, which is why it has become the default for local AI."
  },
  {
    term: "VRAM",
    short: "Memory that lives on a graphics card. Faster than system RAM, but limited.",
    long: "Discrete GPUs (NVIDIA, AMD, Intel Arc) have their own dedicated memory called VRAM. An RTX 4090 has 24 GB, an A100 has 80 GB. For inference, the model needs to fit in VRAM to run at full speed; spilling to system RAM is dramatically slower."
  },
  {
    term: "Unified memory",
    short: "Apple Silicon's shared memory pool, used by CPU and GPU together.",
    long: "On Apple Silicon Macs (M1, M2, M3, M4 chips), the CPU and GPU share one pool of memory called unified memory. This means a Mac with 32 GB of unified memory can use that full amount for inference, with no copying between CPU and GPU. The benefit is large memory headroom for the price; the cost is lower peak speed compared to dedicated NVIDIA cards."
  },
  {
    term: "KV cache",
    short: "Extra memory the model uses while generating each new token.",
    long: "Short for 'key-value cache'. While the model produces tokens one at a time, it caches intermediate results so each new token does not require re-reading the entire context. The KV cache grows with the context length, so a model that fits in memory at 4.000 tokens might overflow at 32.000."
  },
  {
    term: "GPU offload (layers)",
    short: "Telling the inference engine how much of the model to put on the GPU.",
    long: "When a model is too big to fit fully in VRAM, you can split it: some layers run on the GPU, the rest on the CPU. This is configurable in llama.cpp and Ollama via a 'GPU layers' setting. Pure GPU is fastest; mixed is slower but lets you run bigger models than your VRAM technically allows."
  },
  {
    term: "Ollama",
    short: "The easiest way to run a local model. One install, one command.",
    long: "Ollama is a desktop application that handles downloading, configuring and serving local LLMs. After installing it, you run something like 'ollama run llama3.1:8b' and start chatting. Under the hood it uses llama.cpp; the value Ollama adds is convenience and an OpenAI-compatible API for tools to plug into."
  },
  {
    term: "llama.cpp",
    short: "The engine under most local LLM tools. C++ code that runs models efficiently.",
    long: "llama.cpp is an open source C and C++ implementation that runs LLMs on consumer hardware. It supports CUDA (NVIDIA), Metal (Apple), ROCm (AMD), Vulkan (cross-vendor), and pure CPU. Most desktop LLM tools, including Ollama, LM Studio and GPT4All, use llama.cpp internally. Building it from source is for users who want maximum control."
  },
  {
    term: "vLLM",
    short: "A production-grade inference server for serving many users at once.",
    long: "vLLM is built for the case where multiple people send requests to the same model at the same time. It uses tricks like 'PagedAttention' and 'continuous batching' to keep throughput high under concurrent load. Overkill for personal use; the right answer for a team-shared inference box."
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    short: "A pattern where the model is given relevant documents to read before answering.",
    long: "Plain language: instead of asking the model what it remembers, you first search a document collection for the relevant pieces, then hand those pieces to the model along with the question. RAG is how 'chat with your documents' tools work. Tools like LangChain and LlamaIndex are frameworks for building RAG pipelines."
  },
  {
    term: "MoE (Mixture of Experts)",
    short: "A model architecture where only part of the parameters run for each request.",
    long: "Traditional 'dense' models run every parameter for every token. MoE models split themselves into 'experts' and only route each token through a few of them. The result is that a 100B-parameter MoE model can run at the speed of a 20B dense one, while keeping the quality of the larger size. Llama 4 Scout and DeepSeek V4 are well-known MoE models."
  },
  {
    term: "Parameters / 'B'",
    short: "How big the model is. 7B = 7 billion parameters.",
    long: "Parameters are the individual numbers inside the neural network. 'Bigger' usually means smarter but slower and hungrier for memory. A 7B model is small and fast; a 70B is big and capable; a 400B is frontier-tier and demands datacenter hardware. Memory roughly scales linearly with parameter count at a given quantization level."
  },
  {
    term: "Instruct / Chat / Coder variants",
    short: "Same base model, fine-tuned for different jobs.",
    long: "A 'base' model is just trained to complete text. An 'instruct' or 'chat' variant has been further trained to follow instructions and behave conversationally. A 'coder' variant has been trained on code. When in doubt, pick the instruct variant; the base model is mostly useful for research."
  },
  {
    term: "Hugging Face",
    short: "The main public registry of open models and datasets.",
    long: "Hugging Face is to AI models what GitHub is to source code. Most open weight models, GGUF builds and datasets live there. The site has its own search and a community 'likes' system. The Trending section on this site pulls from Hugging Face's public API."
  },
  {
    term: "OpenAI-compatible API",
    short: "A standard interface that most local tools speak.",
    long: "OpenAI defined the original API for chatting with an LLM (endpoint /v1/chat/completions and a known JSON shape). Most local tools — Ollama, llama-server, vLLM, LM Studio — expose the same interface on a different URL. The practical benefit is that almost any AI client written for OpenAI works against a local model with two lines changed."
  },
  {
    term: "License tier (on this site)",
    short: "A quick visual hint about how freely you can use a model.",
    long: "On the model cards we colour-code the licence: green for 'permissive' (MIT, Apache 2.0, BSD — deploy anywhere), amber for 'open weight' (custom licences like Llama Community, Gemma Terms — usable but with restrictions), red for 'non-commercial' (research only). The colour is a shortcut; before deploying anything commercially, read the actual licence text."
  }
];

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Glossary
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Local AI terms, explained in plain English.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Every page on this site links here when it uses a technical term
          for the first time. Read top to bottom for a guided tour, or scroll
          to the one you need. No prior knowledge assumed.
        </p>
      </header>

      <div className="space-y-8">
        {terms.map((t) => (
          <article
            key={t.term}
            id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
            className="border-b border-slate-200 dark:border-slate-800 pb-7 last:border-b-0"
          >
            <h2 className="text-xl font-semibold tracking-tight">{t.term}</h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300 italic">
              {t.short}
            </p>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.long}
            </p>
          </article>
        ))}
      </div>

      <aside className="mt-12 rounded-xl bg-brand/5 border border-brand/30 p-5 text-sm leading-relaxed">
        <p className="text-slate-700 dark:text-slate-300">
          Did we miss a term you keep seeing and not finding here? The site
          source is on GitHub: open an issue with the word and we will add
          it.
        </p>
      </aside>
    </div>
  );
}
