const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

export type Category = { id: string; slug: string; nameBn: string; icon: string };

export type Market = { market: string; division: string; min: number; max: number };

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${API}/products?category=${encodeURIComponent(category)}`
    : `${API}/products`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  return res.json();
}

export async function getProduct(slugOrId: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slugOrId || String(p.id) === slugOrId) ?? null;
}