import fs from "node:fs/promises";
import path from "node:path";

const API_KEY = process.env.API_FOOTBALL_KEY;

if (!API_KEY) {
  throw new Error("Missing API_FOOTBALL_KEY environment variable");
}

const LEAGUES = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" },
  { id: 88, name: "Eredivisie" },
  { id: 94, name: "Primeira Liga" },
];

const SEASON = 2026;

const OUTPUT_FILE = path.join(
  process.cwd(),
  "public",
  "data",
  "team-of-the-week.json"
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange() {
  const today = new Date();

  const to = new Date(today);
  to.setUTCDate(to.getUTCDate() - 1);

  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 6);

  return {
    from: getDateString(from),
    to: getDateString(to),
  };
}

async function apiFootball(endpoint, params = {}) {
  const url = new URL(`https://v3.football.api-sports.io/${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API-Football request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(
      `API-Football error: ${JSON.stringify(data.errors)}`
    );
  }

  return data.response ?? [];
}

function positionGroup(position) {
  const value = String(position ?? "")
    .trim()
    .toLowerCase();

  if (
    value === "g" ||
    value === "goalkeeper" ||
    value.includes("goalkeeper")
  ) {
    return "G";
  }

  if (
    value === "d" ||
    value === "defender" ||
    value.includes("defender")
  ) {
    return "D";
  }

  if (
    value === "m" ||
    value === "midfielder" ||
    value.includes("midfielder")
  ) {
    return "M";
  }

  if (
    value === "f" ||
    value === "attacker" ||
    value === "forward" ||
    value.includes("attacker") ||
    value.includes("forward")
  ) {
    return "F";
  }

  return null;
}

function positionLabel(position) {
  if (position === "G") return "Goalkeeper";
  if (position === "D") return "Defender";
  if (position === "M") return "Midfielder";
  if (position === "F") return "Forward";

  return "Player";
}

function roundRating(value) {
  const rating = Number.parseFloat(value);

  if (!Number.isFinite(rating)) {
    return null;
  }

  return Number(rating.toFixed(2));
}

function createPlayerRecord({
  player,
  statistics,
  team,
  league,
  fixture,
}) {
  const games = statistics?.games ?? {};
  const rating = roundRating(games.rating);
  const position = positionGroup(games.position);

  if (rating === null || !position) {
    return null;
  }

  const minutes = Number(games.minutes ?? 0);

  if (minutes <= 0) {
    return null;
  }

  return {
    id: player.id,
    name: player.name,
    photo: player.photo ?? null,

    teamId: team?.id ?? null,
    teamName: team?.name ?? "Unknown club",
    teamLogo: team?.logo ?? null,

    leagueId: league.id,
    leagueName: league.name,

    fixtureId: fixture.fixture?.id ?? null,
    fixtureDate: fixture.fixture?.date ?? null,

    position,
    rating,
    minutes,

    goals: Number(statistics.goals?.total ?? 0),
    assists: Number(statistics.goals?.assists ?? 0),

    saves: Number(statistics.goals?.saves ?? 0),

    tackles: Number(statistics.tackles?.total ?? 0),
    interceptions: Number(
      statistics.tackles?.interceptions ?? 0
    ),

    passes: Number(statistics.passes?.total ?? 0),
    keyPasses: Number(statistics.passes?.key ?? 0),

    shots: Number(statistics.shots?.total ?? 0),
    shotsOnTarget: Number(statistics.shots?.on ?? 0),
  };
}

function playerScore(player) {
  let score = player.rating * 10;

  score += player.goals * 8;
  score += player.assists * 5;

  if (player.position === "G") {
    score += Math.min(player.saves, 10) * 0.8;
  }

  if (player.position === "D") {
    score += Math.min(player.tackles, 10) * 0.25;
    score += Math.min(player.interceptions, 10) * 0.3;
  }

  if (player.position === "M") {
    score += Math.min(player.keyPasses, 10) * 0.35;
  }

  if (player.position === "F") {
    score += Math.min(player.shotsOnTarget, 10) * 0.25;
  }

  return score;
}

function bestPlayers(players, position, count) {
  return players
    .filter((player) => player.position === position)
    .sort((a, b) => playerScore(b) - playerScore(a))
    .slice(0, count);
}

async function getFixturePlayers(fixture, league) {
  const fixtureId = fixture.fixture?.id;

  if (!fixtureId) {
    return [];
  }

  const playerResponses = await apiFootball(
    "fixtures/players",
    {
      fixture: fixtureId,
    }
  );

  const players = [];

  for (const teamEntry of playerResponses) {
    const team = teamEntry?.team ?? null;

    for (const playerEntry of teamEntry.players ?? []) {
      const statistics = playerEntry.statistics?.[0];

      if (!statistics) {
        continue;
      }

      const record = createPlayerRecord({
        player: playerEntry.player,
        statistics,
        team,
        league,
        fixture,
      });

      if (record) {
        players.push(record);
      }
    }
  }

  return players;
}

async function getLeaguePlayers(league, from, to) {
  console.log(`\n${league.name}`);

  const fixtures = await apiFootball("fixtures", {
    league: league.id,
    season: SEASON,
    from,
    to,
    status: "FT",
  });

  console.log(`Completed fixtures: ${fixtures.length}`);

  const players = [];

  for (let index = 0; index < fixtures.length; index += 1) {
    const fixture = fixtures[index];

    console.log(
      `  ${index + 1}/${fixtures.length}: ` +
        `${fixture.teams?.home?.name ?? "Home"} vs ` +
        `${fixture.teams?.away?.name ?? "Away"}`
    );

    try {
      const fixturePlayers = await getFixturePlayers(
        fixture,
        league
      );

      players.push(...fixturePlayers);
    } catch (error) {
      console.warn(
        `  Could not load fixture ${fixture.fixture?.id}:`,
        error.message
      );
    }

    await sleep(250);
  }

  return players;
}

function selectTeam(players) {
  const goalkeeper = bestPlayers(players, "G", 1);
  const defenders = bestPlayers(players, "D", 4);
  const midfielders = bestPlayers(players, "M", 3);
  const forwards = bestPlayers(players, "F", 3);

  return [
    ...goalkeeper,
    ...defenders,
    ...midfielders,
    ...forwards,
  ];
}

async function main() {
  const { from, to } = getDateRange();

  console.log("Pro Football Intel");
  console.log("Team of the Week Builder");
  console.log("------------------------");
  console.log(`Season: ${SEASON}`);
  console.log(`Window: ${from} to ${to}`);

  const allPlayers = [];

  for (const league of LEAGUES) {
    try {
      const players = await getLeaguePlayers(
        league,
        from,
        to
      );

      allPlayers.push(...players);
    } catch (error) {
      throw new Error(
        `${league.name} failed. Team of the Week was not updated. ` +
          `Reason: ${error.message}`
      );
    }

    await sleep(300);
  }

  console.log(
    `\nEligible performances: ${allPlayers.length}`
  );

  const team = selectTeam(allPlayers);

  if (team.length < 11) {
    console.warn(
      `Only ${team.length} players could be selected.`
    );
  }

  const output = team.map((player) => ({
    id: player.id,
    name: player.name,
    teamName: player.teamName,
    position: positionLabel(player.position),
    photo: player.photo,
    teamLogo: player.teamLogo,
    score: Number(playerScore(player).toFixed(2)),
  }));

  await fs.mkdir(path.dirname(OUTPUT_FILE), {
    recursive: true,
  });

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(output, null, 2),
    "utf8"
  );

  console.log("\nSelected Team of the Week:");

  for (const player of output) {
    console.log(
      `${player.position} | ${player.name} | ` +
        `${player.teamName} | ${player.score}`
    );
  }

  console.log(`\nPlayers selected: ${output.length}`);
  console.log(`Written to: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error("\nTeam of the Week build failed:");
  console.error(error);
  process.exit(1);
});