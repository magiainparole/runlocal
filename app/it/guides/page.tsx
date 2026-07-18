import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guide di installazione per l'AI locale",
  description:
    "Guide passo-passo per installare ed eseguire strumenti AI open source su macOS, Linux e Windows.",
  alternates: {
    canonical: "https://runlocal.blog/it/guides",
    languages: {
      en: "https://runlocal.blog/guides",
      it: "https://runlocal.blog/it/guides"
    }
  }
};

const itMeta: Record<string, { title: string; excerpt: string }> = {
  ollama: {
    title: "Installa Ollama ed esegui il tuo primo modello locale",
    excerpt:
      "Da zero a un LLM locale funzionante in circa dieci minuti, con i comandi che contano davvero e gli inciampi di cui nessuno ti avverte."
  },
  "llama-cpp": {
    title: "Compila ed esegui llama.cpp dai sorgenti",
    excerpt:
      "Come compilare llama.cpp con il backend giusto per il tuo hardware, scegliere una quantizzazione GGUF che stia nella tua RAM, e servire un endpoint compatibile OpenAI."
  },
  "lm-studio": {
    title: "Configurare LM Studio e confrontare modelli fianco a fianco",
    excerpt:
      "Una guida pratica per usare LM Studio per scaricare, confrontare e servire modelli locali, più i casi in cui LM Studio è lo strumento sbagliato."
  }
};

export default function GuidesIndexIt() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Guide di installazione
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Guide passo-passo per far girare l&apos;AI sulla tua macchina.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Scegli la guida che corrisponde a come ti piace lavorare. Se non hai
          mai installato software AI, parti da Ollama: è il percorso più
          liscio. Se vuoi un&apos;interfaccia grafica di chat, parti da LM
          Studio. La guida llama.cpp è per chi ama la riga di comando e vuole
          il massimo controllo.
        </p>
      </header>

      <ul className="space-y-5">
        {guides.map((g) => {
          const t = itMeta[g.slug];
          return (
            <li
              key={g.slug}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-brand transition"
            >
              <Link href={`/it/guides/${g.slug}`} className="block">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{t?.title ?? g.title}</h2>
                    <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {t?.excerpt ?? g.excerpt}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs rounded-full bg-brand/10 text-brand-dark dark:text-brand-light px-3 py-1">
                    {g.level === "Beginner" ? "Base" : g.level === "Intermediate" ? "Intermedio" : "Avanzato"}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Aggiornata {g.updated}</span>
                  <span aria-hidden>·</span>
                  <span>{g.readingTime} di lettura</span>
                  <span aria-hidden>·</span>
                  <span>{g.os.join(", ")}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
