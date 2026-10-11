import Link from "next/link";

export default function NotFoundView({
  title = "পাতাটি পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <div className="text-6xl">🛒</div>
      <p className="mt-4 text-5xl font-bold text-green-600">৪০৪</p>
      <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-gray-600">{message}</p>
      <Link href="/" className="btn btn-success mt-6 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}