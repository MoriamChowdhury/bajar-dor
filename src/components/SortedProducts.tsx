"use client";
import { useState } from "react";
import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

type Sort = "default" | "asc" | "desc";

export default function SortedProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // দাম number হিসেবে আছে, তাই সংখ্যা ধরেই sort হয় (বাংলা অঙ্ক শুধু দেখানোর সময়)
  const sorted = [...products].sort((a, b) =>
    sort === "asc" ? a.today - b.today : sort === "desc" ? b.today - a.today : 0
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="select select-sm w-52 border-gray-300 bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}