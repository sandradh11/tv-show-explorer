import { fetchEpisodeById } from "@/lib/tvmaze";
import { notFound } from "next/navigation";
import EpisodeDetailsView from "./episode-details-view";

export default async function EpisodePage(props: { params: { id: string } }) {
  const { id } = await props.params;
  const episodeId = parseInt(id, 10);
  let episode;

  try {
    episode = await fetchEpisodeById(episodeId);
  } catch (err: unknown) {
    if ((err as Error & { status?: number }).status === 404) {
      notFound();
    }
    throw err;
  }

  return <EpisodeDetailsView episode={episode} />;
}
