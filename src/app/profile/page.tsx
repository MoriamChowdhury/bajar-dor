import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected&callbackUrl=/profile");

  const { user } = session;

  return (
    <div className="mx-auto my-12 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-20 w-20 rounded-full object-cover" />
        ) : (
          user.name.charAt(0).toUpperCase()
        )}
      </div>
      <h1 className="mt-4 text-xl font-bold">{user.name}</h1>
      <p className="text-sm text-gray-500">{user.email}</p>

      <Link href="/profile/update" className="btn btn-success mt-6 text-white">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}