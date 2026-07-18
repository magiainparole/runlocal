import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "openSUSE: distribuzioni gratuite e risorse per l'AI locale",
  description:
    "Una mappa pratica dei prodotti gratuiti del progetto openSUSE, della documentazione, delle risorse della community e del confine dove iniziano le offerte enterprise a pagamento di SUSE.",
  alternates: {
    canonical: "https://runlocal.blog/it/opensuse",
    languages: {
      en: "https://runlocal.blog/opensuse",
      it: "https://runlocal.blog/it/opensuse"
    }
  }
};

type Distro = {
  name: string;
  tagline: string;
  releaseModel: string;
  bestFor: string;
  url: string;
};

const distros: Distro[] = [
  {
    name: "openSUSE Leap",
    tagline: "La distribuzione stabile a rilasci puntuali.",
    releaseModel: "Una release maggiore all'anno, con aggiornamenti a lungo termine",
    bestFor:
      "Server, workstation e laboratori AI che preferiscono la prevedibilità ai pacchetti più recenti. Condivide l'eredità binaria con SUSE Linux Enterprise Server.",
    url: "https://www.opensuse.org/#Leap"
  },
  {
    name: "openSUSE Tumbleweed",
    tagline: "La rolling release per chi vuole tutto sempre aggiornato.",
    releaseModel: "Rolling, snapshot giornalieri, testati a fondo prima del rilascio",
    bestFor:
      "Macchine da sviluppo e sperimentazione AI all'avanguardia. Tumbleweed spesso riceve le nuove versioni di CUDA, ROCm e Python pochi giorni dopo l'uscita upstream.",
    url: "https://www.opensuse.org/#Tumbleweed"
  },
  {
    name: "openSUSE Slowroll",
    tagline: "Tumbleweed, a passo più calmo.",
    releaseModel: "Snapshot di Tumbleweed, rallentati in lotti circa mensili",
    bestFor:
      "Per chi ama le rolling release ma trova Tumbleweed troppo veloce per una workstation di produzione. Una via di mezzo tra Leap e Tumbleweed.",
    url: "https://en.opensuse.org/Portal:Slowroll"
  },
  {
    name: "openSUSE Leap Micro",
    tagline: "Host immutabile per container, costruito su Leap.",
    releaseModel: "Aggiornamenti atomici, rollback transazionale",
    bestFor:
      "Eseguire container, nodi Kubernetes o server di inferenza edge. Si abbina in modo naturale a K3s per cluster AI self-hosted.",
    url: "https://get.opensuse.org/leapmicro/"
  },
  {
    name: "openSUSE MicroOS",
    tagline: "Desktop e server immutabili, atomici per progettazione.",
    releaseModel: "Rolling, transazionale, rollback automatico in caso di errore",
    bestFor:
      "Per chi vuole i pacchetti di Tumbleweed con la sicurezza degli snapshot. Una buona base per una macchina dedicata all'inferenza AI.",
    url: "https://microos.opensuse.org/"
  },
  {
    name: "openSUSE Kalpa",
    tagline: "Desktop KDE immutabile, costruito su MicroOS.",
    releaseModel: "Rolling, atomico, Flatpak-first",
    bestFor:
      "Utenti desktop che vogliono un sistema che si aggiorna senza rompersi. Un'alternativa moderna alla classica installazione workstation di Tumbleweed.",
    url: "https://kalpa.opensuse.org/"
  }
];

