import type { TvMazeEpisode, TvMazeSeason, TvMazeShow } from "./tvmaze.types";

const BASE_URL = "https://api.tvmaze.com";

/**
 * Fetches the TV show with ID 1955(The Power Puff Girls) from the TVMaze API.
 * Refer: https://www.tvmaze.com/api#show-main-information
 * GET /singlesearch/shows/${id}
 */
export async function fetchShowById(id: number): Promise<TvMazeShow> {
  const url = `${BASE_URL}/shows/${id}`;

  const response = await fetch(url, {
    //With time based caching which is also used in subsequent fetch requests below: https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
    next: { revalidate: 60 * 60 }, // 1 hour
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch show. Status=${response.status}`);
  }

  const data = (await response.json()) as TvMazeShow;
  return data;
}

/**
 * Fetches all seasons for a given show ID from the TVMaze API.
 * Refer: https://www.tvmaze.com/api#show-seasons
 * GET /shows/${id}/seasons
 * @param id
 * @returns
 */

export async function fetchSeasonsByShowId(
  id: number
): Promise<TvMazeSeason[]> {
  const url = `${BASE_URL}/shows/${id}/seasons`;

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 }, // 1 hour
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch seasons. Status=${response.status}`);
  }

  const data = (await response.json()) as TvMazeSeason[];
  return data;
}

/**
 * Fetches all episodes for a given show ID from the TVMaze API.
 * Refer: https://www.tvmaze.com/api#show-episode-list
 * GET /shows/${id}/episodes
 * @param id
 * @returns
 */
export async function fetchEpisodesBySeasonId(
  id: number
): Promise<TvMazeEpisode[]> {
  const url = `${BASE_URL}/seasons/${id}/episodes`;
  const response = await fetch(url, {
    next: { revalidate: 60 * 60 },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch episodes. Status=${response.status}`);
  }

  const data = (await response.json()) as TvMazeEpisode[];
  return data;
}

/**
 * Fetches a single episode by its ID from the TVMaze API.
 * Refer: https://www.tvmaze.com/api#episode-main-information
 * GET /episodes/${id}
 * @param id
 * @returns
 */
export async function fetchEpisodeById(id: number): Promise<TvMazeEpisode> {
  const url = `${BASE_URL}/episodes/${id}`;
  const response = await fetch(url, {
    next: { revalidate: 60 * 60 },
  });
  if (response.status === 404) {
    const err = new Error("Episode not found");
    // tag the error so the page can detect it
    (err as Error & { status?: number }).status = 404;
    throw err;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch episode. Status=${response.status}`);
  }

  const data = (await response.json()) as TvMazeEpisode;
  return data;
}
