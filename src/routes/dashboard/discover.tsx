
import { useEffect, useState } from "react";
import {
  discoverMovies,
  discoverTV,
} from "@/data/movies";

import type { MoviesListProps } from "@/types/movies.type";
import MovieCard from "@/components/MovieCard";

const Discover = () => {
  const [mediaType, setMediaType] = useState<"movie" | "tv">(
    "movie"
  );

  const [movies, setMovies] = useState<MoviesListProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        setLoading(true);

        const params: Record<string, string> = {
          sort_by: sortBy,
        };

        if (genre) {
          params.with_genres = genre;
        }

        if (year) {
          if (mediaType === "movie") {
            params.primary_release_year = year;
          } else {
            params.first_air_date_year = year;
          }
        }

        const data =
          mediaType === "movie"
            ? await discoverMovies(params)
            : await discoverTV(params);

        setMovies(data);
      } catch (error) {
        console.error(
          "Failed to fetch discover results:",
          error
        );

        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscover();
  }, [mediaType, genre, year, sortBy]);

  return (
    <main className="discover-page">
      <div className="discover-container">

        <div className="discover-heading">
          <div>
            <h2>Discover</h2>

            <p>
              Find movies and TV shows you might enjoy.
            </p>
          </div>
        </div>

       
        <div className="discover-filters">

          
          <div className="filter-group">
            <label>Type</label>

            <select
              value={mediaType}
              onChange={(e) =>
                setMediaType(
                  e.target.value as "movie" | "tv"
                )
              }
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          </div>

        
          <div className="filter-group">
            <label>Genre</label>

            <select
              value={genre}
              onChange={(e) =>
                setGenre(e.target.value)
              }
            >
              <option value="">All Genres</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="18">Drama</option>
              <option value="27">Horror</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="53">Thriller</option>
            </select>
          </div>

         
          <div className="filter-group">
            <label>Year</label>

            <select
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
            >
              <option value="">All Years</option>

              {Array.from(
                { length: 30 },
                (_, index) => {
                  const currentYear =
                    new Date().getFullYear();

                  const value =
                    currentYear - index;

                  return (
                    <option
                      key={value}
                      value={value}
                    >
                      {value}
                    </option>
                  );
                }
              )}
            </select>
          </div>

        
          <div className="filter-group">
            <label>Sort By</label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="popularity.desc">
                Most Popular
              </option>

              <option value="vote_average.desc">
                Highest Rated
              </option>

              <option value="primary_release_date.desc">
                Newest
              </option>
            </select>
          </div>

        </div>

        {loading ? (
          <div className="discover-loading">
            <p>Loading...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="movie-list">

            {movies.map((movie) => (
            <MovieCard mediaType={mediaType} movie={movie} key={movie.id} />
            ))}

          </div>
        ) : (
          <div className="discover-empty">
            <p>No results found.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default Discover;
