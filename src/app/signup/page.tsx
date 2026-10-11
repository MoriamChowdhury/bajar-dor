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

    if (!name) return toast.error("নাম লিখুন");
    if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "সাইন আপ ব্যর্থ হয়েছে");
      return;
    }
    toast.success("সাইন আপ সফল হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto my-12 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>
      <p className="mt-1 text-sm text-gray-500">বাজার দর-এ যোগ দিন</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="form-control w-full">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input name="name" type="text" placeholder="আপনার নাম" className="input w-full" required />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" placeholder="you@example.com" className="input w-full" required />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" placeholder="কমপক্ষে ৬ অক্ষর" className="input w-full" required />
        </label>
        <button type="submit" disabled={loading} className="btn btn-success w-full text-white">
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
        </button>
      </form>

      <div className="divider text-xs text-gray-400">অথবা</div>
      <SocialButtons />

      <p className="mt-6 text-center text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-green-600 hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}