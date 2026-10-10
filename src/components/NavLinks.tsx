"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/api";

export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.id}
            href={`/category/${c.slug}`}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-green-600 text-white shadow"
                : "text-gray-700 hover:bg-green-50"
            }`}
          >
            <span>{c.icon}</span>
            {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}