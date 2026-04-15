import Image from "next/image";
import Link from "next/link";

const logoUrl =
  "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/money/dollar-minimalistic-7sr3wyd3gc9je4re2y9b8l.png/dollar-minimalistic-zumyt8yqlccd6959i5l29.png?_a=DATAiZAAZAA0";

const principles = [
  {
    title: "Clear visual hierarchy",
    description:
      "Purpose-first hero copy, compact navigation, and strong CTA contrast guide attention in seconds.",
  },
  {
    title: "Trust-forward storytelling",
    description:
      "Social proof, recognizable metrics, and product-first cards reduce friction for first-time visitors.",
  },
  {
    title: "Accessibility & performance",
    description:
      "Readable contrast, generous spacing, and lightweight sections align with modern UX and Core Web Vitals goals.",
  },
];

const stats = [
  { label: "Money events synced", value: "12M+" },
  { label: "Connected accounts", value: "150K+" },
  { label: "Avg dashboard load", value: "1.4s" },
];

const features = [
  {
    title: "Unified cash view",
    body: "Track checking, cards, and investments in one clean timeline.",
  },
  {
    title: "Automated insights",
    body: "Spot category drifts, unusual spend, and savings opportunities instantly.",
  },
  {
    title: "Tax-ready exports",
    body: "Generate accountant-friendly reports with one click during tax season.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-8">
        <div className="flex items-center gap-3">
          <Image src={logoUrl} alt="Finsights logo" width={48} height={48} priority />
          <span className="text-2xl font-semibold tracking-tight">Finsights</span>
        </div>
        <nav className="flex items-center gap-3 text-sm md:gap-4">
          <Link
            href="/login"
            className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-slate-500"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-emerald-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-300"
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-18 px-6 pb-20 pt-8 md:px-8">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-200">
              Personal finance command center
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              See every dollar move before it becomes a problem.
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Finsights brings accounts, transactions, analytics, and tax context into one fast dashboard so you can make confident financial decisions daily.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Start free
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-600 px-6 py-3 font-semibold transition hover:border-slate-400"
              >
                View dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl shadow-emerald-500/10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Monthly snapshot</h2>
              <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs text-emerald-200">
                Live insights
              </span>
            </div>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3"
                >
                  <p className="text-sm text-slate-300">{stat.label}</p>
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">Built for calm, modern money management</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
