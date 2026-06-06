import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import axios from "axios";
import { Upload, Youtube, FileText, Layers, GraduationCap, Sparkles, X } from "lucide-react";
import { SummaryView } from "@/components/workspace/SummaryView";
import { FlashcardsView } from "@/components/workspace/FlashcardsView";
import { QuizView } from "@/components/workspace/QuizView";
import { submitStudyMaterial, type StudyMaterialResponse } from "@/components/api";

export const Route = createFileRoute("/dashboard/workspace")({
  head: () => ({ meta: [{ title: "Workspace — StudyMind" }] }),
  component: Workspace,
});

type Tab = "summary" | "flashcards" | "quiz";
type Stage = "idle" | "uploading" | "processing" | "ready";

function getSubmitErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseError = error.response?.data?.error;

    if (typeof responseError === "string" && responseError.trim()) {
      return responseError;
    }

    const responseMessage = error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Failed to process study material";
}

function Workspace() {
  const [stage, setStage] = useState<Stage>("idle");
  const [tab, setTab] = useState<Tab>("summary");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [youtube, setYoutube] = useState("");
  const [studyMaterial, setStudyMaterial] = useState<StudyMaterialResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submissionRef = useRef(0);
  const progressTimerRef = useRef<number | null>(null);
  const processingTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    if (processingTimerRef.current !== null) {
      window.clearTimeout(processingTimerRef.current);
      processingTimerRef.current = null;
    }
  };

  const reset = () => {
    submissionRef.current += 1;
    clearTimers();
    setStage("idle");
    setFileName(null);
    setProgress(0);
    setYoutube("");
    setStudyMaterial(null);
    setError(null);
  };

  const submitMaterial = async (input: { file?: File; youtubeUrl?: string }) => {
    const submissionId = ++submissionRef.current;
    const sourceLabel = input.file?.name ?? input.youtubeUrl?.trim() ?? "Study material";

    clearTimers();
    setError(null);
    setStudyMaterial(null);
    setFileName(sourceLabel);
    setStage("uploading");
    setProgress(10);

    let currentProgress = 10;
    progressTimerRef.current = window.setInterval(() => {
      currentProgress = Math.min(currentProgress + 8, 90);
      setProgress(currentProgress);
    }, 140);

    try {
      const response = await submitStudyMaterial(input);

      if (submissionRef.current !== submissionId) {
        return;
      }

      clearTimers();
      setStage("processing");
      setProgress(100);

      processingTimerRef.current = window.setTimeout(() => {
        if (submissionRef.current !== submissionId) {
          return;
        }

        setStudyMaterial(response);
        setFileName(response.source_name || sourceLabel);
        setStage("ready");
      }, 900);
    } catch (submitError) {
      if (submissionRef.current !== submissionId) {
        return;
      }

      clearTimers();
      setStage("idle");
      setProgress(0);
      setStudyMaterial(null);
      setError(getSubmitErrorMessage(submitError));
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Workspace</h1>
        <p className="mt-1 text-muted-foreground">Upload material and let AI generate your study set.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {stage === "idle" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (!f) {
                return;
              }

              if (f.type !== "application/pdf") {
                setError("Please drop a PDF file.");
                return;
              }

              void submitMaterial({ file: f });
            }}
            className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center transition hover:border-primary/50"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Upload className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">Drag & drop a PDF</h3>
            <p className="mt-1 text-sm text-muted-foreground">or click to browse from your device</p>
            <label className="mt-5 inline-block cursor-pointer rounded-lg border border-border bg-secondary px-4 py-2 text-sm hover:bg-accent">
              Choose file
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    void submitMaterial({ file: f });
                  }
                }}
              />
            </label>
          </div>

          <div className="rounded-2xl border border-border bg-card p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Youtube className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">Paste a YouTube lecture</h3>
            <p className="mt-1 text-sm text-muted-foreground">We'll fetch the transcript and analyze it.</p>
            <div className="mt-5 flex gap-2">
              <input
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/watch?v=…"
                className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <button
                disabled={!youtube}
                onClick={() => void submitMaterial({ youtubeUrl: youtube.trim() })}
                className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === "uploading" && (
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <p className="font-medium">{fileName}</p>
            <button onClick={reset} className="ml-auto text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-gradient-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Uploading and analyzing… {progress}%</p>
        </div>
      )}

      {stage === "processing" && (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Generating your study set…</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="inline-block">Extracting key concepts</span>
            <span className="ml-1 inline-block w-2 animate-blink">▍</span>
          </p>
          <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3">
            {["Summary", "Flashcards", "Quiz"].map((s, i) => (
              <div key={s} className="h-20 animate-pulse rounded-lg bg-muted" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        </div>
      )}

      {stage === "ready" && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <p className="font-medium">{fileName ?? "Study set"}</p>
            </div>
            <button onClick={reset} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent">New session</button>
          </div>

          <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
            {([
              { id: "summary", label: "Summary", icon: FileText },
              { id: "flashcards", label: "Flashcards", icon: Layers },
              { id: "quiz", label: "Quiz", icon: GraduationCap },
            ] as { id: Tab; label: string; icon: typeof FileText }[]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  tab === t.id ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <div key={tab} className="animate-fade-in">
            {tab === "summary" && <SummaryView studyMaterial={studyMaterial} />}
            {tab === "flashcards" && <FlashcardsView key={studyMaterial?.source_name ?? "flashcards"} flashcards={studyMaterial?.flashcards} />}
            {tab === "quiz" && <QuizView key={studyMaterial?.source_name ?? "quiz"} quiz={studyMaterial?.quiz} />}
          </div>
        </>
      )}
    </div>
  );
}
