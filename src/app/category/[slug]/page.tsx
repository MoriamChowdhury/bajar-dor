import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/utils";
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
      <section className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

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