import type { PlayerProfile } from "@/lib/types";

type PlayerHeaderProps = {
  player: PlayerProfile;
};

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <a
          href={`/teams/${player.teamName}`}
          className="text-sm text-yellow-400 hover:text-yellow-300"
        >
          ← Back to Team
        </a>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-yellow-500 bg-white">
            {player.photo ? (
              <img
                src={player.photo}
                alt={player.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl">👤</span>
            )}
          </div>

          <div className="flex-1">
            <p className="text-yellow-400">
              {player.teamName}
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              {player.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-700 px-4 py-2">
                {player.position ?? "Player"}
              </span>

              <span className="rounded-full border border-slate-700 px-4 py-2">
                {player.nationality ?? "Unknown"}
              </span>

              {player.age && (
                <span className="rounded-full border border-slate-700 px-4 py-2">
                  {player.age} years
                </span>
              )}

              {player.height && (
                <span className="rounded-full border border-slate-700 px-4 py-2">
                  {player.height}
                </span>
              )}

              {player.weight && (
                <span className="rounded-full border border-slate-700 px-4 py-2">
                  {player.weight}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}