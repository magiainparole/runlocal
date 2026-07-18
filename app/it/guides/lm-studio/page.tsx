import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Configurare LM Studio e confrontare i modelli fianco a fianco",
  description:
    "Una guida pratica per usare LM Studio per scaricare, confrontare e servire modelli locali, con una nota su quando LM Studio è lo strumento sbagliato.",
  alternates: {
    canonical: "https://runlocal.blog/it/guides/lm-studio",
    languages: {
      en: "https://runlocal.blog/guides/lm-studio",
      it: "https://runlocal.blog/it/guides/lm-studio"
    }
  }
};

export default function LmStudioGuideIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Guida all&apos;installazione · Base · 12 min
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Configurare LM Studio e confrontare i modelli fianco a fianco
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">Prima di iniziare:</strong>{" "}
        LM Studio è un&apos;app desktop gratuita con una buona interfaccia
        di chat. Funziona su Mac, Windows e Linux. A differenza di Ollama,
        che dà il meglio quando esegui un modello già scelto, LM Studio è
        indicato quando vuoi provare qualche modello e metterlo a
        confronto con gli altri. Per un&apos;esperienza utile servono almeno
        16 GB di RAM.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        LM Studio è il client desktop più curato per eseguire modelli open
        weights sulla tua macchina. Sotto il cofano usa llama.cpp, e aggiunge
        un browser di modelli collegato a Hugging Face, una UI di chat e un
        server compatibile OpenAI attivabile con un clic. Il modo più breve
        per descrivere la sua nicchia: è lo strumento da usare quando vuoi
        valutare tre o quattro modelli sugli stessi prompt prima di
        sceglierne uno.
      </p>

      <h2>Quando LM Studio è lo strumento giusto</h2>
      <p>
        LM Studio si guadagna lo spazio su disco quando stai ancora decidendo
        quale modello eseguire. La UI di chat con confronto affiancato rende
        banale lanciare lo stesso prompt su più modelli e vedere le risposte
        comparire in parallelo. Per flussi del tipo &ldquo;avvia una chat con
        questo modello e basta&rdquo;, Ollama è più rapido; per servire utenti
        concorrenti in produzione, vLLM è una categoria diversa di strumento.
        LM Studio sta nel mezzo, per scelta.
      </p>

      <h2>Passo 1. Installa</h2>
      <p>
        Scarica l&apos;installer da{" "}
        <Link href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer">
          lmstudio.ai
        </Link>
        . Esistono build per macOS (Apple Silicon e Intel), Windows e
        Linux (AppImage). Il piano gratuito copre l&apos;uso personale e la
        maggior parte degli scenari aziendali; controlla la pagina delle
        licenze se prevedi un deployment interno su larga scala.
      </p>

      <h2>Passo 2. Scegli un primo modello</h2>
      <p>
        Apri l&apos;app, vai alla scheda Discover e cerca su Hugging Face
        direttamente da LM Studio. Qualche default ragionevole per iniziare:
      </p>
      <ul>
        <li>
          <strong>Llama 3.1 8B Instruct</strong> per la chat generica su
          macchine con almeno 16 GB di memoria.
        </li>
        <li>
          <strong>Qwen 2.5 14B Instruct</strong> se hai 24 GB o più e vuoi un
          ragionamento sensibilmente migliore.
        </li>
        <li>
          <strong>Phi-5 7B</strong> per un&apos;inferenza veloce su hardware più leggero.
        </li>
      </ul>
      <p>
        Per ogni modello LM Studio elenca le quantizzazioni GGUF caricate
        dalla community. Come punto di partenza cerca i file con tag <code>Q4_K_M</code>{" "}
        e controlla l&apos;indicatore &ldquo;Compatible with your hardware&rdquo;
        prima di scaricare.
      </p>

      <h2>Passo 3. Configura la chat</h2>
      <p>
        Apri la scheda Chat e carica il modello scaricato. Tre parametri da conoscere:
      </p>
      <ul>
        <li>
          <strong>GPU offload layers.</strong> Impostarlo al massimo consentito
          dalla tua VRAM è quasi sempre la scelta giusta. LM Studio mostra una
          stima della memoria richiesta per ogni valore.
        </li>
        <li>
          <strong>Lunghezza del contesto.</strong> Contesti più ampi usano più memoria.
          Parti dalla lunghezza di addestramento del modello e riducila se sei
          al limite con la VRAM.
        </li>
        <li>
          <strong>System prompt.</strong> Lascialo vuoto a meno che tu non
          abbia un motivo per vincolare il modello; molti template di UI
          applicano già un proprio system prompt che interagisce male con
          quelli personalizzati.
        </li>
      </ul>

      <h2>Passo 4. Esegui confronti affiancati</h2>
      <p>
        La sessione Multi-Model permette di caricare due o tre modelli e
        inviare lo stesso prompt a tutti. È qui che LM Studio si ripaga.
        Prepara un set di prompt che rappresenti il lavoro che fai davvero
        (un compito di codice, un riassunto, una domanda di ragionamento) e
        guarda le risposte arrivare in parallelo. Le decisioni prese in questo
        modo reggono meglio dei numeri delle classifiche di benchmark.
      </p>
      <p>
        Un kit di valutazione utile, volutamente piccolo:
      </p>
      <ol>
        <li>Una domanda fattuale la cui risposta corretta suona sbagliata.</li>
        <li>Un breve compito di codice con un edge case insidioso.</li>
        <li>Il riassunto di un testo più lungo di 1.500 parole.</li>
        <li>Una domanda di follow-up che verifica se il modello ha trattenuto il turno precedente.</li>
        <li>Un prompt di test sui rifiuti, per vedere come ogni modello gestisce i limiti.</li>
      </ol>

      <h2>Passo 5. Avvia il server locale</h2>
      <p>
        Vai alla scheda Developer, carica un modello e clicca Start Server. LM
        Studio espone un&apos;API compatibile OpenAI su{" "}
        <code>http://localhost:1234/v1</code>. Funziona con qualsiasi client
        che permetta di cambiare la base URL dell&apos;API. Attiva il CORS
        nelle impostazioni del server se prevedi di chiamarlo da un browser.
      </p>
      <pre><code>{`# Test it from the terminal
curl http://localhost:1234/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "loaded-model-id",
    "messages": [{"role": "user", "content": "Hello in 5 words."}]
  }'`}</code></pre>

      <h2>Consigli che fanno risparmiare tempo</h2>
      <ul>
        <li>
          Salva i modelli sul disco più capiente che hai. LM Studio ha
          un&apos;impostazione per la directory dei modelli; puntarla a un SSD
          esterno evita di riempire il disco di avvio.
        </li>
        <li>
          Usa la colonna &ldquo;Estimate&rdquo; nel browser dei modelli. I
          numeri sono in genere accurati entro il 10% su Apple Silicon ed
          entro il 15% su NVIDIA.
        </li>
        <li>
          Per il codice, imposta il chat template a mano. LM Studio lo rileva
          da solo quasi sempre, ma un template sbagliato degrada la qualità
          in silenzio ed è difficile da diagnosticare.
        </li>
      </ul>

      <h2>Quando lasciare LM Studio</h2>
      <p>
        Due uscite naturali. Se ti fermi su un singolo modello e lo vuoi
        sempre disponibile con un ingombro ridotto, spostalo su{" "}
        <Link href="/it/guides/ollama">Ollama</Link>. Se vuoi la massima velocità
        su Apple Silicon o un controllo fine della quantizzazione, compila{" "}
        <Link href="/it/guides/llama-cpp">llama.cpp</Link> dai sorgenti. LM Studio
        è un buon ambiente di valutazione, ma alla lunga conviene altro sia
        per la produttività a utente singolo sia per il serving multi-utente.
      </p>
    </article>
  );
}
