import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3,5 milioni di download, quasi nessuna traccia: la domanda su Ornith-1.0-35B",
  description:
    "Un modello da 35B con licenza MIT, da un account che non conoscevamo, ha superato in download quasi tutto il resto della lista trending di Hugging Face. Cosa abbiamo controllato, cosa non siamo riusciti a verificare, e perché non è ancora nella directory.",
  alternates: {
    canonical: "/it/blog/ornith-1-0-35b-question",
    languages: {
      en: "/blog/ornith-1-0-35b-question",
      it: "/it/blog/ornith-1-0-35b-question"
    }
  }
};

export default function PostOrnithIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analisi · 8 min · 20 agosto 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        3,5 milioni di download, quasi nessuna traccia: la domanda su
        Ornith-1.0-35B
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        un modello da 35 miliardi di parametri di un account chiamato
        ornith-ai è comparso su Hugging Face a metà luglio, già impacchettato
        in GGUF, con licenza MIT — e nel nostro ultimo snapshot trending
        aveva più download dei recenti rilasci più importanti di DeepSeek,
        GLM o Qwen. Non troviamo una model card, un paper, o nient&apos;altro
        che di solito accompagna un successo di questa portata. Ecco cosa
        abbiamo controllato, e perché il modello non è ancora nella nostra
        directory.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Il repository ornith-ai/Ornith-1.0-35B-GGUF è comparso il 18 luglio —
        lo stesso giorno in cui i pesi di Kimi K3 dominavano ogni titolo
        sull&apos;AI, il che probabilmente spiega perché nessuno se ne sia
        accorto. Nello snapshot scaricato da questo sito il 24 agosto aveva
        accumulato 3.544.218 download e 1.053 like. Quella cifra di download
        lo colloca davanti a ogni modello nella top sedici di quella
        settimana, tranne quattro repository che accumulano traffico da più
        tempo: gpt2, gpt-oss-20b, Llama 3.1 8B e DeepSeek R1. Un modello da 35B nuovo di zecca,
        di un account sconosciuto, che supera in download GLM-5.2 e
        DeepSeek V4 Pro in cinque settimane è o un lancio davvero notevole o
        un numero che merita un secondo sguardo. Siamo andati a controllare.
      </p>

      <h2>I numeri che non tornano</h2>
      <p>
        Download e like sull&apos;Hub arrivano da popolazioni sovrapposte ma
        diverse: un like richiede che qualcuno stia sfogliando la pagina del
        repository e scelga di cliccare qualcosa, mentre i download possono
        arrivare da una singola persona, da una pipeline CI, da un mirror o
        da un harness di benchmark che tira gli stessi pesi a intervalli
        regolari. Per i repository davvero popolari le due cifre tendono
        comunque a muoversi insieme, perché è la stessa ondata di utenti
        coinvolti a guidare entrambe. Messi a confronto, i rapporti di
        Ornith stonano. DeepSeek-V4-Flash-0731 ha circa un like ogni 850
        download. GLM-5.2 è vicino a uno ogni 530. Ornith-1.0-35B si ferma a
        circa uno ogni 3.370 download — un rapporto diverse volte più sottile
        di qualsiasi voce comparabile nello stesso snapshot.
      </p>
      <p>
        Nulla di tutto questo prova qualcosa da solo. Alcuni repository di
        infrastruttura genuinamente utili vengono scaricati da pipeline
        automatiche molto più di quanto vengano apprezzati con un like, e un
        rapporto like/download sottile non è prova di irregolarità. È però
        esattamente il tipo di anomalia che i principi editoriali di questo
        sito dicono di attribuire invece di ignorare — eccola quindi,
        attribuita: un numero reale, dal nostro stesso snapshot, che non
        riusciamo a spiegare del tutto.
      </p>

      <h2>Cosa dice il repository, e cosa non dice</h2>
      <p>
        Abbiamo letto ciò che effettivamente c&apos;è. Nessuna model card
        scritta che descriva i dati di addestramento, la famiglia
        architetturale o il tokenizer. Nessun numero di benchmark, né
        dichiarato dal vendor né altrimenti. Nessun paper, nessuna pagina
        dell&apos;organizzazione oltre al singolo repository, nessuna
        discussione con più di una manciata di commenti. Le quantizzazioni
        GGUF sono state caricate direttamente dall&apos;account, invece di
        seguire il percorso abituale di un checkpoint base convertito in un
        secondo momento da un quantizzatore noto della community —
        bartowski, unsloth, mradermacher. Non è di per sé sospetto: molti
        laboratori pubblicano ormai le proprie build GGUF. È un dato in più
        in un repository che altrimenti non ne offre quasi nessuno.
      </p>
      <p>
        Una cosa torna: il file di licenza nei metadati del repository dice
        davvero MIT, il che almeno significa che la dichiarazione di
        licenza permissiva non è inventata. Ma “la licenza è vera” e “il
        modello è quello che sembra” sono affermazioni diverse, e da qui
        possiamo verificare solo la prima.
      </p>

      <h2>Come ci è arrivato addosso</h2>
      <p>
        Non abbiamo trovato Ornith sfogliando l&apos;Hub. Questo sito esegue
        un workflow settimanale di controllo freschezza del catalogo che
        segnala qualsiasi modello in trending il cui autore non corrisponda
        a nessuna delle famiglie nella nostra lista di copertura — ornith-ai
        non è l&apos;alias di nulla che tracciamo già, quindi ha superato
        quella soglia senza problemi, e il suo numero di like ha superato
        comodamente la soglia che il workflow usa per distinguere un
        candidato reale dal rumore. L&apos;esecuzione di lunedì l&apos;ha
        segnalato come candidato per una nuova famiglia, ed è l&apos;intera
        ragione per cui esiste questo articolo. L&apos;automazione ha fatto il
        suo lavoro; questo è il nostro.
      </p>

      <h2>Cosa stiamo facendo al riguardo</h2>
      <p>
        Per ora niente — ed è proprio questo il punto. La regola di questo
        sito per la <Link href="/it/models">directory</Link> e il{" "}
        <Link href="/it/picker">picker</Link> è che una voce si aggiunge
        dopo aver verificato la licenza e messo numeri hardware reali dietro
        alla scheda, non a partire da un numero di download da solo. Abbiamo
        lanciato noi stessi una manciata di prompt contro il GGUF; una
        manciata di prompt non è una suite di benchmark, e non pubblicheremo
        un giudizio di qualità costruito su quella base. Finché Ornith non
        supererà la stessa soglia che supera ogni altra voce della
        directory — una model card vera, oppure abbastanza test
        indipendenti da far smettere di pesare la sua assenza — resta fuori.
      </p>
      <p>
        La lezione più generale va oltre questo singolo repository. Una
        posizione in trending sull&apos;Hub è un segnale debole tra altri, non
        un verdetto. Prima di fidarti di una comparsa improvvisa in cima a
        una qualsiasi classifica — inclusa la{" "}
        <Link href="/it/trending">pagina trending</Link> di questo sito —
        controlla se i like seguono i download, se l&apos;account ha una
        storia oltre a un singolo caricamento, e se qualcuno ha scritto cosa
        sia davvero il modello. Vale per qualunque modello. Conta ancora di
        più per tutto ciò che faresti girare con accesso ai file o permessi
        sugli strumenti. Aggiorneremo questo articolo se ornith-ai
        pubblicherà una model card o se test indipendenti porteranno
        qualcosa di concreto. Fino ad allora, il numero di download compra
        curiosità, non una raccomandazione.
      </p>
    </article>
  );
}
