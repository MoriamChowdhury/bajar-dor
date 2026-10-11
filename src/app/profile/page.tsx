import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected&callbackUrl=/profile");

  const { user } = session;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="btn btn-sm btn-outline border-red-300 text-red-600 hover:border-red-500 hover:bg-red-50 hover:text-red-600" />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold">তথ্য</h2>
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">নাম</span>
          <input value={user.name} readOnly className="input w-full bg-gray-50" />
        </label>
        <Link href="/profile/update" className="btn btn-success mt-4 w-full text-white">
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}