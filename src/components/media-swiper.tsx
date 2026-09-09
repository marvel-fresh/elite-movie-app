import { Link } from "react-router";

import type { MoviesListProps } from "@/types/movies.type";
import MovieCard from "./MovieCard";

interface MediaSwiperProps {
  title: string;
  movies?: MoviesListProps[];
  type?: "movie" | "tv";
  viewMoreLink?: string;
}

const MediaSwiper = ({
  title,
  movies = [],
  type = "movie",
  viewMoreLink,
}: MediaSwiperProps) => {
  return (
    <section className="media-swiper-section">
      <div className="popular-header">
        <h2>{title}</h2>

        {viewMoreLink && (
          <Link to={viewMoreLink} className="view-more">
            View More
            <span>→</span>
          </Link>
        )}
      </div>

      <div className="media-scroll">
        <div className="media-scroll-track">
          {movies.map((movie) => {
            return (
             <MovieCard mediaType={type} movie={movie} key={movie.id} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MediaSwiper;