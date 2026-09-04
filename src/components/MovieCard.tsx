import { getImageURL } from '@/lib/functions';
import type { MoviesListProps } from '@/types/movies.type';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';


interface MovieCardProps {
    movie: MoviesListProps;
    mediaType: "movie" | "tv";
    showRemove?: boolean;
    onRemove?: (id: number) => void;
}
function MovieCard({ movie, mediaType, showRemove, onRemove }: MovieCardProps) {
    return (
        <article
            key={movie.id}
            className="movie-item"
        >

            <Link
                to={
                    mediaType === "movie"
                        ? `/movie/${movie.id}`
                        : `/tv/${movie.id}`
                }
                className="poster-wrapper"
            >
                <img
                    src={getImageURL(
                        movie.poster_path,
                        "md"
                    )}
                    alt={
                        movie.title ||
                        movie.name ||
                        "Movie"
                    }
                />
            </Link>


            <div className="movie-content">

                <h3>
                    {movie.title ?? movie.name ?? "Untitled"}
                </h3>

                <div className="movie-meta">
                    <span>
                        {mediaType === "movie"
                            ? movie.release_date
                                ? movie.release_date.substring(
                                    0,
                                    4
                                )
                                : "N/A"
                            : movie.first_air_date
                                ? movie.first_air_date.substring(
                                    0,
                                    4
                                )
                                : "N/A"}
                    </span>

                    <span className="meta-dot">
                        •
                    </span>

                    <span>
                        {mediaType === "movie" ? "Movie" : "TV"}
                    </span>
                </div>

                {(showRemove && onRemove) ? (
                    <button
                       className="remove-watchlist"
                        onClick={() => onRemove(movie.id)}
                    >
                        <Trash2 />
                    </button>
                ) : <Link
                    to={
                        mediaType === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`
                    }
                    className="details-link">
                    View Details
                    <span>→</span>
                </Link>
                }
            </div>
        </article>
    )
}

export default MovieCard