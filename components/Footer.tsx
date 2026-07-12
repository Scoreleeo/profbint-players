const footerLinks = [
  { label: "Home", href: "https://players.profbint.com" },
  { label: "Predictions", href: "https://predictions.profbint.com" },
  { label: "Results Dashboard", href: "https://results.profbint.com" },
  { label: "Player Database", href: "https://players.profbint.com" },
  { label: "Privacy Policy", href: "https://profbint.com/privacy" },
  { label: "Terms of Service", href: "https://profbint.com/terms" },
  { label: "Refund Policy", href: "https://profbint.com/refunds" },
  {
    label: "Responsible Gambling",
    href: "https://profbint.com/responsible-gambling",
  },
  {
    label: "Legal & Disclaimer",
    href: "https://profbint.com/legal",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-5 py-8 text-center sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
          Pro Football Intel Player Database
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Player profiles, club information and squad data across Europe&apos;s
          leading football leagues.
        </p>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 border-t border-slate-800 pt-6">
          {footerLinks.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-sm font-semibold text-slate-400 transition hover:text-yellow-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mx-auto mt-7 max-w-4xl space-y-3 border-t border-slate-800 pt-6 text-xs leading-5 text-slate-500">
          <p>
            Football statistics, squad information and player data are supplied
            by third-party data providers. Pro Football Intel aims to present
            accurate information but cannot guarantee that all external data is
            complete, current or error-free.
          </p>

          <p>
            Player photographs and club imagery are displayed for
            identification and informational purposes. All image rights remain
            with their respective owners and rights holders. Images are
            provided through external football data services and may be removed
            following a valid rights request.
          </p>
        </div>
      </div>
    </footer>
  );
}