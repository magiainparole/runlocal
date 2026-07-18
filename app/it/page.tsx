import type { Metadata } from "next";
import Link from "next/link";
import ModelCard from "@/components/ModelCard";
import ToolCard from "@/components/ToolCard";
import TrendingSection from "@/components/TrendingSection";
import { models } from "@/lib/models";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "RunLocal — AI locale: esegui modelli open source sul tuo computer",
  description:
    "L'AI locale spiegata semplice. RunLocal ti aiuta a scegliere il modello open source giusto per il tuo hardware, installare software gratuito come Ollama o LM Studio, e partire in dieci minuti. Nessuna competenza richiesta.",
  alternates: {
    canonical: "https://runlocal.blog/it",
    languages: {
      en: "https://runlocal.blog/",
      it: "https://runlocal.blog/it"
    }
  }
};

export default function HomeIt() {
  const featuredModels = models.slice(0, 4);
  const featuredTools = tools.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-4">
            Hardware-aware · Open source · Aggiornato ogni settimana
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-4xl">
            AI locale: esegui modelli open source sul tuo computer.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-brand-dark dark:text-brand-light font-medium">
            L&apos;hub per gli LLM locali: guide di installazione e un selettore
            hardware.
          </p>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Puoi eseguire modelli AI come quelli dietro ChatGPT o Claude
            direttamente sul tuo portatile o desktop, senza inviare i tuoi
            dati da nessuna parte. RunLocal ti mostra quale modello open
            source scegliere per il tuo hardware, quale software gratuito
            installare (Ollama, LM Studio, llama.cpp), e come partire in
            circa dieci minuti. Nessuna conoscenza pregressa richiesta.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/it/picker"
              className="inline-flex items-center gap-2 rounded-md bg-ink text-white dark:bg-brand-light dark:text-ink px-4 py-2 font-medium hover:bg-brand-dark dark:hover:bg-brand transition"
            >
              Trova un modello per il tuo hardware →
            </Link>
            <Link
              href="/it/guides/ollama"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium hover:border-brand transition"
            >
              Esegui il tuo primo modello
            </Link>
            <Link
              href="/it/models"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium hover:border-brand transition"
            >
              Sfoglia la directory
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </section>

      {/* Modelli in evidenza */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Modelli che meritano il tuo disco</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Una lista corta e con opinioni. Catalogo completo nella
              directory. Le schede sono in inglese.
            </p>
          </div>
          <Link
            href="/it/models"
            className="text-sm text-brand-dark dark:text-brand-light hover:underline"
          >
            Tutti i modelli →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {featuredModels.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <TrendingSection
        limit={8}
        heading="In tendenza su Hugging Face"
        blurb="Selezione automatica dall'Hugging Face Hub: un mix pesato di download, likes e freschezza. Si aggiorna ogni lunedì. Il badge di licenza è un'indicazione visiva, non un parere legale."
      />

      {/* Strumenti */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Gli strumenti che li fanno girare</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Runtime, interfacce grafiche e server di inferenza, con i loro
              veri compromessi.
            </p>
          </div>
          <Link
            href="/it/tools"
            className="text-sm text-brand-dark dark:text-brand-light hover:underline"
          >
            Tutti gli strumenti →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {featuredTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Perché locale */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-brand/10 via-transparent to-transparent border border-brand/30 p-8 sm:p-10">
          <h2 className="text-2xl font-bold mb-2">
            Perché prendersi il disturbo di eseguire l&apos;AI in locale?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-3xl">
            I grandi servizi cloud sono più facili per iniziare. Ma ci sono
            ragioni concrete per fare da soli. Eccone tre.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold mb-2">I tuoi dati restano tuoi</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Quello che scrivi e quello che il modello risponde non lascia
                mai il tuo computer. Utile quando lavori con appunti
                personali, documenti di clienti, codice interno, o qualsiasi
                cosa che non incolleresti in un sito pubblico.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Funziona anche quando il cloud non funziona
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                Il file del modello vive sul tuo disco. Se l&apos;azienda che
                lo ha creato chiude, alza i prezzi o cambia i termini, il tuo
                setup continua a funzionare. Il modello che scarichi oggi
                girerà ancora nel 2030, se il tuo computer lo farà.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Nessuna bolletta a sorpresa</h3>
              <p className="text-slate-700 dark:text-slate-300">
                L&apos;AI in cloud si paga a consumo. L&apos;AI locale costa il
                prezzo del tuo computer, più l&apos;elettricità. Dopo il primo
                mese, il costo marginale di una domanda in più è praticamente
                zero.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
