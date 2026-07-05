import Link from "next/link";

type LeagueHeaderProps = {
  name: string;
  country: string;
  emoji: string;
  logo?: string;
};

export default function LeagueHeader({
  name,
  country,
  emoji,
  logo,
}: LeagueHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-[#07111f] p-5 shadow-2xl shadow-black/30 sm:p-6 lg:p-8">
      <Link
        href="/"
        className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950"
      >
        ← Back to leagues
      </Link>

      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white p-4 shadow-xl shadow-black/30 sm:h-24 sm:w-24">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-4xl">{emoji}</span>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-400 sm:tracking-[0.3em]">
            {country}
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Browse every club, open live squads and explore player profiles from
            the {name}.
          </p>
        </div>
      </div>
    </section>
  );
}