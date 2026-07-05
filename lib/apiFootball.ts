import { API_REVALIDATE_SECONDS, CURRENT_SEASON } from "@/lib/config";
import type { Player, PlayerProfile, Team } from "@/lib/types";

const API_BASE_URL = "https://v3.football.api-sports.io";

type ApiFootballTeamResponse = {
  team: {
    id: number;
    name: string;
    logo: string;
    country?: string;
    founded?: number | null;
  };
  venue?: {
    name?: string | null;
    city?: string | null;
  };
};

type ApiFootballSquadResponse = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  players: {
    id: number;
    name: string;
    age?: number | null;
    number?: number | null;
    position?: string | null;
    photo?: string | null;
  }[];
};

type ApiFootballPlayerStatsResponse = {
  player: {
    id: number;
    name: string;
    firstname?: string | null;
    lastname?: string | null;
    age?: number | null;
    birth?: {
      date?: string | null;
    };
    nationality?: string | null;
    height?: string | null;
    weight?: string | null;
    injured?: boolean | null;
    photo?: string | null;
  };
  statistics: {
    team?: {
  id?: number | null;
  name?: string | null;
  logo?: string | null;
};
    league?: {
      name?: string | null;
    };
    games?: {
      position?: string | null;
      appearences?: number | null;
      minutes?: number | null;
    };
    goals?: {
      total?: number | null;
      assists?: number | null;
    };
    cards?: {
      yellow?: number | null;
      red?: number | null;
    };
  }[];
};

async function apiFootballFetch<T>(
  endpoint: string,
  params: Record<string, string | number>
): Promise<T[]> {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    throw new Error("Missing API_FOOTBALL_KEY environment variable.");
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}?${searchParams}`, {
    headers: {
      "x-apisports-key": apiKey,
    },
    next: {
      revalidate: API_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new Error(`API-Football request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.response ?? [];
}

export async function getLeagueTeams(leagueId: number): Promise<Team[]> {
  const teams = await apiFootballFetch<ApiFootballTeamResponse>("/teams", {
    league: leagueId,
    season: CURRENT_SEASON,
  });

  return teams.map((item) => ({
    id: item.team.id,
    name: item.team.name,
    logo: item.team.logo,
    country: item.team.country,
    founded: item.team.founded,
    venueName: item.venue?.name ?? null,
    venueCity: item.venue?.city ?? null,
  }));
}

export async function getTeam(teamId: number): Promise<Team | null> {
  const teams = await apiFootballFetch<ApiFootballTeamResponse>("/teams", {
    id: teamId,
  });

  const item = teams[0];

  if (!item) return null;

  return {
    id: item.team.id,
    name: item.team.name,
    logo: item.team.logo,
    country: item.team.country,
    founded: item.team.founded,
    venueName: item.venue?.name ?? null,
    venueCity: item.venue?.city ?? null,
  };
}

export async function getTeamSquad(teamId: number): Promise<Player[]> {
  const squads = await apiFootballFetch<ApiFootballSquadResponse>(
    "/players/squads",
    {
      team: teamId,
    }
  );

  return squads[0]?.players ?? [];
}

export async function getPlayerProfile(
  playerId: number
): Promise<PlayerProfile | null> {
  const players = await apiFootballFetch<ApiFootballPlayerStatsResponse>(
    "/players",
    {
      id: playerId,
      season: CURRENT_SEASON,
    }
  );

  const item = players[0];

  if (!item) return null;

  const stats = item.statistics?.[0];

  return {
    id: item.player.id,
    name: item.player.name,
    firstname: item.player.firstname ?? null,
    lastname: item.player.lastname ?? null,
    age: item.player.age ?? null,
    birthDate: item.player.birth?.date ?? null,
    nationality: item.player.nationality ?? null,
    height: item.player.height ?? null,
    weight: item.player.weight ?? null,
    injured: item.player.injured ?? null,
    photo: item.player.photo ?? null,
teamId: stats?.team?.id ?? null,
teamName: stats?.team?.name ?? null,
teamLogo: stats?.team?.logo ?? null,
leagueName: stats?.league?.name ?? null,
    position: stats?.games?.position ?? null,
    appearances: stats?.games?.appearences ?? null,
    goals: stats?.goals?.total ?? null,
    assists: stats?.goals?.assists ?? null,
    minutes: stats?.games?.minutes ?? null,
    yellowCards: stats?.cards?.yellow ?? null,
    redCards: stats?.cards?.red ?? null,
  };
}