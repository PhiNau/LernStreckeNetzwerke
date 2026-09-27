'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Code2,
  Lightbulb,
  Network,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Progress,
  ProgressLabel,
} from '@/components/ui/progress';

const stations = [
  ['Startsignal', 'FILIUS kennt ihr schon', '5 min'],
  ['Adresse & Transport', 'IP, Port und TCP', '15 min'],
  ['Gemeinsame Sprache', 'Was ist ein Protokoll?', '15 min'],
  ['Web-Kommunikation', 'HTTP verstehen', '15 min'],
  ['Dialog mit Regeln', 'POP3 analysieren', '20 min'],
  ['Java-Verbindung', 'Die Klasse Connection', '20 min'],
  ['Nachrichten empfangen', 'Connection oder Client?', '15 min'],
  ['Ereignisse behandeln', 'Was macht der Server?', '15 min'],
  ['Transfer', 'Dein eigenes Protokoll', '25 min'],
] as const;

type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: string;
  success: string;
  hint?: string;
};

type StationProps = {
  done: boolean;
  onComplete: () => void;
  onNext: () => void;
};

function Feedback({
  correct,
  children,
}: {
  correct: boolean;
  children: React.ReactNode;
}) {
  return (
    <output
      className={`mt-5 rounded-xl border p-4 ${
        correct
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-amber-200 bg-amber-50'
      }`}
    >
      <div className="flex gap-3">
        {correct ? (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
        ) : (
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-700" />
        )}
        <p className="text-sm font-medium leading-6 text-slate-800">{children}</p>
      </div>
    </output>
  );
}

