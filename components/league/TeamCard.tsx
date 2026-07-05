import Link from "next/link";
import type { Team } from "@/lib/types";

type TeamCardProps = {
  team: Team;
};

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111f] p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-500/10 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white p-4 shadow-md shadow-black/30">
          <img
            src={team.logo}
            alt={`${team.name} badge`}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="mt-5 text-xl font-black tracking-tight text-white">
          {team.name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
          {team.venueName || "View squad and player profiles"}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-bold text-yellow-400 transition group-hover:text-yellow-300">
            View Squad
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-lg text-yellow-300 transition-all duration-300 group-hover:translate-x-1 group-hover:border-yellow-300/60">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}