import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Installare Ollama e avviare il primo modello locale",
  description:
    "Da zero a un LLM locale funzionante in circa dieci minuti. Installa Ollama, scarica un modello, chatta dal terminale ed esponi un'API compatibile OpenAI.",
  alternates: {
    canonical: "https://runlocal.blog/it/guides/ollama",
    languages: {
      en: "https://runlocal.blog/guides/ollama",
      it: "https://runlocal.blog/it/guides/ollama"
    }
  }
};

export default function OllamaGuideIt() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Guida all&apos;installazione · Base · 10 min
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Installare Ollama e avviare il primo modello locale
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">Prima di iniziare:</strong>{" "}
        Ollama è un&apos;applicazione desktop gratuita. Scarica un modello di
        AI e lo esegue sul tuo computer, così puoi chattarci come con
        ChatGPT ma senza inviare nulla a internet. Servono almeno 8 GB
        di RAM. Una scheda video dedicata (NVIDIA, AMD) rende tutto molto
        più veloce ma non è obbligatoria.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Ollama è la strada più breve per avere un large language model in
        locale. Gestisce download, quantizzazione e offload su GPU, ed espone
        un&apos;API compatibile OpenAI su <code>localhost:11434</code>. Questa
        guida ti porta da una macchina pulita a un setup funzionante in circa
        dieci minuti. Se qualche termine ti suona nuovo, il{" "}
        <Link href="/it/glossary">glossario</Link> lo spiega in parole semplici.
      </p>

      <h2>Cosa ti serve prima di iniziare</h2>
      <p>
        Ollama gira su macOS, Linux e Windows. La quantità di RAM disponibile
        è il fattore principale che determina quali modelli puoi caricare
        realisticamente. Un riferimento rapido: un modello 8B quantizzato a
        4 bit richiede circa 5 GB di memoria, un 14B circa 9 GB, un 32B circa
        20 GB, un 70B circa 42 GB. I Mac con Apple Silicon beneficiano della
        memoria unificata; su un PC con GPU dedicata il modello deve stare
        nella VRAM per andare a piena velocità, altrimenti Ollama sconfina
        nella RAM di sistema con un costo notevole in prestazioni.
      </p>

      <h2>Passo 1. Installa Ollama</h2>
      <p>
        Su <strong>macOS e Windows</strong>, scarica l&apos;installer da{" "}
        <Link href="https://ollama.com/download" target="_blank" rel="noopener noreferrer">
          ollama.com/download
        </Link>
        . La versione macOS gira come app nella barra dei menu, quella Windows
        aggiunge un&apos;icona nella system tray. Entrambe rendono disponibile
        il comando <code>ollama</code> nel path.
      </p>
      <p>
        Su <strong>Linux</strong>, lo script ufficiale fa la cosa giusta sulla
        maggior parte delle distribuzioni:
      </p>
      <pre><code>{`curl -fsSL https://ollama.com/install.sh | sh`}</code></pre>
      <p>
        Lo script registra un servizio systemd chiamato <code>ollama.service</code>{" "}
        e avvia il daemon. Verifica che tutto sia a posto:
      </p>
      <pre><code>{`ollama --version
systemctl status ollama   # Linux only`}</code></pre>

      <h2>Passo 2. Scarica un primo modello</h2>
      <p>
        Per la prima prova scegli un modello piccolo, così vedi Ollama in
        funzione prima di impegnare la banda su qualcosa di più grande.
        Llama 3.1 8B o Qwen 3.5 7B sono scelte ragionevoli; girano bene con
        16 GB di memoria e il download si chiude in pochi minuti su una
        connessione normale.
      </p>
      <pre><code>{`ollama pull llama3.1:8b`}</code></pre>
      <p>
        Ollama salva i modelli in <code>~/.ollama/models</code> su macOS e
        Linux e in <code>%USERPROFILE%\\.ollama\\models</code> su
        Windows. Se il volume home è piccolo, imposta la variabile
        d&apos;ambiente <code>OLLAMA_MODELS</code> prima di avviare il
        servizio, puntandola a un disco più capiente.
      </p>

      <h2>Passo 3. Chatta con il modello dal terminale</h2>
      <pre><code>{`ollama run llama3.1:8b`}</code></pre>
      <p>
        Ottieni un prompt interattivo. Prova una domanda e guarda i token
        arrivare in streaming. Per uscire digita <code>/bye</code>. Per
        elencare i modelli locali usa <code>ollama list</code>. Per rimuoverne
        uno, <code>ollama rm llama3.1:8b</code>.
      </p>

      <h2>Passo 4. Usa l&apos;API compatibile OpenAI</h2>
      <p>
        Ollama espone un&apos;API HTTP su <code>http://localhost:11434</code>.
        L&apos;endpoint compatibile OpenAI si trova su <code>/v1</code>, quindi
        la maggior parte dei client scritti per gli SDK Python o JavaScript di
        OpenAI funziona cambiando due righe. Imposta la base URL e una API key
        segnaposto:
      </p>
      <pre><code>{`# Python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[{"role": "user", "content": "Explain MoE in two sentences."}],
)
print(response.choices[0].message.content)`}</code></pre>
      <p>
        Lo stesso trucco funziona in qualsiasi strumento che permette di
        cambiare la base URL dell&apos;API: estensioni AI per VS Code,
        LangChain, LlamaIndex, OpenWebUI e la maggior parte dei client di
        chat desktop.
      </p>

      <h2>Passo 5. Regola i parametri per il tuo hardware</h2>
      <p>
        Due variabili d&apos;ambiente contano fin dal primo giorno. <code>OLLAMA_NUM_PARALLEL</code>{" "}
        definisce quante richieste concorrenti Ollama serve; il valore
        predefinito va bene per uso personale, ma alzalo su server condivisi
        tra sviluppatori.{" "}
        <code>OLLAMA_KEEP_ALIVE</code> controlla per quanto tempo Ollama tiene
        il modello in memoria dopo l&apos;ultima richiesta; i cinque minuti
        predefiniti sono tempo sprecato se usi lo stesso modello tutto il
        giorno.
      </p>
      <pre><code>{`# Linux
sudo systemctl edit ollama
# add the following under [Service]
Environment="OLLAMA_NUM_PARALLEL=4"
Environment="OLLAMA_KEEP_ALIVE=24h"
sudo systemctl restart ollama`}</code></pre>

      <h2>Passo 6. Scegli un modello adatto al tuo lavoro</h2>
      <p>
        Quando l&apos;impianto funziona, il modello giusto dipende da cosa ci
        fai. Per scrittura e chat quotidiane, Llama 3.1 8B o Qwen 3.5 14B sono
        scelte sensate. Per il codice prova Qwen 2.5 Coder, DeepSeek Coder o
        Codestral. Per documenti lunghi e retrieval guarda Llama 4 Scout, se
        hai l&apos;hardware. La{" "}
        <Link href="/it/models">directory dei modelli</Link> spiega in cosa è
        davvero brava ogni famiglia.
      </p>

      <h2>Risoluzione dei problemi più comuni</h2>
      <h3>Il modello si carica ma le risposte sono lentissime</h3>
      <p>
        Quasi sempre significa che il modello è sconfinato dalla VRAM alla
        RAM di sistema. Scegli una quantizzazione più leggera (il tag <code>:q4_K_M</code>{" "}
        è un buon compromesso) oppure un modello più piccolo. Su Apple
        Silicon, verifica che Ollama stia usando il backend Metal; le versioni
        recenti lo fanno in automatico.
      </p>
      <h3>Ollama non trova la GPU</h3>
      <p>
        Su Linux con schede NVIDIA installa un driver aggiornato e il CUDA
        toolkit prima di installare Ollama. Su Windows i driver NVIDIA
        recenti includono già il supporto CUDA. Il supporto AMD ROCm c&apos;è
        ma è meno rodato; il progetto tiene traccia della compatibilità sul
        suo GitHub.
      </p>
      <h3>L&apos;API risponde 404 su /v1/chat/completions</h3>
      <p>
        Probabilmente hai una versione vecchia di Ollama. Il layer compatibile
        OpenAI è arrivato nel 2024 ed è stabile da allora. Aggiorna con{" "}
        <code>brew upgrade ollama</code> su macOS, con l&apos;installer su
        Windows o con lo script di installazione su Linux.
      </p>

      <h2>Prossimi passi</h2>
      <p>
        Con Ollama in funzione hai due strade naturali. Aggiungi{" "}
        <Link href="/it/tools">Open WebUI</Link> per un&apos;interfaccia di
        chat utilizzabile anche da altre persone sulla tua rete, oppure
        collega Ollama a un flusso di lavoro di programmazione con
        Continue.dev in VS Code. Per il massimo delle prestazioni su una
        singola macchina, la{" "}
        <Link href="/it/guides/llama-cpp">guida a llama.cpp</Link> spiega come
        compilare dai sorgenti con una quantizzazione su misura.
      </p>
    </article>
  );
}
