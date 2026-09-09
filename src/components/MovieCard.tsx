
import { getImageURL } from "@/lib/functions";
import type { MoviesListProps } from "@/types/movies.type";
import { Trash2 } from "lucide-react";
import { Link } from "react-router";

interface MovieCardProps {
  movie: MoviesListProps;
  mediaType: "movie" | "tv";
  showRemove?: boolean;
  onRemove?: (id: number) => void;
}

function MovieCard({
  movie,
  mediaType,
  showRemove,
  onRemove,
}: MovieCardProps) {
  const detailsPath =
    mediaType === "movie"
      ? `/movie/${movie.id}`
      : `/tv/${movie.id}`;

  const title =
    movie.title ?? movie.name ?? "Untitled";

  const releaseDate =
    mediaType === "movie"
      ? movie.release_date
      : movie.first_air_date;

  return (
    <article className="movie-item">
      <div className="poster-wrapper">
        <Link to={detailsPath}>
          <img
            src={getImageURL(movie.poster_path, "md")}
            alt={title}
          />
        </Link>

        {showRemove && onRemove && (
          <button
            type="button"
            className="remove-watchlist"
            onClick={() => onRemove(movie.id)}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="movie-content">
        <h3>{title}</h3>

        <div className="movie-meta">
          <span>
            {releaseDate
              ? releaseDate.substring(0, 4)
              : "N/A"}
          </span>

          <span className="meta-dot">•</span>

          <span>
            {mediaType === "movie" ? "Movie" : "TV"}
          </span>
        </div>

        {!showRemove && (
          <Link
            to={detailsPath}
            className="details-link"
          >
            View Details
            <span>→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
