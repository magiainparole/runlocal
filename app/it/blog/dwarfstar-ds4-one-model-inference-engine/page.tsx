import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DwarfStar, e la tesi di un motore che esegue un modello solo",
  description:
    "L’autore di Redis ha scritto in C un motore di inferenza che esegue sostanzialmente un modello solo, e fa cose che i runtime generalisti non fanno. Cosa azzecca ds4, e quanto costa in hardware.",
  alternates: {
    canonical: "/it/blog/dwarfstar-ds4-one-model-inference-engine",
    languages: {
      en: "/blog/dwarfstar-ds4-one-model-inference-engine",
      it: "/it/blog/dwarfstar-ds4-one-model-inference-engine"
    }
  }
};

export default function PostDwarfStarIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analisi · 10 min · 27 agosto 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        DwarfStar, e la tesi di un motore che esegue un modello solo
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        quasi tutto il software per eseguire l’AI in locale prova a
        eseguire ogni modello. Salvatore Sanfilippo — il programmatore che
        ha scritto Redis — ha fatto il contrario e ha costruito un
        programma piccolo che esegue sostanzialmente un modello solo, molto
        bene. Questo articolo spiega il trucco che lo rende possibile, che
        hardware serve, e perché non l’abbiamo ancora aggiunto al nostro
        catalogo strumenti.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Salvatore Sanfilippo ha pubblicato ds4 — DwarfStar — su GitHub il 7
        maggio 2026, scritto in C e Metal nell’arco di circa una settimana
        di giornate lunghe. È rilasciato sotto licenza MIT e da allora ha
        raccolto circa 21.900 stelle. Il README lo descrive in una frase:
        “un piccolo motore di inferenza nativo ottimizzato in primo luogo
        per DeepSeek V4 Flash”. Esegue anche GLM 5.2, e DeepSeek V4 PRO su
        macchine con abbastanza memoria da poter essere chiamate
        infrastruttura. La lista dei modelli finisce qui.
      </p>
      <p>
        Sanfilippo lo ha chiamato come ciò che una nana bianca è davvero:
        quasi tutta la massa dell’originale, in una frazione del volume. Il
        nome sta facendo un lavoro reale, perché la compressione è l’intero
        argomento tecnico.
      </p>

      <h2>La quantizzazione è asimmetrica di proposito</h2>
      <p>
        Ogni runtime generalista ti offre un livello di quantizzazione e lo
        applica più o meno in modo uniforme. Scegli Q4 e il modello viene
        compresso a circa quattro bit dappertutto. ds4 rifiuta questa
        impostazione. Dal README: “vengono quantizzati solo gli expert MoE
        instradati, up e gate a IQ2_XXS, down a Q2_K. Sono la maggior parte
        dello spazio occupato dal modello: gli altri componenti (expert
        condivisi, proiezioni, routing) restano intatti per garantire la
        qualità”.
      </p>
      <p>
        Quella frase è il progetto. In un grande modello
        mixture-of-experts gli expert instradati contengono la maggior
        parte dei parametri, ma ogni singolo token ne tocca solo pochi. I
        componenti che si attivano su ogni token — le proiezioni
        dell’attenzione, gli expert condivisi, la rete di routing — sono in
        confronto minuscoli. Schiacciare il primo gruppo a due bit compra
        quasi tutto il risparmio di memoria. Lasciare stare il secondo
        costa quasi nulla in spazio e preserva le parti dove il danno si
        accumulerebbe su ogni token.
      </p>
      <p>
        Sanfilippo ha descritto il risultato come una ricetta 2/8 bit
        estremamente asimmetrica. In astratto non è un’idea nuova: la{" "}
        <Link href="/it/blog/gguf-quantization-explained">
          scena della quantizzazione
        </Link>{" "}
        discute da anni di layout a precisione mista, e le build imatrix
        già variano la precisione tensore per tensore. La differenza sta
        nella mira: siccome ds4 deve essere corretto per una sola
        architettura, la ricetta può essere tarata su quella invece di
        essere un default che deve restare prudente per mille modelli che
        non ha mai visto.
      </p>

      <h2>Quanto costa in hardware</h2>
      <p>
        Qui serve un pavimento sotto l’entusiasmo. Il README è specifico: la
        build Q2 punta a “macchine da 96/128 GB di RAM”, la build Q4 ne
        vuole 256 o più, e PRO in Q2 ne vuole 512.
      </p>
      <p>
        Un Mac da 128 GB è una macchina da cinque cifre nella maggior parte
        delle configurazioni. Non è la classe hardware per cui è scritto il
        resto di questo sito, e sarebbe disonesto presentare ds4 come se
        democratizzasse qualcosa per chi legge con una scheda da 24 GB.
        Quello che fa è spostare il confine: lavoro che prima richiedeva un
        rack ora sta in un computer costoso ma acquistabile. È un
        cambiamento reale, ed è un cambiamento per un gruppo di persone
        specifico e piuttosto ristretto.
      </p>
      <p>
        Una via di fuga c’è, e l’autore è franco sul suo costo. Su Metal
        ds4 può fare streaming da SSD — gli expert instradati vivono in una
        cache in memoria e vengono caricati dal file GGUF quando mancano —
        con l’avvertenza secca che “lo streaming non è veloce quanto tenere
        l’intero modello in RAM”. Utile per provare la cosa prima di
        impegnarsi sulla macchina. Non un sostituto della macchina.
      </p>

      <h2>I numeri, dalla tabella del progetto</h2>
      <p>
        Su un M5 Max da 128 GB con backend Metal, il README riporta 790,18
        token/s di prefill e 39,35 token/s in generazione con un contesto
        da 2.048 token, che scendono a 398,50 e 27,64 a 65.536 token. Su un
        NVIDIA DGX Spark GB10 da 128 GB sotto CUDA: 825,76 di prefill e
        18,05 in generazione a 2.048 token, e 822,98 e 13,84 a 65.536.
      </p>
      <p>
        Due cose in quella tabella meritano attenzione. La prima è che in
        generazione il Mac batte il DGX Spark con ampio margine mentre nel
        prefill succede il contrario: è una questione di banda di memoria
        più che di calcolo, e combacia con quello che abbiamo scritto su{" "}
        <Link href="/it/blog/apple-silicon-vs-nvidia-local-llm">
          memoria unificata e VRAM
        </Link>
        . La seconda è che il DGX Spark rallenta appena nel prefill tra 2k
        e 64k di contesto, mentre il Mac dimezza. Se il tuo carico sono
        documenti lunghi letti una volta sola, quelle sono macchine diverse
        da quello che suggerisce la cifra di generazione in copertina.
      </p>
      <p>
        Sono i benchmark pubblicati dal progetto stesso, eseguiti
        dall’autore e dai contributori sul proprio hardware. Noi non li
        abbiamo riprodotti.
      </p>

      <h2>Cosa ammette l’autore, che è quasi tutto quello che serve</h2>
      <p>
        Il README si porta dietro i propri avvertimenti, e sono migliori
        della maggior parte delle recensioni di terze parti. “Il software
        sta cambiando molto rapidamente. Consideralo di qualità beta”. Sul
        percorso CPU: “non trattare il percorso CPU come il bersaglio di
        produzione”.
      </p>
      <p>
        L’ammissione più utile riguarda l’inferenza distribuita. ds4 può
        spezzare un modello su più macchine — parallelismo di pipeline
        sulla rete, parallelismo di tensore su RDMA tra due Mac collegati
        in Thunderbolt 5, abbastanza da far entrare PRO in Q4 su una coppia
        di Mac Studio da 512 GB. Ma la generazione resta rigorosamente
        autoregressiva, quindi, per usare le parole dell’autore,
        l’inferenza distribuita “serve soprattutto a far entrare modelli
        più grandi e ad accelerare i prefill lunghi, non a rendere più
        veloce il decode”. Chi ha visto una demo di inferenza distribuita
        e ha dedotto che due macchine significhino il doppio della
        velocità dovrebbe rileggere quella frase.
      </p>

      <h2>Perché non è ancora nel nostro catalogo strumenti</h2>
      <p>
        La nostra <Link href="/it/tools">pagina strumenti</Link> elenca
        tredici voci e ds4 non è tra queste, il che è una lacuna e non un
        giudizio. Il catalogo è costruito attorno a software che chi legge
        può installare e usare con i modelli della nostra{" "}
        <Link href="/it/models">directory</Link>, e ds4 al momento non
        soddisfa in modo pulito nessuna delle due metà: la sua lista di
        modelli si sovrappone appena a quello che raccomandiamo, e la sua
        soglia di memoria sta sopra ogni profilo hardware che tracciamo.
        Aggiungerlo significa o scrivere una scheda che vale per una fetta
        ristretta di lettori, o allargare lo scopo del catalogo. Quella
        decisione non è stata presa, e fingere il contrario aggiungendo una
        scheda in silenzio sarebbe peggio che dirlo qui.
      </p>
      <p>
        DeepSeek V4 Flash — il modello per cui ds4 esiste — mancava dalla
        directory per la stessa ragione quando questo pezzo è uscito. Quella
        metà è stata sistemata: ora ha una scheda e un profilo hardware, con
        valori di memoria misurati sulle build GGUF di unsloth. Vale la pena
        notare dove cadono quei valori rispetto ai numeri qui sopra, perché
        non coincidono. La GGUF standard più piccola di quel repository pesa
        circa 91 GB e la build Q2 circa 97, quindi una macchina da 96 GB le
        manca entrambe una volta lasciato spazio per il contesto. La soglia
        dei 96 GB citata qui è una proprietà della quantizzazione di ds4,
        non del modello, ed è esattamente il punto che quel motore sta
        dimostrando.
      </p>

      <h2>Il punto più generale sulla specializzazione</h2>
      <p>
        Abbiamo già sostenuto che{" "}
        <Link href="/it/blog/ollama-vs-llama-cpp-vs-vllm">
          i motori di inferenza locale risolvono problemi diversi
        </Link>{" "}
        e che sceglierne uno è soprattutto una questione di cosa ti serve,
        non di quale sia il più veloce. ds4 aggiunge una categoria che quel
        pezzo non aveva previsto: il motore che tratta la generalità come
        un costo invece che come una funzionalità.
      </p>
      <p>
        È uno scambio disponibile solo a chi è disposto a riscrivere quando
        il bersaglio si sposta, ed è il motivo per cui un progetto così
        arriva da un programmatore di sistemi con la storia di aver
        mantenuto una cosa sola per un decennio, e non da una startup che
        ha bisogno di una roadmap. Che l’approccio sopravviva dipende da
        qualcosa che sta fuori dal codice: da quanto a lungo DeepSeek
        continuerà a pubblicare modelli la cui architettura la ricetta
        ancora incontra. La scommessa è leggibile, l’autore l’ha dichiarata
        apertamente, e il codice è comunque sotto licenza MIT.
      </p>
    </article>
  );
}
