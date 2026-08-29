import type { PostMeta } from "./posts";

// Italian counterparts of lib/posts.ts. Same slugs, same dates/readingTime/tags
// as the English source — only title and subtitle are localized, matching the
// metadata already set in each app/it/blog/<slug>/page.tsx.
export const postsIt: PostMeta[] = [
  {
    slug: "dwarfstar-ds4-one-model-inference-engine",
    title: "DwarfStar, e la tesi di un motore che esegue un modello solo",
    subtitle:
      "L’autore di Redis ha scritto in C un motore di inferenza che esegue sostanzialmente un modello solo, e fa cose che i runtime generalisti non fanno. Cosa azzecca ds4, e quanto costa in hardware.",
    date: "2026-08-27",
    readingTime: "10 min",
    tags: ["Strumenti", "Inferenza", "Quantizzazione"]
  },
  {
    slug: "qwen-3-8-27b-the-release-that-landed",
    title: "Qwen 3.8 27B è il rilascio che è davvero atterrato",
    subtitle:
      "Alibaba ha pubblicato due modelli della stessa generazione questo mese. Uno ha quattro milioni di download, l’altro ventisettemila. La differenza non è la capacità.",
    date: "2026-08-21",
    readingTime: "9 min",
    tags: ["Qwen", "Licenze", "Analisi"]
  },
  {
    slug: "ornith-1-0-35b-question",
    title: "3,5 milioni di download, quasi nessuna traccia: la domanda su Ornith-1.0-35B",
    subtitle:
      "Un modello da 35B con licenza MIT, di un account che non conoscevamo, ha appena superato in download quasi tutto il resto della lista trending di Hugging Face, tranne i giganti evergreen. Cosa abbiamo controllato, cosa non siamo riusciti a verificare, e perché non è ancora nella directory.",
    date: "2026-08-20",
    readingTime: "8 min",
    tags: ["Verifica", "Directory", "Trending"]
  },
  {
    slug: "deepseek-v4-flash-0731-checkpoint-refresh",
    title: "DeepSeek V4 Flash-0731, e il caso dei checkpoint datati",
    subtitle:
      "Un aggiornamento silenzioso a metà ciclo è appena diventato il modello più scaricato sull'Hub. Cosa significa un checkpoint datato se già usi il modello che sostituisce.",
    date: "2026-08-06",
    readingTime: "8 min",
    tags: ["DeepSeek", "Trending", "Analisi"]
  },
  {
    slug: "kimi-k3-what-open-means-now",
    title: "Kimi K3 cambia la definizione di “open”",
    subtitle:
      "Un modello da 2.800 miliardi di parametri con pesi pubblici che quasi nessuno può eseguire. Cosa significa davvero il più grande open weight mai rilasciato per chi fa girare l'AI in locale.",
    date: "2026-07-18",
    readingTime: "9 min",
    tags: ["Frontier", "Kimi K3", "Analisi"]
  },
  {
    slug: "gguf-quantization-explained",
    title: "Scegliere una quantizzazione GGUF senza raccontarsela",
    subtitle:
      "Q4, Q5, Q8 e il resto dello zoo GGUF, con una regola di decisione pratica che regge su tutte le classi di hardware.",
    date: "2026-05-15",
    readingTime: "10 min",
    tags: ["Quantizzazione", "llama.cpp", "Guida"]
  },
  {
    slug: "apple-silicon-vs-nvidia-local-llm",
    title: "Apple Silicon o NVIDIA per gli LLM locali nel 2026",
    subtitle:
      "Memoria unificata, VRAM pura e i carichi di lavoro in cui vince ciascuna piattaforma. Un confronto pratico che va oltre gli spezzoni di benchmark.",
    date: "2026-05-14",
    readingTime: "12 min",
    tags: ["Hardware", "Confronto", "Apple Silicon"]
  },
  {
    slug: "opensuse-for-ai-workloads",
    title: "Perché openSUSE è un'opzione seria per eseguire l'AI in locale",
    subtitle:
      "Rolling release, varianti immutabili e una linea onesta tra Linux comunitario ed enterprise a pagamento. Uno sguardo pratico a quando openSUSE si guadagna un posto nello stack AI.",
    date: "2026-05-13",
    readingTime: "9 min",
    tags: ["openSUSE", "Linux", "Infrastruttura"]
  },
  {
    slug: "open-weights-state-of-play-2026",
    title: "Lo stato dei pesi aperti a maggio 2026",
    subtitle:
      "Cinque rilasci di classe frontier negli ultimi trenta giorni, tre dei quali da laboratori cinesi. Un breve giro d'orizzonte su dove si trova davvero il campo.",
    date: "2026-05-12",
    readingTime: "9 min",
    tags: ["Modelli", "Ecosistema", "Analisi"]
  },
  {
    slug: "ollama-vs-llama-cpp-vs-vllm",
    title: "Quale motore di inferenza locale dovresti usare davvero",
    subtitle:
      "Ollama, llama.cpp, LM Studio e vLLM risolvono problemi diversi. Una mappa pratica di quando usare cosa, e perché conta più dei numeri dei benchmark.",
    date: "2026-05-05",
    readingTime: "11 min",
    tags: ["Strumenti", "Inferenza", "Guida"]
  }
];
