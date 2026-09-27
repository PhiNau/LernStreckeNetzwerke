'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Braces,
  Cable,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleDot,
  Clock3,
  Code2,
  Computer,
  FileCode2,
  Globe2,
  Inbox,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  MousePointerClick,
  Network,
  PackageCheck,
  RotateCcw,
  Router,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  UserRound,
  Workflow,
  type LucideIcon,
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
  ['Startsignal', 'FILIUS kennt ihr schon', '10 Min.'],
  ['Adresse & Transport', 'IP, Port und TCP', '15 Min.'],
  ['Gemeinsame Sprache', 'Was ist ein Protokoll?', '15 Min.'],
  ['Web-Kommunikation', 'HTTP verstehen', '15 Min.'],
  ['Dialog mit Regeln', 'POP3 analysieren', '20 Min.'],
  ['Java-Verbindung', 'Die Klasse Connection', '20 Min.'],
  ['Nachrichten empfangen', 'Connection oder Client?', '15 Min.'],
  ['Ereignisse behandeln', 'Was macht der Server?', '10 Min.'],
  ['Transfer', 'Dein eigenes Protokoll', '15 Min.'],
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

type DiagramNode = {
  id: string;
  label: string;
  caption: string;
  icon: LucideIcon;
};

type MatchCategory = {
  id: string;
  label: string;
  caption: string;
  icon: LucideIcon;
};

