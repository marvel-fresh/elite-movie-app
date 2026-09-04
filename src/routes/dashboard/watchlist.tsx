import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Bookmark } from "lucide-react";

import type { MoviesListProps } from "@/types/movies.type";

import MediaGrid from "@/components/media-grid";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<
    MoviesListProps[]
  >([]);

  useEffect(() => {
    const savedMovies =
      localStorage.getItem("watchlist");

    if (savedMovies) {
      setWatchlist(JSON.parse(savedMovies));
    }
  }, []);

  const removeFromWatchlist = (movieId: number) => {
    const updatedList = watchlist.filter(
      (movie) => movie.id !== movieId
    );

    setWatchlist(updatedList);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updatedList)
    );
  };

  return (
    <main className="discover-page">
      <div className="discover-container">
        <div className="discover-heading">
          <div>
            <h2>My Watchlist</h2>

            <p>
              Movies you want to watch later.
            </p>
          </div>

          <div className="watchlist-count">
            {watchlist.length}{" "}
            {watchlist.length === 1
              ? "Movie"
              : "Movies"}
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className="watchlist-empty">
            <Bookmark size={50} />

            <h2>Your watchlist is empty</h2>

            <p>
              Start adding movies you want to watch
              later.
            </p>

            <Link
              to="/popular"
              className="browse-movies-btn"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <MediaGrid
            movies={watchlist}
            type="movie"
            showRemove
            onRemove={removeFromWatchlist}
          />
        )}
      </div>
    </main>
  );
};

export default Watchlist;