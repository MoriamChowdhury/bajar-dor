const API = process.env.NEXT_PUBLIC_API_URL ?? "https://openapi.programming-hero.com/api/bazardor";

export type Category = { id: string; slug: string; nameBn: string; icon: string };

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}