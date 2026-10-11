"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={handleSignOut} className={className}>
      ↩ সাইন আউট
    </button>
  );
}