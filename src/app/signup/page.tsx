"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!name) return toast.error("নাম লিখুন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("দুটি পাসওয়ার্ড মেলেনি");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ ব্যর্থ হয়েছে");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto w-full max-w-md py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" className="input w-full" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" placeholder="you@example.com" className="input w-full" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
            <input name="confirm" type="password" placeholder="আবার লিখুন" className="input w-full" required />
          </label>
          <button type="submit" disabled={loading} className="btn btn-success w-full text-white">
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>
        <SocialButtons />

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-gray-500 hover:text-green-700">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}