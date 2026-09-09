
import type { WatchHistoryItem } from "@/types/movies.type";

const HISTORY_KEY = "watch_history";

export const getWatchHistory = (): WatchHistoryItem[] => {
  const history = localStorage.getItem(HISTORY_KEY);

  if (!history) {
    return [];
  }

  try {
    return JSON.parse(history);
  } catch {
    return [];
  }
};

export const addToWatchHistory = (item: WatchHistoryItem) => {
  const history = getWatchHistory();

  const existingMovie = history.find(
    (movie) =>
      movie.id === item.id &&
      movie.mediaType === item.mediaType
  );

  let updatedHistory: WatchHistoryItem[];

  if (existingMovie) {
    // Movie already exists.
    // Increase the watch count and update the date/time.
    updatedHistory = history.map((movie) =>
      movie.id === item.id &&
      movie.mediaType === item.mediaType
        ? {
            ...movie,
            watchedAt: Date.now(),
            watchCount: movie.watchCount + 1,
          }
        : movie
    );

    // Put the watched movie at the top
    const watchedMovie = updatedHistory.find(
      (movie) =>
        movie.id === item.id &&
        movie.mediaType === item.mediaType
    );

    const otherMovies = updatedHistory.filter(
      (movie) =>
        !(
          movie.id === item.id &&
          movie.mediaType === item.mediaType
        )
    );

    updatedHistory = watchedMovie
      ? [watchedMovie, ...otherMovies]
      : updatedHistory;
  } else {
    // First time watching this movie
    updatedHistory = [
      {
        ...item,
        watchedAt: Date.now(),
        watchCount: 1,
      },
      ...history,
    ];
  }

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(updatedHistory)
  );
};

export const removeFromWatchHistory = (
  id: number,
  mediaType: "movie" | "tv"
) => {
  const history = getWatchHistory();

  const updatedHistory = history.filter(
    (movie) =>
      !(movie.id === id && movie.mediaType === mediaType)
  );

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(updatedHistory)
  );
};

export const clearWatchHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
