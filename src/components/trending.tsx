import { Link } from "react-router";
import { getImageURL } from "@/lib/functions";
import type { MoviesListProps } from "@/types/movies.type";

interface TrendingProps {
  movies: MoviesListProps[];
  activeTab: "movie" | "tv";
  setActiveTab: (tab: "movie" | "tv") => void;
}

const Trending = ({
  movies,
  activeTab,
  setActiveTab,
}: TrendingProps) => {
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
                  activeTab === "movie" ? "active" : ""
                }`}
                onClick={() => setActiveTab("movie")}
              >
                Movies
              </button>

              <button
                className={`media-tab ${
                  activeTab === "tv" ? "active" : ""
                }`}
                onClick={() => setActiveTab("tv")}
              >
                TV Shows
              </button>
            </div>
          </div>
        </div>

        <div className="movie-list">
          {movies.map((movie) => {
            const title =
              activeTab === "movie"
                ? movie.title
                : movie.name;

            const releaseDate =
              activeTab === "movie"
                ? movie.release_date
                : movie.first_air_date;

            const detailsPath =
              activeTab === "movie"
                ? `/movie/${movie.id}`
                : `/tv/${movie.id}`;

            return (
              <article
                key={movie.id}
                className="movie-item"
              >
                <div className="poster-wrapper">
                  <Link to={detailsPath}>
                    <img
                      src={getImageURL(
                        movie.poster_path,
                        "md"
                      )}
                      alt={title}
                    />
                  </Link>

                  <Link
                    to={detailsPath}
                    className="details-link"
                  >
                    View Details
                    <span>→</span>
                  </Link>
                </div>

                <div className="movie-content">
                  <h3>{title}</h3>

                  <div className="movie-meta">
                    <span>
                      {releaseDate
                        ? releaseDate.substring(0, 4)
                        : "N/A"}
                    </span>

                    <span className="meta-dot">
                      •
                    </span>

                    <span>
                      {activeTab === "movie"
                        ? "Movie"
                        : "TV"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Trending;