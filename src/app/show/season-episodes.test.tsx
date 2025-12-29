import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getEpisodesForSeason } from "@/actions";
import { TvMazeSeason } from "@/lib/tvmaze.types";
import SeasonEpisodes from "./season-episodes";

vi.mock("@/actions", () => ({
  getEpisodesForSeason: vi.fn(),
}));

const seasons: TvMazeSeason[] = [
  { id: 7074, number: 2 },
  { id: 7073, number: 1 },
];

const season2Episodes = [
  {
    id: 160191,
    name: "Collect Her / Supper Villain",
    number: 2,
    summary: "<p>Mojo Jojo is here.</p>",
    image: null,
  },
  {
    id: 160192,
    name: "Birthday Bash",
    number: 3,
    summary: "<p>The girls celebrate.</p>",
    image: null,
  },
];

const season1Episodes = [
  {
    id: 150001,
    name: "Monkey See, Doggie Do",
    number: 1,
    summary: "<p>Townsville is in trouble.</p>",
    image: null,
  },
];

describe("SeasonEpisodes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("shows loading state while waiting for episodes to load", async () => {
    (getEpisodesForSeason as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      season2Episodes
    );

    render(<SeasonEpisodes seasons={seasons} />);
    expect(screen.getByText(/Loading episodes/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: /Collect Her/ })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading episodes/i)).not.toBeInTheDocument();
    });
    expect(getEpisodesForSeason).toHaveBeenCalledWith(7074);
  });

  it("filters episodes when searching and resets on season change", async () => {
    (getEpisodesForSeason as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(season2Episodes)
      .mockResolvedValueOnce(season1Episodes);
    render(<SeasonEpisodes seasons={seasons} />);

    expect(await screen.findByText(/Collect Her/i)).toBeInTheDocument();
    expect(screen.getByText(/Birthday Bash/i)).toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Birthday" },
    });

    expect(screen.getByText(/Birthday Bash/i)).toBeInTheDocument();
    expect(screen.queryByText(/Collect Her/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "7073" },
    });

    expect(
      await screen.findByText(/Monkey See, Doggie Do/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
});
