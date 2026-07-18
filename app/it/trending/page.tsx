import type { Metadata } from "next";
import Link from "next/link";
import TrendingSection from "@/components/TrendingSection";

export const metadata: Metadata = {
  title: "Modelli open in tendenza su Hugging Face — snapshot settimanale",
  description:
    "Cosa sta scaricando davvero la community open source questa settimana. Classifica dall'Hugging Face Hub, aggiornata automaticamente ogni lunedì.",
  alternates: {
    canonical: "https://runlocal.blog/it/trending",
    languages: {
      en: "https://runlocal.blog/trending",
      it: "https://runlocal.blog/it/trending"
    }
  }
};

export default function TrendingPageIt() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-4">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Tendenze · Aggiornamento automatico settimanale
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Cosa sta scaricando davvero la community questa settimana.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Uno snapshot ordinato dall&apos;Hugging Face Hub, con punteggio
          basato su un mix pesato di download (40%), likes della community
          (40%) e freschezza (20%). Forma diversa dalla nostra{" "}
          <Link href="/it/models" className="text-brand-dark dark:text-brand-light hover:underline">
            directory curata
          </Link>
          : qui ci sono i rilasci con cui la gente sta interagendo adesso, non
          le scelte dell&apos;editore. Lo snapshot si aggiorna automaticamente
          ogni lunedì via GitHub Action, e ogni snapshot settimanale resta
          conservato nella cronologia git del sito.
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          I badge di licenza sono un&apos;indicazione visiva rapida, non un
          parere legale. Ogni tanto in classifica compaiono fine-tune
          personali accanto ai rilasci ufficiali: il nome dell&apos;autore ti
          dice quale è quale.
        </p>
      </header>

      <TrendingSection limit={16} heading="La top 16 di questa settimana" blurb="" />

      <aside className="mt-10 rounded-xl border border-slate-200 dark:border-slate-800 p-5 text-sm leading-relaxed">
        <h2 className="font-semibold mb-2">Come funziona la classifica</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Preleviamo i migliori modelli text-generation dall&apos;API di
          Hugging Face, filtriamo le voci a basso segnale, poi assegniamo a
          ciascun modello un punteggio su scala logaritmica normalizzata sul
          gruppo: download e likes pesano il 40% ciascuno, e un bonus di
          freschezza (fino al 20%) premia i modelli aggiornati negli ultimi
          sei mesi. Il codice di scoring è open source nel repository del
          sito. Se pensi che i pesi siano sbagliati, apri una issue: la
          formula è già cambiata in passato e cambierà ancora.
        </p>
      </aside>
    </div>
  );
}
