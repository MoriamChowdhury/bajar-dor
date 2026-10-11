"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name")).trim();
    if (!name) return toast.error("নাম লিখুন");

    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-md py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {isPending ? (
          <div className="skeleton h-24 w-full" />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">নাম</span>
              <input
                key={session?.user.name}
                name="name"
                type="text"
                defaultValue={session?.user.name}
                placeholder="আপনার নাম"
                className="input w-full"
                required
              />
            </label>
            <button type="submit" disabled={loading} className="btn btn-success w-full text-white">
              {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
            </button>
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/profile" className="text-gray-500 hover:text-brand">← প্রোফাইলে ফিরে যান</Link>
      </p>
    </div>
  );
}
