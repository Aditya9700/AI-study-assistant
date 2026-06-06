import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Sparkles, FileText, Layers, GraduationCap, Upload, Zap, ShieldCheck, Github, Twitter, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI-Powered Personalized Study Assistant" },
      { name: "description", content: "Upload PDFs or YouTube lectures. Get instant AI summaries, flashcards, and quizzes tailored to you." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">AI-Powered Personalized Study Assistant</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/signup" className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground animate-fade-in">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Now with smarter quiz generation</span>
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl animate-slide-up">
          Study smarter with your<br></br>
          <span className="text-gradient"> AI-Powered Study Assistant </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Drop a PDF or paste a YouTube lecture. StudyMind instantly generates summaries, flashcards, and quizzes — so you spend less time taking notes and more time learning.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow hover:opacity-90">
            Start studying free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/dashboard" className="rounded-xl border border-border bg-card/60 px-6 py-3 font-medium hover:bg-card">
            Open Dashboard
          </Link>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-border bg-card/60 p-2 shadow-card glass">
            <div className="rounded-xl bg-background/60 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { icon: FileText, label: "Summary", text: "Key concepts auto-extracted from your material." },
                  { icon: Layers, label: "Flashcards", text: "Spaced repetition cards generated in seconds." },
                  { icon: GraduationCap, label: "Quiz", text: "Adaptive practice with instant feedback." },
                ].map((c) => (
                  <div key={c.label} className="rounded-lg border border-border bg-card p-5 text-left">
                    <c.icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold">{c.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Upload, title: "Universal upload", text: "PDFs, slides, or YouTube lecture links — all in one workspace." },
    { icon: Sparkles, title: "AI summaries", text: "Bullet-point recaps and highlighted key concepts in seconds." },
    { icon: Layers, title: "Smart flashcards", text: "Beautiful flip cards generated from your study material." },
    { icon: GraduationCap, title: "Mock quizzes", text: "Multiple choice questions with timer and instant scoring." },
    { icon: Zap, title: "Lightning fast", text: "Optimized pipeline streams content as it's generated." },
    { icon: ShieldCheck, title: "Private by default", text: "Your study sessions stay yours. Always." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Everything you need to ace your next exam</h2>
        <p className="mt-4 text-muted-foreground">Powerful tools designed for the way students actually study.</p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-glow">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Upload", d: "Drop a PDF or paste a YouTube link." },
    { n: "02", t: "Generate", d: "AI extracts the key ideas and structure." },
    { n: "03", t: "Practice", d: "Review summaries, flashcards, and quizzes." },
  ];
  return (
    <section id="how" className="border-y border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
          <p className="mt-4 text-muted-foreground">Three steps from raw material to mastery.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-background p-8">
              <div className="text-sm font-mono text-primary">{s.n}</div>
              <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-primary p-10 text-center shadow-glow md:p-16">
        <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">Ready to study smarter?</h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80"></p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/signup" className="rounded-xl bg-background px-6 py-3 font-medium text-foreground hover:opacity-90">
            Create free account
          </Link>
          <ul className="flex flex-wrap gap-4 text-sm text-primary-foreground/90">
            {["No credit card", "Free forever plan", "Cancel anytime"].map((x) => (
              <li key={x} className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> {x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold"> Study Assistant</span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
