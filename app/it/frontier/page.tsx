import type { Metadata } from "next";
import Link from "next/link";
import { frontierModels } from "@/lib/frontier-models";

export const metadata: Metadata = {
  title: "Frontier open weights — i giganti che (probabilmente) non puoi eseguire a casa",
  description:
    "I più grandi modelli AI open weight: Kimi K3, GLM-5.2, Llama 4 Maverick, DeepSeek V4 Pro. Cosa serve davvero per eseguirli e le alternative realistiche.",
  alternates: {
    canonical: "https://runlocal.blog/it/frontier",
    languages: {
      en: "https://runlocal.blog/frontier",
      it: "https://runlocal.blog/it/frontier"
    }
  }
};

// Traduzioni italiane dei campi editoriali, per slug. I dati tecnici
// (dimensioni, contesto, licenza) restano condivisi con la versione EN.
const it: Record<
  string,
  { headline: string; hardwareReality: string; accessInstead: string; littleSibling?: string }
> = {
  "kimi-k3": {
    headline:
      "Il più grande modello open weight mai rilasciato. Quarto assoluto fra tutti i modelli frontier nei test indipendenti, davanti a diversi flagship chiusi, e primo nella Frontend Code Arena.",
    hardwareReality:
      "Anche con quantizzazione aggressiva a 4 bit, i soli pesi superano 1,4 TB. Eseguirlo significa un cluster multi-nodo di GPU — 16+ GPU datacenter con interconnessione veloce. Non è un progetto da homelab; è infrastruttura.",
    accessInstead:
      "L'API di Moonshot a 3$ per milione di token in input e 15$ in output. Noleggio GPU cloud per carichi batch. Diversi provider di inferenza lo ospiteranno appena i pesi saranno pubblici.",
    littleSibling:
      "Kimi K2.7 Code (giugno 2026) — il fratello agentic-coding, che quantizzato gira su una workstation da 96 GB+."
  },
  "glm-5-2": {
    headline:
      "L'attuale #1 fra gli open weight sull'Artificial Analysis Intelligence Index. Batte GPT-5.5 su diversi benchmark di coding long-horizon a circa un sesto del prezzo — con licenza MIT.",
    hardwareReality:
      "Circa 370–400 GB a 4 bit. Tecnicamente alla portata di un cluster di Mac Studio al massimo o di un nodo 4× H100, ma ben oltre le singole GPU consumer. Preventiva cinque cifre per hardware che lo esegua in modo accettabile.",
    accessInstead:
      "L'API di Z.ai ha prezzi aggressivi. Quasi tutti i provider di inferenza (Together, Fireworks, DeepInfra) lo ospitano. La licenza MIT significa che chiunque può servirlo, il che tiene i prezzi competitivi.",
    littleSibling:
      "GLM-4.7-Flash — la variante distillata veloce che gira su una GPU da 24 GB e resta nella nostra classifica trending."
  },
  "llama-4-maverick": {
    headline:
      "L'open weight frontier di Meta. Il design MoE significa velocità di inferenza paragonabile a un 17B denso — se riesci a far entrare i pesi completi in memoria.",
    hardwareReality:
      "Circa 200–230 GB a 4 bit. Una workstation 4× A6000 o un cluster Mac a 256 GB di memoria unificata ci arriva; una singola GPU consumer no. Il trucco dei parametri attivi aiuta la velocità, non la memoria.",
    accessInstead:
      "Ospitato da ogni grande provider di inferenza. L'API di Meta su llama.com. Spesso l'opzione frontier più economica per token, perché troppi provider ci competono sopra.",
    littleSibling:
      "Llama 4 Scout — stessa famiglia, 109B totali, gira (a fatica) su una workstation da 96 GB ed è nel nostro picker."
  },
  "deepseek-v4-pro": {
    headline:
      "Il modello che domina la nostra classifica trending dal lancio: migliori punteggi open weight su SWE-Bench Verified e GPQA Diamond, licenza MIT, e la raccomandazione di default per lavoro serio su codice e matematica.",
    hardwareReality:
      "Il MoE completo richiede diverse centinaia di gigabyte di memoria su più GPU. Esistono build community a 4 bit, ma siamo comunque in territorio cluster-workstation, non desktop.",
    accessInstead:
      "L'API di DeepSeek è notoriamente economica. La licenza MIT significa hosting di terze parti abbondante e prezzi in continua discesa.",
    littleSibling:
      "DeepSeek V4 Flash — la variante distillata. Quantizzata gira su workstation ad alta memoria, e tiene il secondo posto nella nostra classifica trending."
  }
};

const labels = {
  size: "Dimensione",
  context: "Contesto",
  hardware: "Cosa serve davvero per eseguirlo da soli",
  access: "Accesso realistico",
  sibling: "Fratello minore eseguibile",
  released: "Rilasciato",
  site: "Sito ufficiale →"
};

export default function FrontierPageIt() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Frontier open weights
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          I giganti: modelli open che (probabilmente) non puoi eseguire a casa.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Alcuni dei modelli open weight più importanti sono semplicemente
          troppo grandi per l&apos;hardware consumer. Contano comunque:
          fissano il tetto dei benchmark, le loro licenze modellano
          l&apos;ecosistema, e i loro fratelli distillati sono spesso i
          migliori modelli che <em>puoi</em> eseguire. Ecco cosa servirebbe
          davvero per ciascuno — e il modo realistico di usarlo comunque.
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Cerchi qualcosa che giri sulla tua macchina? Prova il{" "}
          <Link href="/it/picker" className="text-brand-dark dark:text-brand-light hover:underline">
            picker hardware
          </Link>{" "}
          o sfoglia la{" "}
          <Link href="/it/models" className="text-brand-dark dark:text-brand-light hover:underline">
            directory curata
          </Link>
          .
        </p>
      </header>

      <div className="space-y-5">
        {frontierModels.map((m) => {
          const t = it[m.slug];
          return (
            <article
              key={m.slug}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{m.name}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {m.author} · {m.origin} · {labels.released} {m.released}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs rounded-full px-3 py-1 ${
                    m.licenseTier === "permissive"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                  }`}
                >
                  {m.license}
                </span>
              </div>

              <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                {t?.headline ?? m.headline}
              </p>

              <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    {labels.size}
                  </dt>
                  <dd className="font-medium">{m.totalParams}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    {labels.context}
                  </dt>
                  <dd className="font-medium">{m.contextWindow}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    {labels.hardware}
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t?.hardwareReality ?? m.hardwareReality}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    {labels.access}
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t?.accessInstead ?? m.accessInstead}
                  </dd>
                </div>
                {(t?.littleSibling ?? m.littleSibling) && (
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                      {labels.sibling}
                    </dt>
                    <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {t?.littleSibling ?? m.littleSibling}
                    </dd>
                  </div>
                )}
              </dl>

              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-brand-dark dark:text-brand-light hover:underline"
              >
                {labels.site}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
