"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) return <div className="skeleton h-10 w-32" />;

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-sm btn-ghost sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-sm btn-success text-white sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </span>
        <span className="hidden text-sm font-medium sm:block">{user.name}</span>
      </button>
      <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-gray-200 bg-white p-2 shadow">
        <li><Link href="/profile">আমার প্রোফাইল</Link></li>
        <li><button onClick={handleSignOut}>সাইন আউট</button></li>
      </ul>
    </div>
  );
}