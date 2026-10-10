import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api";
import { todayBn } from "@/lib/utils";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600">
              <Image src="/logo-icon.png" alt="" width={20} height={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold">বাজার দর</span>
              <span className="block text-xs text-gray-500">{todayBn()}</span>
            </span>
          </Link>

       
          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-sm btn-ghost sm:btn-md">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-sm btn-success text-white sm:btn-md">
              সাইন আপ
            </Link>
          </div>
        </div>

        <NavLinks categories={categories} />
      </div>
    </header>
  );
}