export default function OpenSusePageIt() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          openSUSE · Gratuito e guidato dalla community
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          openSUSE: un Linux di community che gestisce i carichi AI con onestà.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          openSUSE è il lato community della famiglia SUSE. Offre distribuzioni
          completamente gratuite, documentazione pubblica, un servizio di build
          aperto e un forum accogliente. Per chi esegue AI in locale, openSUSE
          è una delle opzioni più pragmatiche su Linux: il ramo rolling
          Tumbleweed tiene aggiornati gli stack CUDA, ROCm e Python, le
          varianti immutabili come MicroOS e Leap Micro sono ottimi host per
          container, e le offerte enterprise di SUSE (a pagamento) convivono
          in modo pulito con il resto, senza costringerti a passare di livello.
        </p>
      </header>

      {/* Section 1: Distributions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Distribuzioni gratuite</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-3xl">
          Sei distribuzioni, tutte gratuite nel prezzo e libere nel codice.
          Scegli prima in base al modello di rilascio, poi in base al caso
          d'uso.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {distros.map((d) => (
            <article
              key={d.name}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-5 hover:border-brand transition"
            >
              <h3 className="text-lg font-semibold">{d.name}</h3>
              <p className="text-sm text-brand-dark dark:text-brand-light mt-0.5">
                {d.tagline}
              </p>
              <dl className="mt-3 text-sm space-y-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    Modello di rilascio
                  </dt>
                  <dd>{d.releaseModel}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    Ideale per
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {d.bestFor}
                  </dd>
                </div>
              </dl>
              <Link
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-brand-dark dark:text-brand-light hover:underline"
              >
                Scaricala da opensuse.org →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Documentation */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-3">Documentazione e guide</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-5">
          openSUSE mantiene la sua documentazione pubblica, aggiornata e
          tradotta. La maggior parte delle guide esiste in inglese, tedesco e
          italiano, con copertura parziale in un'altra dozzina di lingue. Il
          wiki è il punto d'ingresso principale; il manuale è quello che alla
          fine stampi e tieni sulla scrivania.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://doc.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              doc.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Il portale ufficiale della documentazione. Manuali per Leap e
              Tumbleweed, guide di amministrazione di sistema, riferimenti per
              AutoYaST e Salt. In formato PDF e HTML.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://en.opensuse.org/Portal:Documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              wiki.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Il wiki della community. Per gli how-to specifici qui si fa prima
              che sul manuale: driver GPU, configurazione di NVIDIA CUDA,
              virtualizzazione, configurazione di rete, casi limite della
              gestione dei pacchetti.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://en.opensuse.org/openSUSE:Documentation_team_wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              Team documentazione →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Come contribuire alla documentazione. Utile per chi vuole vedere
              un argomento specifico coperto meglio: il team accetta pull
              request direttamente.
            </p>
          </li>
        </ul>
      </section>

      {/* Section 3: Community */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-3">Community, forum e infrastruttura</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-5">
          openSUSE ha tre pilastri di infrastruttura di community, tutti
          gratuiti. Il forum è dove trova risposta la maggior parte delle
          domande a livello utente; l'Open Build Service è dove si compilano i
          pacchetti per ogni architettura supportata; il bug tracker è il
          posto dove segnalare i problemi veri, quelli che è utile rendere
          pubblici.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://forums.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              forums.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Forum della community attivo da molti anni. Uno storico
              consultabile di domande su installazione, compatibilità
              hardware, problemi di driver. Spesso più rapido di Stack
              Exchange per i problemi specifici di SUSE.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://build.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              build.opensuse.org (OBS) →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              L'Open Build Service. Infrastruttura pubblica per compilare
              pacchetti Linux per openSUSE, SLE, Fedora, Debian e altri a
              partire dagli stessi sorgenti. Gratuito per i progetti della
              community.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://bugzilla.opensuse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              bugzilla.opensuse.org →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Il bug tracker. Più rapido del previsto nel triage delle
              regressioni di Tumbleweed e dei problemi di packaging dello
              stack AI.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
            <Link
              href="https://www.suse.com/c/category/webinar/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-dark dark:hover:text-brand-light"
            >
              Webinar e webcast SUSE →
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Il lato commerciale del progetto organizza webinar gratuiti su
              Linux, Kubernetes, DevOps e deployment di AI. Alcuni hanno un
              sapore commerciale, ma quelli tecnici sono utili. Serve la
              registrazione, senza costi.
            </p>
          </li>
        </ul>
      </section>

      {/* Section 4: What stays paid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">Cosa resta a pagamento (e perché va bene così)</h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mb-5">
          SUSE, l'azienda che sponsorizza openSUSE, vende prodotti enterprise
          costruiti sullo stesso codice upstream. Il confine è onesto e ben
          segnato: openSUSE è gratuito, completo e pienamente utilizzabile in
          produzione; i prodotti enterprise di SUSE aggiungono contratti di
          supporto a lungo termine, certificazioni e pacchetti di integrazione
          che i clienti dei settori regolamentati sono disposti a pagare.
          Nulla di openSUSE finisce dietro un paywall: le offerte a pagamento
          sono prodotti separati.
        </p>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/30 text-sm leading-relaxed">
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>SUSE Linux Enterprise Server (SLES)</strong> — la
              controparte LTS a pagamento di Leap, con supporto a lungo
              termine e certificazioni per SAP, settore pubblico e finanza.
            </li>
            <li>
              <strong>SUSE Rancher Prime</strong> — piattaforma Kubernetes a
              pagamento con Liz, l'assistente AI agentico per la gestione dei
              cluster. Il progetto open source Rancher resta gratuito.
            </li>
            <li>
              <strong>SUSE AI</strong> — stack di AI sovrana a pagamento
              costruito su Rancher Prime, con sicurezza zero-trust,
              osservabilità e schemi di deployment per modelli privati.
            </li>
            <li>
              <strong>SUSE Sovereign Premium Support</strong> — livello di
              supporto premium a pagamento con ingegneri basati in UE e dati
              di supporto ospitati in UE, rilevante per le organizzazioni
              vincolate a requisiti di giurisdizione europea.
            </li>
          </ul>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Se ti interessa il lato community di openSUSE senza l'impronta
            enterprise, niente di tutto questo è necessario. Le distribuzioni
            gratuite usano lo stesso kernel, le stesse librerie e gli stessi
            strumenti. La linea a pagamento esiste per le organizzazioni che
            hanno bisogno di metterci sopra un contratto.
          </p>
        </div>
      </section>

      <aside className="rounded-xl bg-brand/5 border border-brand/30 p-5 text-sm leading-relaxed">
        <h3 className="font-semibold mb-2">Da dove partire, a seconda di cosa vuoi fare</h3>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Eseguire LLM locali su una workstation:</strong> installa
            Tumbleweed, aggiungi il repository NVIDIA, installa i driver
            CUDA, poi segui la{" "}
            <Link href="/it/guides/ollama" className="text-brand-dark dark:text-brand-light hover:underline">
              guida a Ollama
            </Link>{" "}
            o la{" "}
            <Link href="/it/guides/llama-cpp" className="text-brand-dark dark:text-brand-light hover:underline">
              guida a llama.cpp
            </Link>
            .
          </li>
          <li>
            <strong>Costruire un server di inferenza casalingo:</strong>{" "}
            installa MicroOS o Leap Micro, distribuisci K3s per
            l'orchestrazione dei container, esegui in un pod un server
            compatibile OpenAI come vLLM.
          </li>
          <li>
            <strong>Desktop di uso quotidiano con carichi AI:</strong> Kalpa
            per l'immutabilità e il rollback atomico, oppure Tumbleweed se
            vuoi il pieno controllo sui pacchetti installati.
          </li>
        </ul>
      </aside>
    </div>
  );
}
