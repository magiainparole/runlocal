import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GLM-5.3 sono due modelli diversi con lo stesso numero di versione",
  description:
    "Z.ai ha pubblicato un GLM-5.2 da 753B riaddestrato, con una licenza nuova, e un modello da 321B costruito da zero sotto MIT, e li ha chiamati allo stesso modo. Quello da tenere d’occhio è il più piccolo, appena llama.cpp lo supporterà.",
  alternates: {
    canonical: "/it/blog/glm-5-3-two-models-one-name",
    languages: {
      en: "/blog/glm-5-3-two-models-one-name",
      it: "/it/blog/glm-5-3-two-models-one-name"
    }
  }
};

export default function PostGlm53It() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analisi · 7 min · 29 settembre 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        GLM-5.3 sono due modelli diversi con lo stesso numero di versione
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In parole semplici:</strong>{" "}
        nel giro di qualche settimana il laboratorio cinese Z.ai ha
        rilasciato due modelli che si chiamano entrambi GLM-5.3. Quello
        grande ha bisogno di un data center e arriva con una licenza che
        contiene una condizione nuova. Quello più piccolo è nuovo di zecca,
        capisce le immagini oltre al testo e ha la licenza MIT, una delle
        più permissive che ci siano, però il software gratuito che quasi
        tutti usano per far girare i modelli in casa ancora non riesce a
        caricarlo. Qui proviamo a mettere ordine.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Se questo mese vi capita di leggere &ldquo;GLM-5.3&rdquo; in una
        tabella di benchmark, conviene controllare di quale dei due si
        parla. Il repository zai-org/GLM-5.3 contiene un modello da 753
        miliardi di parametri con circa 1,4 milioni di download. Quello
        chiamato GLM-5.3-Flash ne contiene uno da 321 miliardi, con circa
        5,1 milioni di download. Hanno in comune il numero di versione, il
        tokenizer e il report tecnico, e poco altro.
      </p>

      <h2>Il grande è un GLM-5.2 con altro addestramento sopra</h2>
      <p>
        Lo scrive Z.ai stessa sulla scheda del modello: GLM-5.3 usa lo
        stesso modello base di GLM-5.2, e tutti i miglioramenti vengono dal
        post-training. Quelli dichiarati sul coding agentico sono grossi.
        Terminal Bench 3.0 passa da 4,6 a 28,3, DeepSWE da 46,2 a 66,9, e
        Z.ai rivendica i migliori risultati di coding mai visti su un
        modello open weight. Riporta anche, con quella che sembra una certa
        sorpresa, che durante il post-training le capacità offensive in
        ambito cyber sono cresciute più in fretta del previsto: su
        ExploitGym GLM-5.3 fa più del triplo di GLM-5.2. È tutta roba della
        tabella di Z.ai, misurata usando Claude Code come ambiente per
        l’agente, e nessuno l’ha ancora riprodotta in modo indipendente.
      </p>
      <p>
        La cosa cambiata senza troppo rumore è la licenza. GLM-5.2 era MIT.
        GLM-5.3 esce con una &ldquo;GLM-5.3 License&rdquo; che sembra una
        MIT con una clausola in più: un’azienda che vende accesso ai
        modelli come servizio, e il cui gruppo fattura più di dieci
        miliardi di dollari in dodici mesi, prima di usare il modello a
        fini commerciali deve superare una revisione di sicurezza di Z.ai.
        Per chi legge questo sito in pratica non cambia nulla, a meno che
        non siate un hyperscaler. Resta comunque un passo via da una
        licenza standard, nella stessa direzione presa da Alibaba con il
        Qwen da 2,4T, ed è il motivo per cui la nostra{" "}
        <Link href="/it/frontier">pagina Frontier</Link> ora classifica
        GLM-5.3 come open weight e non più come permissivo.
      </p>
      <p>
        Quanto a farlo girare: il GGUF più piccolo di unsloth, UD-IQ1_S,
        pesa circa 217 GB, UD-Q2_K_XL 254 GB e UD-Q4_K_XL 467 GB. Una
        workstation da 256 GB in teoria carica la build a 1 bit, ma prima
        di arrivare a un server non esiste una configurazione in cui sia
        uno strumento comodo da usare tutti i giorni. Sulla pagina Frontier
        prende il posto di GLM-5.2, ed è lì che deve stare.
      </p>

      <h2>Il Flash è un modello nuovo, ed è quello interessante</h2>
      <p>
        GLM-5.3-Flash parte da un modello base addestrato da capo. È il
        primo GLM nativamente multimodale, ha 321 miliardi di parametri di
        cui circa 18 attivi per token, e mescola due tipi di attenzione, tre
        livelli ad attenzione lineare per ogni livello ad attenzione
        sparsa, che è il modo in cui arriva a un contesto da un milione di
        token senza il costo in memoria di una cache da un milione di
        token. La licenza è MIT, quella normale, senza clausole aggiunte.
        Z.ai dice che batte GLM-5.2 su tutta la linea a un decimo del
        prezzo dell’API, e anche qui i numeri sono i loro.
      </p>
      <p>
        I download ripetono, da un’angolazione un po’ diversa, il discorso
        che avevamo fatto il mese scorso su{" "}
        <Link href="/it/blog/qwen-3-8-27b-the-release-that-landed">Qwen 3.8</Link>.
        Il Flash ha quasi quattro volte i download del modello grande, e la
        sola conversione GGUF di unsloth si avvicina al milione. La gente
        non aspetta l’ammiraglia, scarica il modello che per taglia e
        licenza le permette di farci qualcosa.
      </p>
      <p>
        Come memoria sta nella stessa fascia di{" "}
        <Link href="/it/blog/deepseek-v4-flash-0731-checkpoint-refresh">DeepSeek V4 Flash</Link>.
        Le build di unsloth vanno da circa 98 GB per UD-IQ1_M a 109 GB per
        UD-Q2_K_XL fino a 200 GB per UD-Q4_K_XL, quindi un Mac da 128 GB o
        una workstation con altrettanta memoria unificata o di sistema
        riesce a tenere la build a 2 bit con un po’ di spazio per il
        contesto.
      </p>

      <h2>Perché non è nel picker</h2>
      <p>
        L’attenzione ibrida per llama.cpp è una novità. La scheda di
        unsloth dice di far girare il GGUF con la loro pull request per
        llama.cpp oppure con Unsloth Desktop, il che significa che mentre
        scriviamo né una release ufficiale di llama.cpp né Ollama né LM
        Studio riescono a caricarlo. Lo trovate nella{" "}
        <Link href="/it/models">directory dei modelli</Link> con le
        dimensioni qui sopra, e lo aggiungeremo al{" "}
        <Link href="/it/picker">picker</Link> quando il supporto arriverà in
        una release di llama.cpp. Stampare un comando che dipende da una
        pull request non ancora accettata vorrebbe dire mandare la gente a
        sbattere, anche perché una pull request può cambiare forma parecchie
        volte prima di essere unita.
      </p>
      <p>
        Se avete 128 GB e vi piace compilare da sorgente, la strada c’è già
        e unsloth la documenta. Tutti gli altri facciano bene a restare su
        quello che già funziona alla loro taglia: GLM-4.7-Flash su una
        scheda da 24 GB, oppure DeepSeek V4 Flash su una macchina da 128 GB,
        che girano entrambi sul llama.cpp ufficiale e sono nel picker con
        file verificati.
      </p>

      <h2>Occhio ai nomi</h2>
      <p>
        Dare lo stesso numero di versione a un vecchio modello base
        riaddestrato e a un’architettura davvero nuova è una scelta di
        Z.ai, e gli aggregatori di benchmark non sempre dicono quale dei
        due hanno provato. Quando un grafico riporta &ldquo;GLM-5.3&rdquo;
        con numeri che sembrano troppo belli per un 753B che non potete far
        girare, o troppo modesti per l’ammiraglia, guardate il nome del
        repository prima di trarre conclusioni. Nelle nostre pagine i due
        compaiono sempre col nome completo.
      </p>
    </article>
  );
}
