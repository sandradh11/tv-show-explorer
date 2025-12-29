import Link from "next/link";
import Image from "next/image";
import { stripHtml, firstSentence } from "@/lib/text";
import { TvMazeEpisode } from "@/lib/tvmaze.types";
import { DEFAULT_EPISODE_SUMMARY } from "@/lib/tvmaze.constants";

export default function EpisodeRow({ ep }: { ep: TvMazeEpisode }) {
  const episodeSummary = ep.summary
    ? stripHtml(firstSentence(ep.summary))
    : DEFAULT_EPISODE_SUMMARY;

  const thumbnail =
    ep.image?.medium ?? ep.image?.original ?? "/powerpuff-placeholder.png";

  return (
    <li>
      <Link
        href={`/episodes/${ep.id}`}
        className="block rounded border border-neutral-300 bg-white p-3 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label={`Episode ${ep.number}: ${ep.name}. ${episodeSummary}`}
      >
        <div className="grid grid-cols-[2rem_120px_1fr_4rem] items-start gap-4">
          <div className="text-lg font-medium text-neutral-600 text-right">
            {ep.number}
          </div>

          <div className="relative h-[68px] w-[120px] overflow-hidden rounded bg-neutral-200">
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="font-semibold">{ep.name}</div>
            <p className="mt-1 text-sm text-neutral-700">{episodeSummary}</p>
          </div>

          <div className="text-sm text-neutral-600 tabular-nums text-right">
            {ep.runtime ?? "–"}m
          </div>
        </div>
      </Link>
    </li>
  );
}
