import type { PlayerProfile } from "@/lib/types";

type PlayerSummaryProps = {
  player: PlayerProfile;
};

function buildSummary(player: PlayerProfile) {
  const goals = player.goals ?? 0;
  const assists = player.assists ?? 0;
  const appearances = player.appearances ?? 0;
  const position = player.position?.toLowerCase() ?? "";

  if (goals >= 15) {
    return `${player.name} is a high-output attacking player with strong goal threat across the current season. With ${goals} goals from ${appearances || "multiple"} appearances, his profile suggests a major influence in the final third.`;
  }

  if (assists >= 8) {
    return `${player.name} has shown strong creative output this season, recording ${assists} assists. His profile suggests a player who contributes heavily to chance creation and attacking support.`;
  }

  if (position.includes("defender")) {
    return `${player.name} is primarily a defensive player for ${player.teamName || "his club"}. His season profile focuses on appearances, minutes and defensive consistency rather than attacking output.`;
  }

  if (position.includes("goalkeeper")) {
    return `${player.name} is a goalkeeper for ${player.teamName || "his club"}. His profile will become more detailed as goalkeeper-specific statistics are added.`;
  }

  return `${player.name} is part of ${player.teamName || "his club"}'s current squad. This profile will become richer as more season statistics, match logs and playing-style data are added.`;
}

export default function PlayerSummary({ player }: PlayerSummaryProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg shadow-yellow-500/5">
        <div className="mb-4 inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
          Player Intelligence
        </div>

        <h2 className="text-2xl font-bold">Profile Summary</h2>

        <p className="mt-4 max-w-3xl text-slate-300">
          {buildSummary(player)}
        </p>
      </div>
    </section>
  );
}