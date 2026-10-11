"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason") === "protected") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="mx-auto my-12 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="form-control w-full">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" placeholder="you@example.com" className="input w-full" required />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input w-full" required />
        </label>
        <button type="submit" disabled={loading} className="btn btn-success w-full text-white">
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="divider text-xs text-gray-400">অথবা</div>
      <SocialButtons />

      <p className="mt-6 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-green-600 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}