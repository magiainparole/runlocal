import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bonsai 2 fa stare un 27B in sei gigabyte, alle condizioni di Prism ML",
  description:
    "Il modello più scaricato del mese su Hugging Face è una ricostruzione ternaria di Qwen3.8-27B che entra in un portatile. I numeri reggono meglio del giro precedente, il problema è il runtime.",
  alternates: {
    canonical: "/it/blog/bonsai-2-27b-in-six-gigabytes",
    languages: {
      en: "/blog/bonsai-2-27b-in-six-gigabytes",
      it: "/it/blog/bonsai-2-27b-in-six-gigabytes"
    }
  }
};

export default function PostBonsai2It() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Quantizzazione · 8 min · 29 settembre 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Bonsai 2 fa stare un 27B in sei gigabyte, alle condizioni di Prism ML
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        una piccola azienda, Prism ML, ha preso il miglior modello open di
        taglia media dell’estate, Qwen 3.8 27B, e l’ha compresso fino a
        farlo stare in circa 6 GB, cioè la memoria di un portatile
        qualsiasi. Secondo i loro test ci perde pochissimo. Il guaio è che
        per usarlo serve la loro versione di llama.cpp, perché quella
        standard o rifiuta il file o lo carica e tira fuori frasi senza
        senso.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Una settimana fa Ternary-Bonsai-2-27B-gguf era secondo nella nostra{" "}
        <Link href="/it/trending">classifica trending</Link>, in quella di
        ieri è primo, e stamattina il repository segna circa 3,6 milioni di
        download, quasi tutti arrivati a settembre. Dice parecchio su cosa
        la gente volesse davvero da Qwen3.8-27B, e cioè lo stesso modello
        in un file che entri nella macchina che ha già sulla scrivania.
      </p>

      <h2>Cosa c’è dentro il file</h2>
      <p>
        Ogni peso del modello linguistico può valere meno uno, zero o più
        uno, e ogni gruppo di 128 pesi condivide un fattore di scala a 16
        bit. Prism ML fa il conto su tutto il modello e arriva a 1,72 bit
        per peso, e stavolta l’etichetta è onesta, cosa che con le build
        &ldquo;a 2 bit&rdquo; non capita spesso: embedding, attenzione, MLP
        e testa di output sono tutti ternari, e restano a precisione più
        alta solo una ventina di milioni di parametri (lo stato ricorrente
        dei livelli ad attenzione lineare e le normalizzazioni). In più i
        pesi sono salvati dopo una rotazione di Hadamard, un accorgimento
        che spalma i valori anomali su un intero blocco così che tre valori
        bastino a descriverlo. Il runtime però deve applicare la rotazione
        corrispondente alle attivazioni, ed è qui che cominciano i
        problemi pratici.
      </p>
      <p>
        Le confezioni sono due. PTQ1_0 impacchetta i valori ternari fitti
        fitti e pesa 5,95 GB. PQ2_0 mette ogni valore in uno slot da 2 bit
        e pesa 7,21 GB, un po’ più di memoria in cambio di uno spacchettamento
        meno costoso. La parte di visione è un file a sé da 0,63 GB, che
        serve solo se gli dai delle immagini.
      </p>

      <h2>Quanto costa in qualità, secondo chi lo vende</h2>
      <p>
        Prism ML dichiara una media di 84,78 su 14 benchmark in modalità
        ragionamento, contro 86,32 del Qwen3.8-27B a precisione piena e
        85,18 della UD-Q4_K_XL di unsloth, che però pesa 17,6 GB. Il
        confronto più istruttivo è con IQ2_XXS, la build a 2 bit
        tradizionale, che occupa 7,27 GB, quasi uguale, e si ferma a
        72,59. E il distacco si concentra proprio dove fa più male: su
        AIME26 la build tradizionale scende a 57,5 mentre Bonsai 2 tiene
        95,83, su LiveCodeBench siamo a 56,4 contro 90,07. Intanto IQ2_XXS
        fa ancora circa 89 su MMLU-Redux, e questo spiega perché una
        chiacchierata veloce con un modello quantizzato pesantemente può
        sembrare a posto mentre il modello, sotto sotto, sbaglia proprio i
        ragionamenti lunghi per cui l’avevi scaricato.
      </p>
      <p>
        Sono tutti numeri del produttore, misurati da Prism ML con i propri
        strumenti. Noi non li abbiamo riprodotti e, per quanto abbiamo
        trovato, non l’ha fatto ancora nessuno di indipendente, quindi
        vanno presi come un buon motivo per passare una serata a provarlo
        sui propri prompt, più che come un risultato acquisito.
      </p>

      <h2>Il problema è il runtime</h2>
      <p>
        La scheda del modello lo dice senza giri di parole: llama.cpp
        standard questi file non li esegue. Rifiuta PQ2_0 e PTQ1_0 come
        tipi sconosciuti, mentre un file nel vecchio formato Q2_0 lo
        caricherebbe senza fiatare e genererebbe spazzatura, perché la
        versione ufficiale non sa che i pesi sono ruotati. Serve il fork{" "}
        <a href="https://github.com/PrismML-Eng/llama.cpp">PrismML-Eng/llama.cpp</a>,
        o un binario già pronto dalla pagina delle release o una
        compilazione da sorgente, e per tutto quello che va oltre la chat
        semplice Prism ML rimanda al suo repository Bonsai-demo come
        configurazione di riferimento.
      </p>
      <p>
        Per ora, quindi, niente strumenti con cui parte quasi chiunque.
        Ollama e LM Studio poggiano sul llama.cpp ufficiale, e nessuno dei
        due caricherà Bonsai 2 finché i kernel non entrano nel progetto
        principale o finché non decidono di includere il fork. Il modello
        l’abbiamo messo lo stesso nel{" "}
        <Link href="/it/picker">picker</Link>, perché su una scheda da 12 GB
        o un Mac da 16 GB non c’è niente nel catalogo che gli si avvicini, ma il comando
        che stampa adesso comincia clonando e compilando il fork. Facendo
        questo lavoro ci siamo accorti che la nostra scheda del primo
        Ternary Bonsai aveva lo stesso difetto: anche il suo file Q2_0
        richiede il fork, e il nostro comando dava per scontato il
        llama.cpp ufficiale. L’abbiamo corretto, e la nota su quella voce
        ora spiega che per llama.cpp standard il file giusto è Q2_g64.
      </p>

      <h2>Dove si inciampa</h2>
      <p>
        È un modello che ragiona, e di suo ragiona a lungo, a un livello di
        sforzo che il template di chat chiama <code>xhigh</code>. Se il
        limite di output è basso consuma tutto il budget a pensare e
        restituisce una risposta vuota, che è la lamentela più frequente
        nella pagina dei problemi noti di Prism ML. Dagli{" "}
        <code>-n 16384</code> o più e un contesto di almeno 65k. Se vuoi
        risposte più corte manda <code>reasoning_effort: &quot;medium&quot;</code>;
        il template accetta <code>low</code>, <code>medium</code> e{" "}
        <code>xhigh</code>, e per ora chiedere <code>high</code> ti fa
        tornare un errore HTTP 500 dal server.
      </p>
      <p>
        Quanto alla velocità, Prism ML misura circa 28 token al secondo su
        un portatile M5 Pro con PQ2_0 e circa 91 su una RTX 4090 con
        PTQ1_0. Quale delle due confezioni vada più forte dipende dalla
        scheda: PTQ1_0 vince sulle GPU di generazione Ada e sulla L4, dove
        il limite è la banda di memoria, PQ2_0 vince su Blackwell, Hopper e
        Ampere. Su Mac hanno misurato solo PQ2_0.
      </p>

      <h2>Per chi vale la pena</h2>
      <p>
        <strong>Scheda da 12 GB o Mac da 16 GB:</strong> è la prima volta che un
        modello di classe 27B diventa un’opzione realistica a questa
        taglia, e sul ragionamento i punteggi sono abbastanza vicini alla
        build a 4 bit da rendere la prova sensata. Mettete in conto una
        serata per compilare il fork. Su una scheda da 8 GB il file ci
        starebbe, ma poi non resta abbastanza spazio per il contesto e per
        i buffer del runtime, ed è per questo che lì il picker non lo
        propone.
      </p>
      <p>
        <strong>Scheda da 24 GB o Mac da 32 GB:</strong> la normale Q4_K_M
        di Qwen3.8-27B, circa 17 GB, ci sta comunque, gira ovunque e non
        vi lega a un runtime fatto su misura. Qui Bonsai 2 ha senso solo se
        la memoria liberata vi serve per un contesto molto lungo o per
        tenere un secondo modello accanto.
      </p>
      <p>
        <strong>Chi usa Ollama o LM Studio per la famiglia o per un
        gruppo di lavoro:</strong> aspettate. Un fork va benissimo per una
        persona a cui piace smanettare, molto meno come base per qualcosa
        su cui contano anche altri.
      </p>

      <h2>All’altro capo del mese</h2>
      <p>
        Settembre ha portato anche MiniCPM5-2B di OpenBMB, che va nella
        direzione opposta: un modello denso da 2,5 miliardi di parametri,
        addestrato piccolo fin dall’inizio invece che compresso dopo, con
        licenza Apache 2.0, contesto da 131k e file GGUF ufficiali che
        girano sul llama.cpp standard. La sua Q4_K_M pesa circa 1,6 GB.
        OpenBMB sostiene che su codice e matematica se la gioca con i
        modelli da 4B, altra affermazione del produttore da verificare di
        persona. Adesso è nel picker come gradino sopra MiniCPM5-1B per
        telefoni e portatili vecchi, ed è il primo che proveremmo su una
        macchina dove anche i sei gigabyte di Bonsai 2 sono troppi.
      </p>
    </article>
  );
}
