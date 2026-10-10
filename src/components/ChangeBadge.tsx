import type { Product } from "@/lib/api";
import { fmtPct } from "@/lib/utils";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const { dir, pct } = change;
  const style =
    dir === "up"
      ? "bg-green-100 text-green-700"
      : dir === "down"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style}`}>
      {symbol} {fmtPct(pct)}%
    </span>
  );
}