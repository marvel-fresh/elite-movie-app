import type { Recommendation } from "@/types/movies.type";
import { Link } from "react-router";
import { getImageURL } from "@/lib/functions";

interface RecommendationsProps {
  movies: Recommendation[];
}

const Recommendations = ({ movies }: RecommendationsProps) => {
  return (
    <section className="recommendations">
      <div className="recommendations-header">
        <h2>Recommendations</h2>
      </div>

      <div className="recommendations-grid">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/now-playing/${movie.id}?tab=recommendation`}
            className="recommendation-card"
          >
            <img
              src={getImageURL(movie.poster_path ?? "", "xl")}
              alt={movie.title}
            />

            <div className="recommendation-info">
              <h3>{movie.title}</h3>

              <div className="recommendation-rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </div>

              <span>
                {movie.release_date?.slice(0, 4) || "N/A"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;

