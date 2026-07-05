import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlayerHeader from "@/components/player/PlayerHeader";
import PlayerStats from "@/components/player/PlayerStats";
import PlayerSummary from "@/components/player/PlayerSummary";
import type { PlayerProfile } from "@/lib/types";
import playersData from "../../../public/data/players.json";

type PlayerPageProps = {
  params: Promise<{
    playerId: string;
  }>;
};

const players = playersData as PlayerProfile[];

function getLocalPlayer(playerId: string): PlayerProfile | null {
  const numericPlayerId = Number(playerId);

  if (!Number.isFinite(numericPlayerId)) {
    return null;
  }

  return players.find((player) => player.id === numericPlayerId) ?? null;
}

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { playerId } = await params;
  const player = getLocalPlayer(playerId);

  if (!player) {
    return {
      title: "Player Not Found",
      description: "This football player profile could not be found.",
    };
  }

  const teamName = player.teamName || "his club";
  const position = player.position || "football player";

  return {
    title: `${player.name} Profile, Stats & Club`,
    description: `Explore ${player.name}'s football profile, position, club, nationality and season statistics for ${teamName} on Pro Football Intel Players.`,
    alternates: {
      canonical: `/players/${playerId}`,
    },
    openGraph: {
      title: `${player.name} Profile, Stats & Club`,
      description: `View ${player.name}'s player profile, ${position} details and season statistics for ${teamName}.`,
      url: `/players/${playerId}`,
    },
    twitter: {
      title: `${player.name} Profile, Stats & Club`,
      description: `View ${player.name}'s player profile, ${position} details and season statistics.`,
    },
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { playerId } = await params;
  const player = getLocalPlayer(playerId);

  if (!player) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
        <Header />

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Player profile
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Player not found
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              We could not load this player profile. Please go back and choose
              another player from the database.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <PlayerHeader player={player} />
          <PlayerStats player={player} />
          <PlayerSummary player={player} />
        </div>
      </div>

      <Footer />
    </main>
  );
}