import Link from "next/link";

export default function EpisodeNotFound() {
  return (
    <main className="p-6" role="status">
      <h1 className="text-xl font-semibold">Episode not found</h1>
      <p className="mt-2">
        We could not find that episode. Something is going wrong on our end!
        Please try again later.
      </p>
      <Link className="mt-4 inline-block underline" href="/show">
        Back to show
      </Link>
    </main>
  );
}
