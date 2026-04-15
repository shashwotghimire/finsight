import Image from "next/image";
import Link from "next/link";

const featureCards = [
  {
    title: "Mood-Based Budget AI",
    description: "Auto-adjusts your monthly budget depending on whether your playlist is lo-fi, metal, or jazz.",
  },
  {
    title: "Quantum Receipt Scanner",
    description: "Reads receipts before you even upload them (sometimes even before you buy anything).",
  },
  {
    title: "Retro Mercury Mode",
    description: "Switches your dashboard to a cosmic finance timeline optimized for dramatic decision-making.",
  },
  {
    title: "Cashflow Weather Radar",
    description: "Predicts financial storms with colorful clouds and suspiciously accurate vibes.",
  },
  {
    title: "Emoji Tax Assistant",
    description: "Translates complex tax categories into emojis so your reports feel emotionally supportive.",
  },
  {
    title: "Teleport Savings Vault",
    description: "Moves spare change to a vault in another dimension where impulse purchases can’t find it.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-8 md:px-10 md:py-10">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <Image
              src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/money/dollar-minimalistic-7sr3wyd3gc9je4re2y9b8l.png/dollar-minimalistic-zumyt8yqlccd6959i5l29.png?_a=DATAiZAAZAA0"
              alt="Finsights logo"
              width={44}
              height={44}
            />
            <span className="text-2xl font-semibold tracking-tight">Finsights</span>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Sign In
          </Link>
        </header>

        <section className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
            <div className="h-64 rounded-2xl bg-[radial-gradient(circle_at_top_left,_#60a5fa_0%,_#a78bfa_35%,_#0f172a_100%)] md:h-80" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold transition hover:bg-white/10"
            >
              Watch Demo
            </Link>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to do xyz</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Start Now
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold transition hover:bg-white/10"
            >
              Explore Dashboard
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold tracking-tight">Features You Definitely Didn’t Ask For</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/50"
              >
                <h4 className="mb-2 text-lg font-semibold">{card.title}</h4>
                <p className="text-sm text-slate-300">{card.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
