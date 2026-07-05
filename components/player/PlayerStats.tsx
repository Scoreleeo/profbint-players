import type { PlayerProfile } from "@/lib/types";

type PlayerStatsProps = {
  player: PlayerProfile;
};

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <p className="text-sm text-slate-400">
      {label}
    </p>

    <p className="mt-2 text-3xl font-bold text-yellow-400">
      {value ?? "-"}
    </p>
  </div>
);

export default function PlayerStats({
  player,
}: PlayerStatsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-8 text-3xl font-bold">
        Season Statistics
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          label="Appearances"
          value={player.appearances}
        />

        <StatCard
          label="Goals"
          value={player.goals}
        />

        <StatCard
          label="Assists"
          value={player.assists}
        />

        <StatCard
          label="Minutes"
          value={player.minutes}
        />

        <StatCard
          label="Yellow Cards"
          value={player.yellowCards}
        />

        <StatCard
          label="Red Cards"
          value={player.redCards}
        />

      </div>
    </section>
  );
}