"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "@/components/Logo";

type Generation = {
  id: string;
  topic: string;
  platform: string;
  tone: string;
  output: string;
  created_at: string;
};

export default function DashboardClient({
  email,
  plan,
  usedThisMonth,
  limit,
  recent,
}: {
  email: string;
  plan: string;
  usedThisMonth: number;
  limit: number;
  recent: Generation[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Playful");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [used, setUsed] = useState(usedThisMonth);
  const [upgrading, setUpgrading] = useState(false);

  const isPro = plan === "pro";
  const remaining = Math.max(limit - used, 0);
  const atLimit = !isPro && remaining <= 0;

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOutput(null);
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, platform, tone }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      return;
    }

    setOutput(data.output);
    setUsed((u) => u + 1);
  }

  async function handleUpgrade() {
    setUpgrading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    setUpgrading(false);
    if (data.url) window.location.href = data.url;
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-neutral-900">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <LogoMark className="h-7 w-7" />
          <span className="text-lg font-semibold">ContentForge AI</span>
          <span
            className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              isPro ? "bg-indigo-100 text-indigo-700" : "bg-neutral-100 text-neutral-500"
            }`}
          >
            {isPro ? "Pro" : "Free"}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span>{email}</span>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {!isPro && (
          <div className="animate-fade-in-up mb-6 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4">
            <p className="text-sm text-indigo-900">
              {remaining} of {limit} free generations left this month
            </p>
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md disabled:opacity-50"
            >
              {upgrading ? "Redirecting..." : "Upgrade to Pro"}
            </button>
          </div>
        )}

        <h1 className="animate-fade-in-up mb-6 text-2xl font-semibold text-neutral-900">Generate captions</h1>

        <form
          onSubmit={handleGenerate}
          className="animate-fade-in-up space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm [animation-delay:100ms]"
        >
          <div>
            <label className="mb-1 block text-sm text-neutral-500">Topic / product / idea</label>
            <textarea
              required
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Launching our new cold brew flavor this weekend"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-neutral-500">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option>Instagram</option>
                <option>TikTok</option>
                <option>LinkedIn</option>
                <option>X / Twitter</option>
                <option>Facebook</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-neutral-500">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option>Playful</option>
                <option>Professional</option>
                <option>Witty</option>
                <option>Inspirational</option>
                <option>Bold</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || atLimit}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {atLimit ? "Free limit reached — upgrade to continue" : loading ? "Generating..." : "Generate captions"}
          </button>
        </form>

        {output && (
          <div className="animate-fade-in-up mt-6 whitespace-pre-wrap rounded-2xl border border-neutral-200 bg-white p-6 text-sm leading-relaxed text-neutral-700 shadow-sm">
            {output}
          </div>
        )}

        {recent.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-3 text-lg font-semibold text-neutral-700">Recent generations</h2>
            <div className="space-y-3">
              {recent.map((g) => (
                <details key={g.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <summary className="cursor-pointer text-sm text-neutral-700">
                    {g.platform} · {g.tone} · {g.topic.slice(0, 60)}
                  </summary>
                  <div className="mt-3 whitespace-pre-wrap text-sm text-neutral-500">{g.output}</div>
                </details>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
