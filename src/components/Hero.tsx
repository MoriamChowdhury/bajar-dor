import { todayBn } from "@/lib/utils";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid items-center gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div>
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {todayBn()}
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গত ও সপ্তাহের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-success mt-6 text-white">
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex items-center justify-center">
  <Image
   src="/bazar-hero.png"
    alt="সবজি ও ফলের ঝুড়ি"
    width={320}
    height={260}
    priority
    className="h-auto w-full max-w-xs"
  />
</div>
    </section>
  );
}