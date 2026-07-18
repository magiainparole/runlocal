import type { Metadata } from "next";
import Link from "next/link";
import ModelCard from "@/components/ModelCard";
import { models } from "@/lib/models";

export const metadata: Metadata = {
  title: "Directory dei modelli AI open source",
  description:
    "Modelli AI che puoi scaricare ed eseguire tu stesso: chi li fa, quanto sono grandi, con quale licenza e per cosa sono adatti.",
  alternates: {
    canonical: "https://runlocal.blog/it/models",
    languages: {
      en: "https://runlocal.blog/models",
      it: "https://runlocal.blog/it/models"
    }
  }
};

export default function ModelsPageIt() {
  const grouped = models.reduce<Record<string, typeof models>>((acc, m) => {
    (acc[m.origin] ||= []).push(m);
    return acc;
  }, {});

  const origins = Object.keys(grouped);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Directory dei modelli
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Modelli AI che puoi scaricare ed eseguire tu stesso.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Ogni scheda qui sotto è una famiglia di modelli AI scaricabile
          gratuitamente ed eseguibile sul tuo computer. La scheda ti dice chi
          lo produce, quanto è grande, con quale licenza arriva e in cosa è
          bravo. Le note delle schede restano in inglese (dati del catalogo).
          Se sei alle prime armi, il{" "}
          <Link href="/it/glossary" className="text-brand-dark dark:text-brand-light hover:underline">
            glossario
          </Link>{" "}
          definisce ogni termine, oppure prova il{" "}
          <Link href="/it/picker" className="text-brand-dark dark:text-brand-light hover:underline">
            picker
          </Link>{" "}
          per trovare quello adatto alla tua macchina.
        </p>
      </header>

      {origins.map((origin) => (
        <section key={origin} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span>{origin}</span>
            <span className="text-xs text-slate-500 font-normal">
              {grouped[origin].length} modell{grouped[origin].length > 1 ? "i" : "o"}
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {grouped[origin].map((m) => (
              <ModelCard key={m.slug} model={m} />
            ))}
          </div>
        </section>
      ))}

      <aside className="mt-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-1.5 text-amber-900 dark:text-amber-200">
          Una nota su &ldquo;open&rdquo;
        </p>
        <p className="text-amber-900/90 dark:text-amber-100/90">
          Molti modelli in questa lista sono open-weight ma non open-source
          nel senso OSI del termine. Le licenze vanno da MIT e Apache 2.0
          (davvero permissive) a documenti su misura che limitano l&apos;uso
          commerciale o il training di concorrenti. Prima di usare qualcosa
          commercialmente, leggi i termini veri.
        </p>
      </aside>

      {/* Cross-link */}
      <section className="mt-16 grid sm:grid-cols-2 gap-5">
        <Link
          href="/it/frontier"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-6 hover:border-brand transition block"
        >
          <p className="text-xs font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
            Frontier open weights
          </p>
          <h2 className="text-xl font-bold">
            I giganti che (probabilmente) non puoi eseguire a casa →
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Kimi K3, GLM-5.2, Llama 4 Maverick, DeepSeek V4 Pro: cosa serve
            davvero per eseguirli, e il fratello minore eseguibile di ogni
            famiglia.
          </p>
        </Link>
        <Link
          href="/it/trending"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-6 hover:border-brand transition block"
        >
          <p className="text-xs font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
            Tendenze · aggiornato ogni settimana
          </p>
          <h2 className="text-xl font-bold">
            Cosa sta scaricando la community questa settimana →
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            La top 16 live da Hugging Face, ordinata per download, likes e
            freschezza. Si aggiorna da sola ogni lunedì.
          </p>
        </Link>
      </section>
    </div>
  );
}
