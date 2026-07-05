import TeamCard from "@/components/league/TeamCard";
import type { Team } from "@/lib/types";

type TeamGridProps = {
  teams: Team[];
};

export default function TeamGrid({ teams }: TeamGridProps) {
  return (
    <section className="py-2 sm:py-4">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
            Club Directory
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Teams
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Browse every club, open live squads and explore detailed player
            profiles.
          </p>
        </div>

        <input
          className="hidden w-72 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-500 lg:block"
          placeholder="Search teams..."
        />
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  );
}