type MatchItem = {
  id: string;
  label: string;
  target: string;
  icon: LucideIcon;
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
      className={`mt-5 block w-full rounded-xl border p-4 ${
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
  icon: Icon = Lightbulb,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <Card className="border-0 bg-white shadow-[0_24px_70px_rgba(15,23,42,.10)] ring-slate-200">
      <CardHeader className="border-b border-slate-100 sm:px-7 sm:py-6">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800">
            <Icon className="size-5" aria-hidden="true" />
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

function PhaseHeading({
  step,
  title,
  minutes,
  icon: Icon,
}: {
  step: 1 | 2 | 3;
  title: string;
  minutes: number;
  icon: LucideIcon;
}) {
  return (
    <div className="mb-3 mt-8 flex flex-wrap items-center gap-3 first:mt-0">
      <span className="grid size-9 place-items-center rounded-xl bg-slate-950 font-mono text-xs font-black text-cyan-300">
        {step}
      </span>
      <div>
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
          <Icon className="size-4" aria-hidden="true" /> Schritt {step} von 3
        </p>
        <h2 className="mt-0.5 text-xl font-black text-slate-950">{title}</h2>
      </div>
      <Badge variant="outline" className="ml-auto h-7 gap-1.5 bg-white px-3 text-slate-600">
        <Clock3 className="size-3" /> ca. {minutes} Min.
      </Badge>
    </div>
  );
}

function IntroBlock({
  title,
  paragraphs,
  facts,
  note,
  minutes,
  children,
}: {
  title: string;
  paragraphs: string[];
  facts: string[];
  note: string;
  minutes: number;
  children?: React.ReactNode;
}) {
  return (
    <section aria-label="Einführung">
      <PhaseHeading step={1} title="Verstehen" minutes={minutes} icon={BookOpen} />
      <Card className="overflow-hidden border-0 bg-white shadow-[0_18px_55px_rgba(15,23,42,.08)] ring-slate-200">
        <CardContent className="p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Kurz erklärt</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{title}</h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-650 sm:text-base">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4 text-slate-100 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Darauf kommt es an</p>
              <ul className="mt-4 space-y-3">
                {facts.map((fact) => (
                  <li key={fact} className="flex gap-3 text-sm leading-5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {children}
          <div className="mt-6 flex gap-3 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-cyan-700" aria-hidden="true" />
            <p><strong>Merksatz:</strong> {note}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function DiagramEndpoint({ endpoint }: { endpoint: { label: string; icon: LucideIcon } }) {
  const Icon = endpoint.icon;
  return (
    <div className="flex min-h-24 min-w-28 flex-col items-center justify-center rounded-xl bg-slate-950 p-3 text-center text-white">
      <Icon className="size-6 text-cyan-300" aria-hidden="true" />
      <span className="mt-2 text-xs font-bold">{endpoint.label}</span>
    </div>
  );
}

function SequenceDiagramTask({
  title,
  description,
  items,
  correctOrder,
  onComplete,
  completed,
  minutes,
  start,
  end,
  success,
  support,
}: {
  title: string;
  description: string;
  items: DiagramNode[];
  correctOrder: string[];
  onComplete: () => void;
  completed: boolean;
  minutes: number;
  start?: { label: string; icon: LucideIcon };
  end?: { label: string; icon: LucideIcon };
  success: string;
  support?: React.ReactNode;
}) {
  const [ordered, setOrdered] = useState<string[]>(completed ? correctOrder : []);
  const [checked, setChecked] = useState(completed);
  const correct = checked && ordered.join('|') === correctOrder.join('|');
  const available = items.filter((item) => !ordered.includes(item.id));

  function add(id: string) {
    if (correct) return;
    setOrdered((value) => [...value, id]);
    setChecked(false);
  }

  function remove(id: string) {
    if (correct) return;
    setOrdered((value) => value.filter((item) => item !== id));
    setChecked(false);
  }

  function reset() {
    setOrdered([]);
    setChecked(false);
  }

  function check() {
    setChecked(true);
    if (ordered.join('|') === correctOrder.join('|')) onComplete();
  }

  return (
    <section aria-label="Interaktives Schaubild">
      <PhaseHeading step={2} title="Schaubild zusammensetzen" minutes={minutes} icon={Workflow} />
      <TaskCard title={title} description={description} icon={MousePointerClick}>
        {support}
        <div className="mt-5 overflow-x-auto rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-3 sm:p-4">
          <div className="flex min-h-28 flex-col items-stretch justify-center gap-2 xl:w-max xl:min-w-full xl:flex-row xl:items-center">
            {start && <DiagramEndpoint endpoint={start} />}
            {start && <ArrowRight className="mx-auto size-5 shrink-0 rotate-90 text-slate-300 xl:rotate-0" aria-hidden="true" />}
            {ordered.length === 0 && (
              <div className="grid min-h-24 min-w-36 flex-1 place-items-center rounded-xl border border-slate-200 bg-white px-4 text-center text-sm text-slate-400">
                Bausteine unten antippen
              </div>
            )}
            {ordered.map((id, index) => {
              const item = items.find((entry) => entry.id === id)!;
              const Icon = item.icon;
              return (
                <div key={id} className="contents">
                  {index > 0 && <ArrowRight className="mx-auto size-5 shrink-0 rotate-90 text-slate-300 xl:rotate-0" aria-hidden="true" />}
                  <button
                    type="button"
                    onClick={() => remove(id)}
                    disabled={correct}
                    className="group flex min-h-24 min-w-28 flex-1 flex-col items-center justify-center rounded-xl border-2 border-cyan-200 bg-white p-3 text-center transition hover:border-rose-300 disabled:cursor-default disabled:hover:border-cyan-200"
                    aria-label={`${item.label} aus dem Schaubild entfernen`}
                  >
                    <Icon className="size-6 text-teal-700" aria-hidden="true" />
                    <span className="mt-2 text-xs font-black text-slate-900">{item.label}</span>
                    <span className="mt-1 text-[11px] leading-4 text-slate-500">{item.caption}</span>
                  </button>
                </div>
              );
            })}
            {end && <ArrowRight className="mx-auto size-5 shrink-0 rotate-90 text-slate-300 xl:rotate-0" aria-hidden="true" />}
            {end && <DiagramEndpoint endpoint={end} />}
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => add(item.id)}
                className="flex min-h-14 items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left transition hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700"><Icon className="size-5" aria-hidden="true" /></span>
                <span><span className="block text-sm font-black text-slate-900">{item.label}</span><span className="block text-xs leading-4 text-slate-500">{item.caption}</span></span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap justify-between gap-3">
          <Button variant="outline" size="lg" onClick={reset} disabled={correct} className="min-h-12 rounded-xl">
            <RotateCcw className="size-4" /> Neu aufbauen
          </Button>
          <Button size="lg" onClick={check} disabled={ordered.length !== items.length || correct} className="min-h-12 rounded-xl bg-slate-950 px-5 text-white">
            Schaubild prüfen <Check className="size-4" />
          </Button>
        </div>
        {checked && (
          <Feedback correct={correct}>
            {correct ? success : 'Die Bausteine sind vollständig, aber noch nicht richtig angeordnet. Entferne einzelne Karten und versuche es erneut.'}
          </Feedback>
        )}
      </TaskCard>
    </section>
  );
}

function MatchDiagramTask({
  title,
  description,
  categories,
  items,
  onComplete,
  completed,
  minutes,
  success,
  support,
}: {
  title: string;
  description: string;
  categories: MatchCategory[];
  items: MatchItem[];
  onComplete: () => void;
  completed: boolean;
  minutes: number;
  success: string;
  support?: React.ReactNode;
}) {
  const initialPlacements = Object.fromEntries(items.map((item) => [item.id, item.target]));
  const [placements, setPlacements] = useState<Record<string, string>>(completed ? initialPlacements : {});
  const [active, setActive] = useState<string | null>(null);
  const [checked, setChecked] = useState(completed);
  const correct = checked && items.every((item) => placements[item.id] === item.target);
  const available = items.filter((item) => !placements[item.id]);

  function place(categoryId: string) {
    if (!active || correct) return;
    setPlacements((value) => ({ ...value, [active]: categoryId }));
    setActive(null);
    setChecked(false);
  }

  function remove(id: string) {
    if (correct) return;
    setPlacements((value) => {
      const next = { ...value };
      delete next[id];
      return next;
    });
    setChecked(false);
  }

  function reset() {
    setPlacements({});
    setActive(null);
    setChecked(false);
  }

  function check() {
    setChecked(true);
    if (items.every((item) => placements[item.id] === item.target)) onComplete();
  }

  return (
    <section aria-label="Interaktives Zuordnungsschaubild">
      <PhaseHeading step={2} title="Schaubild zusammensetzen" minutes={minutes} icon={Workflow} />
      <TaskCard title={title} description={description} icon={MousePointerClick}>
        {support}
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">1. Karte wählen</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {available.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`flex min-h-14 items-center gap-3 rounded-xl border-2 px-3 py-2 text-left transition ${active === item.id ? 'border-cyan-400 bg-cyan-50 ring-4 ring-cyan-100' : 'border-slate-200 bg-white hover:border-cyan-300'}`}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700"><Icon className="size-5" aria-hidden="true" /></span>
                <span className="text-sm font-bold text-slate-900">{item.label}</span>
              </button>
            );
          })}
          {available.length === 0 && <p className="col-span-full rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Alle Karten sind eingesetzt. Prüfe jetzt das Schaubild.</p>}
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">2. Zielbereich wählen</p>
        <div className={`mt-3 grid gap-3 ${categories.length === 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {categories.map((category) => {
            const Icon = category.icon;
            const placed = items.filter((item) => placements[item.id] === category.id);
            return (
              <div key={category.id} className="min-h-40 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-3">
                <button type="button" onClick={() => place(category.id)} disabled={!active || correct} className="flex min-h-14 w-full items-center gap-3 rounded-xl p-1 text-left transition enabled:hover:bg-cyan-100 disabled:cursor-default">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-cyan-300"><Icon className="size-5" aria-hidden="true" /></span>
                  <span><span className="block font-black text-slate-950">{category.label}</span><span className="block text-xs leading-4 text-slate-500">{category.caption}</span></span>
                </button>
                <div className="mt-3 space-y-2">
                  {placed.map((item) => {
                    const ItemIcon = item.icon;
                    return <button key={item.id} type="button" onClick={() => remove(item.id)} disabled={correct} className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800 transition enabled:hover:border-rose-300"><ItemIcon className="size-4 shrink-0 text-teal-700" />{item.label}</button>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap justify-between gap-3">
          <Button variant="outline" size="lg" onClick={reset} disabled={correct} className="min-h-12 rounded-xl"><RotateCcw className="size-4" /> Neu zuordnen</Button>
          <Button size="lg" onClick={check} disabled={Object.keys(placements).length !== items.length || correct} className="min-h-12 rounded-xl bg-slate-950 px-5 text-white">Schaubild prüfen <Check className="size-4" /></Button>
        </div>
        {checked && <Feedback correct={correct}>{correct ? success : 'Noch nicht ganz. Prüfe, welches Ereignis oder Kommunikationsmuster zu welchem Zielbereich gehört.'}</Feedback>}
      </TaskCard>
    </section>
  );
}

function FinalQuiz({
  unlocked,
  questions,
  onComplete,
  minutes,
  title = 'Lerncheck',
  description = 'Übertrage das Gelernte auf neue Fragen. Erst dieser Check schließt die Station ab.',
  completeLabel,
}: {
  unlocked: boolean;
  questions: QuizQuestion[];
  onComplete: () => void;
  minutes: number;
  title?: string;
  description?: string;
  completeLabel?: string;
}) {
  return (
    <section aria-label="Abschlussquiz">
      <PhaseHeading step={3} title="Wissen prüfen" minutes={minutes} icon={ListChecks} />
      {unlocked ? (
        <TaskCard title={title} description={description} icon={ListChecks}>
          <QuizSequence questions={questions} onComplete={onComplete} completeLabel={completeLabel} />
        </TaskCard>
      ) : (
        <div className="flex min-h-36 items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-white/70 p-5 text-slate-500">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100"><LockKeyhole className="size-5" aria-hidden="true" /></span>
          <div><p className="font-bold text-slate-800">Der Lerncheck ist noch gesperrt.</p><p className="mt-1 text-sm leading-6">Setze zuerst das Schaubild richtig zusammen. Danach kannst du dein Verständnis prüfen.</p></div>
        </div>
      )}
    </section>
  );
}

function LearningStation0({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
  const questions: QuizQuestion[] = [
    {
      prompt: 'Was bestimmt den Zielrechner?',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'IP-Adresse',
      success: 'Richtig. Die IP-Adresse identifiziert den Rechner im Netzwerk.',
    },
    {
      prompt: 'Was bestimmt den Dienst auf dem Zielrechner?',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'Port',
      success: 'Genau. Der Port wählt das konkrete Programm oder den Dienst aus.',
    },
    {
      prompt: 'Was stellt eine zuverlässige Verbindung bereit?',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'TCP',
      success: 'Richtig. TCP sorgt für eine geordnete, zuverlässige Übertragung.',
    },
    {
      prompt: 'Was legt Bedeutung und Reihenfolge von Nachrichten fest?',
      options: ['IP-Adresse', 'Port', 'TCP', 'Protokoll'],
      answer: 'Protokoll',
      success: 'Genau. Ein Protokoll ist die gemeinsame Sprache der Programme.',
    },
  ];
  const nodes: DiagramNode[] = [
    { id: 'protocol', label: 'Protokoll', caption: 'Bedeutung klären', icon: MessageSquare },
    { id: 'tcp', label: 'TCP', caption: 'Transport sichern', icon: PackageCheck },
    { id: 'ip', label: 'IP-Adresse', caption: 'Rechner finden', icon: Router },
    { id: 'port', label: 'Port', caption: 'Dienst auswählen', icon: CircleDot },
  ];

  return (
    <StationFrame
      kicker="Startsignal"
      title="Verbunden. Aber verstehen sich die Programme?"
      lead="Aus dem bekannten FILIUS-Netz wird nun Schritt für Schritt eine funktionierende Anwendung."
    >
      <IntroBlock
        minutes={2}
        title="Erreichbar ist noch nicht verständlich"
        paragraphs={[
          'Ein Client kann einen Server über das Netzwerk erreichen. Damit ist aber noch nicht entschieden, welches Programm auf dem Server gemeint ist.',
          'Selbst wenn die technische Verbindung steht, müssen beide Programme dieselben Nachrichten und Regeln kennen.',
        ]}
        facts={['IP-Adresse findet den Rechner.', 'Port findet den Dienst.', 'TCP transportiert zuverlässig.', 'Ein Protokoll schafft Bedeutung.']}
        note="Ein Netzwerk verbindet Rechner. Für eine Anwendung braucht es zusätzlich Port, TCP und eine gemeinsame Sprache."
      />
      <SequenceDiagramTask
        minutes={4}
        title="Baue den Weg zur Verständigung"
        description="Ordne die vier Bausteine so, wie sie in dieser Lernstrecke aufeinander aufbauen."
        items={nodes}
        correctOrder={['ip', 'port', 'tcp', 'protocol']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        start={{ label: 'Client', icon: Smartphone }}
        end={{ label: 'Server', icon: Server }}
        success="Genau: Erst wird der Rechner gefunden, dann der Dienst gewählt, der Transport abgesichert und schließlich die gemeinsame Sprache angewendet."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={4} />
      {done && <CompletedBanner onNext={onNext} text="Als Nächstes trennen wir Rechner, Dienst und Transport genauer voneinander." />}
    </StationFrame>
  );
}

function LearningStation1({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
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
  const nodes: DiagramNode[] = [
    { id: 'ip', label: 'IP', caption: 'Zielrechner', icon: Router },
    { id: 'program', label: 'Programm', caption: 'erzeugt Daten', icon: Terminal },
    { id: 'network', label: 'Netzwerk', caption: 'überträgt Pakete', icon: Network },
    { id: 'tcp', label: 'TCP', caption: 'ordnet & sichert', icon: PackageCheck },
    { id: 'port', label: 'Port', caption: 'ordnet Dienst zu', icon: CircleDot },
  ];
  const serviceCards = (
    <div className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
      {[
        ['80', 'HTTP'],
        ['443', 'HTTPS'],
        ['110', 'POP3'],
        ['5000', 'Java-App'],
      ].map(([port, service]) => (
        <div key={port} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
          <p className="font-mono text-lg font-black text-slate-950">:{port}</p>
          <p className="mt-1 text-xs font-bold text-teal-700">{service}</p>
        </div>
      ))}
    </div>
  );

  return (
    <StationFrame kicker="Adresse & Transport" title="Ein Rechner, mehrere Türen" lead="Eine Adresse wie 192.168.1.20:80 enthält zwei verschiedene Entscheidungen: Rechner und Dienst.">
      <IntroBlock
        minutes={3}
        title="IP und Port bilden gemeinsam den Endpunkt"
        paragraphs={[
          'Die IP-Adresse 192.168.1.20 führt zu einem bestimmten Rechner. Die Portnummer 80 wählt dort den Webserver aus.',
          'TCP baut zwischen den beiden Programmen eine Verbindung auf, hält Daten in Reihenfolge und sorgt bei Verlust für eine erneute Übertragung.',
        ]}
        facts={['Viele Dienste teilen sich eine IP-Adresse.', 'Ports unterscheiden diese Dienste.', 'TCP kümmert sich um zuverlässigen Transport.']}
        note="IP sagt wohin. Der Port sagt zu welchem Programm. TCP sorgt dafür, dass die Daten geordnet ankommen."
      />
      <SequenceDiagramTask
        minutes={7}
        title="Setze den Weg aus der Anwendung ins Netz zusammen"
        description="Die Daten wandern schrittweise von der Anwendung bis ins Netzwerk."
        support={serviceCards}
        items={nodes}
        correctOrder={['program', 'port', 'tcp', 'ip', 'network']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        success="Richtig. Das Programm nutzt einen Port, TCP übernimmt den Transport, IP adressiert den Rechner und das Netzwerk überträgt die Pakete."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={5} />
      {done && <CompletedBanner onNext={onNext} text="Die Verbindung steht. Nun müssen beide Programme dieselbe Sprache sprechen." />}
    </StationFrame>
  );
}

function LearningStation2({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
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
  const nodes: DiagramNode[] = [
    { id: 'order', label: 'Reihenfolge', caption: 'Wann ist etwas erlaubt?', icon: ListChecks },
    { id: 'rules', label: 'Regeln', caption: 'gemeinsame Vereinbarung', icon: ShieldCheck },
    { id: 'meaning', label: 'Bedeutung', caption: 'Was heißt die Nachricht?', icon: BookOpen },
    { id: 'messages', label: 'Nachrichten', caption: 'Was wird gesendet?', icon: MessageSquare },
  ];
  const dialog = (
    <div className="mb-6 grid gap-2 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100 sm:grid-cols-2">
      <p><span className="text-cyan-300">Client →</span> HALLO</p>
      <p><span className="text-emerald-300">Server →</span> OK</p>
      <p><span className="text-cyan-300">Client →</span> DATEN</p>
      <p><span className="text-emerald-300">Server →</span> 42</p>
      <p><span className="text-cyan-300">Client →</span> ENDE</p>
    </div>
  );

  return (
    <StationFrame kicker="Gemeinsame Sprache" title="Eine Verbindung transportiert. Ein Protokoll erklärt." lead="Technisch verbunden zu sein reicht nicht: Nachrichten brauchen Form, Bedeutung und eine zulässige Reihenfolge.">
      <IntroBlock
        minutes={3}
        title="Kommunikation braucht gemeinsame Regeln"
        paragraphs={[
          'Zwei Telefone können technisch verbunden sein. Ohne gemeinsame Sprache und Gesprächsregeln entsteht trotzdem keine Verständigung.',
          'Genauso transportiert eine Netzwerkverbindung nur Daten. Das Anwendungsprotokoll legt fest, welche Nachrichten erlaubt sind und was sie bedeuten.',
        ]}
        facts={['Nachrichten haben festgelegte Formen.', 'Jede Nachricht besitzt eine Bedeutung.', 'Der aktuelle Zustand bestimmt erlaubte Reihenfolgen.']}
        note="TCP transportiert Zeichen. Erst das Protokoll macht daraus verständliche Nachrichten."
      />
      <SequenceDiagramTask
        minutes={7}
        title="Baue die Arbeitsdefinition"
        description="Ordne die Begriffe zu einer vollständigen Protokoll-Idee."
        support={dialog}
        items={nodes}
        correctOrder={['rules', 'messages', 'meaning', 'order']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        start={{ label: 'Protokoll', icon: Workflow }}
        end={{ label: 'Verständigung', icon: CheckCircle2 }}
        success="Genau. Ein Protokoll besteht aus Regeln für Nachrichten, ihre Bedeutung und ihre zulässige Reihenfolge."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={5} />
      {done && <CompletedBanner onNext={onNext} text="Mit HTTP untersuchst du jetzt ein echtes Anwendungsprotokoll." />}
    </StationFrame>
  );
}

function LearningStation3({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
  const [part, setPart] = useState('GET');
  const explanations: Record<string, string> = {
    GET: 'GET ist die Methode: Der Browser möchte eine Ressource abrufen.',
    '/index.html': 'Das ist der Pfad der angeforderten Ressource.',
    'HTTP/1.1': 'Hier steht die verwendete Protokollversion.',
    '200 OK': 'Der Statuscode 200 meldet eine erfolgreiche Anfrage.',
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
  const nodes: DiagramNode[] = [
    { id: 'server', label: 'Webserver', caption: 'prüft den Request', icon: Server },
    { id: 'response', label: '200 OK + HTML', caption: 'Response', icon: FileCode2 },
    { id: 'request', label: 'GET /index.html', caption: 'Request', icon: Send },
    { id: 'transport', label: 'TCP', caption: 'transportiert', icon: Cable },
  ];
  const explorer = (
    <div className="mb-6 grid gap-3 lg:grid-cols-2">
      <div className="rounded-xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Request</p>
        <p className="leading-8">{['GET', '/index.html', 'HTTP/1.1'].map((token) => <button key={token} type="button" onClick={() => setPart(token)} className="mr-1 rounded bg-white/10 px-2 py-1 text-cyan-300">{token}</button>)}</p>
        <p className="mt-2 text-slate-300">Host: beispiel.de</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Response</p>
        <p className="leading-8">HTTP/1.1 <button type="button" onClick={() => setPart('200 OK')} className="rounded bg-emerald-100 px-2 py-1 font-bold text-emerald-800">200 OK</button></p>
        <p className="leading-8">Content-Type: <button type="button" onClick={() => setPart('text/html')} className="rounded bg-cyan-100 px-2 py-1 font-bold text-cyan-900">text/html</button></p>
      </div>
      <output className="block rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-sm leading-6 text-cyan-950 lg:col-span-2">{explanations[part]}</output>
    </div>
  );

  return (
    <StationFrame kicker="Web-Kommunikation" title="GET rein. Webseite raus." lead="HTTP zeigt besonders deutlich, wie ein Protokoll eine Anfrage und eine passende Antwort strukturiert.">
      <IntroBlock
        minutes={3}
        title="Browser und Webserver sprechen HTTP"
        paragraphs={[
          'Der Browser sendet einen Request. Darin stehen unter anderem Methode, Ressource und Protokollversion.',
          'Der Server antwortet mit einer Response. Statuscode, Inhaltstyp und eigentlicher Inhalt haben festgelegte Bedeutungen.',
        ]}
        facts={['GET fordert eine Ressource an.', '200 OK bedeutet Erfolg.', 'HTML ist Inhalt der Antwort.', 'TCP transportiert, HTTP strukturiert.']}
        note="Eine funktionierende TCP-Verbindung versteht noch kein GET. Die Bedeutung liefert HTTP."
      />
      <SequenceDiagramTask
        minutes={7}
        title="Setze den Webzugriff zusammen"
        description="Untersuche zuerst Request und Response. Ordne danach den vollständigen Ablauf."
        support={explorer}
        items={nodes}
        correctOrder={['request', 'transport', 'server', 'response']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        start={{ label: 'Browser', icon: Globe2 }}
        end={{ label: 'Webseite', icon: Computer }}
        success="Richtig. Der Browser formuliert einen HTTP-Request, TCP transportiert ihn, der Server verarbeitet ihn und sendet eine HTTP-Response zurück."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={5} />
      {done && <CompletedBanner onNext={onNext} text="Als Nächstes zeigt POP3, warum auch Zustände und Reihenfolgen zum Protokoll gehören." />}
    </StationFrame>
  );
}

function LearningStation4({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
  const questions: QuizQuestion[] = [
    {
      prompt: 'Was muss vor RETR 1 erfolgreich geschehen sein?',
      options: ['Anmeldung mit USER und PASS', 'Die Sitzung muss beendet sein', 'Ein HTTP-Request', 'Ein neuer Port'],
      answer: 'Anmeldung mit USER und PASS',
      success: 'Richtig. RETR ist erst im angemeldeten Zustand sinnvoll.',
    },
    {
      prompt: 'Welcher Befehl beendet die POP3-Sitzung?',
      options: ['QUIT', 'STAT', 'PASS', 'RETR'],
      answer: 'QUIT',
      success: 'Genau. QUIT beendet den geregelten Dialog.',
    },
    {
      prompt: 'Warum reicht eine Liste aller POP3-Befehle nicht aus?',
      options: ['Auch Zustände und Reihenfolgen zählen', 'Befehle brauchen keine Bedeutung', 'TCP verbietet Listen', 'Die IP-Adresse legt alles fest'],
      answer: 'Auch Zustände und Reihenfolgen zählen',
      success: 'Richtig. Ein Protokoll beschreibt auch, wann ein Befehl zulässig ist.',
    },
  ];
  const nodes: DiagramNode[] = [
    { id: 'retr', label: 'RETR 1', caption: 'erste Mail abrufen', icon: Mail },
    { id: 'user', label: 'USER edgar', caption: 'Benutzer nennen', icon: UserRound },
    { id: 'quit', label: 'QUIT', caption: 'Sitzung beenden', icon: LogOut },
    { id: 'stat', label: 'STAT', caption: 'Postfach prüfen', icon: Inbox },
    { id: 'pass', label: 'PASS geheim', caption: 'anmelden', icon: LockKeyhole },
  ];
  const legend = (
    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
      {[
        ['USER', 'Name'],
        ['PASS', 'Passwort'],
        ['STAT', 'Status'],
        ['RETR', 'Abruf'],
        ['QUIT', 'Ende'],
      ].map(([command, meaning]) => <div key={command} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center"><code className="font-black text-teal-700">{command}</code><p className="mt-1 text-xs text-slate-500">{meaning}</p></div>)}
    </div>
  );

  return (
    <StationFrame kicker="Dialog mit Regeln" title="POP3 ist mehr als eine Befehlsliste" lead="Beim Mailabruf hängt der nächste erlaubte Schritt vom aktuellen Zustand der Sitzung ab.">
      <IntroBlock
        minutes={3}
        title="Ein Protokoll kann Zustände besitzen"
        paragraphs={[
          'Direkt nach dem Verbindungsaufbau ist der Client noch nicht angemeldet. Erst USER und PASS wechseln die Sitzung in den angemeldeten Zustand.',
          'Danach darf der Client das Postfach prüfen oder Nachrichten abrufen. QUIT beendet die Sitzung. Die Serverantwort +OK bestätigt jeweils einen erfolgreichen Schritt.',
        ]}
        facts={['USER und PASS melden an.', 'STAT fragt den Postfachstatus ab.', 'RETR ruft eine Nachricht ab.', 'QUIT beendet die Sitzung.']}
        note="Ein Befehl ist nicht nur richtig oder falsch – er kann im aktuellen Zustand erlaubt oder verboten sein."
      />
      <SequenceDiagramTask
        minutes={11}
        title="Baue den POP3-Dialog"
        description="Die +OK-Antworten sind ausgeblendet. Ordne die fünf Client-Befehle zu einer gültigen Sitzung."
        support={legend}
        items={nodes}
        correctOrder={['user', 'pass', 'stat', 'retr', 'quit']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        start={{ label: 'Verbunden', icon: Cable }}
        end={{ label: 'Beendet', icon: LogOut }}
        success="Richtig. Nach USER und PASS ist der Client angemeldet, kann den Status prüfen, eine Mail abrufen und die Sitzung mit QUIT beenden."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={6} />
      {done && <CompletedBanner onNext={onNext} text="Jetzt findest du dieselben Netzwerkideen im Java-Code der Klasse Connection wieder." />}
    </StationFrame>
  );
}

function LearningStation5({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
  const [token, setToken] = useState('Connection');
  const explanations: Record<string, string> = {
    Connection: 'Connection ist der Kommunikationskanal zum Server.',
    '192.168.0.10': 'Die IP-Adresse bestimmt den Zielrechner.',
    '5000': 'Der Port bestimmt das Serverprogramm.',
    send: 'send(...) sendet eine Textzeile an den Server.',
    receive: 'receive() wartet auf eine Textzeile vom Server.',
    close: 'close() beendet die Verbindung.',
  };
  const questions: QuizQuestion[] = [
    {
      prompt: 'Welche Angabe bestimmt in new Connection("192.168.0.10", 5000) das Serverprogramm?',
      options: ['5000', '192.168.0.10', 'Connection', 'new'],
      answer: '5000',
      success: 'Richtig. 5000 ist der Port des Serverprogramms.',
    },
    {
      prompt: 'Welche Methode sendet eine Textzeile zum Server?',
      options: ['send(...)', 'receive()', 'close()', 'processMessage(...)'],
      answer: 'send(...)',
      success: 'Genau. send(...) übergibt eine Nachricht an die bestehende Verbindung.',
    },
    {
      prompt: 'Was geschieht bei receive()?',
      options: ['Das Programm wartet auf eine Textzeile', 'Der Port wird geändert', 'Der Server wird beendet', 'Eine IP-Adresse wird erzeugt'],
      answer: 'Das Programm wartet auf eine Textzeile',
      success: 'Richtig. receive() liest die nächste Antwort des Servers.',
    },
  ];
  const nodes: DiagramNode[] = [
    { id: 'receive', label: 'receive()', caption: 'Antwort empfangen', icon: Inbox },
    { id: 'connect', label: 'new Connection', caption: 'Verbindung aufbauen', icon: Cable },
    { id: 'close', label: 'close()', caption: 'Verbindung schließen', icon: LogOut },
    { id: 'send', label: 'send("HALLO")', caption: 'Nachricht senden', icon: Send },
  ];
  const codeExplorer = (
    <div className="mb-6">
      <div className="overflow-hidden rounded-xl bg-slate-950">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500"><Code2 className="size-4" /> Code untersuchen</div>
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-8 text-slate-300"><code>
          <button type="button" onClick={() => setToken('Connection')} className="rounded bg-white/10 px-1 text-cyan-300">Connection</button>{' verbindung = new Connection("'}<button type="button" onClick={() => setToken('192.168.0.10')} className="rounded bg-white/10 px-1 text-amber-300">192.168.0.10</button>{'", '}<button type="button" onClick={() => setToken('5000')} className="rounded bg-white/10 px-1 text-amber-300">5000</button>{');\n\nverbindung.'}<button type="button" onClick={() => setToken('send')} className="rounded bg-white/10 px-1 text-emerald-300">send</button>{'("HALLO");\nString antwort = verbindung.'}<button type="button" onClick={() => setToken('receive')} className="rounded bg-white/10 px-1 text-emerald-300">receive</button>{'();\nverbindung.'}<button type="button" onClick={() => setToken('close')} className="rounded bg-white/10 px-1 text-rose-300">close</button>{'();'}
        </code></pre>
      </div>
      <output className="mt-3 block rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-sm leading-6 text-cyan-950">{explanations[token]}</output>
    </div>
  );

  return (
    <StationFrame kicker="Java-Verbindung" title="Netzwerkbegriffe werden zu Code" lead="Die NRW-Klasse Connection macht aus IP, Port und Nachrichten wenige gut lesbare Methodenaufrufe.">
      <IntroBlock
        minutes={4}
        title="Connection versteckt die Socket-Details"
        paragraphs={[
          'Intern nutzt Connection einen Socket sowie Ein- und Ausgabeströme. Für die erste Anwendung musst du diese Details noch nicht selbst programmieren.',
          'Sichtbar bleiben die fachlich wichtigen Schritte: Ziel festlegen, Verbindung öffnen, Text senden, Antwort empfangen und Verbindung schließen.',
        ]}
        facts={['IP und Port stehen im Konstruktor.', 'send(...) verschickt eine Zeile.', 'receive() liest eine Zeile.', 'close() beendet den Kanal.']}
        note="Connection bildet eine bestehende TCP-Verbindung als einfachen Kommunikationskanal für Strings ab."
      />
      <SequenceDiagramTask
        minutes={10}
        title="Verbinde Code und Kommunikationsablauf"
        description="Tippe zuerst auf farbige Codestellen. Setze danach die vier sichtbaren Schritte zusammen."
        support={codeExplorer}
        items={nodes}
        correctOrder={['connect', 'send', 'receive', 'close']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        start={{ label: 'Java-Client', icon: FileCode2 }}
        end={{ label: 'Server', icon: Server }}
        success="Richtig. Die Verbindung entsteht zuerst, danach folgen Anfrage und Antwort; am Ende wird der Kanal geschlossen."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={6} />
      {done && <CompletedBanner onNext={onNext} text="Connection wartet gezielt auf Antworten. Die Klasse Client kann zusätzlich jederzeit auf eintreffende Nachrichten reagieren." />}
    </StationFrame>
  );
}

function LearningStation6({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
  const questions: QuizQuestion[] = [
    {
      prompt: 'Eine App fragt einmal den aktuellen Wechselkurs ab. Welches Modell passt?',
      options: ['Connection mit send() und receive()', 'Client mit processMessage()', 'Server mit sendToAll()', 'Nur eine IP-Adresse'],
      answer: 'Connection mit send() und receive()',
      success: 'Richtig. Eine gezielte Anfrage mit direkter Antwort passt zum synchronen Muster.',
    },
    {
      prompt: 'Ein Warnsystem soll jederzeit neue Alarme anzeigen. Welches Modell passt?',
      options: ['Client mit processMessage()', 'Connection nur mit close()', 'HTTP ohne Verbindung', 'Ein anderer Port reicht'],
      answer: 'Client mit processMessage()',
      success: 'Genau. processMessage() reagiert, sobald eine neue Nachricht eintrifft.',
    },
    {
      prompt: 'Wozu dient processMessage(String pMessage)?',
      options: ['Auf eingehende Nachrichten reagieren', 'Eine IP-Adresse vergeben', 'TCP ersetzen', 'Den Server kompilieren'],
      answer: 'Auf eingehende Nachrichten reagieren',
      success: 'Richtig. Die Methode wird für eintreffende Nachrichten aufgerufen.',
    },
  ];
  const categories: MatchCategory[] = [
    { id: 'connection', label: 'Connection', caption: 'gezielt senden und dann empfangen', icon: Cable },
    { id: 'client', label: 'Client', caption: 'jederzeit auf Nachrichten reagieren', icon: MessageSquare },
  ];
  const items: MatchItem[] = [
    { id: 'game', label: 'Spielstand trifft spontan ein', target: 'client', icon: PackageCheck },
    { id: 'time', label: 'Uhrzeit einmalig abfragen', target: 'connection', icon: Clock3 },
    { id: 'download', label: 'Eine Datei gezielt anfordern', target: 'connection', icon: Inbox },
    { id: 'chat', label: 'Chatnachrichten laufend anzeigen', target: 'client', icon: MessageSquare },
  ];
  const comparison = (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-slate-950 p-4 text-white"><Badge className="bg-cyan-300 text-slate-950">Connection</Badge><p className="mt-3 font-mono text-sm">send(...);<br />receive();</p><p className="mt-3 text-xs leading-5 text-slate-400">Das Hauptprogramm fragt die Antwort aktiv ab.</p></div>
      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-cyan-950"><Badge className="bg-cyan-700 text-white">Client</Badge><p className="mt-3 font-mono text-sm font-bold">processMessage(...)</p><p className="mt-3 text-xs leading-5 text-cyan-800">Die Unterklasse reagiert auf eintreffende Nachrichten.</p></div>
    </div>
  );

  return (
    <StationFrame kicker="Nachrichten empfangen" title="Abfragen oder reagieren?" lead="Nicht jede Anwendung weiß vorher, wann die nächste Nachricht eintreffen wird.">
      <IntroBlock
        minutes={3}
        title="Zwei passende Modelle für zwei Situationen"
        paragraphs={[
          'Mit Connection arbeitet ein Programm häufig Schritt für Schritt: Es sendet eine Anfrage und ruft receive() auf, wenn es die Antwort erwartet.',
          'Die Klasse Client empfängt im Hintergrund. Trifft eine Nachricht ein, wird processMessage(...) aufgerufen – auch wenn das Hauptprogramm gerade etwas anderes tut.',
        ]}
        facts={['Connection passt zu Anfrage–Antwort.', 'Client passt zu spontanen Ereignissen.', 'Threads bleiben hier ein Implementierungsdetail.']}
        note="Wenn Nachrichten jederzeit eintreffen können, braucht das Programm einen dauerhaften Empfangsmechanismus."
      />
      <MatchDiagramTask
        minutes={7}
        title="Ordne die Kommunikationsmuster"
        description="Wähle eine Szenariokarte und setze sie in den passenden Zielbereich."
        support={comparison}
        categories={categories}
        items={items}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        success="Richtig. Gezielte Einzelabfragen passen zu Connection; Chat und Spiel benötigen Reaktionen auf spontan eintreffende Nachrichten."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={5} />
      {done && <CompletedBanner onNext={onNext} text="Auf der anderen Seite reagiert der Server auf neue Verbindungen, Nachrichten und Trennungen." />}
    </StationFrame>
  );
}

function LearningStation7({ done, onComplete, onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
  const questions: QuizQuestion[] = [
    {
      prompt: 'Wo verarbeitet der Server die Nachricht „PING“?',
      options: ['processMessage(...)', 'processNewConnection(...)', 'processClosingConnection(...)', 'receive()'],
      answer: 'processMessage(...)',
      success: 'Richtig. Inhalte eingehender Nachrichten werden in processMessage(...) behandelt.',
    },
    {
      prompt: 'Mit welchem Aufruf antwortet der Server einem bestimmten Client?',
      options: ['send(pClientIP, pClientPort, "PONG")', 'close()', 'receive()', 'new Connection(...)'],
      answer: 'send(pClientIP, pClientPort, "PONG")',
      success: 'Genau. IP und Port identifizieren die konkrete Client-Verbindung.',
    },
    {
      prompt: 'Was sollte bei einer Trennung aufgeräumt werden?',
      options: ['Zustand dieses Clients', 'Die IP aller Server', 'Das HTTP-Protokoll', 'Der Java-Compiler'],
      answer: 'Zustand dieses Clients',
      success: 'Richtig. processClosingConnection(...) ist der passende Ort für Aufräumarbeiten.',
    },
  ];
  const categories: MatchCategory[] = [
    { id: 'new', label: 'processNewConnection(...)', caption: 'neuer Client', icon: LogIn },
    { id: 'message', label: 'processMessage(...)', caption: 'neuer Inhalt', icon: MessageSquare },
    { id: 'closing', label: 'processClosingConnection(...)', caption: 'Client geht', icon: LogOut },
  ];
  const items: MatchItem[] = [
    { id: 'anna-message', label: 'Anna sendet LOGIN:Anna', target: 'message', icon: Send },
    { id: 'ben-leaves', label: 'Ben beendet sein Programm', target: 'closing', icon: LogOut },
    { id: 'anna-connects', label: 'Anna verbindet sich', target: 'new', icon: LogIn },
  ];
  const code = (
    <div className="mb-6 rounded-xl bg-slate-950 p-4 font-mono text-sm leading-7 text-slate-200">
      <p><span className="text-violet-300">if</span> (pMessage.equals(<span className="text-amber-300">&quot;PING&quot;</span>)) {'{'}</p>
      <p className="pl-5">send(pClientIP, pClientPort, <span className="text-emerald-300">&quot;PONG&quot;</span>);</p>
      <p>{'}'}</p>
    </div>
  );

  return (
    <StationFrame kicker="Ereignisse behandeln" title="Der Server reagiert auf drei Momente" lead="Die komplexe Socketverwaltung bleibt verborgen. Die eigene Unterklasse bearbeitet drei verständliche Netzwerkereignisse.">
      <IntroBlock
        minutes={2}
        title="Der Server wird durch Ereignisse aufgerufen"
        paragraphs={[
          'Mehrere Clients können gleichzeitig mit dem Server verbunden sein. Die NRW-Klasse verwaltet diese Verbindungen intern.',
          'Die eigene Unterklasse reagiert nur auf drei Momente: Ein Client kommt, sendet eine Nachricht oder trennt die Verbindung.',
        ]}
        facts={['Neue Verbindung → processNewConnection', 'Nachricht → processMessage', 'Trennung → processClosingConnection']}
        note="Die Methoden werden nicht nacheinander abgespult; sie werden passend zum eintretenden Netzwerkereignis aufgerufen."
      />
      <MatchDiagramTask
        minutes={5}
        title="Verbinde Ereignis und Methode"
        description="Setze jede Situation in die Methode, die der Server dafür aufruft."
        support={code}
        categories={categories}
        items={items}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        success="Richtig. Verbindung, Nachricht und Trennung lösen jeweils genau die passende abstrakte Methode aus."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={3} />
      {done && <CompletedBanner onNext={onNext} text="Du kennst jetzt beide Seiten. Im Finale entwirfst du die gemeinsame Sprache selbst." />}
    </StationFrame>
  );
}

function LearningStation8({ done, onComplete, onNext: _onNext }: StationProps) {
  const [diagramDone, setDiagramDone] = useState(done);
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
  const nodes: DiagramNode[] = [
    { id: 'answer', label: 'C → S ANSWER:C', caption: 'Antwort senden', icon: Send },
    { id: 'bye', label: 'S → C BYE', caption: 'Sitzung beendet', icon: LogOut },
    { id: 'login', label: 'C → S LOGIN:Anna', caption: 'Name anmelden', icon: UserRound },
    { id: 'question-data', label: 'S → C QUESTION:…', caption: 'Frage liefern', icon: Braces },
    { id: 'correct', label: 'S → C CORRECT', caption: 'Antwort bewerten', icon: CheckCircle2 },
    { id: 'ok', label: 'S → C OK', caption: 'Anmeldung bestätigen', icon: Check },
    { id: 'quit', label: 'C → S QUIT', caption: 'Verbindung beenden', icon: LogOut },
    { id: 'question', label: 'C → S QUESTION', caption: 'Frage anfordern', icon: MessageSquare },
  ];
  const protocolCards = (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-slate-950 p-4 text-slate-100"><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Client sendet</p><div className="mt-3 space-y-1.5 font-mono text-xs"><p>LOGIN:&lt;Name&gt;</p><p>QUESTION</p><p>ANSWER:&lt;Auswahl&gt;</p><p>QUIT</p></div></div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800"><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Server antwortet</p><div className="mt-3 space-y-1.5 font-mono text-xs"><p>OK / ERROR:...</p><p>QUESTION:...</p><p>CORRECT / WRONG</p><p>BYE</p></div></div>
    </div>
  );
  const goals = [
    'IP-Adresse und Port unterscheiden',
    'TCP und Anwendungsprotokoll trennen',
    'HTTP- und POP3-Nachrichten analysieren',
    'send(), receive() und close() erklären',
    'processMessage() einordnen',
    'ein eigenes Protokoll entwerfen',
  ];

  return (
    <StationFrame kicker="Transfer" title="Jetzt entwirfst du die Sprache" lead="Im Finale entsteht aus Nachrichtentypen, Zuständen und Fehlerregeln ein vollständiger Quizdialog.">
      <IntroBlock
        minutes={3}
        title="Ein eigenes Protokoll muss eindeutig sein"
        paragraphs={[
          'Der Quizclient meldet einen Namen an, fordert eine Frage an, sendet eine Antwort und beendet später die Verbindung.',
          'Jede Nachricht braucht eine eindeutige Form. Außerdem muss der Server auf unbekannte oder im falschen Zustand gesendete Befehle mit einer verständlichen Fehlermeldung reagieren.',
        ]}
        facts={['Nachrichtentyp und Nutzdaten trennen.', 'Client- und Servernachrichten unterscheiden.', 'Reihenfolge und Fehlerfälle festlegen.']}
        note="Ein robustes Protokoll beschreibt nicht nur den Idealfall, sondern auch unerlaubte Nachrichten und passende Fehlerantworten."
      />
      <SequenceDiagramTask
        minutes={7}
        title="Baue einen vollständigen Quizdialog"
        description="Ordne abwechselnd Client- und Servernachrichten von der Anmeldung bis zum Abschied."
        support={protocolCards}
        items={nodes}
        correctOrder={['login', 'ok', 'question', 'question-data', 'answer', 'correct', 'quit', 'bye']}
        completed={diagramDone}
        onComplete={() => setDiagramDone(true)}
        success="Richtig. Der Dialog besitzt eine Anmeldung, eine Frage-Antwort-Runde und einen geregelten Abschluss."
      />
      <FinalQuiz unlocked={diagramDone || done} questions={questions} onComplete={onComplete} minutes={5} title="Protokoll-Check" description="Prüfe Syntax, Ablauf und Fehlerbehandlung deines Quizprotokolls." completeLabel="Protokoll festlegen" />
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
      const stored = window.localStorage.getItem('netzwerke-q2-progress-v2');
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
      window.localStorage.setItem('netzwerke-q2-progress-v2', JSON.stringify(completed));
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
      case 0: return <LearningStation0 {...props} />;
      case 1: return <LearningStation1 {...props} />;
      case 2: return <LearningStation2 {...props} />;
      case 3: return <LearningStation3 {...props} />;
      case 4: return <LearningStation4 {...props} />;
      case 5: return <LearningStation5 {...props} />;
      case 6: return <LearningStation6 {...props} />;
      case 7: return <LearningStation7 {...props} />;
      default: return <LearningStation8 {...props} />;
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
          <div className="hidden border-b border-white/10 px-5 py-4 lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Zeitplan</p>
            <p className="mt-1 text-sm font-bold text-slate-200">3 × 45 Min. · insgesamt 135 Min.</p>
          </div>
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
