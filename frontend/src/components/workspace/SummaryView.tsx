import type { StudyMaterialResponse } from "@/components/api";

const defaultSummary =
  "This study set is ready. Upload a PDF or paste a YouTube link to generate a source-specific summary, key points, concepts, flashcards, and quiz questions.";

const defaultPoints = [
  "Photosynthesis converts light energy into chemical energy stored in glucose.",
  "Occurs primarily in the chloroplasts of plant cells, specifically in the thylakoid membranes.",
  "Two main stages: light-dependent reactions and the Calvin cycle (light-independent).",
  "Net equation: 6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂.",
  "Chlorophyll absorbs red and blue wavelengths most efficiently and reflects green.",
];
const defaultConcepts = ["Chloroplast", "Thylakoid", "Calvin cycle", "ATP", "NADPH", "Chlorophyll"];

type SummaryViewProps = {
  studyMaterial?: StudyMaterialResponse | null;
};

export function SummaryView({ studyMaterial }: SummaryViewProps) {
  const points = studyMaterial?.key_points?.length ? studyMaterial.key_points : defaultPoints;
  const concepts = studyMaterial?.concepts?.length ? studyMaterial.concepts : defaultConcepts;
  const summary = studyMaterial?.summary || defaultSummary;
  const sourceLabel = studyMaterial
    ? studyMaterial.source_type === "youtube"
      ? "YouTube source"
      : "PDF source"
    : "Demo content";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Key points</h2>
          <span className="text-xs text-muted-foreground">{sourceLabel}</span>
        </div>
        <ul className="mt-4 space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Key concepts</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {concepts.map((c) => (
              <span key={c} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Highlight</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        </div>
      </div>
    </div>
  );
}
