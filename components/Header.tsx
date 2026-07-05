import Link from "next/link";
import GlobalPlayerSearch from "@/components/search/GlobalPlayerSearch";
import { LEAGUES } from "@/lib/leagues";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link
          href="/"
          className="shrink-0 text-base font-black tracking-tight text-white sm:text-lg"
        >
          Pro Football <span className="text-yellow-400">Intel</span>
        </Link>

        <GlobalPlayerSearch />

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/" className="hover:text-yellow-400">
            Players
          </Link>

          <div className="group relative">
            <button className="hover:text-yellow-400">Leagues ▾</button>

            <div className="invisible absolute left-0 top-8 w-56 rounded-xl border border-slate-800 bg-slate-950 p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {LEAGUES.map((league) => (
                <Link
                  key={league.id}
                  href={`/leagues/${league.id}`}
                  className="block rounded-lg px-3 py-2 hover:bg-slate-900 hover:text-yellow-400"
                >
                  {league.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href="#leagues"
            className="rounded-lg border border-white/10 px-3 py-2 font-semibold text-slate-300 hover:border-yellow-400/50 hover:text-white md:hidden"
          >
            Leagues
          </Link>

          <a
            href="https://profbint.com"
            className="hidden rounded-lg bg-yellow-500 px-3 py-2 font-semibold text-slate-950 hover:bg-yellow-400 sm:inline-block"
          >
            Predictions →
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-3 lg:hidden">
        <GlobalPlayerSearch mobile />
      </div>
    </header>
  );
}