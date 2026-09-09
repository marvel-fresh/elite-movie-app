import { Link } from "react-router";

import type { MoviesListProps } from "@/types/movies.type";
import MovieCard from "./MovieCard";

interface MediaGridProps {
  title?: string;
  movies: MoviesListProps[];
  type?: "movie" | "tv";
  showRemove?: boolean;
  onRemove?: (id: number) => void;
  hasViewMore?: boolean;
  viewMoreLink?: string;
}

const MediaGrid = ({
  title,
  movies,
  type = "movie",
  showRemove = false,
  onRemove,
  hasViewMore = false,
  viewMoreLink = "#",
}: MediaGridProps) => {
  return (
    <section className="popular-section">
      {title && (
        <div className="popular-header">
          <h2>{title}</h2>

          {hasViewMore && (
            <Link
              to={viewMoreLink}
              className="view-more"
            >
              View More
              <span>→</span>
            </Link>
          )}
        </div>
      )}

      <div className="movie-list">
        {movies.map((movie) => {
          return (
            <MovieCard
              showRemove={showRemove}
              onRemove={onRemove}
              mediaType={type}
              movie={movie}
              key={movie.id} />
          );
        })}
      </div>
    </section>
  );
};

export default MediaGrid;