import fs from "node:fs/promises";
import path from "node:path";

await loadEnvFile();

const API_BASE_URL = "https://v3.football.api-sports.io";
const API_KEY = process.env.API_FOOTBALL_KEY;
const SEASON = process.env.SEASON || "2026";
const REQUEST_DELAY_MS = 350;

const LEAGUES = [
  { id: 39, name: "Premier League", country: "England" },
  { id: 140, name: "La Liga", country: "Spain" },
  { id: 135, name: "Serie A", country: "Italy" },
  { id: 78, name: "Bundesliga", country: "Germany" },
  { id: 61, name: "Ligue 1", country: "France" },
  { id: 88, name: "Eredivisie", country: "Netherlands" },
  { id: 94, name: "Primeira Liga", country: "Portugal" },
];

if (!API_KEY) {
  throw new Error("Missing API_FOOTBALL_KEY in .env.local.");
}

async function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local");

  try {
    const file = await fs.readFile(envPath, "utf8");

    file.split("\n").forEach((line) => {
      const cleanLine = line.trim();

      if (!cleanLine || cleanLine.startsWith("#")) {
        return;
      }

      const separatorIndex = cleanLine.indexOf("=");

      if (separatorIndex === -1) {
        return;
      }

      const key = cleanLine.slice(0, separatorIndex).trim();
      const value = cleanLine.slice(separatorIndex + 1).trim();

      if (!process.env[key]) {
        process.env[key] = value.replace(/^["']|["']$/g, "");
      }
    });
  } catch {
    // Allow normal environment variables in production/CI.
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hasApiErrors(errors) {
  if (!errors) {
    return false;
  }

  if (Array.isArray(errors)) {
    return errors.length > 0;
  }

  if (typeof errors === "object") {
    return Object.keys(errors).length > 0;
  }

  if (typeof errors === "string") {
    return errors.trim().length > 0;
  }

  return Boolean(errors);
}

async function apiFootballRequest(
  endpoint,
  params,
  attempt = 1
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  const response = await fetch(
    `${API_BASE_URL}${endpoint}?${searchParams}`,
    {
      headers: {
        "x-apisports-key": API_KEY,
      },
    }
  );

  if (!response.ok) {
    if (attempt === 1) {
      await sleep(1000);

      return apiFootballRequest(
        endpoint,
        params,
        2
      );
    }

    throw new Error(
      `API-Football request failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (hasApiErrors(data.errors)) {
    throw new Error(
      `API-Football error: ${JSON.stringify(data.errors)}`
    );
  }

  return data;
}

async function apiFootballFetch(endpoint, params) {
  const data = await apiFootballRequest(
    endpoint,
    params
  );

  return data.response ?? [];
}

function createSearchText(player) {
  return [
    player.name,
    player.teamName,
    player.leagueName,
    player.position,
    player.leagueCountry,
    player.nationality,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function normaliseNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function findLeagueStatistics(statistics, leagueId) {
  if (!Array.isArray(statistics)) {
    return null;
  }

  return (
    statistics.find(
      (item) =>
        Number(item?.league?.id) === Number(leagueId)
    ) ??
    statistics[0] ??
    null
  );
}

function mergePlayerStatistics(
  playersById,
  item,
  league
) {
  const apiPlayer = item?.player;

  if (!apiPlayer?.id) {
    return;
  }

  const existing = playersById.get(apiPlayer.id);

  if (!existing) {
    return;
  }

  const statistics = findLeagueStatistics(
    item.statistics,
    league.id
  );

  if (!statistics) {
    if (apiPlayer.nationality) {
      existing.nationality =
        apiPlayer.nationality;
    }

    return;
  }

  const games = statistics.games ?? {};
  const goals = statistics.goals ?? {};
  const cards = statistics.cards ?? {};

  existing.nationality =
    apiPlayer.nationality ??
    existing.nationality ??
    null;

  existing.age =
    apiPlayer.age ??
    existing.age ??
    null;

  existing.position =
    games.position ??
    existing.position ??
    null;

  existing.appearances =
    normaliseNumber(games.appearences);

  existing.goals =
    normaliseNumber(goals.total);

  existing.assists =
    normaliseNumber(goals.assists);

  existing.minutes =
    normaliseNumber(games.minutes);

  existing.yellowCards =
    normaliseNumber(cards.yellow);

  existing.redCards =
    normaliseNumber(cards.red);
}

async function fetchLeagueStatistics(
  playersById,
  league
) {
  console.log(
    `\nFetching season statistics for ${league.name}...`
  );

  let page = 1;
  let totalPages = 1;
  let mergedCount = 0;

  do {
    console.log(
      `Statistics page ${page}/${totalPages}...`
    );

    const data = await apiFootballRequest(
      "/players",
      {
        league: league.id,
        season: SEASON,
        page,
      }
    );

    const items = data.response ?? [];

    for (const item of items) {
      const playerId = item?.player?.id;

      if (
        playerId &&
        playersById.has(playerId)
      ) {
        mergePlayerStatistics(
          playersById,
          item,
          league
        );

        mergedCount += 1;
      }
    }

    const currentPage =
      Number(data.paging?.current) || page;

    totalPages =
      Number(data.paging?.total) || currentPage;

    page = currentPage + 1;

    if (page <= totalPages) {
      await sleep(REQUEST_DELAY_MS);
    }
  } while (page <= totalPages);

  console.log(
    `Statistics merged: ${mergedCount}`
  );
}

async function buildPlayerIndex() {
  const playersById = new Map();
  let teamCount = 0;

  console.log(
    `Building player database for season ${SEASON}...`
  );

  console.log("\nSTEP 1: Building current squads");

  for (const league of LEAGUES) {
    console.log(
      `\nFetching teams for ${league.name}...`
    );

    const teams = await apiFootballFetch(
      "/teams",
      {
        league: league.id,
        season: SEASON,
      }
    );

    console.log(
      `Found ${teams.length} teams in ${league.name}.`
    );

    for (const item of teams) {
      const team = item.team;

      if (!team?.id) {
        continue;
      }

      teamCount += 1;

      console.log(
        `Team ${teamCount}: fetching squad for ${team.name}...`
      );

      const squads = await apiFootballFetch(
        "/players/squads",
        {
          team: team.id,
        }
      );

      const squadPlayers =
        squads[0]?.players ?? [];

      for (const player of squadPlayers) {
        if (!player.id) {
          continue;
        }

        playersById.set(player.id, {
          id: player.id,
          name: player.name,
          age: player.age ?? null,
          nationality: null,
          number: player.number ?? null,
          position: player.position ?? null,
          photo: player.photo ?? null,

          teamId: team.id,
          teamName: team.name,
          teamLogo: team.logo ?? null,

          leagueId: league.id,
          leagueName: league.name,
          leagueCountry: league.country,
          season: SEASON,

          appearances: 0,
          goals: 0,
          assists: 0,
          minutes: 0,
          yellowCards: 0,
          redCards: 0,
        });
      }

      await sleep(REQUEST_DELAY_MS);
    }
  }

  console.log(
    `\nCurrent squad players collected: ${playersById.size}`
  );

  console.log(
    "\nSTEP 2: Adding 2026 season statistics"
  );

  for (const league of LEAGUES) {
    try {
      await fetchLeagueStatistics(
        playersById,
        league
      );
    } catch (error) {
      console.warn(
        `${league.name} statistics failed:`,
        error.message
      );
    }

    await sleep(REQUEST_DELAY_MS);
  }

  const players = Array.from(
    playersById.values()
  ).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const searchPlayers = players.map(
    (player) => ({
      id: player.id,
      name: player.name,
      teamName: player.teamName,
      teamLogo: player.teamLogo,
      leagueName: player.leagueName,
      position: player.position,
      photo: player.photo,
      searchText:
        createSearchText(player),
    })
  );

  const playersWithStatistics =
    players.filter(
      (player) =>
        player.appearances > 0 ||
        player.minutes > 0
    ).length;

  const playersWithNationality =
    players.filter(
      (player) =>
        typeof player.nationality ===
          "string" &&
        player.nationality.length > 0
    ).length;

  const outputDir = path.join(
    process.cwd(),
    "public",
    "data"
  );

  const playersOutputPath = path.join(
    outputDir,
    "players.json"
  );

  const searchOutputPath = path.join(
    outputDir,
    "player-search.json"
  );

  await fs.mkdir(outputDir, {
    recursive: true,
  });

  await fs.writeFile(
    playersOutputPath,
    JSON.stringify(players, null, 2)
  );

  await fs.writeFile(
    searchOutputPath,
    JSON.stringify(
      searchPlayers,
      null,
      2
    )
  );

  console.log(
    "\nPlayer database build complete."
  );

  console.log(
    `Teams checked: ${teamCount}`
  );

  console.log(
    `Players saved: ${players.length}`
  );

  console.log(
    `Players with season statistics: ${playersWithStatistics}`
  );

  console.log(
    `Players with nationality: ${playersWithNationality}`
  );

  console.log(
    "Output: public/data/players.json"
  );

  console.log(
    "Output: public/data/player-search.json"
  );
}

buildPlayerIndex().catch((error) => {
  console.error(
    "\nPlayer database build failed:"
  );

  console.error(error);

  process.exit(1);
});