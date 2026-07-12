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
        <div className="absolute left-0 top-0 h-[260px] w-[260px] rounded-full bg-yellow-500 blur-[120px] sm:h-[320px] sm:w-[320px]" />
      </div>

      <div className="relative px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="max-w-5xl text-left">
          <div className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-300 sm:text-xs">
            ⚽ Pro Football Intel Players
          </div>

          <h1 className="mt-4 max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            The Professional Football Player Database
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Explore players, clubs and squads across Europe&apos;s leading
            leagues with fast profiles, live squad data and Pro Football Intel
            insights.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#leagues"
              className="rounded-xl bg-yellow-500 px-5 py-2.5 text-center text-sm font-black text-slate-950 transition hover:bg-yellow-400"
            >
              Explore Leagues →
            </Link>

            <Link
              href="/leagues/39"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-center text-sm font-bold text-slate-200 transition hover:border-yellow-400/50 hover:text-white"
            >
              Start with Premier League
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/20"
              >
                <div className="text-xl">{stat.icon}</div>
                <div className="mt-2 text-xl font-black text-yellow-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 sm:p-5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-300 sm:text-xs">
              Platform built for player intelligence
            </h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {platformFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>
          </div>

          <div
            id="leagues"
            className="mt-5 flex flex-wrap justify-start gap-2"
          >
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