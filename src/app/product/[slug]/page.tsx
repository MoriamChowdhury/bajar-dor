import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { UNIT_FULL, UNIT_SHORT, formatPrice, toBn } from "@/lib/utils";
import ChangeBadge from "@/components/ChangeBadge";

// পূর্ণসংখ্যা হলে ৬৩, ভগ্নাংশ হলে ৬৩.৫০
const fmtAvg = (n: number) => (Number.isInteger(n) ? formatPrice(n) : toBn(n.toFixed(2)));

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = Math.round(
    p.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / p.markets.length
  );
  const diff = Math.abs(p.today - p.yesterday);
  const rows = [...p.markets].sort((a, b) => a.min - b.min || a.max - b.max);

  return (
    <div className="space-y-6 py-8">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:text-brand">{p.categoryNameBn}</Link>
        <span>›</span>
        <span className="text-gray-900">{p.nameBn}</span>
      </nav>

      {/* উপরের কার্ড */}
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl">
            {p.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{p.nameBn}</h1>
            <p className="text-sm text-gray-500">{UNIT_FULL[p.unit]} · {p.categoryNameBn}</p>
            <p className="mt-1 text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম{" "}
              <strong>
                {p.change.dir === "up" ? "বেড়েছে" : p.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"}
              </strong>
              {diff > 0 && <> · {formatPrice(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 px-6 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{formatPrice(p.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {UNIT_SHORT[p.unit]}</p>
          <div className="mt-1"><ChangeBadge change={p.change} /></div>
        </div>
      </section>

      {/* দামের সারসংক্ষেপ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="সর্বনিম্ন দাম" value={min} note="সবচেয়ে কম বাজারের দাম" tone="text-green-700" />
          <Stat label="সর্বোচ্চ দাম" value={max} note="সবচেয়ে বেশি বাজারের দাম" tone="text-red-600" />
          <Stat label="গড় দাম" value={avg} note={`সব বাজারের গড় (${UNIT_FULL[p.unit]})`} tone="text-brand" />
        </div>
      </section>

      {/* বাজারভিত্তিক টেবিল */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">বাজার</th>
                <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.market} className="border-t border-gray-200">
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-right">{formatPrice(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{formatPrice(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">{fmtAvg((m.min + m.max) / 2)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, note, tone }: { label: string; value: number; note: string; tone: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>
        {formatPrice(value)} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-gray-400">{note}</p>
    </div>
  );
}