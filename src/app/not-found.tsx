import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="display text-3xl text-ink">Not found</h1>
      <p className="mt-2 text-sm text-ink-muted">That page isn&apos;t in the record book.</p>
      <Link href="/" className="mt-4 inline-block text-sm text-turf hover:underline">
        ← Back to the almanac
      </Link>
    </div>
  );
}
