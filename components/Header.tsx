import Link from "next/link";
import GlobalPlayerSearch from "@/components/search/GlobalPlayerSearch";

const NAV_LINKS = [
  {
    href: "https://players.profbint.com",
    label: "Home",
    active: true,
  },
  {
    href: "https://predictions.profbint.com",
    label: "Predictions",
  },
  {
    href: "https://results.profbint.com",
    label: "Results",
  },
  {
    href: "https://players.profbint.com",
    label: "Players",
  },
  {
    href: "https://profbint.com",
    label: "Pro Football Intel",
  },
];

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

        <nav className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={
                item.active
                  ? "rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-black text-yellow-300 transition hover:bg-yellow-400/15"
                  : "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-slate-300 transition hover:border-yellow-400/40 hover:text-yellow-300"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://predictions.profbint.com"
          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-yellow-400 md:hidden"
        >
          Predictions
        </a>
      </div>

      <div className="border-t border-white/10 px-4 py-3 md:hidden">
        <GlobalPlayerSearch mobile />

        <nav className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
          {NAV_LINKS.map((item) => (
            <a
              key={`mobile-${item.label}-${item.href}`}
              href={item.href}
              className={
                item.active
                  ? "shrink-0 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-2 text-xs font-black text-yellow-300"
                  : "shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-300"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}