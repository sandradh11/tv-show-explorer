import { render, screen } from "@testing-library/react";
import type { TvMazeEpisode } from "@/lib/tvmaze.types";
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
});
