import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — StudyMind" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue learning."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary hover:underline">Create one</Link></>}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
      >
        <Field label="Email" type="email" placeholder="you@school.edu" required />
        <Field label="Password" type="password" placeholder="••••••••" required />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <label className="inline-flex items-center gap-2"><input type="checkbox" className="accent-[var(--primary)]" /> Remember me</label>
          <a href="#" className="hover:text-foreground">Forgot password?</a>
        </div>
        <button type="submit" className="w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
          Sign in
        </button>
        <div className="relative my-2 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-card px-2">or continue with</span>
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        </div>
        <button type="button" className="w-full rounded-lg border border-border bg-secondary py-2.5 text-sm font-medium hover:bg-accent">
          Continue with Google
        </button>
      </form>
    </AuthShell>
  );
}
