import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Il DeepSeek V4.1 Flash più scaricato l’ha fatto un laboratorio universitario",
  description:
    "A quattro settimane dall’uscita, la copia di DeepSeek V4.1 Flash che la gente scarica davvero è una quantizzazione dell’IST Austria, non i pesi di DeepSeek né la conversione di unsloth. Perché è successo, cosa chiedono davvero i file, e una correzione al nostro catalogo.",
  alternates: {
    canonical: "/it/blog/deepseek-v4-1-flash-the-lab-quant",
    languages: {
      en: "/blog/deepseek-v4-1-flash-the-lab-quant",
      it: "/it/blog/deepseek-v4-1-flash-the-lab-quant"
    }
  }
};

export default function PostDeepSeekV41QuantIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Quantizzazione · 8 min · 23 novembre 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Il DeepSeek V4.1 Flash più scaricato l’ha fatto un laboratorio universitario
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        a ottobre DeepSeek ha pubblicato un nuovo modello grande, troppo
        grande per girare così com’è, e per usarlo in casa la gente scarica
        copie compresse fatte da altri. La più popolare, con parecchio
        distacco, viene da un gruppo di ricerca dell’Institute of Science
        and Technology Austria, che è riuscito a farla stare in circa un
        quarto di terabyte. Da fine ottobre il normale llama.cpp la fa
        girare, e il nostro catalogo per un mese non se n’è accorto.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Tre numeri presi stamattina da Hugging Face, tutti riferiti allo
        stesso modello. Il repository di DeepSeek per il checkpoint 1017 di
        V4.1 Flash segna circa 524 mila download. La conversione GGUF di
        unsloth, che di solito è la scelta di default per chi fa girare
        modelli grandi in casa, ne segna 1,6 milioni. E un repository che
        si chiama ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF,
        pubblicato dal Deep Algorithms and Systems Lab dell’IST Austria, ne
        segna 4,2 milioni, più degli altri due messi insieme.
      </p>
      <p>
        I download su Hugging Face sono un segnale grezzo, gonfiato da
        mirror e procedure automatiche, e lo abbiamo già scritto altre
        volte. Qui poi i like raccontano un’altra storia, perché il
        repository di DeepSeek ne ha molti di più delle due conversioni.
        Però uno scarto così grande nei download va comunque spiegato, e la
        spiegazione sta dentro i file.
      </p>

      <h2>Perché serve qualcun altro per usarlo</h2>
      <p>
        V4.1 Flash è un’architettura nuova, non una revisione della V4.
        DeepSeek descrive un mixture-of-experts da 552 miliardi di
        parametri, che ne attiva circa 8 miliardi mentre legge il prompt e
        16 mentre genera, più una memoria separata da 196 miliardi di
        parametri, chiamata Engram, che il modello consulta per ricerca
        diretta invece che con le solite moltiplicazioni di matrici. In
        tutto fanno circa 763 miliardi. I pesi escono in FP8, con gli
        expert in FP4, e nessuno li fa girare così su una scrivania.
      </p>
      <p>
        Per chi legge questo sito, quindi, il prodotto vero lo fa chi
        trasforma quei pesi in un file GGUF che stia in una macchina con
        qualche centinaio di gigabyte di memoria. È un problema di
        quantizzazione, e su questo modello un laboratorio che pubblica
        articoli scientifici sulla quantizzazione ha fatto meglio di quelli
        che di solito vincono la corsa.
      </p>

      <h2>Cosa ha fatto il laboratorio</h2>
      <p>
        Un normale GGUF a pochi bit sceglie un tipo di quantizzazione, per
        esempio IQ2_XXS, e lo applica più o meno dappertutto. La build di
        ISTA invece sceglie un tipo per ogni singolo tensore. Lavorano due
        metodi del laboratorio: GSQ quantizza ogni tensore con ciascuno dei
        tipi candidati, poi RCO fa una ricerca basata sul gradiente che
        assegna un tipo a ogni tensore in modo che il modello arrivi
        esattamente al peso stabilito. Le parti dense (attenzione, expert
        condivisi, embedding) finiscono fra Q5_K e Q8_0, mentre gli expert
        instradati, che sono la gran parte dei pesi, scendono fino a IQ1_S.
        Il risultato resta un GGUF standard, ed è per questo che llama.cpp
        riesce a caricarlo.
      </p>
      <p>
        Le build sono tre. Quella consigliata dal laboratorio, IQ2_XXS, ha
        un backbone da 138 GB. Le tabelle Engram stanno una volta sola in un
        file separato da 111 GB che vale per tutte le build, e il totale
        arriva a circa 249 GB. llama.cpp tiene quel file mappato su disco e
        ne legge una riga per token, quindi in memoria deve stare il
        backbone più il contesto. Con 192 GB di RAM o di memoria unificata
        siamo al limite ma si fa, con 256 GB si sta comodi.
      </p>

      <h2>Quanto valgono i numeri, e fin dove arrivano</h2>
      <p>
        Il laboratorio riporta che IQ2_XXS pareggia esattamente i pesi
        originali sui tre benchmark che ha misurato: 100,00 su AIME25, 90,91
        su GPQA-Diamond e 89,71 su LiveCodeBench v6, per una media di 93,54,
        identica a quella del modello base. La build IQ1_M da 1,75 bit ne
        conserva il 98,7 per cento.
      </p>
      <p>
        Tre benchmark sono pochi, e uno dei tre, AIME25, segna già 100 per
        tutte le versioni originale compresa, quindi non può mostrare
        nessuna perdita. In più tutte le misure sono fatte con un solo
        livello di ragionamento, 50. Fuori dal laboratorio nessuno ha ancora
        pubblicato un confronto, e leggere &ldquo;recupero del 100 per
        cento&rdquo; come &ldquo;nessuna differenza da nessuna parte&rdquo;
        sarebbe un errore. Quello che la tabella mostra davvero è che una
        build a 2 bit di un modello di queste dimensioni può tenere sui
        compiti difficili di ragionamento e di codice. Di solito le build a
        2 bit uniformi fanno il contrario: quando abbiamo scritto di{" "}
        <Link href="/it/blog/bonsai-2-27b-in-six-gigabytes">Bonsai 2</Link>,
        la build IQ2_XXS tradizionale di Qwen3.8-27B scendeva da 94,6 a
        57,5 su AIME26 nel confronto pubblicato da Prism ML.
      </p>

      <h2>Il supporto è arrivato, e noi non ce ne siamo accorti</h2>
      <p>
        Quando il 27 ottobre abbiamo messo V4.1 Flash nella{" "}
        <Link href="/it/models">directory dei modelli</Link> lo abbiamo
        lasciato fuori dal <Link href="/it/picker">picker</Link>, perché la
        scheda di unsloth diceva che per i suoi file serviva una sua pull
        request di llama.cpp. Era già una cosa vecchia mentre la
        scrivevamo. Il supporto per questa architettura era entrato in
        llama.cpp due giorni prima, nella build b11870 del 25 ottobre,
        con una pull request firmata anche da Daniel Han di unsloth, e il
        27 ottobre ISTA aveva già riscritto i suoi file nel formato
        ufficiale. La scheda di unsloth riporta ancora la vecchia frase.
        Avremmo dovuto controllare le release di llama.cpp invece di
        fidarci di una scheda, e adesso la voce nella directory dice come
        stanno le cose.
      </p>
      <p>
        Nel picker però non c’è ancora, per un motivo più circoscritto. La
        build di ISTA si aspetta che il file Engram condiviso compaia come
        sesto pezzo della build che usate, per cui dopo il download bisogna
        creare un collegamento con un nome preciso prima che llama.cpp lo
        apra. I comandi del nostro picker scaricano un file e lo avviano,
        ma non creano collegamenti, e preferiamo non mostrare nulla
        piuttosto che un comando che si pianta all’ultimo passaggio. La
        scheda del modello spiega il collegamento in una riga, e chi sta
        preparando una macchina da 192 GB può seguirla senza problemi.
      </p>

      <h2>Due parole sui 12 GB</h2>
      <p>
        La scheda di ISTA dice anche che ogni build gira su una sola GPU da
        12 GB attraverso Strata, un motore di inferenza separato, tenendo
        il resto del modello nella memoria di sistema. Può darsi che sia
        vero, ma la sezione della scheda sulla memoria è ancora un
        segnaposto, con note di redazione che chiedono a qualcuno di
        confermare come Strata distribuisce il modello. Noi non l’abbiamo
        provato, e finché non c’è un conto della memoria scritto nero su
        bianco lo prenderemmo come una promessa più che come una
        specifica. La memoria di sistema, poi, da qualche parte deve pur
        venire.
      </p>

      <h2>Perché il laboratorio ha vinto la corsa ai download</h2>
      <p>
        Si sono messe in fila tre cose. Due giorni dopo l’arrivo del
        supporto la scheda di ISTA diceva chiaramente che i suoi file
        girano sul llama.cpp ufficiale, mentre la pagina di unsloth
        rimandava ancora a una pull request. La sua build più piccola pesa
        231 GB contro i 250 della più piccola di unsloth, e il file Engram
        si scarica una volta sola per quante build si vogliano provare,
        mentre unsloth lo ripete dentro la cartella di ogni build. E poi
        c’era una tabella di risultati misurata contro i pesi originali,
        che è più di quanto offra quasi ogni quantizzazione. Per niente di
        tutto questo serve un nome famoso, bastano file curati e una
        scheda che spieghi come usarli.
      </p>
      <p>
        Per chi ha l’hardware, V4.1 Flash adesso è il DeepSeek più capace
        che si possa far girare in casa, e noi partiremmo dalla build
        IQ2_XXS. Per tutti gli altri nel picker resta{" "}
        <Link href="/it/blog/deepseek-v4-flash-0731-checkpoint-refresh">V4 Flash 0731</Link>,
        che continua a essere il DeepSeek grande che si installa senza
        dover toccare nemmeno un nome di file.
      </p>
    </article>
  );
}
