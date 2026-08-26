import type { MoviesListProps } from "@/types/movies.type";
import { getImageURL } from "@/lib/functions";
import { Link } from "react-router";

    interface SimilarMovieProps {
      movies: MoviesListProps[];
    }

function SimilarMovie({ movies }: SimilarMovieProps) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="similar-movies">
      <div className="section-header">
        <h2>Similar Movies</h2>
      </div>

      <div className="movies-grid">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="movie-card"
          >
            <img
              src={getImageURL(movie.poster_path, "md")}
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <p>
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimilarMovie;