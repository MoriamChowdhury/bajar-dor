import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import SortedProducts from "@/components/SortedProducts";
import NotFoundView from "@/components/NotFoundView";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound(); // ভুল slug -> 404 page

  const products = await getProducts(slug);

  return (
    <div className="py-8">
      <h1 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {category.icon}
        </span>
        {category.nameBn}
      </h1>

      {products.length === 0 ? (
        <NotFoundView
          title="কোনো পণ্য পাওয়া যায়নি"
          message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
        />
      ) : (
        <SortedProducts products={products} />
      )}
    </div>
  );
}