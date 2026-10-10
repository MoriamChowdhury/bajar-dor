import Link from "next/link";
import type { Product } from "@/lib/api";
import { UNIT_FULL, formatPrice } from "@/lib/utils";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
          {p.image}
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{p.nameBn}</h3>
          <p className="text-xs text-gray-500">{UNIT_FULL[p.unit]}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold">{formatPrice(p.today)} টাকা</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}