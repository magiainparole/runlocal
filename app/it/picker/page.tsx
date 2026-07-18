import type { Metadata } from "next";
import PickerForm from "@/components/PickerForm";

export const metadata: Metadata = {
  title: "Quale modello AI può eseguire davvero il tuo computer?",
  description:
    "Selettore interattivo: dicci GPU, memoria e caso d'uso, e ti suggeriamo i modelli open weight che gireranno bene sulla tua macchina, con i comandi di installazione pronti.",
  alternates: {
    canonical: "https://runlocal.blog/it/picker",
    languages: {
      en: "https://runlocal.blog/picker",
      it: "https://runlocal.blog/it/picker"
    }
  }
};

export default function PickerPageIt() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Picker · Selettore consapevole dell&apos;hardware
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Quale modello AI può eseguire davvero il tuo computer?
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Modelli AI diversi richiedono quantità diverse di memoria. Un
          modello piccolo sta su un telefono, uno di classe frontier richiede
          una workstation. Dicci che hardware hai e cosa vuoi farci, e lo
          strumento ti suggerirà le opzioni migliori che gireranno davvero
          sulla tua macchina. Il form si aggiorna mentre digiti. Nulla viene
          inviato a un server.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Nota: le etichette del form e i risultati sono al momento in
          inglese. La logica e i comandi funzionano identici.
        </p>
        <details className="mt-4 max-w-3xl text-sm">
          <summary className="cursor-pointer text-brand-dark dark:text-brand-light font-medium">
            Come trovo le mie specifiche?
          </summary>
          <div className="mt-3 rounded-md border border-slate-200 dark:border-slate-800 p-4 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>Su Mac:</strong> menu Apple → Informazioni su questo
              Mac. Il numero accanto a &quot;Memoria&quot; è la tua memoria
              unificata. Nel form scegli &quot;Apple Silicon&quot;.
            </p>
            <p>
              <strong>Su Windows con GPU NVIDIA:</strong> apri Gestione
              attività → Prestazioni → GPU. Il numero accanto a
              &quot;Memoria GPU dedicata&quot; è la tua VRAM. Nel form scegli
              &quot;NVIDIA GPU&quot;.
            </p>
            <p>
              <strong>Su Windows o Linux senza GPU dedicata:</strong> scegli
              &quot;CPU only&quot; e inserisci la RAM di sistema. L&apos;AI
              girerà lentamente, ma girerà.
            </p>
          </div>
        </details>
      </header>

      <PickerForm />

      <section className="mt-16 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold mb-3">Come decide lo strumento</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-3">
          Ogni modello del catalogo è associato a stime di memoria realistiche
          per quantizzazione (Q4_K_M, Q5_K_M, Q8_0) a un contesto moderato di
          8k token. Il selettore calcola la tua memoria utilizzabile
          sottraendo un piccolo overhead di sistema, poi richiede che il
          modello scelto ci stia con un margine di sicurezza del 15%. Tutto
          ciò che non ci sta finisce nella lista degli esclusi sotto i
          risultati, con la ragione scritta per esteso. La classifica che
          segue pesa soprattutto l&apos;adeguatezza al caso d&apos;uso, poi la
          qualità della quantizzazione scelta, poi la freschezza del rilascio.
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          Le stime di memoria sono arrotondate per chiarezza. L&apos;uso reale
          dipende dalla lunghezza del contesto e dal motore di inferenza che
          usi. Se un modello è al limite, provalo prima con un contesto più
          corto.
        </p>
      </section>
    </div>
  );
}
