import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { UNIT_FULL, formatPrice, fmtPct } from "@/lib/utils";
import ChangeBadge from "@/components/ChangeBadge";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const unit = UNIT_FULL[p.unit];
  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = Math.round(
    p.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / p.markets.length
  );

  const trend =
    p.change.dir === "up"
      ? `গতকালের তুলনায় দাম ${fmtPct(p.change.pct)}% বেড়েছে`
      : p.change.dir === "down"
      ? `গতকালের তুলনায় দাম ${fmtPct(p.change.pct)}% কমেছে`
      : "গতকালের তুলনায় দাম অপরিবর্তিত";
  const summary = `${p.nameBn}-এর আজকের দাম ${formatPrice(p.today)} টাকা (${unit}); ${trend}।`;

  // বিভাগ অনুযায়ী বাজার সাজানো
  const byDivision = p.markets.reduce<Record<string, typeof p.markets>>((acc, m) => {
    (acc[m.division] ??= []).push(m);
    return acc;
  }, {});

  const history = [
    { label: "আজ", value: p.today },
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ];

  return (
    <div className="space-y-8 py-8">
      <Link href="/" className="text-sm text-green-700 hover:underline">
        ← হোমে ফিরুন
      </Link>

      {/* উপরের সারসংক্ষেপ */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-5xl">
            {p.image}
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold md:text-3xl">{p.nameBn}</h1>
              <ChangeBadge change={p.change} />
            </div>
            <p className="mt-2 text-sm text-gray-600 md:text-base">{summary}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/category/${p.category}`}
                className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
              >
                {p.categoryIcon} {p.categoryNameBn}
              </Link>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {unit}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* দামের সারসংক্ষেপ */}
      <section>
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="সর্বনিম্ন দাম" value={min} unit={unit} tone="text-green-700" />
          <Stat label="সর্বোচ্চ দাম" value={max} unit={unit} tone="text-red-600" />
          <Stat label="গড় দাম" value={avg} unit={unit} />
          <Stat label="আজকের দাম" value={p.today} unit={unit} />
        </div>
      </section>

      {/* দামের তুলনা */}
      <section>
        <h2 className="mb-3 text-lg font-bold">দামের তুলনা</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {history.map((h) => (
            <div key={h.label} className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500">{h.label}</p>
              <p className="mt-1 text-lg font-bold">{formatPrice(h.value)} টাকা</p>
            </div>
          ))}
        </div>
      </section>

      {/* বাজারভিত্তিক আজকের দাম */}
      <section>
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="space-y-6">
          {Object.entries(byDivision).map(([division, markets]) => (
            <div key={division}>
              <h3 className="mb-2 text-sm font-semibold text-gray-600">📍 {division} বিভাগ</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {markets.map((m) => (
                  <div
                    key={m.market}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <span className="font-medium">{m.market}</span>
                    <span className="text-sm">
                      <span className="text-green-700">{formatPrice(m.min)}</span>
                      <span className="text-gray-400"> – </span>
                      <span className="text-red-600">{formatPrice(m.max)}</span>
                      <span className="ml-1 text-xs text-gray-500">টাকা</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  tone = "",
}: {
  label: string;
  value: number;
  unit: string;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${tone}`}>{formatPrice(value)} টাকা</p>
      <p className="text-xs text-gray-400">{unit}</p>
    </div>
  );
}