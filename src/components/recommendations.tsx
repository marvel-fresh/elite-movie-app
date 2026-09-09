import type { MoviesListProps, TVListProps } from "@/types/movies.type";
import { Link } from "react-router";
import { getImageURL } from "@/lib/functions";

interface RecommendationsProps {
  movies: (MoviesListProps | TVListProps)[];
  tv?: boolean;
}

const Recommendations = ({
  movies,
  tv = false,
}: RecommendationsProps) => {
  return (
    <section className="recommendations">
      <div className="recommendations-header">
        <h2>Recommendations</h2>
      </div>

      <div className="recommendations-grid">
        {movies.map((movie) => {
          const title = tv
            ? (movie as TVListProps).name
            : (movie as MoviesListProps).title;

          const releaseDate = tv
            ? (movie as TVListProps).first_air_date
            : (movie as MoviesListProps).release_date;

          return (
            <Link
              key={movie.id}
              to={`/${tv ? "tv" : "movie"}/${movie.id}?tab=recommendation`}
              className="recommendation-card"
            >
              <img
                src={getImageURL(movie.poster_path ?? "", "xl")}
                alt={title}
              />

              <div className="recommendation-info">
                <h3>{title}</h3>

                <div className="recommendation-rating">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>

                <span>
                  {releaseDate?.slice(0, 4) || "N/A"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Recommendations;