import LeagueCard from "@/components/home/LeagueCard";
import { LEAGUES } from "@/lib/leagues";

export default function LeagueGrid() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400 sm:tracking-[0.35em]">
          Live League Database
        </p>

        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Explore players by league
        </h2>

        <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
          Browse the seven core Pro Football Intel leagues, open each league,
          discover every club, then drill into live squads and detailed player
          profiles powered by API-Football.
        </p>

        <div className="mt-8 h-px w-24 rounded-full bg-gradient-to-r from-yellow-400/70 via-yellow-400/20 to-transparent" />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {LEAGUES.map((league) => (
          <LeagueCard
            key={league.id}
            id={league.id}
            name={league.name}
            country={league.country}
            emoji={league.emoji}
            logo={league.logo}
          />
        ))}
      </div>
    </section>
  );
}