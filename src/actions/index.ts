"use server";

import { fetchEpisodesBySeasonId } from "@/lib/tvmaze";
import type { TvMazeEpisode } from "@/lib/tvmaze.types";

/**
 * Fetches episodes for a given season ID.
 * This is a server action which can be called from client components.
 * @param seasonId
 * @returns
 */
export async function getEpisodesForSeason(
  seasonId: number
): Promise<TvMazeEpisode[]> {
  if (!Number.isFinite(seasonId) || seasonId <= 0) {
    throw new Error("Invalid seasonId");
  }
  return fetchEpisodesBySeasonId(seasonId);
}
