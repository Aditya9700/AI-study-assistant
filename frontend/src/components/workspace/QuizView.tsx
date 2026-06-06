import { useEffect, useState } from "react";
import { Clock, Check, X, Trophy, RotateCw } from "lucide-react";
import type { StudyQuizQuestion } from "@/components/api";

const defaultQuestions: StudyQuizQuestion[] = [
  { question: "Where does photosynthesis primarily occur?", choices: ["Mitochondria", "Chloroplasts", "Nucleus", "Ribosomes"], answer: 1 },
  { question: "Which gas is produced as a byproduct of photosynthesis?", choices: ["CO₂", "N₂", "O₂", "H₂"], answer: 2 },
  { question: "What does the Calvin cycle fix?", choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Water"], answer: 2 },
  { question: "Chlorophyll appears green because it…", choices: ["Absorbs green light", "Reflects green light", "Emits green light", "Refracts green light"], answer: 1 },
  { question: "Which molecules carry energy from light reactions to the Calvin cycle?", choices: ["ATP & NADPH", "DNA & RNA", "Glucose & H₂O", "CO₂ & O₂"], answer: 0 },
];

type QuizViewProps = {
  quiz?: StudyQuizQuestion[];
};

export function QuizView({ quiz }: QuizViewProps) {
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(0);
  const questions = quiz?.length ? quiz : defaultQuestions;

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setTime((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  const submit = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    setTimeout(() => {
      const next = [...picks, idx];
      setPicks(next);
      setPicked(null);
      if (i + 1 >= questions.length) setDone(true);
      else setI(i + 1);
    }, 700);
  };

  const reset = () => { setI(0); setPicks([]); setPicked(null); setDone(false); setTime(0); };

  if (done) {
    const score = picks.filter((p, idx) => p === questions[idx].answer).length;
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
          <Trophy className="h-6 w-6 text-primary-foreground" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Quiz complete!</h2>
        <p className="mt-1 text-muted-foreground">You scored {score} / {questions.length}</p>
        <div className="mx-auto mt-6 h-2 max-w-xs overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-primary" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-3xl font-bold text-gradient">{pct}%</p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <Stat label="Correct" value={String(score)} />
          <Stat label="Time" value={`${time}s`} />
          <Stat label="Accuracy" value={`${pct}%`} />
        </div>
        <button onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
          <RotateCw className="h-4 w-4" /> Try again
        </button>
      </div>
    );
  }

  const q = questions[i];
  const progress = ((i) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Question {i + 1} of {questions.length}</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs">
          <Clock className="h-3 w-3" /> {time}s
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-gradient-primary transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-lg font-semibold">{q.question}</h3>
        <div className="mt-5 grid gap-3">
          {q.choices.map((c, idx) => {
            const isPick = picked === idx;
            const isCorrect = picked !== null && idx === q.answer;
            const isWrong = isPick && idx !== q.answer;
            return (
              <button
                key={idx}
                onClick={() => submit(idx)}
                disabled={picked !== null}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition ${
                  isCorrect
                    ? "border-success bg-success/10 text-success"
                    : isWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border hover:border-primary/40 hover:bg-accent"
                }`}
              >
                <span>{c}</span>
                {isCorrect && <Check className="h-4 w-4" />}
                {isWrong && <X className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
