"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import SignOutButton from "./SignOutButton";

function Avatar({ name, image, size = 32 }: { name: string; image?: string | null; size?: number }) {
  const style = { width: size, height: size };
  return image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" style={style} className="rounded-full object-cover" />
  ) : (
    <span style={style} className="flex items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="skeleton h-10 w-32" />;

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-sm btn-ghost sm:btn-md">সাইন ইন</Link>
        <Link href="/signup" className="btn btn-sm btn-success text-white sm:btn-md">সাইন আপ</Link>
      </div>
    );
  }

  const { user } = session;
  const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-gray-100">
        <Avatar name={user.name} image={user.image} />
        <span className="hidden text-sm font-medium sm:block">{user.name}</span>
        <span className="text-xs text-gray-400">▾</span>
      </button>

      <div tabIndex={0} className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
        <div className="border-b border-gray-100 px-3 py-2">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
        </div>
        <Link href="/profile" onClick={closeMenu} className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
          👤 আমার প্রোফাইল
        </Link>
        <SignOutButton className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50" />
      </div>
    </div>
  );
}