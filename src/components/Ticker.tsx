import { getProducts } from "@/lib/api";
import { UNIT_SHORT, formatPrice } from "@/lib/utils";
import ChangeBadge from "./ChangeBadge";

export default async function Ticker() {
  const products = await getProducts();
  if (!products.length) return null;

  const items = products.map((p) => (
    <span key={p.id} className="mx-5 inline-flex items-center gap-2 text-sm">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-gray-600">
        {formatPrice(p.today)} টাকা/{UNIT_SHORT[p.unit]}
      </span>
      <ChangeBadge change={p.change} />
    </span>
  ));

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white py-2">
      <div className="marquee flex w-max whitespace-nowrap">
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}