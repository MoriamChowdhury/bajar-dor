"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const login = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) toast.error(error.message ?? "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => login("google")}
        className="btn w-full border-gray-300 bg-white"
      >
        <span className="font-bold text-red-500">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => login("github")}
        className="btn w-full border-gray-300 bg-white"
      >
        <span>🐙</span> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}