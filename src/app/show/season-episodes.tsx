"use client";

import { useState, useEffect, useMemo } from "react";
import { getEpisodesForSeason } from "@/actions";
import { stripHtml } from "@/lib/text";
import type { TvMazeEpisode, TvMazeSeason } from "@/lib/tvmaze.types";
import EpisodeRow from "./episode-row";

type Props = {
  seasons: TvMazeSeason[];
};

export default function SeasonEpisodes({ seasons }: Props) {
  const [selectedSeasonId, setSelectedSeasonId] = useState<number>(
    seasons[0]?.id || 0
  );
  const [episodes, setEpisodes] = useState<TvMazeEpisode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredEpisodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return episodes;
    return episodes.filter((ep) => {
      const title = ep.name?.toLowerCase() ?? "";
      const summary = ep.summary ? stripHtml(ep.summary).toLowerCase() : "";
      return title.includes(q) || summary.includes(q);
    });
  }, [episodes, searchQuery]);

  // Fetch episodes when selectedSeasonId changes
  useEffect(() => {
    if (!selectedSeasonId) return;

    let cancelled = false;

    async function fetchEpisodesBasedOnSeason() {
      setError(null);
      setLoading(true);
      try {
        const data = await getEpisodesForSeason(selectedSeasonId);
        if (!cancelled) setEpisodes(data);
      } catch {
        if (!cancelled) {
          setError("Failed to load episodes. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEpisodesBasedOnSeason();

    // Cleanup function to handle component unmountig
    return () => {
      cancelled = true;
    };
  }, [selectedSeasonId]);

  return (
    <div>
      <section aria-labelledby="episodes-heading" className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="episodes-heading" className="text-lg font-semibold">
            Episodes
          </h2>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <label htmlFor="season-select" className="sr-only">
              Select season
            </label>
            <select
              id="season-select"
              value={selectedSeasonId}
              onChange={(e) => {
                setSelectedSeasonId(Number(e.target.value));
                setSearchQuery(""); // Reset search query on season change
              }}
              className="h-9 w-44 rounded border border-neutral-300 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
            >
              {seasons.map((season) => {
                return (
                  <option key={season.id} value={season.id}>
                    {`Season ${season.number}`}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="mt-3 border-b border-neutral-200" />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label htmlFor="episode-search" className="sr-only">
            Search episodes
          </label>
          <input
            id="episode-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Episodes by title or summary"
            className="h-9 w-full max-w-md rounded border border-neutral-300 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
        </div>

        {/** Display error message if any */}
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/** Didnt use the loading.tsx because this is not route-level loading states */}
        <p aria-live="polite" className="mt-2 text-sm text-neutral-700">
          {loading ? "Loading episodes…" : null}
        </p>
        {filteredEpisodes.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-600" role="status">
            Looks like we don’t have that. Try a different search.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {filteredEpisodes
              .filter((ep) => ep.number) // Filter out episodes without a number
              .map((ep) => (
                <EpisodeRow key={ep.id} ep={ep} />
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
