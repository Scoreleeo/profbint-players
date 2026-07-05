import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeagueHeader from "@/components/league/LeagueHeader";
import TeamGrid from "@/components/league/TeamGrid";
import { getLeagueTeams } from "@/lib/apiFootball";
import { LEAGUES } from "@/lib/leagues";

type LeaguePageProps = {
  params: Promise<{
    leagueId: string;
  }>;
};

export async function generateMetadata({
  params,
}: LeaguePageProps): Promise<Metadata> {
  const { leagueId } = await params;
  const league = LEAGUES.find((item) => item.id === Number(leagueId));

  if (!league) {
    return {
      title: "League Not Found",
      description: "This football league could not be found.",
    };
  }

  return {
    title: `${league.name} Player Database`,
    description: `Explore ${league.name} players, clubs and live squad data from ${league.country} with Pro Football Intel Players.`,
    alternates: {
      canonical: `/leagues/${league.id}`,
    },
    openGraph: {
      title: `${league.name} Player Database`,
      description: `Browse ${league.name} clubs, squads and player profiles on Pro Football Intel Players.`,
      url: `/leagues/${league.id}`,
    },
    twitter: {
      title: `${league.name} Player Database`,
      description: `Browse ${league.name} clubs, squads and player profiles.`,
    },
  };
}

export default async function LeaguePage({ params }: LeaguePageProps) {
  const { leagueId } = await params;
  const league = LEAGUES.find((item) => item.id === Number(leagueId));

  if (!league) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
        <Header />

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
              League database
            </p>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              League not found
            </h1>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-black text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950"
            >
              ← Back home
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const teams = await getLeagueTeams(league.id);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
        <div className="space-y-8 sm:space-y-10">
          <LeagueHeader
            name={league.name}
            country={league.country}
            emoji={league.emoji}
            logo={league.logo}
          />

          <TeamGrid teams={teams} />
        </div>
      </div>

      <Footer />
    </main>
  );
}