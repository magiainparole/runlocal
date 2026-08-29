import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qwen 3.8 27B è il rilascio che è davvero atterrato",
  description:
    "Alibaba ha pubblicato due modelli della stessa generazione questo mese. Uno ha quattro milioni di download, l’altro ventisettemila. La differenza non è la capacità.",
  alternates: {
    canonical: "/it/blog/qwen-3-8-27b-the-release-that-landed",
    languages: {
      en: "/blog/qwen-3-8-27b-the-release-that-landed",
      it: "/it/blog/qwen-3-8-27b-the-release-that-landed"
    }
  }
};

export default function PostQwen38_27BIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analisi · 9 min · 21 agosto 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Qwen 3.8 27B è il rilascio che è davvero atterrato
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        ad agosto Alibaba ha rilasciato due versioni della stessa
        generazione di modelli. Una è abbastanza piccola da girare su un
        buon PC da gaming e ha una licenza che ti lascia fare quello che
        vuoi. L’altra è novanta volte più grande e ha una licenza scritta
        da Alibaba. Quasi tutti stanno usando la piccola, e questo articolo
        parla del perché quel divario sia il numero più interessante del
        mese.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Qwen3.8-27B è comparso su Hugging Face il 14 agosto. Mentre
        scriviamo il repository segna circa 4,0 milioni di download e
        13.192 like. Due giorni prima lo stesso team aveva pubblicato
        Qwen3.8-2.4T-A95B, il modello più grande mai rilasciato da Alibaba:
        2.450 miliardi di parametri, stessa generazione, stessa linea
        architetturale. Segna circa 27.400 download e 1.181 like.
      </p>
      <p>
        Sono più o meno centoquaranta a uno, tra due modelli dello stesso
        laboratorio, a due giorni di distanza, nella stessa linea di
        prodotto. Il divario non racconta quale dei due sia migliore: il
        2.4T è senza dubbio l’artefatto più capace. Racconta invece cosa ti
        compra davvero la parola “rilasciato”, e la risposta dipende da due
        cose che con i punteggi dei benchmark non c’entrano niente.
      </p>

      <h2>Cos’è davvero il 27B</h2>
      <p>
        Denso, non mixture-of-experts: 27,78 miliardi di parametri, tutti
        attivi su ogni token, cosa insolita per un rilascio del 2026 a
        questa taglia e che rende i conti sulla memoria piacevolmente
        noiosi. Finestra di contesto da 262.000 token. Multimodale in
        origine, registrato sull’Hub come modello image-text-to-text e non
        come modello testuale con la visione attaccata sopra. Apache 2.0.
      </p>
      <p>
        In pratica una build Q4_K_M si assesta intorno ai 17 GB e una
        Q5_K_M intorno ai 20, quindi una scheda da 24 GB lo fa girare con
        spazio per il contesto e per il resto della sessione desktop. Le
        build quantizzate sono arrivate in pochi giorni: il repository GGUF
        di unsloth ha da solo accumulato 8,4 milioni di download, più dei
        pesi originali, che è il segnale più chiaro possibile su come la
        gente stia consumando questo modello. Non caricano i safetensors in
        transformers. Scaricano un file quantizzato e lo fanno girare su
        hardware che già possiedono.
      </p>

      <h2>La licenza pesa più del numero di parametri</h2>
      <p>
        Il 27B è Apache 2.0. I metadati dell’Hub per il 2.4T riportano{" "}
        <code>license: other</code>, una licenza Qwen personalizzata i cui
        termini vanno letti sulla model card invece che riconosciuti da
        un’etichetta di tre parole. Abbiamo già scritto perché questa
        distinzione continui a contare: una licenza permissiva è una
        decisione che prendi una volta sola, mentre una licenza
        personalizzata è una decisione che riprendi ogni volta che cambia
        il caso d’uso.
      </p>
      <p>
        Alibaba lo ha quasi certamente fatto apposta, e la logica non è
        misteriosa. Il modello piccolo è una mossa di distribuzione:
        mettilo ovunque, con termini su cui nessuno deve ragionare, e Qwen
        diventa il modello locale predefinito per una generazione di
        sviluppatori. Il modello grande è un asset commerciale, servito
        tramite Alibaba Cloud e i soliti provider di inferenza, e la
        licenza protegge quello. Sono due mosse razionali entrambe. Vale la
        pena notare che la divisione razionale produce un artefatto
        pubblico e uno semi-pubblico, e che solo uno dei due andrà a
        plasmare ciò che la gente costruisce.
      </p>

      <h2>Perché a decidere il resto è la soglia hardware</h2>
      <p>
        A circa 1,2 TB in 4 bit, il 2.4T è infrastruttura multi-nodo.
        Teniamo modelli come questo su una{" "}
        <Link href="/it/frontier">pagina Frontier</Link> separata proprio
        perché elencarli accanto a qualcosa che puoi installare sarebbe
        fuorviante. I suoi 27.400 download sono quasi certamente provider
        di inferenza, laboratori di ricerca e una manciata di persone con
        un budget da cluster, e quel numero non è un fallimento. È l’aspetto
        che ha l’adozione su scala frontier quando il modello è onesto sul
        proprio peso.
      </p>
      <p>
        I quattro milioni del 27B, invece, sono la forma di un modello che
        ha superato entrambe le soglie insieme: una licenza che non chiede
        niente e un ingombro in memoria che sta in una scheda già
        comprata. Nessuna delle due soglie da sola sarebbe bastata. Ci sono
        parecchi modelli con licenza Apache che restano inutilizzati perché
        richiedono un rack, e parecchi modelli eseguibili che restano di
        nicchia perché i loro termini rendono necessario un avvocato.
      </p>
      <p>
        È lo stesso ragionamento che abbiamo fatto su{" "}
        <Link href="/it/blog/kimi-k3-what-open-means-now">Kimi K3</Link>,
        preso dall’altro lato. Lì il punto era che in cima alla scala i
        pesi pubblici e un modello eseguibile si sono separati. Qui il
        punto è cosa resta a valle: per chi legge questo sito l’azione
        interessante si è spostata nella fascia tra i 20 e i 35 miliardi di
        parametri, dove capacità, licenza e memoria consumer per un attimo
        coincidono.
      </p>

      <h2>Quanto valgono adesso i numeri dei benchmark</h2>
      <p>
        Qwen dichiara miglioramenti sostanziali sulla generazione
        precedente: SWE-bench Pro a 61,7 contro 53,5 di Qwen3.6-27B,
        coding agentico da terminale a 73,0 contro 63,4. Sono cifre
        dichiarate dal produttore. Nessuna valutazione indipendente ha
        ancora pubblicato un punteggio per il 27B, il che è normale a una
        settimana dal rilascio ed è anche esattamente la finestra in cui i
        numeri del vendor vengono citati come se fossero acquisiti.
      </p>
      <p>
        La lettura onesta è che la direzione è credibile e l’entità non è
        ancora confermata. Se stai scegliendo tra questo e Qwen3.6-27B per
        un carico di lavoro reale, la prova che decide sono i tuoi prompt
        sul tuo hardware, non una tabella in un post di lancio. Il modello
        è abbastanza piccolo che quel confronto ti costa un pomeriggio.
      </p>

      <h2>Cosa fare, per classe di hardware</h2>
      <p>
        <strong>Scheda da 24 GB o Mac da 32 GB:</strong> è la nuova scelta
        predefinita nel nostro <Link href="/it/picker">picker</Link>, al
        posto di Qwen3.6-27B per le installazioni nuove. Scarica la Q4_K_M
        e tieni la generazione precedente solo se hai fine-tuning o prompt
        tarati su quella.
      </p>
      <p>
        <strong>16 GB o meno:</strong> il 27B non ci sta a una
        quantizzazione che valga la pena eseguire. La{" "}
        <Link href="/it/models">directory</Link> ha opzioni migliori a
        quella taglia, e il divario tra un 27B in Q2 e un 12B ben scelto in
        Q5 non è quello che la gente si aspetta.
      </p>
      <p>
        <strong>Workstation multi-GPU:</strong> puoi far girare il 27B in
        Q8 con spazio in abbondanza, e continui a non poter eseguire il
        2.4T. Non esiste una configurazione intermedia tra “una buona
        scheda” e “un cluster” che cambi questa cosa, e vale la pena
        saperlo prima di comprare una seconda GPU per questo modello.
      </p>

      <h2>La parte che invecchierà</h2>
      <p>
        Un anno fa la tesi dell’AI locale richiedeva una scusa: i modelli
        erano più piccoli, il divario con la frontiera si vedeva nell’uso
        quotidiano ed eseguire le cose per conto proprio era una
        preferenza più che una capacità. Il 27B è il punto in cui quella
        scusa smette di servire per un’ampia classe di lavoro: scrittura di
        codice, comprensione di documenti, lettura a contesto lungo,
        qualsiasi cosa multimodale che non richieda il vertice assoluto.
      </p>
      <p>
        Quello che non è cambiato è che il soffitto continua ad
        allontanarsi. Il 2.4T esiste, è migliore, e nessuna quantità di
        hardware consumer lo raggiungerà. Il modo utile di tenere insieme
        le due cose è che l’AI locale non compete con la frontiera e non lo
        ha mai fatto. Compete con la versione del tuo flusso di lavoro in
        cui una terza parte vede ogni token che invii. Su quel confronto, un
        file da 17 GB sotto Apache 2.0 è un argomento più forte di quanto
        sia mai stato.
      </p>
    </article>
  );
}
