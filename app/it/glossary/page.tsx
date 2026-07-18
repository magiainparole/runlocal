import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossario — l'AI locale in parole semplici",
  description:
    "Le definizioni dei termini che incontri di continuo quando si parla di AI locale: open weight, quantizzazione, VRAM, finestra di contesto, token, inferenza e tutti gli altri.",
  alternates: {
    canonical: "https://runlocal.blog/it/glossary",
    languages: {
      en: "https://runlocal.blog/glossary",
      it: "https://runlocal.blog/it/glossary"
    }
  }
};

type Term = {
  term: string;
  short: string;
  long: string;
};

const terms: Term[] = [
  {
    term: "LLM (Large Language Model)",
    short: "Il tipo di AI dietro ChatGPT, Claude e i modelli di questo sito.",
    long: "Una rete neurale addestrata su enormi quantità di testo per prevedere la parola successiva in una frase. Quando chatti con un modello, stai guardando quella previsione ripetersi molte volte di fila, a grande velocità."
  },
  {
    term: "Open weight",
    short: "Un modello i cui numeri interni sono pubblici, quindi puoi scaricarlo ed eseguirlo da solo.",
    long: "Quando un modello è 'open weight', l'azienda che lo ha addestrato ha pubblicato il file che contiene i parametri del modello. Puoi scaricare quel file, eseguire il modello sul tuo computer, esaminarlo o modificarlo. Attenzione a distinguere 'open weight' da 'open source': il codice di addestramento e i dati possono restare privati. Anche la licenza sui pesi varia molto, da molto permissiva (MIT, Apache 2.0) a restrittiva (alcuni usi commerciali vietati)."
  },
  {
    term: "Open source",
    short: "Più rigoroso di open weight: anche codice, dati e processo di addestramento sono pubblici.",
    long: "Una licenza open source approvata dall'OSI copre il codice sorgente e, nel caso dell'AI, anche i dati di addestramento, il codice di addestramento e i checkpoint intermedi. Pochissimi LLM rientrano in questa definizione rigorosa. OLMo dell'Allen Institute ed EuroLLM sono due esempi."
  },
  {
    term: "Inferenza (inference)",
    short: "Eseguire un modello già addestrato per ottenere una risposta a un prompt.",
    long: "L'addestramento è la parte costosa: può costare milioni di dollari e richiedere settimane. L'inferenza è la parte economica: dai al modello addestrato un prompt e lui produce una risposta. Questo sito parla solo di inferenza. L'addestramento è un altro sport."
  },
  {
    term: "Token",
    short: "I pezzi in cui il modello spezza il testo. Circa un token ogni 3–4 caratteri di testo inglese.",
    long: "I modelli non leggono le parole come fai tu. Spezzano il testo in 'token', che di solito sono lunghi pochi caratteri ciascuno. 'Hello' può essere un token, 'tokenization' può essere tre. Il numero di token conta perché determina la dimensione della finestra di contesto del modello e quanta memoria consuma l'inferenza."
  },
  {
    term: "Finestra di contesto (context window)",
    short: "Quanto testo il modello riesce a tenere a mente in una volta, misurato in token.",
    long: "Una finestra di contesto di 8.000 token equivale grosso modo a 6.000 parole inglesi: un articolo lungo. 128.000 token si avvicinano a un libro breve. 1 milione di token è l'intera trilogia del Signore degli Anelli. Più la finestra è grande, più memoria e tempo servono al modello per elaborarla."
  },
  {
    term: "Quantizzazione (quantization)",
    short: "Comprimere il modello perché occupi meno memoria, con un piccolo costo in qualità.",
    long: "Un modello è una lunga lista di numeri. Ogni numero occupa 16 o 32 bit quando il modello esce dall'addestramento. La quantizzazione riscrive quei numeri usando meno bit (di solito 4, 5 o 8), così il file del modello si riduce. Il compromesso è la precisione: una versione a 4 bit usa circa un quarto della memoria di una a 16 bit, con una perdita di qualità piccola ma misurabile. Per la maggior parte degli utenti, una quantizzazione a 4 o 5 bit è il punto di equilibrio."
  },
  {
    term: "GGUF",
    short: "Il formato di file usato da llama.cpp e dalla maggior parte degli strumenti desktop per LLM.",
    long: "GGUF è il contenitore binario che racchiude un modello quantizzato più i metadati necessari a caricarlo. Quando scarichi un 'modello GGUF' da Hugging Face, stai scaricando un file per ciascuna variante di quantizzazione. Il formato funziona su macOS, Windows, Linux, Android e iOS, ed è per questo che è diventato lo standard dell'AI locale."
  },
  {
    term: "VRAM",
    short: "La memoria che vive sulla scheda grafica. Più veloce della RAM di sistema, ma limitata.",
    long: "Le GPU dedicate (NVIDIA, AMD, Intel Arc) hanno una memoria propria chiamata VRAM. Una RTX 4090 ne ha 24 GB, una A100 ne ha 80. Per l'inferenza, il modello deve stare nella VRAM per andare alla massima velocità; sconfinare nella RAM di sistema rallenta tutto in modo drastico."
  },
  {
    term: "Memoria unificata (unified memory)",
    short: "Il pool di memoria condiviso di Apple Silicon, usato insieme da CPU e GPU.",
    long: "Sui Mac con Apple Silicon (chip M1, M2, M3, M4), CPU e GPU condividono un unico pool di memoria, chiamato appunto memoria unificata. Un Mac con 32 GB di memoria unificata può quindi usarla tutta per l'inferenza, senza copie tra CPU e GPU. Il vantaggio è tanta memoria disponibile in rapporto al prezzo; lo svantaggio è una velocità di picco inferiore rispetto alle schede NVIDIA dedicate."
  },
  {
    term: "KV cache",
    short: "Memoria extra che il modello usa mentre genera ogni nuovo token.",
    long: "Abbreviazione di 'key-value cache'. Mentre il modello produce i token uno alla volta, mette in cache i risultati intermedi, così ogni nuovo token non richiede di rileggere tutto il contesto. La KV cache cresce con la lunghezza del contesto: un modello che sta in memoria a 4.000 token può sforare a 32.000."
  },
  {
    term: "GPU offload (layers)",
    short: "Dire al motore di inferenza quanta parte del modello mettere sulla GPU.",
    long: "Quando un modello è troppo grande per stare tutto nella VRAM, puoi dividerlo: alcuni layer girano sulla GPU, il resto sulla CPU. Si configura in llama.cpp e Ollama tramite l'impostazione 'GPU layers'. Tutto su GPU è la soluzione più veloce; la modalità mista è più lenta, ma ti permette di eseguire modelli più grandi di quanto la tua VRAM consentirebbe."
  },
  {
    term: "Ollama",
    short: "Il modo più semplice per eseguire un modello in locale. Un'installazione, un comando.",
    long: "Ollama è un'applicazione desktop che si occupa di scaricare, configurare e servire gli LLM locali. Dopo averla installata, esegui qualcosa come 'ollama run llama3.1:8b' e inizi a chattare. Sotto il cofano usa llama.cpp; il valore che Ollama aggiunge è la comodità, più un'API compatibile con OpenAI a cui gli altri strumenti possono collegarsi."
  },
  {
    term: "llama.cpp",
    short: "Il motore sotto la maggior parte degli strumenti LLM locali. Codice C++ che esegue i modelli in modo efficiente.",
    long: "llama.cpp è un'implementazione open source in C e C++ che esegue gli LLM su hardware consumer. Supporta CUDA (NVIDIA), Metal (Apple), ROCm (AMD), Vulkan (multi-vendor) e la sola CPU. La maggior parte degli strumenti desktop per LLM, compresi Ollama, LM Studio e GPT4All, usa llama.cpp al proprio interno. Compilarlo dai sorgenti è per chi vuole il massimo controllo."
  },
  {
    term: "vLLM",
    short: "Un server di inferenza di livello produzione, pensato per servire molti utenti insieme.",
    long: "vLLM è costruito per il caso in cui più persone mandano richieste allo stesso modello nello stesso momento. Usa tecniche come 'PagedAttention' e 'continuous batching' per mantenere alto il throughput sotto carico concorrente. Eccessivo per l'uso personale; la risposta giusta per un server di inferenza condiviso da un team."
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    short: "Uno schema in cui il modello riceve documenti pertinenti da leggere prima di rispondere.",
    long: "In parole semplici: invece di chiedere al modello cosa ricorda, prima cerchi in una raccolta di documenti i pezzi pertinenti, poi li passi al modello insieme alla domanda. La RAG è il meccanismo dietro gli strumenti per 'chattare con i tuoi documenti'. Strumenti come LangChain e LlamaIndex sono framework per costruire pipeline RAG."
  },
  {
    term: "MoE (Mixture of Experts)",
    short: "Un'architettura in cui solo una parte dei parametri lavora per ogni richiesta.",
    long: "I modelli 'densi' tradizionali attivano ogni parametro per ogni token. I modelli MoE si dividono in 'esperti' e fanno passare ogni token solo attraverso alcuni di loro. Il risultato è che un modello MoE da 100 miliardi di parametri può girare alla velocità di un denso da 20, mantenendo la qualità della taglia più grande. Llama 4 Scout e DeepSeek V4 sono modelli MoE molto noti."
  },
  {
    term: "Parametri / 'B'",
    short: "Quanto è grande il modello. 7B = 7 miliardi di parametri.",
    long: "I parametri sono i singoli numeri dentro la rete neurale. Più grande di solito significa più capace, ma anche più lento e più affamato di memoria. Un modello 7B è piccolo e veloce; un 70B è grande e capace; un 400B è di classe frontier e richiede hardware da datacenter. A parità di quantizzazione, la memoria cresce più o meno in modo lineare con il numero di parametri."
  },
  {
    term: "Varianti Instruct / Chat / Coder",
    short: "Stesso modello di base, rifinito per lavori diversi.",
    long: "Un modello 'base' è addestrato solo a completare il testo. Una variante 'instruct' o 'chat' è stata addestrata ulteriormente per seguire istruzioni e comportarsi in modo conversazionale. Una variante 'coder' è stata addestrata sul codice. Nel dubbio, scegli la variante instruct; il modello base serve soprattutto per la ricerca."
  },
  {
    term: "Hugging Face",
    short: "Il principale registro pubblico di modelli e dataset aperti.",
    long: "Hugging Face sta ai modelli AI come GitHub sta al codice sorgente. Lì vive la maggior parte dei modelli open weight, delle build GGUF e dei dataset. Il sito ha una ricerca propria e un sistema di 'like' della community. La sezione Trending di questo sito attinge dall'API pubblica di Hugging Face."
  },
  {
    term: "API compatibile OpenAI (OpenAI-compatible API)",
    short: "Un'interfaccia standard che quasi tutti gli strumenti locali sanno parlare.",
    long: "OpenAI ha definito l'API originale per chattare con un LLM (endpoint /v1/chat/completions e una struttura JSON nota). La maggior parte degli strumenti locali — Ollama, llama-server, vLLM, LM Studio — espone la stessa interfaccia su un URL diverso. Il vantaggio pratico è che quasi ogni client AI scritto per OpenAI funziona con un modello locale cambiando due righe."
  },
  {
    term: "Fascia di licenza (su questo sito)",
    short: "Un indizio visivo rapido su quanto liberamente puoi usare un modello.",
    long: "Nelle schede dei modelli coloriamo la licenza: verde per 'permissiva' (MIT, Apache 2.0, BSD — la usi ovunque), ambra per 'open weight' (licenze custom come Llama Community o Gemma Terms — utilizzabili ma con restrizioni), rosso per 'non commerciale' (solo ricerca). Il colore è una scorciatoia; prima di usare un modello per scopi commerciali, leggi il testo effettivo della licenza."
  }
];

export default function GlossaryPageIt() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Glossario
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          I termini dell'AI locale, spiegati in parole semplici.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Ogni pagina di questo sito rimanda qui la prima volta che usa un
          termine tecnico. Leggi dall'inizio alla fine per un percorso guidato,
          oppure scorri fino al termine che ti serve. Non serve alcuna
          conoscenza pregressa.
        </p>
      </header>

      <div className="space-y-8">
        {terms.map((t) => (
          <article
            key={t.term}
            id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
            className="border-b border-slate-200 dark:border-slate-800 pb-7 last:border-b-0"
          >
            <h2 className="text-xl font-semibold tracking-tight">{t.term}</h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300 italic">
              {t.short}
            </p>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.long}
            </p>
          </article>
        ))}
      </div>

      <aside className="mt-12 rounded-xl bg-brand/5 border border-brand/30 p-5 text-sm leading-relaxed">
        <p className="text-slate-700 dark:text-slate-300">
          Ti manca un termine che continui a incontrare in giro e qui non
          trovi? Il sorgente del sito è su GitHub: apri una issue con la
          parola e lo aggiungeremo.
        </p>
      </aside>
    </div>
  );
}
