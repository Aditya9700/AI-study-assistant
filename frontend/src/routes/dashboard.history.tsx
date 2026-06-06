import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Youtube, Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "History — StudyMind" }] }),
  component: HistoryPage,
});

const all = [
  { title: "Organic Chemistry — Ch.12", type: "PDF", date: "May 9, 2026", cards: 24, score: 92 },
  { title: "Stanford CS229 Lecture 4", type: "YouTube", date: "May 8, 2026", cards: 18, score: 84 },
  { title: "Linear Algebra — Eigenvectors", type: "PDF", date: "May 6, 2026", cards: 30, score: 88 },
  { title: "Microeconomics Midterm Prep", type: "PDF", date: "May 4, 2026", cards: 42, score: 75 },
  { title: "MIT 6.006 Algorithms", type: "YouTube", date: "Apr 28, 2026", cards: 22, score: 91 },
  { title: "World History — WWII Causes", type: "PDF", date: "Apr 22, 2026", cards: 16, score: 80 },
];

function HistoryPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "PDF" | "YouTube">("all");
  const items = all.filter((x) => (filter === "all" || x.type === filter) && x.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">History</h1>
        <p className="mt-1 text-muted-foreground">Browse and reopen your previous study sessions.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sessions…"
            className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {(["all", "PDF", "YouTube"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs ${filter === f ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                {it.type === "PDF" ? <FileText className="h-4 w-4 text-primary" /> : <Youtube className="h-4 w-4 text-primary" />}
              </div>
              <span className="text-xs text-muted-foreground">{it.date}</span>
            </div>
            <h3 className="mt-4 line-clamp-2 font-semibold">{it.title}</h3>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{it.cards} cards</span>
              <span className="text-success">Score {it.score}%</span>
            </div>
            <Link to="/dashboard/workspace" className="mt-4 block w-full rounded-lg border border-border py-2 text-center text-xs hover:bg-accent">
              Open session
            </Link>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No sessions match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
