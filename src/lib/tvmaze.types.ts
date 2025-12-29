export type TvMazeImage = {
  medium?: string;
  original: string;
};

export type TvMazeShow = {
  id: number;
  name: string;
  summary: string | null; // often HTML
  image: TvMazeImage | null;
  genres?: string[];
  rating?: { average: number | null };
};

export type TvMazeSeason = {
  id: number;
  number: number;
};

export type TvMazeEpisode = {
  id: number;
  name: string;
  season: number;
  number: number;
  summary: string | null; // often HTML
  image: TvMazeImage | null;
  runtime: number | null;
};
