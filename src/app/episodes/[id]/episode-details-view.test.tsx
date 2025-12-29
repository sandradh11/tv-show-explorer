import { render, screen } from "@testing-library/react";
import type { TvMazeEpisode } from "@/lib/tvmaze.types";
import { DEFAULT_EPISODE_SUMMARY } from "@/lib/tvmaze.constants";
import EpisodeDetailsView from "./episode-details-view";

describe("EpisodeDetailsView", () => {
  it("renders episode title and strips HTML from summary", () => {
    const mockEpisode: TvMazeEpisode = {
      id: 160191,
      name: "Bubbles Gets Her Groove Back",
      season: 2,
      number: 5,
      summary:
        "<p>Bubbles tries to find her talent after feeling overshadowed by her sisters.</p>",
      image: null,
      runtime: 30,
    };

    render(<EpisodeDetailsView episode={mockEpisode} />);
    expect(
      screen.getByRole("heading", {
        name: /Episode 5: Bubbles Gets Her Groove Back/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Bubbles tries to find her talent after feeling overshadowed by her sisters."
      )
    ).toBeInTheDocument();
  });
  it("renders the back link to /show", () => {
    const mockEpisode: TvMazeEpisode = {
      id: 5,
      name: "Episode With Back Link",
      season: 1,
      number: 3,
      summary: "<p>Summary</p>",
      image: null,
      runtime: 30,
    };
    render(<EpisodeDetailsView episode={mockEpisode} />);

    const backLink = screen.getByRole("link", { name: /back to episodes/i });
    expect(backLink).toHaveAttribute("href", "/show");
  });

  it("falls back to DEFAULT_EPISODE_SUMMARY when episode.summary is null", () => {
    const mockEpisode: TvMazeEpisode = {
      id: 1,
      name: "No Summary Episode",
      season: 1,
      number: 1,
      summary: null,
      image: null,
      runtime: 30,
    };

    render(<EpisodeDetailsView episode={mockEpisode} />);
    expect(screen.getByText(DEFAULT_EPISODE_SUMMARY)).toBeInTheDocument();
  });
});
