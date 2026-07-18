import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scegliere una quantizzazione GGUF senza raccontarsela",
  description:
    "Una guida pratica ai livelli di quantizzazione GGUF (Q4, Q5, Q8 e gli altri), ai compromessi che incorporano e a una regola di decisione che regge su tutte le classi di hardware.",
  alternates: {
    canonical: "/it/blog/gguf-quantization-explained",
    languages: {
      en: "/blog/gguf-quantization-explained",
      it: "/it/blog/gguf-quantization-explained"
    }
  }
};

export default function PostQuantizationIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Guida · 10 min · 15 maggio 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Scegliere una quantizzazione GGUF senza raccontarsela
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        quando scarichi un modello AI da eseguire in locale, di solito devi
        scegliere una “variante”: più piccola e veloce ma un po’ meno
        precisa, oppure più grande e lenta ma più accurata. Le varianti
        hanno nomi criptici come Q4_K_M. Questo articolo ti dice come
        sceglierne una senza pensarci troppo.{" "}
        <a href="/it/glossary#quantization" className="text-brand-dark dark:text-brand-light hover:underline">
          Cos’è la quantizzazione?
        </a>
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Ogni modello su Hugging Face impacchettato per llama.cpp arriva con
        una sfilata di varianti di quantizzazione: <code>Q2_K</code>,{" "}
        <code>Q3_K_S</code>, <code>Q4_K_M</code>, <code>Q5_K_M</code>,{" "}
        <code>Q6_K</code>, <code>Q8_0</code>, più la nuova famiglia con
        prefisso IQ. La maggior parte degli utenti ne sceglie una quasi a
        caso, la usa per mesi e non fa mai un confronto. Questo articolo è
        la spiegazione che avrei voluto leggere prima di fare esattamente
        questo.
      </p>

      <h2>Cosa fa davvero la quantizzazione</h2>
      <p>
        Un large language model, a runtime, è una lunga lista di numeri in
        virgola mobile. Il modello viene addestrato in precisione a 16 bit
        (a volte 32 per alcune parti). La quantizzazione riscrive quei
        numeri con meno bit. Una quantizzazione a 4 bit memorizza ogni peso
        in quattro bit invece di sedici, il che riduce di circa quattro
        volte la dimensione del modello e, nello stesso rapporto, la banda
        di memoria necessaria per portare quei pesi alla GPU. Meno dati da
        spostare significa inferenza più veloce, file più piccoli, più
        parametri per gigabyte di memoria.
      </p>
      <p>
        Il costo è la precisione. Un numero a quattro bit non può
        rappresentare la stessa gamma di valori di uno a sedici. Lo schema
        di quantizzazione deve decidere quali pesi meritano più bit, quali
        possono essere arrotondati con più durezza, e come organizzare la
        memorizzazione per minimizzare l’errore. La famiglia k-quant (gli
        schemi con <code>_K</code> nel nome) lo fa con uno scaling per
        blocco. La famiglia IQ aggiunge una ponderazione basata
        sull’importanza dei pesi, e spesso produce qualità migliore a
        parità di bit-rate.
      </p>

      <h2>I cinque livelli di quantizzazione da conoscere davvero</h2>
      <p>
        Il catalogo GGUF elenca più di trenta varianti. Quelle che contano
        per quasi ogni decisione sono cinque.
      </p>

      <h3>Q4_K_M — il default</h3>
      <p>
        Circa quattro bit per peso, con i pesi più usati memorizzati a
        precisione leggermente più alta. La riduzione rispetto al modello
        FP16 originale è di circa il 75 percento: un modello FP16 da 14 GB
        atterra intorno ai 4 GB. La perdita di qualità rispetto alla
        baseline non quantizzata è abbastanza piccola che la maggior parte
        degli utenti, in test alla cieca fianco a fianco su compiti di chat
        generica, non riesce a distinguerla in modo affidabile. Se non sai
        quale quantizzazione scegliere, scegli questa.
      </p>

      <h3>Q5_K_M — quando hai margine</h3>
      <p>
        Circa cinque bit per peso. La dimensione cresce di circa il 25
        percento rispetto a Q4_K_M, e il miglioramento di qualità è reale
        ma modesto. La differenza si vede soprattutto sui compiti che
        puniscono l’instabilità numerica: ragionamento matematico a catena,
        codice con aritmetica precisa, rompicapi logici a più passaggi. Se
        la tua macchina regge Q5_K_M senza sforare la VRAM, l’upgrade è in
        sostanza utilità gratuita.
      </p>

      <h3>Q8_0 — la fascia quasi perfetta</h3>
      <p>
        Otto bit per peso. La dimensione del modello è la metà di FP16, e
        la qualità è statisticamente indistinguibile dall’originale in
        quasi tutte le valutazioni. Il compromesso è che il file è circa il
        doppio di Q4_K_M, quindi la stessa memoria fisica contiene la metà
        dei parametri. Utile quando hai memoria in abbondanza e vuoi una
        baseline difendibile per fare benchmark, o per lavoro di produzione
        dove non puoi permetterti una regressione di qualità che potresti
        non notare.
      </p>

      <h3>Q3_K_S — quando devi farci stare un modello più grande</h3>
      <p>
        Tre bit per peso, variante semplice. Si usa quando vuoi far stare
        nello stesso budget di memoria un modello molto più grande di
        quanto consentirebbe la sua versione a 4 bit. Un modello 70B in
        Q3_K_S sta in circa 32 GB invece dei 42 GB richiesti da Q4_K_M. I
        cali di qualità si vedono: più allucinazioni, codice peggiore, a
        volte turni di conversazione confusi. La risposta giusta di solito
        è “fai girare un modello più piccolo a Q4_K_M”, ma esistono casi in
        cui l’effetto del modello più grande domina il rumore della
        quantizzazione.
      </p>

      <h3>IQ4_XS e compagnia — l’alternativa moderna</h3>
      <p>
        La famiglia IQ applica una quantizzazione consapevole
        dell’importanza dei pesi, con blocchi più piccoli. IQ4_XS, in
        particolare, è diventata una sostituta popolare di Q4_K_M perché
        produce modelli circa il dieci percento più piccoli a qualità
        simile. Il costo è un’inferenza più lenta su certo hardware, perché
        la decodifica è più complessa. Su Apple Silicon e sulle NVIDIA
        recenti la differenza di velocità è piccola; su hardware più
        vecchio può farsi notare. Vale la pena provarla su un modello che
        già conosci bene, così puoi giudicare il compromesso in concreto.
      </p>

      <h2>La regola di decisione che funziona davvero</h2>
      <p>
        Ecco la regola che regge su hardware e casi d’uso diversi. Calcola
        quanta VRAM hai per il solo modello (VRAM totale meno circa 2 GB
        per la cache di contesto e l’overhead), poi scegli la
        quantizzazione più grande che ci sta con un margine comodo.
      </p>
      <ul>
        <li>
          <strong>Se Q8_0 ci sta</strong>, usa Q8_0. Non hai motivi per non
          farlo.
        </li>
        <li>
          <strong>Se ci sta solo Q5_K_M</strong>, usa Q5_K_M. Il guadagno
          di qualità rispetto a Q4 vale lo spazio su disco e il costo in
          memoria.
        </li>
        <li>
          <strong>Se ci sta solo Q4_K_M</strong>, usa Q4_K_M. È qui che
          atterra la maggior parte dell’hardware consumer, ed è la risposta
          giusta nella grande maggioranza dei casi.
        </li>
        <li>
          <strong>Se nemmeno Q4_K_M ci sta</strong>, scendi a un modello
          più piccolo a Q4_K_M prima di scendere a Q3 su quello più grande.
          Il modello più piccolo a Q4 batte quasi sempre quello più grande
          a Q3.
        </li>
      </ul>

      <h2>Due cose che la regola omette, e quando contano</h2>
      <p>
        Primo, la lunghezza del contesto. La memoria della KV cache cresce
        linearmente con la dimensione del contesto e non viene quantizzata
        nello stesso modo dei pesi. Un modello che sta in 16 GB di VRAM con
        4k di contesto può sforare a 32k. Se prevedi di usare contesti
        lunghi, lascia più margine di quanto suggerisca la regola, oppure
        guarda le opzioni di cache quantizzata come i flag <code>-fa</code>{" "}
        e <code>--kv-q4</code> nelle build recenti di llama.cpp.
      </p>
      <p>
        Secondo, lo speculative decoding. Se abbini un piccolo modello
        draft a un modello target grande, devono starci entrambi in
        memoria. La quantizzazione giusta per il target può cambiare una
        volta messo in conto il draft. La memoria complessiva deve comunque
        lasciare spazio alla KV cache, e il modello draft di solito
        dovrebbe stare uno o due bit di quantizzazione sotto il target per
        mantenere sensato il tasso di rifiuto.
      </p>

      <h2>Un test che puoi fare in venti minuti</h2>
      <p>
        Scegli un modello che usi spesso. Scarica tre varianti GGUF dallo
        stesso uploader (così condividono il tooling di quantizzazione):
        Q4_K_M, Q5_K_M, Q8_0. Costruisci un piccolo set di prompt che
        rappresenti il tuo carico di lavoro reale: cinque prompt bastano.
        Falli passare in ciascun modello in{" "}
        <Link href="/it/guides/lm-studio">LM Studio</Link> con la chat
        multi-modello, oppure con tre finestre di terminale che eseguono{" "}
        <Link href="/it/guides/llama-cpp">llama-cli</Link>. Leggi gli
        output fianco a fianco.
      </p>
      <p>
        Il più delle volte scoprirai che sulla chat generica non riesci a
        distinguere in modo affidabile Q4_K_M da Q8_0. Ogni tanto vedrai Q4
        commettere un errore numerico che Q8 evita. Sui compiti di codice
        il divario si allarga leggermente. Se trovi un carico di lavoro in
        cui Q4 produce output visibilmente peggiore, quello è il segnale
        per salire di livello. Altrimenti resta dove sei; lo spazio su
        disco e la velocità valgono più della precisione teorica.
      </p>

      <h2>Dove si colloca la famiglia IQ nel tuo scaffale</h2>
      <p>
        Le quantizzazioni IQ meritano una prova quando hai un modello che
        usi ogni giorno, perché il risparmio di spazio si accumula a ogni
        nuovo download e la qualità nelle taglie piccole (IQ3_XXS, IQ2_S) è
        nettamente migliore delle k-quant equivalenti. Per il modello che
        usi quotidianamente, parti da Q4_K_M, esegui il test dei venti
        minuti contro IQ4_XS e tieni quella che vince sui tuoi prompt. Per
        un modello che usi ogni tanto, lascia perdere; il tempo di
        valutazione supera il guadagno.
      </p>

      <h2>Come si presenta tutto questo in pratica</h2>
      <p>
        Una GPU da 24 GB, la configurazione più comune sopra la fascia
        hobbistica, esegue comodamente un modello 32B a Q4_K_M o un 14B a
        Q8_0. Il 14B a Q8 è, sulla maggior parte dei compiti, la scelta
        migliore, perché a quella scala la precisione domina sul vantaggio
        del numero di parametri. Un Mac Apple Silicon da 16 GB gestisce un
        8B a Q5_K_M con contesto abbondante, o un 14B a Q4_K_M con contesti
        più corti. Una GPU consumer da 12 GB esegue bene un 8B a Q5_K_M, o
        un 14B a Q4_K_M se mantieni il contesto contenuto.
      </p>
      <p>
        Il punto è che la quantizzazione “giusta” non è quasi mai una
        risposta unica. Dipende dalla dimensione del modello che vuoi far
        stare in memoria, dalle lunghezze di contesto che usi davvero e dal
        carico di lavoro che ti interessa. La regola di decisione qui sopra
        ti porta a un default sensato; il test dei venti minuti ti permette
        di correggerlo. Qualsiasi cosa più elaborata è di solito falsa
        precisione.
      </p>
    </article>
  );
}
