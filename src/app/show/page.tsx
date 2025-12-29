import { fetchSeasonsByShowId, fetchShowById } from "@/lib/tvmaze";
import { stripHtml } from "@/lib/text";
import SeasonEpisodes from "./season-episodes";

const POWER_PUFF_SHOW_ID = 1955;

export default async function ShowPage() {
  const show = await fetchShowById(POWER_PUFF_SHOW_ID);
  const seasons = await fetchSeasonsByShowId(POWER_PUFF_SHOW_ID);
  const description = stripHtml(show.summary || "");

  // As the image returned by API is not according to design, using a static image for now.
  const imageUrl = "/powerpuff-coverimage.jpg";

  return (
    <main>
      <header
        className="bg-cover bg-center bg-no-repeat min-h-[420px]"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      >
        <div className="bg-black/60">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-2xl md:text-4xl font-semibold text-white">
              {show.name}
            </h1>
            <section className="mt-4">
              <p className="mt-2 text-white/90 max-w-prose">{description}</p>
            </section>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6">
        <SeasonEpisodes seasons={seasons} />
      </div>
    </main>
  );
}
