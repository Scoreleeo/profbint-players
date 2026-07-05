import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TeamHeader from "@/components/team/TeamHeader";
import SquadGrid from "@/components/team/SquadGrid";
import type { Player, PlayerProfile, Team } from "@/lib/types";
import playersData from "../../../public/data/players.json";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
};

const players = playersData as PlayerProfile[];

function getLocalTeam(teamId: string): Team | null {
  const numericTeamId = Number(teamId);

  if (!Number.isFinite(numericTeamId)) {
    return null;
  }

  const player = players.find((item) => item.teamId === numericTeamId);

  if (!player?.teamId || !player.teamName || !player.teamLogo) {
    return null;
  }

  return {
    id: player.teamId,
    name: player.teamName,
    logo: player.teamLogo,
  };
}

function getLocalSquad(teamId: number): Player[] {
  return players
    .filter((player) => player.teamId === teamId)
    .map((player) => ({
      id: player.id,
      name: player.name,
      age: player.age ?? null,
      number: null,
      position: player.position ?? null,
      photo: player.photo ?? null,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { teamId } = await params;
  const team = getLocalTeam(teamId);

  if (!team) {
    return {
      title: "Team Not Found",
      description: "This football team could not be found.",
    };
  }

  return {
    title: `${team.name} Squad & Player Profiles`,
    description: `Explore ${team.name} squad data, player profiles and club information on Pro Football Intel Players.`,
    alternates: {
      canonical: `/teams/${team.id}`,
    },
    openGraph: {
      title: `${team.name} Squad & Player Profiles`,
      description: `Browse ${team.name} players, squad details and club information.`,
      url: `/teams/${team.id}`,
    },
    twitter: {
      title: `${team.name} Squad & Player Profiles`,
      description: `Browse ${team.name} players, squad details and club information.`,
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { teamId } = await params;
  const team = getLocalTeam(teamId);

  if (!team) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
        <Header />

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
              Squad database
            </p>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Team not found
            </h1>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const squad = getLocalSquad(team.id);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
        <div className="space-y-8 sm:space-y-10">
          <TeamHeader team={team} leagueName="Football Club" />
          <SquadGrid players={squad} />
        </div>
      </div>

      <Footer />
    </main>
  );
}