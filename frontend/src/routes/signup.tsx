import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — StudyMind" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start studying smarter in seconds."
      footer={<>Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></>}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
      >
        <Field label="Full name" placeholder="Alex Johnson" required />
        <Field label="Email" type="email" placeholder="you@school.edu" required />
        <Field label="Password" type="password" placeholder="At least 8 characters" required />
        <button type="submit" className="w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
          Create account
        </button>
        <button type="button" className="w-full rounded-lg border border-border bg-secondary py-2.5 text-sm font-medium hover:bg-accent">
          Continue with Google
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
