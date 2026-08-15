import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PricingSelector } from "@/components/PricingSelector";

const FEATURES = [
  {
    icon: "✍️",
    title: "Built for social captions",
    desc: "Pick a platform and tone, describe your post, and get three ready-to-publish captions with hashtags in seconds.",
  },
  {
    icon: "🎁",
    title: "Generous free tier",
    desc: "5 free generations every month, no credit card required to start.",
  },
  {
    icon: "⚡",
    title: "Unlimited with Pro",
    desc: "Upgrade any time for unlimited generations, billed monthly through Stripe.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white text-neutral-900">
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-neutral-600 transition hover:text-neutral-900">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md"
          >
            Get started free
          </Link>
        </nav>
      </header>

      <main className="relative mx-auto max-w-4xl px-6 pb-24 pt-16 text-center">
        {/* animated background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-blob absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl" />
          <div className="animate-blob absolute top-40 right-1/4 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl [animation-delay:4s]" />
          <div className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl [animation-delay:8s]" />
        </div>

        <span className="animate-fade-in-up mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-medium text-indigo-600 shadow-sm">
          ✨ AI-powered social captions
        </span>
        <h1 className="animate-fade-in-up mb-5 text-4xl font-semibold leading-tight text-neutral-900 [animation-delay:100ms] sm:text-5xl">
          Never stare at a{" "}
          <span className="shimmer-text">blank caption box</span> again
        </h1>
        <p className="animate-fade-in-up mx-auto mb-8 max-w-xl text-lg text-neutral-600 [animation-delay:200ms]">
          Describe your post, pick a platform and tone, and ContentForge AI writes
          scroll-stopping captions with hashtags — instantly.
        </p>
        <div className="animate-fade-in-up flex items-center justify-center gap-3 [animation-delay:300ms]">
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg"
          >
            Start generating for free
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
          >
            I already have an account
          </Link>
        </div>

        <div className="animate-float mx-auto mt-16 max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-xl shadow-indigo-100">
          <div className="mb-3 flex items-center gap-2 text-xs text-neutral-400">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
            <span className="ml-2">Instagram · Playful</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-700">
            Brew-tiful news, friends! ☕️ Our brand new cold brew flavor is launching
            this weekend and we can&apos;t wait for you to try it! 🤩
            <br />
            <span className="text-indigo-500">#ColdBrewLove #NewFlavorAlert #CoffeeLovers</span>
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="animate-fade-in-up rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              <div className="mb-3 text-2xl">{f.icon}</div>
              <h3 className="mb-2 font-semibold text-neutral-900">{f.title}</h3>
              <p className="text-sm text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="animate-fade-in-up mt-20 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm [animation-delay:700ms]">
          <h2 className="mb-2 text-2xl font-semibold text-neutral-900">Simple pricing</h2>
          <p className="mb-6 text-sm text-neutral-500">Tap a plan to select it</p>
          <PricingSelector />
        </div>
      </main>
    </div>
  );
}
