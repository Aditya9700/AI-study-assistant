import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Bell, User, Save } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — StudyMind" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(true);
  const [notifs, setNotifs] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light") setDark(false);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", !dark);
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <Section title="Appearance" icon={dark ? Moon : Sun}>
        <Row
          label="Dark mode"
          description="Switch between dark and light themes."
          control={
            <button
              onClick={() => setDark((d) => !d)}
              className={`relative h-6 w-11 rounded-full transition ${dark ? "bg-gradient-primary" : "bg-muted"}`}
              aria-pressed={dark}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition ${dark ? "left-5" : "left-0.5"}`} />
            </button>
          }
        />
      </Section>

      <Section title="Notifications" icon={Bell}>
        <Row
          label="Study reminders"
          description="Get gentle nudges when it's time to review."
          control={
            <button
              onClick={() => setNotifs((n) => !n)}
              className={`relative h-6 w-11 rounded-full transition ${notifs ? "bg-gradient-primary" : "bg-muted"}`}
              aria-pressed={notifs}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition ${notifs ? "left-5" : "left-0.5"}`} />
            </button>
          }
        />
      </Section>

      <Section title="Account" icon={User}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Full name" defaultValue="Alex Johnson" />
          <Field label="Email" defaultValue="alex@school.edu" />
          <Field label="University" defaultValue="State University" />
          <Field label="Major" defaultValue="Computer Science" />
        </div>
        <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
          <Save className="h-4 w-4" /> Save changes
        </button>
      </Section>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof User; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Row({ label, description, control }: { label: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {control}
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
