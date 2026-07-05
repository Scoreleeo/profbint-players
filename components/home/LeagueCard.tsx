import Link from "next/link";

type LeagueCardProps = {
  id: number;
  name: string;
  country: string;
  emoji: string;
  logo?: string;
};

export default function LeagueCard({
  id,
  name,
  country,
  emoji,
  logo,
}: LeagueCardProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <Link
      href={`/leagues/${id}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111f] p-6 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-500/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />

      <div className="relative mb-6 flex items-center justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white p-3 shadow-md shadow-black/20">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-3xl">{emoji}</span>
          )}
        </div>

        <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-bold tracking-widest text-yellow-300">
          {initials}
        </span>
      </div>

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
          {country}
        </p>

        <h3 className="mt-3 text-xl font-black tracking-tight text-white">
          {name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Browse teams, squads and live player profiles.
        </p>

        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-bold text-yellow-400 transition group-hover:text-yellow-300">
            Browse League
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 transition group-hover:translate-x-1 group-hover:border-yellow-300/60">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}