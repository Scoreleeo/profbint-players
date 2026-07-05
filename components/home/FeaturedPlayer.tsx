import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

type TeamOfWeekPlayer = {
  id: number;
  name: string;
  teamName: string;
  position: string;
  photo?: string | null;
  teamLogo?: string | null;
  score?: number | null;
};

async function getTeamOfWeek(): Promise<TeamOfWeekPlayer[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "team-of-the-week.json"
    );

    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    return Array.isArray(data) ? data.slice(0, 11) : [];
  } catch {
    return [];
  }
}

export default async function FeaturedPlayer() {
  const players = await getTeamOfWeek();

  return (
    <section className="scroll-mt-24">
      <div className="overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111f] p-5 shadow-2xl shadow-black/30 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-yellow-300 sm:text-sm">
              ⭐ Pro Football Intel
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Team of the Week
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Selected automatically from Europe&apos;s seven major leagues after
              the weekend and midweek games.
            </p>
          </div>

          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
            4-3-3
          </span>
        </div>

        {players.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-center sm:p-8">
            <p className="text-lg font-black text-white">
              Team of the Week coming soon
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Once the weekly data builder is connected, this section will update
              automatically after each completed gameweek.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {players.map((player) => (
              <Link
                key={player.id}
                href={`/players/${player.id}`}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-yellow-400/60 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5">
                    {player.photo ? (
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-black text-white">
                      {player.name}
                    </p>
                    <p className="truncate text-sm text-slate-400">
                      {player.teamName}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-yellow-400">
                      {player.position}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}