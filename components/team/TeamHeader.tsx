import type { Team } from "@/lib/types";

type TeamHeaderProps = {
  team: Team;
  leagueName: string;
};

export default function TeamHeader({
  team,
  leagueName,
}: TeamHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111f] p-5 shadow-2xl shadow-black/30 sm:p-6 lg:p-8">
      <a
        href="/"
        className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950"
      >
        ← Home
      </a>

      <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white p-4 shadow-xl shadow-black/30 sm:h-28 sm:w-28">
          <img
            src={team.logo}
            alt={team.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-400">
            {leagueName}
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {team.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore the full squad, browse player profiles and view the latest
            team information.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {team.founded && (
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                Founded {team.founded}
              </span>
            )}

            {team.venueName && (
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                {team.venueName}
              </span>
            )}

            {team.venueCity && (
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                {team.venueCity}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}