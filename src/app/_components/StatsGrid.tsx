import React from "react";

interface Stat {
  label: string;
  value: string;
  key: string;
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.key} className="scroll-panel p-4 text-center">
          <div className="gold-text font-liturgical text-2xl font-bold mb-1">
            {stat.value}
          </div>
          <div className="text-slate-300 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
