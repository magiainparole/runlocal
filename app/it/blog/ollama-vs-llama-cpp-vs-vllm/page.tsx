import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quale motore di inferenza locale dovresti usare davvero",
  description:
    "Ollama, llama.cpp, LM Studio e vLLM risolvono problemi diversi. Una mappa pratica di quando usare quale, e perché conta più dei numeri dei benchmark.",
  alternates: {
    canonical: "/it/blog/ollama-vs-llama-cpp-vs-vllm",
    languages: {
      en: "/blog/ollama-vs-llama-cpp-vs-vllm",
      it: "/it/blog/ollama-vs-llama-cpp-vs-vllm"
    }
  }
};

export default function PostEngineComparisonIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Editoriale · 11 min · 5 maggio 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Quale motore di inferenza locale dovresti usare davvero
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        per far girare un modello AI sul tuo computer serve un software che
        lo esegua materialmente. Ce ne sono quattro popolari: Ollama,
        llama.cpp, LM Studio e vLLM. Sembrano concorrenti, ma sono
        progettati per lavori diversi. Questo articolo ti dice quale
        scegliere per cosa.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Ollama, llama.cpp, LM Studio e vLLM sono i quattro nomi che
        spuntano in ogni conversazione sul far girare LLM in locale.
        Sembrano prodotti in competizione. Per la maggior parte non lo
        sono. Una breve mappa di chi risolve quale problema, scritta per
        chi vuole scegliere una volta sola e tornare al lavoro.
      </p>

      <h2>La cosa che i confronti di solito sbagliano</h2>
      <p>
        La maggior parte dei confronti online mette i quattro strumenti in
        una tabella, li valuta su un unico asse di token al secondo e
        proclama un vincitore. I numeri sono reali (vLLM consegna davvero
        circa un ordine di grandezza di throughput in più rispetto a
        Ollama sotto carico concorrente, con benchmark recenti intorno ai
        793 token al secondo per vLLM contro i 41 di Ollama al picco), ma
        la conclusione che invitano a trarre è fuorviante. Questi
        strumenti si collocano in punti diversi di uno spettro che parte
        da “un solo sviluppatore, una sola macchina, una chat alla volta”
        e arriva a “servire migliaia di utenti concorrenti dietro un load
        balancer”. Un numero di throughput preso dall’estremo sbagliato
        dello spettro ti dice quasi nulla su quanto lo strumento si adatti
        al tuo lavoro.
      </p>

      <h2>Le quattro posizioni, mappate sui carichi che servono</h2>
      <p>
        La versione onesta del confronto è questa.{" "}
        <strong>Ollama</strong> è la strada più amichevole da zero a una
        sessione di chat funzionante sulla tua macchina. Gira come demone,
        espone una API compatibile OpenAI e ha l’attrito di installazione
        più basso di tutta la lista. Il catalogo della libreria ha
        superato le 4.500 varianti di modello, e il solo Llama 3.1 è stato
        scaricato più di 112 milioni di volte. Se stai leggendo e non hai
        mai eseguito un modello locale, Ollama è quello che dovresti
        installare oggi.
      </p>
      <p>
        <strong>llama.cpp</strong> è il motore che vive sotto la maggior
        parte degli altri strumenti, e la risposta quando vuoi il massimo
        controllo. Compila praticamente su qualsiasi cosa, gira su CUDA,
        ROCm, Metal, Vulkan e CPU, ti dà un controllo fine sulla
        quantizzazione ed è di solito il leader di prestazioni su Apple
        Silicon. Il costo è operativo: la configurazione è esposta, le
        convenzioni sono minime e il progetto dà per scontato che la
        documentazione la leggerai. Per gli utenti che vogliono le
        migliori prestazioni single-machine disponibili nell’open source,
        resta lo strumento giusto.
      </p>
      <p>
        <strong>LM Studio</strong> è l’unica GUI completa e matura della
        categoria. Usa llama.cpp sotto il cofano e aggiunge un client di
        chat desktop, un browser dei modelli di Hugging Face, la
        valutazione multi-modello fianco a fianco e un server compatibile
        OpenAI attivabile con un clic. È lo strumento giusto per decidere
        quale modello far girare nel lavoro di tutti i giorni. Presa
        quella decisione, la maggior parte degli utenti sposta il modello
        scelto in Ollama o llama.cpp per l’uso di produzione; la GUI di LM
        Studio è sovradimensionata una volta che sai cosa stai eseguendo.
      </p>
      <p>
        <strong>vLLM</strong> sta in una categoria del tutto diversa. È il
        server di inferenza di produzione a cui rivolgersi quando i
        vincoli sono gli utenti concorrenti e il throughput sostenuto.
        PagedAttention per una KV cache efficiente in memoria, continuous
        batching, speculative decoding e tensor parallelism su più GPU lo
        rendono lo standard di fatto per i deployment seri. Il rovescio è
        che vLLM si aspetta Linux, si aspetta GPU di classe datacenter
        (NVIDIA CUDA o AMD ROCm) e si aspetta un operatore disposto a
        dedicare tempo al tuning. Per un team che gestisce un assistente
        di coding interno su una macchina GPU condivisa, è la risposta
        giusta. Per un hobbista su un portatile, è quella sbagliata.
      </p>

      <h2>Un diagramma di decisione che sta su un tovagliolo</h2>
      <p>
        Se non hai mai eseguito un modello locale, installa{" "}
        <Link href="/it/guides/ollama">Ollama</Link>. Scarica un modello
        7B o 8B, chiacchiera con lui, decidi se l’esperienza è abbastanza
        interessante da investirci altro tempo. La maggior parte dei
        lettori si ferma qui, ed è un esito perfettamente accettabile.
      </p>
      <p>
        Se vuoi confrontare più modelli prima di impegnarti, installa{" "}
        <Link href="/it/guides/lm-studio">LM Studio</Link>. Fai girare una
        piccola suite di prompt su tre o quattro candidati e lascia che la
        vista fianco a fianco decida per te. Poi sposta il vincitore in
        Ollama.
      </p>
      <p>
        Se sei su Apple Silicon e vuoi l’inferenza single-machine più
        veloce in assoluto, compila{" "}
        <Link href="/it/guides/llama-cpp">llama.cpp</Link> dai sorgenti
        con Metal abilitato. Il margine di prestazioni sullo stesso
        modello in Ollama è di solito tra il 10 e il 30 percento sui chip
        della serie M.
      </p>
      <p>
        Se gestisci un servizio che deve reggere molti utenti concorrenti
        su una macchina GPU, fai il deployment di{" "}
        <Link href="/it/tools">vLLM</Link>. Metti in conto il lavoro
        operativo. Il guadagno di throughput smette di essere opzionale
        quando la concorrenza supera la singola cifra.
      </p>

      <h2>Due cose che i benchmark si perdono</h2>
      <p>
        Primo, la latenza a carico nullo non corrisponde a ciò che la
        maggior parte degli utenti percepisce. I numeri di throughput di
        vLLM vengono da suite di benchmark concorrenti; per un singolo
        utente che digita una domanda e aspetta il primo token, Ollama e
        llama.cpp sono spesso indistinguibili da vLLM. Il throughput conta
        quando più richieste sono in volo contemporaneamente, e il divario
        si amplifica con la concorrenza.
      </p>
      <p>
        Secondo, la API compatibile OpenAI è il tessuto connettivo che
        rende i quattro strumenti intercambiabili per i client. Una volta
        scelto un motore e puntato sulla porta giusta, qualsiasi client
        che supporti l’override della base URL OpenAI (cioè la maggior
        parte) funziona senza altre modifiche. Questo significa che puoi
        partire con Ollama, passare a vLLM e mantenere lo stesso codice
        client. Il costo di migrazione è reale ma limitato.
      </p>

      <h2>Come si presenta tutto questo in pratica</h2>
      <p>
        Una traiettoria ragionevole per chi fa sul serio con l’AI locale
        nel 2026 è questa. Parti con Ollama sul portatile. Usalo per
        chattare, collegalo a un editor di codice tramite Continue.dev,
        fatti un’idea di quali modelli usi più volentieri. Quando ti
        accorgi di voler confrontare le nuove release, installa LM Studio
        per quello scopo. Se arrivi al punto di condividere un modello con
        i colleghi da un server, configura su quel server Ollama (se la
        concorrenza è moderata) oppure vLLM (se ha smesso di esserlo).
        Tieni llama.cpp nella cassetta degli attrezzi per il lavoro sulle
        prestazioni e per i casi in cui ti serve uno schema di
        quantizzazione che nient’altro espone.
      </p>
      <p>
        Nessuno di questi è il percorso sbagliato. L’errore che la gente
        commette sta nel trattare la scelta come binaria, più che nello
        scegliere lo strumento sbagliato. La maggior parte dei setup seri
        di AI locale usa due o tre di questi strumenti, ciascuno per il
        carico di lavoro per cui è stato effettivamente progettato.
      </p>
    </article>
  );
}
