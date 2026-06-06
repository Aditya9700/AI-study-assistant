import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload, FileText, Layers, GraduationCap, Clock, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — StudyMind" }] }),
  component: DashboardHome,
});

const stats = [
  { label: "Study sessions", value: "24", icon: FileText, change: "+3 this week" },
  { label: "Flashcards reviewed", value: "382", icon: Layers, change: "+58 this week" },
  { label: "Quiz accuracy", value: "87%", icon: TrendingUp, change: "+4% this week" },
  { label: "Study streak", value: "12d", icon: Sparkles, change: "Keep it up!" },
];

const recent = [
  { title: "Organic Chemistry — Ch.12", type: "PDF", time: "2h ago" },
  { title: "Stanford CS229 Lecture 4", type: "YouTube", time: "Yesterday" },
  { title: "Linear Algebra Notes", type: "PDF", time: "2 days ago" },
  { title: "Microeconomics Midterm Prep", type: "PDF", time: "5 days ago" },
];

function DashboardHome() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Aditya </h1>
          <p className="mt-1 text-muted-foreground">Pick up where you left off or start a new study session.</p>
        </div>  
        <Link to="/dashboard/workspace" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
          <Upload className="h-4 w-4" /> New session
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{s.change}</span>
            </div>
            <div className="mt-4 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent study sessions</h2>
            <Link to="/dashboard/history" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {recent.map((r) => (
              <li key={r.title} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.type} • {r.time}</p>
                  </div>
                </div>
                <Link to="/dashboard/workspace" className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent">
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Quick actions</h2>
          <div className="mt-4 space-y-3">
            {[
              { icon: Upload, label: "Upload a PDF", to: "/dashboard/workspace" as const },
              { icon: GraduationCap, label: "Start a quiz", to: "/dashboard/workspace" as const },
              { icon: Clock, label: "Resume last session", to: "/dashboard/workspace" as const },
            ].map((a) => (
              <Link key={a.label} to={a.to} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-accent">
                <span className="flex items-center gap-3"><a.icon className="h-4 w-4 text-primary" /> {a.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
