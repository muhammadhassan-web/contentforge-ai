"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "@/components/Logo";
import { GoogleIcon } from "@/components/GoogleIcon";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white px-4">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="animate-blob absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-fuchsia-300/25 blur-3xl [animation-delay:5s]" />
      </div>

      <div className="animate-fade-in-up w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl shadow-indigo-100">
        <Link href="/" className="mb-6 flex justify-center">
          <LogoMark className="h-10 w-10" />
        </Link>
        <h1 className="mb-1 text-center text-2xl font-semibold text-neutral-900">Welcome back</h1>
        <p className="mb-6 text-center text-sm text-neutral-500">Log in to ContentForge AI</p>

        <button
          onClick={handleGoogleLogin}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="mb-4 flex items-center gap-3 text-xs text-neutral-400">
          <div className="h-px flex-1 bg-neutral-200" />
          or
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
