/**
 * Not a client component, as it only renders passed props.
 * This is split out to keep the page component more readable.
 */
import Image from "next/image";
import Link from "next/link";
import { stripHtml } from "@/lib/text";
import { TvMazeEpisode } from "@/lib/tvmaze.types";
import { DEFAULT_EPISODE_SUMMARY } from "@/lib/tvmaze.constants";

type Props = {
  episode: TvMazeEpisode;
  placeholderSrc?: string;
};

export default function EpisodeDetailsView({
  episode,
  placeholderSrc = "/powerpuff-placeholder.png",
}: Props) {
  const imageUrl =
    episode.image?.original || episode.image?.medium || placeholderSrc;
  const summary = episode.summary
    ? stripHtml(episode.summary)
    : DEFAULT_EPISODE_SUMMARY;

  return (
    <main className="p-6">
      <Link
        href="/show"
        className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:underline"
      >
        ← Back to episodes
      </Link>
      <h1 className="text-3xl font-semibold">{`Episode ${episode.number}: ${episode.name}`}</h1>
      <h2 className="text-lg font-medium">{`Season ${episode.season} • ${episode.runtime} minutes`}</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[40%_60%]">
        <section className="mt-6">
          <Image
            src={imageUrl}
            alt={`Cover image for ${episode.name}`}
            width={640}
            height={360}
            className="h-auto w-full rounded"
          />
        </section>
        <section className="mt-4">
          <h2 id="episode-summary" className="text-lg font-semibold">
            Summary
          </h2>
          <p className="mt-2 leading-relaxed text-neutral-700">{summary}</p>
        </section>
      </div>
    </main>
  );
}
