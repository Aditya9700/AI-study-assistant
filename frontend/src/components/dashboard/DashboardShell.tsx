import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, LayoutDashboard, Upload, History, Settings, LogOut, Search, Bell } from "lucide-react";

const items = [
  { to: "/dashboard" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/workspace" as const, label: "Workspace", icon: Upload, exact: false },
  { to: "/dashboard/history" as const, label: "History", icon: History, exact: false },
  { to: "/dashboard/settings" as const, label: "Settings", icon: Settings, exact: false },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold">StudyMind</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {items.map((it) => {
            const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-xl border border-sidebar-border bg-card p-4">
          <p className="text-xs font-semibold">Pro tip</p>
          <p className="mt-1 text-xs text-muted-foreground">Paste a YouTube link to generate an instant study set.</p>
        </div>

        <Link to="/login" className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" /> Sign out
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search notes, flashcards, quizzes…"
              className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button className="rounded-lg border border-border bg-secondary p-2 text-muted-foreground hover:text-foreground" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">A</div>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
