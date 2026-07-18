import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Strumenti per eseguire l'AI in locale",
  description:
    "Runtime, interfacce grafiche, server di inferenza e orchestratori per eseguire AI open source sul tuo hardware.",
  alternates: {
    canonical: "https://runlocal.blog/it/tools",
    languages: {
      en: "https://runlocal.blog/tools",
      it: "https://runlocal.blog/it/tools"
    }
  }
};

const categories = ["Runtime", "GUI", "Server", "Orchestrator", "Framework"] as const;
const catLabels: Record<string, string> = {
  Runtime: "Runtime",
  GUI: "Interfacce grafiche",
  Server: "Server",
  Orchestrator: "Orchestratori",
  Framework: "Framework"
};

export default function ToolsPageIt() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Catalogo strumenti
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Il software che ti serve per eseguire davvero un modello AI.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Un modello è solo un file. Per usarlo serve un software che carichi
          quel file e ti permetta di parlarci. Gli strumenti qui sotto
          coprono tutto: dalle app di chat a un click per principianti ai
          server industriali per team. Scegli per categoria: un Runtime è il
          motore, una GUI è l&apos;app amichevole sopra, un Server serve per
          condividerlo con più utenti. Le schede sono in inglese (dati del
          catalogo). Se stai iniziando,{" "}
          <Link href="/it/guides/ollama" className="text-brand-dark dark:text-brand-light hover:underline">
            Ollama
          </Link>{" "}
          è la porta d&apos;ingresso più semplice.
        </p>
      </header>

      {categories.map((cat) => {
        const list = tools.filter((t) => t.category === cat);
        if (list.length === 0) return null;
        return (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span>{catLabels[cat]}</span>
              <span className="text-xs text-slate-500 font-normal">
                {list.length} {list.length > 1 ? "voci" : "voce"}
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {list.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
