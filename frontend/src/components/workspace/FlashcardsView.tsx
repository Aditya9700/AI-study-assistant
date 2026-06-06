import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import type { StudyFlashcard } from "@/components/api";

const defaultCards: StudyFlashcard[] = [
  { question: "What is the primary site of photosynthesis?", answer: "The chloroplasts, specifically the thylakoid membranes." },
  { question: "Name the two stages of photosynthesis.", answer: "Light-dependent reactions and the Calvin cycle." },
  { question: "Which pigment absorbs light most efficiently?", answer: "Chlorophyll absorbs red and blue light and reflects green." },
  { question: "What are the products of the light reactions?", answer: "ATP and NADPH, with oxygen released as a byproduct." },
  { question: "What does the Calvin cycle fix?", answer: "Carbon dioxide (CO₂) into glucose." },
];

type FlashcardsViewProps = {
  flashcards?: StudyFlashcard[];
};

export function FlashcardsView({ flashcards }: FlashcardsViewProps) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cards = flashcards?.length ? flashcards : defaultCards;
  const card = cards[i];

  const next = () => { setFlipped(false); setI((p) => (p + 1) % cards.length); };
  const prev = () => { setFlipped(false); setI((p) => (p - 1 + cards.length) % cards.length); };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {i + 1} of {cards.length}</span>
        <button onClick={() => setFlipped((f) => !f)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 hover:bg-accent">
          <RotateCw className="h-3 w-3" /> Flip
        </button>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="group relative h-72 w-full"
        style={{ perspective: "1200px" }}
        aria-label="Flip card"
      >
        <div
          className="relative h-full w-full transition-transform duration-500"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-border bg-card p-8 text-center shadow-card"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">Question</p>
              <p className="mt-3 text-xl font-medium">{card.question}</p>
              <p className="mt-6 text-xs text-muted-foreground">Tap to reveal answer</p>
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-primary/40 bg-gradient-primary p-8 text-center text-primary-foreground shadow-glow"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Answer</p>
              <p className="mt-3 text-xl font-medium">{card.answer}</p>
            </div>
          </div>
        </div>
      </button>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={prev} className="rounded-lg border border-border bg-card p-2 hover:bg-accent" aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {cards.map((_, idx) => (
            <span key={idx} className={`h-1.5 w-6 rounded-full transition ${idx === i ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <button onClick={next} className="rounded-lg border border-border bg-card p-2 hover:bg-accent" aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