function QuizSequence({
  questions,
  onComplete,
  completeLabel = 'Station abschließen',
}: {
  questions: QuizQuestion[];
  onComplete: () => void;
  completeLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const question = questions[index];
  const correct = selected === question.answer;

  function continueQuiz() {
    if (index === questions.length - 1) {
      onComplete();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-2" aria-label="Aufgabenfortschritt">
        {questions.map((item, itemIndex) => (
          <span
            key={item.prompt}
            className={`h-1.5 flex-1 rounded-full ${
              itemIndex < index || (itemIndex === index && correct)
                ? 'bg-emerald-400'
                : itemIndex === index
                  ? 'bg-cyan-400'
                  : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        Aufgabe {index + 1} von {questions.length}
      </p>
      <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-950">
        {question.prompt}
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const chosen = selected === option;
          const isAnswer = question.answer === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              disabled={correct}
              className={`min-h-14 rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200 disabled:cursor-default sm:text-base ${
                chosen && isAnswer
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                  : chosen
                    ? 'border-rose-300 bg-rose-50 text-rose-950'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-cyan-300 hover:bg-cyan-50'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected && (
        <Feedback correct={correct}>
          {correct
            ? question.success
            : question.hint ??
              'Noch nicht ganz. Prüfe, welche Aufgabe der gesuchte Baustein übernimmt.'}
        </Feedback>
      )}
      {correct && (
        <div className="mt-5 flex justify-end">
          <Button
            size="lg"
            onClick={continueQuiz}
            className="min-h-12 rounded-xl bg-slate-950 px-5 text-white"
          >
            {index === questions.length - 1
              ? completeLabel
              : 'Nächste Aufgabe'}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function SortTask({
  items,
  correctOrder,
  onComplete,
  label,
}: {
  items: string[];
  correctOrder: string[];
  onComplete: () => void;
  label: string;
}) {
  const [pool, setPool] = useState(items);
  const [ordered, setOrdered] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const correct =
    checked && ordered.every((item, index) => item === correctOrder[index]);

  function add(item: string) {
    if (checked) return;
    setPool((value) => value.filter((entry) => entry !== item));
    setOrdered((value) => [...value, item]);
  }

  function reset() {
    setPool(items);
    setOrdered([]);
    setChecked(false);
  }

  function check() {
    setChecked(true);
    if (ordered.every((item, index) => item === correctOrder[index])) {
      onComplete();
    }
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
        Klick-Sortierung
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{label}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Tippe die Elemente nacheinander in der richtigen Reihenfolge an.
      </p>
      <div className="mt-5 min-h-24 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-3">
        {ordered.length === 0 ? (
          <p className="grid min-h-16 place-items-center text-sm text-slate-400">
            Deine Reihenfolge erscheint hier.
          </p>
        ) : (
          <ol className="space-y-2">
            {ordered.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-md bg-slate-950 font-mono text-xs text-cyan-300">
                  {index + 1}
                </span>
                <code className="whitespace-pre-wrap font-mono">{item}</code>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {pool.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => add(item)}
            className="min-h-12 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left font-mono text-sm font-bold text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-between gap-3">
        <Button variant="outline" size="lg" onClick={reset} className="min-h-12 rounded-xl">
          <RotateCcw className="size-4" /> Neu sortieren
        </Button>
        <Button
          size="lg"
          onClick={check}
          disabled={ordered.length !== items.length}
          className="min-h-12 rounded-xl bg-slate-950 px-5 text-white"
        >
          Reihenfolge prüfen <Check className="size-4" />
        </Button>
      </div>
      {checked && (
        <Feedback correct={correct}>
          {correct
            ? 'Die Reihenfolge stimmt. Nicht nur die Befehle, auch ihr zulässiger Ablauf gehört zum Protokoll.'
            : 'Die Reihenfolge passt noch nicht. Setze zurück und achte auf Anmeldung, Aktion und Abschluss.'}
        </Feedback>
      )}
    </div>
  );
}

function StationFrame({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-7">
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
          {kicker}
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          {lead}
        </p>
      </div>
      {children}
    </>
  );
}

function TaskCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-0 bg-white shadow-[0_24px_70px_rgba(15,23,42,.10)] ring-slate-200">
      <CardHeader className="border-b border-slate-100 sm:px-7 sm:py-6">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800">
            <Lightbulb className="size-5" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-950">
              {title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm leading-6">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-7">{children}</CardContent>
    </Card>
  );
}

function CompletedBanner({ onNext, text }: { onNext: () => void; text: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="font-bold text-emerald-950">Station geschafft.</p>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-emerald-800">{text}</p>
      </div>
      <Button
        onClick={onNext}
        className="mt-4 min-h-12 rounded-xl bg-emerald-700 px-5 text-white sm:mt-0"
      >
        Weiter <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function Station0({ done, onComplete, onNext }: StationProps) {
  const questions: QuizQuestion[] = [
    {
      prompt: '„Bestimmt den Zielrechner.“',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'IP-Adresse',
      success: 'Richtig. Die IP-Adresse identifiziert den Rechner im Netzwerk.',
    },
    {
      prompt: '„Bestimmt den Dienst auf dem Zielrechner.“',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'Port',
      success: 'Genau. Der Port wählt das konkrete Programm oder den Dienst aus.',
    },
    {
      prompt: '„Stellt eine zuverlässige Verbindung bereit.“',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'TCP',
      success: 'Richtig. TCP sorgt für eine geordnete, zuverlässige Übertragung.',
    },
    {
      prompt: '„Legt Bedeutung und Reihenfolge von Nachrichten fest.“',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'Protokoll',
      success: 'Genau. Ein Protokoll ist die gemeinsame Sprache der Programme.',
    },
  ];

  return (
    <StationFrame
      kicker="Startsignal"
      title="Verbunden. Aber verstehen sich die Programme?"
      lead="Ein Client erreicht den Server. Jetzt fehlen noch zwei Dinge: die richtige Anwendung – und eine gemeinsame Sprache."
    >
      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="rounded-xl bg-slate-950 p-3 text-center font-mono text-sm font-bold text-cyan-300">
          CLIENT
        </div>
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-cyan-400" />
          <span className="size-1.5 rounded-full bg-cyan-400" />
          <span className="size-1.5 rounded-full bg-cyan-400" />
        </div>
        <div className="rounded-xl border-2 border-slate-950 p-3 text-center font-mono text-sm font-bold text-slate-950">
          SERVER
        </div>
      </div>
      <TaskCard
        title="Vier Bausteine, vier Aufgaben"
        description="Tippe auf den passenden Begriff. Du bekommst sofort eine Erklärung."
      >
        <QuizSequence questions={questions} onComplete={onComplete} />
      </TaskCard>
      {done && (
        <CompletedBanner
          onNext={onNext}
          text="Als Nächstes trennen wir Rechner, Dienst und Transport genauer voneinander."
        />
      )}
    </StationFrame>
  );
}

function Station1({ done, onComplete, onNext }: StationProps) {
  const questions: QuizQuestion[] = [
    {
      prompt: 'Was bezeichnet in 10.0.0.15:110 die Angabe 10.0.0.15?',
      options: ['Den Zielrechner', 'Das Programm', 'Die Nachricht', 'Die Reihenfolge'],
      answer: 'Den Zielrechner',
      success: 'Richtig. Die IP-Adresse führt die Daten zum Zielrechner.',
    },
    {
      prompt: 'Was wählt die Portnummer 110 aus?',
      options: ['Das Kabel', 'Den POP3-Dienst', 'Die IP-Adresse', 'Den Absender'],
      answer: 'Den POP3-Dienst',
      success: 'Genau. Port 110 ist dem POP3-Dienst zugeordnet.',
    },
    {
      prompt: 'Können mehrere Anwendungen dieselbe IP-Adresse verwenden?',
      options: ['Ja, über verschiedene Ports', 'Nein, niemals', 'Nur ohne TCP', 'Nur im WLAN'],
      answer: 'Ja, über verschiedene Ports',
      success: 'Richtig. Ein Rechner kann viele Dienste über verschiedene Ports anbieten.',
    },
  ];

  return (
    <StationFrame
      kicker="Adresse & Transport"
      title="Ein Rechner, mehrere Türen"
      lead="Die IP-Adresse bringt Daten zum richtigen Rechner. Der Port ist die nummerierte Tür zur richtigen Anwendung."
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['80', 'Webserver', 'HTTP'],
          ['443', 'Webserver', 'HTTPS'],
          ['110', 'Mailserver', 'POP3'],
          ['5000', 'Java-Programm', 'eigen'],
        ].map(([port, service, kind]) => (
          <div key={port} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-mono text-2xl font-black text-slate-950">:{port}</p>
            <p className="mt-1 text-sm font-bold text-slate-700">{service}</p>
            <Badge variant="outline" className="mt-3 bg-slate-50">{kind}</Badge>
          </div>
        ))}
      </div>
      <div className="mb-6 rounded-2xl bg-slate-950 p-5 text-slate-200 sm:flex sm:items-center sm:gap-5">
        <div className="mb-3 grid size-12 place-items-center rounded-xl bg-cyan-300 font-mono font-black text-slate-950 sm:mb-0">TCP</div>
        <p className="text-sm leading-6">
          TCP baut die Verbindung auf, hält Daten in der richtigen Reihenfolge und lässt verlorene Daten erneut übertragen.
        </p>
      </div>
      <TaskCard title="Analysiere einen Endpunkt" description="Trenne Rechner, Dienst und Transport sauber voneinander.">
        <QuizSequence questions={questions} onComplete={onComplete} />
      </TaskCard>
      {done && <CompletedBanner onNext={onNext} text="Die Verbindung steht. Nun müssen beide Programme dieselbe Sprache sprechen." />}
    </StationFrame>
  );
}

function Station2({ done, onComplete, onNext }: StationProps) {
  const questions: QuizQuestion[] = [
    {
      prompt: 'Ein Netzwerkprotokoll ist eine Menge von …',
      options: ['Regeln', 'Kabeln', 'Rechnern', 'Ports'],
      answer: 'Regeln',
      success: 'Richtig. Ein Protokoll beschreibt gemeinsame Regeln.',
    },
    {
      prompt: 'Diese Regeln legen fest, welche … ausgetauscht werden.',
      options: ['Nachrichten', 'Router', 'Festplatten', 'IP-Adressen'],
      answer: 'Nachrichten',
      success: 'Genau. Protokolle definieren mögliche Nachrichten.',
    },
    {
      prompt: 'Außerdem bestimmen sie Bedeutung und …',
      options: ['Reihenfolge', 'Bildschirmgröße', 'Stromverbrauch', 'Kabelfarbe'],
      answer: 'Reihenfolge',
      success: 'Richtig. Die Reihenfolge kann entscheiden, ob eine Nachricht zulässig ist.',
    },
  ];

  return (
    <StationFrame
      kicker="Gemeinsame Sprache"
      title="Eine Verbindung transportiert. Ein Protokoll erklärt."
      lead="Telefone verbinden zwei Personen technisch. Verständigung entsteht erst durch gemeinsame Sprache und Regeln."
    >
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 font-mono text-sm text-slate-100 shadow-sm">
        <div className="border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Beispieldialog</div>
        <div className="space-y-3 p-5">
          <p><span className="text-cyan-300">Client →</span> HALLO</p>
          <p><span className="text-emerald-300">Server ←</span> OK</p>
          <p><span className="text-cyan-300">Client →</span> DATEN</p>
          <p><span className="text-emerald-300">Server ←</span> 42</p>
          <p><span className="text-cyan-300">Client →</span> ENDE</p>
        </div>
      </div>
      <TaskCard title="Baue die Definition" description="Vervollständige die Arbeitsdefinition Schritt für Schritt.">
        <QuizSequence questions={questions} onComplete={onComplete} />
      </TaskCard>
      {done && <CompletedBanner onNext={onNext} text="Mit HTTP untersuchst du jetzt ein echtes Anwendungsprotokoll." />}
    </StationFrame>
  );
}

function Station3({ done, onComplete, onNext }: StationProps) {
  const [part, setPart] = useState('GET');
  const explanations: Record<string, string> = {
    GET: 'GET ist die Methode: Der Client möchte eine Ressource abrufen.',
    '/index.html': 'Das ist die angeforderte Ressource auf dem Server.',
    'HTTP/1.1': 'Hier steht die verwendete Protokollversion.',
    '200 OK': 'Der Statuscode 200 bedeutet: Anfrage erfolgreich.',
    'text/html': 'Der Content-Type beschreibt die Art des Antwortinhalts.',
  };
  const questions: QuizQuestion[] = [
    {
      prompt: 'Was übernimmt TCP bei einem Webzugriff?',
      options: ['Zuverlässige Übertragung', 'Bedeutung von GET', 'HTML gestalten', 'Statuscodes festlegen'],
      answer: 'Zuverlässige Übertragung',
      success: 'Richtig. TCP transportiert die Daten zuverlässig und geordnet.',
    },
    {
      prompt: 'Was übernimmt HTTP?',
      options: ['Struktur und Bedeutung der Nachrichten', 'Die IP-Vergabe', 'Die Funkverbindung', 'Den Rechnernamen'],
      answer: 'Struktur und Bedeutung der Nachrichten',
      success: 'Genau. HTTP definiert Request, Response, Methoden und Statuscodes.',
    },
    {
      prompt: 'Der Client sendet „HALLO SERVER“ an Port 80. Was ist das Kernproblem?',
      options: ['Die Nachricht entspricht nicht HTTP', 'TCP kann keine Texte senden', 'Port 80 existiert nicht', 'Der Server braucht keine Regeln'],
      answer: 'Die Nachricht entspricht nicht HTTP',
      success: 'Richtig. Die Verbindung kann stehen, aber der Webserver erwartet eine gültige HTTP-Nachricht.',
    },
  ];

  return (
    <StationFrame
      kicker="Web-Kommunikation"
      title="GET rein. Webseite raus."
      lead="HTTP legt fest, wie ein Browser eine Ressource anfordert und wie ein Webserver antwortet."
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-950 p-5 font-mono text-sm text-slate-100 shadow-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Request</p>
          <p className="leading-8">
            {['GET', '/index.html', 'HTTP/1.1'].map((token) => (
              <button key={token} type="button" onClick={() => setPart(token)} className="mr-2 rounded-md bg-white/8 px-2 py-1 text-cyan-300 outline-none ring-cyan-300 focus-visible:ring-2">{token}</button>
            ))}
          </p>
          <p className="mt-2 leading-8 text-slate-300">Host: beispiel.de</p>
        </div>
        <div className="rounded-2xl bg-white p-5 font-mono text-sm text-slate-800 shadow-sm ring-1 ring-slate-200">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Response</p>
          <p className="leading-8">HTTP/1.1 <button type="button" onClick={() => setPart('200 OK')} className="rounded-md bg-emerald-100 px-2 py-1 font-bold text-emerald-800">200 OK</button></p>
          <p className="leading-8">Content-Type: <button type="button" onClick={() => setPart('text/html')} className="rounded-md bg-cyan-100 px-2 py-1 font-bold text-cyan-900">text/html</button></p>
          <p className="mt-2 text-slate-400">&lt;html&gt; ... &lt;/html&gt;</p>
        </div>
      </div>
      <output className="mb-6 block rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm font-medium leading-6 text-cyan-950">{explanations[part]}</output>
      <TaskCard title="TCP oder HTTP?" description="Ordne Transport und Bedeutung auseinander.">
        <QuizSequence questions={questions} onComplete={onComplete} />
      </TaskCard>
      {done && <CompletedBanner onNext={onNext} text="Als Nächstes zeigt POP3, warum auch Zustände und Reihenfolgen zum Protokoll gehören." />}
    </StationFrame>
  );
}

function Station4({ done, onComplete, onNext }: StationProps) {
  const correctOrder = ['USER philipp', 'PASS geheim', 'STAT', 'RETR 1', 'QUIT'];
  return (
    <StationFrame
      kicker="Dialog mit Regeln"
      title="POP3 ist mehr als eine Befehlsliste"
      lead="Ein Mailserver erlaubt manche Nachrichten erst nach erfolgreicher Anmeldung. Der aktuelle Zustand zählt."
    >
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ['USER', 'Benutzer nennen'],
          ['PASS', 'Passwort senden'],
          ['STAT', 'Postfach prüfen'],
          ['RETR', 'Mail abrufen'],
          ['QUIT', 'Sitzung beenden'],
        ].map(([command, meaning]) => (
          <div key={command} className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <code className="font-mono text-sm font-black text-teal-700">{command}</code>
            <p className="mt-1 text-xs leading-5 text-slate-500">{meaning}</p>
          </div>
        ))}
      </div>
      <TaskCard title="Bringe den Dialog in Ordnung" description="Die Serverantworten +OK sind ausgeblendet. Sortiere die Client-Befehle.">
        <SortTask
          items={['RETR 1', 'QUIT', 'PASS geheim', 'STAT', 'USER philipp']}
          correctOrder={correctOrder}
          onComplete={onComplete}
          label="Was sendet der Client zuerst – und was zuletzt?"
        />
      </TaskCard>
      {done && <CompletedBanner onNext={onNext} text="Jetzt findest du dieselben Netzwerkideen im Java-Code der Klasse Connection wieder." />}
    </StationFrame>
  );
}

function Station5({ done, onComplete, onNext }: StationProps) {
  const [token, setToken] = useState('Connection');
  const explanations: Record<string, string> = {
    Connection: 'Connection ist der Kommunikationskanal zum Server.',
    '192.168.0.10': 'Die IP-Adresse bestimmt den Zielrechner.',
    '5000': 'Der Port bestimmt das Serverprogramm.',
    send: 'send(...) sendet eine Textzeile an den Server.',
    receive: 'receive() wartet auf eine Textzeile vom Server.',
    close: 'close() beendet die Verbindung.',
  };
  const order = ['Verbindung herstellen', 'Nachricht senden', 'Antwort empfangen', 'Verbindung schließen'];

  return (
    <StationFrame
      kicker="Java-Verbindung"
      title="Netzwerkbegriffe werden zu Code"
      lead="Die NRW-Klasse Connection versteckt viele Socket-Details. IP, Port, Senden, Empfangen und Schließen bleiben sichtbar."
    >
      <div className="mb-6 overflow-hidden rounded-2xl bg-slate-950 shadow-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500"><Code2 className="size-4" /> Java-Exploration</div>
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-8 text-slate-300"><code>
          <button type="button" onClick={() => setToken('Connection')} className="rounded bg-white/8 px-1 text-cyan-300">Connection</button>{' verbindung = new Connection("'}<button type="button" onClick={() => setToken('192.168.0.10')} className="rounded bg-white/8 px-1 text-amber-300">192.168.0.10</button>{'", '}<button type="button" onClick={() => setToken('5000')} className="rounded bg-white/8 px-1 text-amber-300">5000</button>{');\n\nverbindung.'}<button type="button" onClick={() => setToken('send')} className="rounded bg-white/8 px-1 text-emerald-300">send</button>{'("HALLO");\nString antwort = verbindung.'}<button type="button" onClick={() => setToken('receive')} className="rounded bg-white/8 px-1 text-emerald-300">receive</button>{'();\nverbindung.'}<button type="button" onClick={() => setToken('close')} className="rounded bg-white/8 px-1 text-rose-300">close</button>{'();'}
        </code></pre>
      </div>
      <output className="mb-6 block rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm font-medium leading-6 text-cyan-950">{explanations[token]}</output>
      <TaskCard title="Vom Aufbau bis zum Ende" description="Sortiere den typischen Ablauf einer kurzen Anfrage.">
        <SortTask
          items={['Antwort empfangen', 'Verbindung schließen', 'Nachricht senden', 'Verbindung herstellen']}
          correctOrder={order}
          onComplete={onComplete}
          label="In welcher Reihenfolge arbeitet Connection?"
        />
      </TaskCard>
      {done && <CompletedBanner onNext={onNext} text="Connection wartet gezielt auf Antworten. Die Klasse Client kann zusätzlich jederzeit auf eintreffende Nachrichten reagieren." />}
    </StationFrame>
  );
}

function Station6({ done, onComplete, onNext }: StationProps) {
  const questions: QuizQuestion[] = [
    {
      prompt: 'Ein Programm fragt einmal die aktuelle Uhrzeit ab.',
      options: ['Connection', 'Client mit processMessage()', 'Server', 'Kein Netzwerk nötig'],
      answer: 'Connection',
      success: 'Richtig. Eine gezielte Anfrage mit direkter Antwort passt gut zu send() und receive().',
    },
    {
      prompt: 'Ein Chat soll jederzeit neue Nachrichten anzeigen.',
      options: ['Connection', 'Client mit processMessage()', 'Nur ein Port', 'HTTP GET'],
      answer: 'Client mit processMessage()',
      success: 'Genau. processMessage() reagiert, sobald eine Nachricht eintrifft.',
    },
    {
      prompt: 'Ein Spielserver sendet spontan einen neuen Spielstand.',
      options: ['Client mit processMessage()', 'Nur Connection.close()', 'POP3', 'Eine neue IP-Adresse'],
      answer: 'Client mit processMessage()',
      success: 'Richtig. Der Client muss unabhängig vom Hauptprogramm reagieren können.',
    },
  ];
  return (
    <StationFrame
      kicker="Nachrichten empfangen"
      title="Abfragen oder reagieren?"
      lead="Connection folgt meist send() → receive(). Client besitzt einen Hintergrundmechanismus und ruft bei neuen Nachrichten processMessage() auf."
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Badge className="bg-slate-950 text-white">Connection</Badge>
          <p className="mt-4 font-mono text-sm font-bold text-slate-900">send(...);<br />receive();</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Das Programm fragt eine Antwort aktiv ab.</p>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
          <Badge className="bg-cyan-700 text-white">Client</Badge>
          <p className="mt-4 font-mono text-sm font-bold text-slate-900">processMessage(...)</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Das Programm reagiert auf eintreffende Nachrichten.</p>
        </div>
      </div>
      <TaskCard title="Wähle das passende Modell" description="Entscheide aus Sicht des empfangenden Programms.">
        <QuizSequence questions={questions} onComplete={onComplete} />
      </TaskCard>
      {done && <CompletedBanner onNext={onNext} text="Auf der anderen Seite reagiert der Server auf neue Verbindungen, Nachrichten und Trennungen." />}
    </StationFrame>
  );
}

function Station7({ done, onComplete, onNext }: StationProps) {
  const questions: QuizQuestion[] = [
    {
      prompt: 'Anna verbindet sich mit dem Server.',
      options: ['processNewConnection(...)', 'processMessage(...)', 'processClosingConnection(...)', 'receive()'],
      answer: 'processNewConnection(...)',
      success: 'Richtig. Eine neue Verbindung löst processNewConnection(...) aus.',
    },
    {
      prompt: 'Anna sendet „LOGIN:Anna“.',
      options: ['processNewConnection(...)', 'processMessage(...)', 'processClosingConnection(...)', 'close()'],
      answer: 'processMessage(...)',
      success: 'Genau. Eingehende Inhalte werden in processMessage(...) behandelt.',
    },
    {
      prompt: 'Anna beendet das Programm.',
      options: ['processNewConnection(...)', 'processMessage(...)', 'processClosingConnection(...)', 'sendToAll()'],
      answer: 'processClosingConnection(...)',
      success: 'Richtig. Die Server-Unterklasse kann auf die Trennung reagieren.',
    },
  ];
  return (
    <StationFrame
      kicker="Ereignisse behandeln"
      title="Der Server reagiert auf drei Momente"
      lead="Threads und Socketverwaltung bleiben im Hintergrund. Für die eigene Unterklasse zählen drei klar erkennbare Netzwerkereignisse."
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        {[
          ['01', 'Neue Verbindung'],
          ['02', 'Nachricht'],
          ['03', 'Trennung'],
        ].map(([number, title], index) => (
          <div key={number} className="contents">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="font-mono text-xs font-bold text-teal-700">{number}</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{title}</p>
            </div>
            {index < 2 && <ArrowRight className="mx-auto hidden size-5 text-slate-300 sm:block" />}
          </div>
        ))}
      </div>
      <TaskCard title="Welches Ereignis ist das?" description="Ordne jede Situation der richtigen abstrakten Methode zu.">
        <QuizSequence questions={questions} onComplete={onComplete} />
      </TaskCard>
      <div className="mt-6 rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-200">
        <p><span className="text-violet-300">if</span> (pMessage.equals(<span className="text-amber-300">&quot;PING&quot;</span>)) {'{'}</p>
        <p className="pl-5">send(pClientIP, pClientPort, <span className="text-emerald-300">&quot;PONG&quot;</span>);</p>
        <p>{'}'}</p>
      </div>
      {done && <CompletedBanner onNext={onNext} text="Du kennst jetzt beide Seiten. Im Finale entwirfst du die gemeinsame Sprache selbst." />}
    </StationFrame>
  );
}

function Station8({ done, onComplete, onNext: _onNext }: StationProps) {
  const [checked, setChecked] = useState<number[]>([]);
  const questions: QuizQuestion[] = [
    {
      prompt: 'Wie meldet sich Anna beim Quizserver an?',
      options: ['LOGIN:Anna', 'QUESTION:Anna', 'USER', 'HELLO SERVER'],
      answer: 'LOGIN:Anna',
      success: 'Richtig. Befehl und Nutzdaten sind durch einen Doppelpunkt getrennt.',
    },
    {
      prompt: 'Wie fordert der Client eine neue Frage an?',
      options: ['QUESTION', 'ANSWER', 'GET /quiz', 'NEXT:OK'],
      answer: 'QUESTION',
      success: 'Genau. QUESTION ist ein klar definierter Client-Befehl.',
    },
    {
      prompt: 'Wie sendet der Client Auswahl C?',
      options: ['ANSWER:C', 'CORRECT:C', 'C', 'QUESTION:C'],
      answer: 'ANSWER:C',
      success: 'Richtig. Der Nachrichtentyp ANSWER trägt die Auswahl als Nutzdaten.',
    },
    {
      prompt: 'Was sollte auf den unbekannten Befehl BANANE folgen?',
      options: ['ERROR:Unbekannter Befehl', 'CORRECT', 'Keine Regel nötig', 'LOGIN:BANANE'],
      answer: 'ERROR:Unbekannter Befehl',
      success: 'Richtig. Ein robustes Protokoll definiert auch Fehlerantworten.',
    },
  ];
  const goals = [
    'IP-Adresse und Port unterscheiden',
    'TCP und Anwendungsprotokoll trennen',
    'HTTP- und POP3-Nachrichten analysieren',
    'send(), receive() und close() erklären',
    'processMessage() einordnen',
    'ein eigenes Protokoll entwerfen',
  ];
  return (
    <StationFrame
      kicker="Transfer"
      title="Jetzt entwirfst du die Sprache"
      lead="Der Quizserver braucht eindeutige Nachrichten, eine zulässige Reihenfolge und sinnvolle Antworten auf Fehler."
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-950 p-5 text-slate-100">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Client sendet</p>
          <div className="mt-3 space-y-2 font-mono text-sm"><p>LOGIN:&lt;Name&gt;</p><p>QUESTION</p><p>ANSWER:&lt;Antwort&gt;</p><p>QUIT</p></div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Server antwortet</p>
          <div className="mt-3 space-y-2 font-mono text-sm"><p>OK / ERROR:...</p><p>QUESTION:...</p><p>CORRECT / WRONG</p><p>BYE</p></div>
        </div>
      </div>
      <TaskCard title="Baue ein belastbares Quizprotokoll" description="Lege Nachrichtentypen und Fehlerbehandlung fest.">
        <QuizSequence questions={questions} onComplete={onComplete} completeLabel="Protokoll festlegen" />
      </TaskCard>
      {done && (
        <>
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3"><Sparkles className="mt-0.5 size-5 text-emerald-700" /><div><p className="font-bold text-emerald-950">Protokoll bereit für Java.</p><p className="mt-1 text-sm leading-6 text-emerald-800">In der nächsten Unterrichtsstunde kann genau dieser Ablauf mit den NRW-Klassen Client und Server umgesetzt werden.</p></div></div>
          </div>
          <Card className="mt-6 bg-white ring-slate-200">
            <CardHeader><CardTitle className="text-xl font-bold">Das kann ich jetzt</CardTitle><CardDescription>Tippe die Punkte an, die du sicher erklären kannst.</CardDescription></CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {goals.map((goal, index) => {
                const active = checked.includes(index);
                return <button key={goal} type="button" onClick={() => setChecked((value) => active ? value.filter((item) => item !== index) : [...value, index])} className={`flex min-h-14 items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${active ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white text-slate-700'}`}><span className={`grid size-6 shrink-0 place-items-center rounded-md ${active ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{active && <Check className="size-4" />}</span>{goal}</button>;
              })}
            </CardContent>
          </Card>
        </>
      )}
    </StationFrame>
  );
}

export default function Home() {
  const [currentStation, setCurrentStation] = useState(0);
  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      const stored = window.localStorage.getItem('netzwerke-q2-progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fortschritt ist Komfort; die Strecke funktioniert auch ohne Speicher.
    }
    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('netzwerke-q2-progress', JSON.stringify(completed));
    } catch {
      // localStorage darf ausfallen, ohne die Lernstrecke zu blockieren.
    }
  }, [completed]);

  useEffect(() => {
    const modelContext = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: Record<string, unknown>,
            options?: { signal?: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        modelContext.registerTool(
          {
            name: 'navigate_learning_station',
            title: 'Lernstation öffnen',
            description: 'Öffnet eine Station der sichtbaren Netzwerke-Q2-Lernstrecke.',
            inputSchema: {
              type: 'object',
              properties: {
                station: { type: 'integer', minimum: 0, maximum: 8 },
              },
              required: ['station'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input: unknown) {
              const station = (input as { station?: unknown })?.station;
              if (!Number.isInteger(station) || Number(station) < 0 || Number(station) > 8) {
                throw new Error('station muss eine ganze Zahl zwischen 0 und 8 sein.');
              }
              setCurrentStation(Number(station));
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return { station, title: stations[Number(station)][1] };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => undefined);
    } catch {
      // WebMCP ist eine optionale progressive Erweiterung.
    }
    return () => lifecycle.abort();
  }, []);

  const progress = useMemo(
    () => Math.round((completed.length / stations.length) * 100),
    [completed],
  );

  function completeStation(index: number) {
    setCompleted((value) =>
      value.includes(index) ? value : [...value, index].sort((a, b) => a - b),
    );
  }

  function navigate(index: number) {
    setCurrentStation(Math.max(0, Math.min(8, index)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function stationContent() {
    const props = {
      done: completed.includes(currentStation),
      onComplete: () => completeStation(currentStation),
      onNext: () => navigate(currentStation + 1),
    };
    switch (currentStation) {
      case 0: return <Station0 {...props} />;
      case 1: return <Station1 {...props} />;
      case 2: return <Station2 {...props} />;
      case 3: return <Station3 {...props} />;
      case 4: return <Station4 {...props} />;
      case 5: return <Station5 {...props} />;
      case 6: return <Station6 {...props} />;
      case 7: return <Station7 {...props} />;
      default: return <Station8 {...props} />;
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(103,232,249,.22)]">
            <Network className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight sm:text-base">Netzwerke Q2</p>
            <p className="hidden text-xs text-slate-400 sm:block">Vom Kabel zur gemeinsamen Sprache</p>
          </div>
          <div className="ml-auto w-[min(46vw,340px)]">
            <Progress value={progress} className="gap-1.5">
              <ProgressLabel className="text-xs text-slate-300">Lernfortschritt</ProgressLabel>
              <span className="ml-auto text-xs font-semibold tabular-nums text-cyan-300">{progress} %</span>
            </Progress>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[310px_minmax(0,1fr)]">
        <aside className="border-b bg-slate-950 text-slate-200 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-2 lg:p-5">
            {stations.map(([eyebrow, title, duration], index) => {
              const active = currentStation === index;
              const done = completed.includes(index);
              return (
                <button key={title} type="button" onClick={() => navigate(index)} className={`group flex min-h-16 min-w-[230px] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition lg:w-full lg:min-w-0 ${active ? 'border-cyan-300/50 bg-cyan-300/10' : 'border-transparent hover:border-white/10 hover:bg-white/5'}`} aria-current={active ? 'step' : undefined}>
                  <span className={`grid size-8 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${done ? 'bg-emerald-300 text-slate-950' : active ? 'bg-cyan-300 text-slate-950' : 'bg-white/8 text-slate-400'}`}>{done ? <Check className="size-4" /> : index}</span>
                  <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{eyebrow}</span><span className="block truncate text-sm font-semibold text-slate-100">{title}</span><span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500"><Clock3 className="size-3" /> {duration}</span></span>
                </button>
              );
            })}
          </div>
          <div className="hidden border-t border-white/10 p-5 lg:block">
            <button type="button" onClick={() => { setCompleted([]); navigate(0); }} className="flex min-h-11 items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-200"><RotateCcw className="size-3.5" /> Fortschritt zurücksetzen</button>
          </div>
        </aside>

        <section className="relative min-w-0 overflow-hidden px-4 py-6 sm:px-7 sm:py-10 lg:px-12">
          <div className="pointer-events-none absolute right-0 top-0 -z-0 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge className="h-7 bg-slate-950 px-3 text-white">Station {currentStation} von 8</Badge>
              <Badge variant="outline" className="h-7 gap-1.5 bg-white px-3"><Clock3 className="size-3" /> {stations[currentStation][2]}</Badge>
              {completed.includes(currentStation) && <Badge className="h-7 gap-1.5 bg-emerald-600 px-3 text-white"><Check className="size-3" /> erledigt</Badge>}
            </div>

            {stationContent()}

            <nav className="mt-10 flex items-center justify-between gap-3 border-t border-slate-200 py-6" aria-label="Stationsnavigation">
              <Button variant="outline" size="lg" disabled={currentStation === 0} onClick={() => navigate(currentStation - 1)} className="min-h-12 rounded-xl"><ArrowLeft className="size-4" /> <span className="hidden sm:inline">Zurück</span></Button>
              <p className="text-center text-xs text-slate-500">Fortschritt bleibt nur auf diesem Gerät.</p>
              <Button variant="outline" size="lg" disabled={currentStation === 8} onClick={() => navigate(currentStation + 1)} className="min-h-12 rounded-xl"><span className="hidden sm:inline">Weiter</span> <ArrowRight className="size-4" /></Button>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}
