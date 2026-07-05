import Link from "next/link";
import { LEAGUES } from "@/lib/leagues";

const stats = [
  { label: "Major leagues", value: "7", icon: "🏆" },
  { label: "Live squads", value: "API", icon: "⚡" },
  { label: "Player search", value: "Instant", icon: "🔍" },
];

const platformFeatures = [
  "Live squad data",
  "Fast player profiles",
  "League-by-league browsing",
  "Built for 2026/27",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-950 via-[#07111f] to-slate-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-yellow-500 blur-[120px] sm:h-[360px] sm:w-[360px]" />
      </div>

      <div className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-300 sm:px-5 sm:text-sm">
            ⚽ Pro Football Intel Players
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            The Professional Football Player Database
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 md:text-lg">
            Explore players, clubs and squads across Europe&apos;s leading
            leagues with fast profiles, live squad data and Pro Football Intel
            insights.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#leagues"
              className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-yellow-400"
            >
              Explore Leagues →
            </Link>

            <Link
              href="/leagues/39"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-yellow-400/50 hover:text-white"
            >
              Start with Premier League
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:mt-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-lg shadow-black/20"
              >
                <div className="text-2xl">{stat.icon}</div>
                <div className="mt-3 text-2xl font-black text-yellow-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5 text-left sm:mt-8 sm:p-6">
            <h2 className="text-xs font-black uppercase tracking-[0.24em] text-yellow-300 sm:text-sm sm:tracking-[0.3em]">
              Platform built for player intelligence
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {platformFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>
          </div>

          <div id="leagues" className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
            {LEAGUES.map((league) => (
              <Link
                key={league.id}
                href={`/leagues/${league.id}`}
                className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition hover:border-yellow-400/60 hover:text-white"
              >
                {league.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}