import type {
  MoviesListProps,
  MovieDetailsProps,
} from "@/types/movies.type";

const WATCHLIST_KEY = "watchlist";

export type WatchlistMovie =
  | MoviesListProps
  | MovieDetailsProps;

export const getWatchlist = (): WatchlistMovie[] => {
  const saved = localStorage.getItem(WATCHLIST_KEY);

  if (!saved) {
    return [];
  }

  return JSON.parse(saved);
};

export const addToWatchlist = (
  movie: WatchlistMovie
): void => {
  const watchlist = getWatchlist();

  const alreadyExists = watchlist.some(
    (item) => item.id === movie.id
  );

  if (alreadyExists) {
    return;
  }

  const updatedWatchlist = [
    ...watchlist,
    movie,
  ];

  localStorage.setItem(
    WATCHLIST_KEY,
    JSON.stringify(updatedWatchlist)
  );
};

export const removeFromWatchlist = (
  movieId: number
): void => {
  const watchlist = getWatchlist();

  const updatedWatchlist = watchlist.filter(
    (movie) => movie.id !== movieId
  );

  localStorage.setItem(
    WATCHLIST_KEY,
    JSON.stringify(updatedWatchlist)
  );
};

export const isInWatchlist = (
  movieId: number
): boolean => {
  const watchlist = getWatchlist();

  return watchlist.some(
    (movie) => movie.id === movieId
  );
};