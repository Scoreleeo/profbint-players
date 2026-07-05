import Link from "next/link";
import type { Player } from "@/lib/types";

type SquadGridProps = {
  players: Player[];
};

function getPositionGroup(position?: string | null) {
  if (!position) return "Other";

  const value = position.toLowerCase();

  if (value.includes("goalkeeper")) return "Goalkeepers";
  if (value.includes("defender")) return "Defenders";
  if (value.includes("midfielder")) return "Midfielders";
  if (value.includes("attacker") || value.includes("forward")) return "Forwards";

  return "Other";
}

export default function SquadGrid({ players }: SquadGridProps) {
  const groups = ["Goalkeepers", "Defenders", "Midfielders", "Forwards", "Other"];

  return (
    <section className="py-2 sm:py-4">
      <div className="mb-8 sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400 sm:tracking-[0.35em]">
          Live Squad Database
        </p>

        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Squad
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          Explore the full squad by position and open detailed player profiles.
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {groups.map((group) => {
          const groupPlayers = players.filter(
            (player) => getPositionGroup(player.position) === group
          );

          if (groupPlayers.length === 0) return null;

          return (
            <div key={group}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <h3 className="text-xl font-black tracking-tight text-white">
                  {group}
                </h3>

                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">
                  {groupPlayers.length}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {groupPlayers.map((player) => (
                  <Link
                    key={player.id}
                    href={`/players/${player.id}`}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111f] p-4 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-500/10 sm:p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.1),transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-1.5 shadow-md shadow-black/25">
                        {player.photo ? (
                          <img
                            src={player.photo}
                            alt={player.name}
                            className="h-full w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-2xl">👤</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-base font-black tracking-tight text-white">
                          {player.name}
                        </h4>

                        <p className="mt-1 truncate text-sm text-slate-400">
                          {player.position || "Player"}
                          {player.number ? ` · #${player.number}` : ""}
                        </p>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-lg text-yellow-300 transition-all duration-300 group-hover:translate-x-1 group-hover:border-yellow-300/60">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}