import { getProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-12 py-8">
      <Hero />

      <section>
        <h2 className="mb-4 text-xl font-bold">
          <span className="text-green-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">
          <span className="text-red-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-28">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-sm text-gray-500">
          সব প্রয়োজনীয় পণ্যের আজকের দাম ও পরিবর্তন
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}