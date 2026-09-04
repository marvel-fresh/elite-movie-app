import { useEffect, useState } from "react";

import {
  getTrendingMovies,
  getTrendingTV,
} from "@/data/movies";

import type { MoviesListProps } from "@/types/movies.type";

import MediaGrid from "@/components/media-grid";

const TrendingPage = () => {
  const [movies, setMovies] = useState<MoviesListProps[]>([]);
  const [activeTab, setActiveTab] =
    useState<"movie" | "tv">("movie");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data =
          activeTab === "movie"
            ? await getTrendingMovies()
            : await getTrendingTV();

        setMovies(data);
      } catch (error) {
        console.error(
          "Failed to fetch trending:",
          error
        );

        setMovies([]);
      }
    };

    fetchTrending();
  }, [activeTab]);

  return (
    <main className="discover-page">
      <div className="discover-container">
        <div className="discover-heading">
          <div>
            <h2>Trending</h2>
            <p>
              Discover what's trending this week.
            </p>
          </div>

          <div className="filmography-tabs">
            <div className="media-tabs">
              <button
                className={`media-tab ${
                  activeTab === "movie"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveTab("movie")
                }
              >
                Movies
              </button>

              <button
                className={`media-tab ${
                  activeTab === "tv"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveTab("tv")
                }
              >
                TV Shows
              </button>
            </div>
          </div>
        </div>

       <MediaGrid
  movies={movies}
  type={activeTab}
/>
      </div>
    </main>
  );
};

export default TrendingPage;