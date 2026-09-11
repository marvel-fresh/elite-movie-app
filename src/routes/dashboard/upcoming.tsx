import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getUpcoming } from "@/data/movies";

import type { MoviesListProps } from "@/types/movies.type";

const UpcomingPage = () => {
  const [movies, setMovies] = useState<MoviesListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const upcomingMovies = await getUpcoming();
        setMovies(Array.isArray(upcomingMovies) ? upcomingMovies : []);
      } catch (error) {
        console.error("Failed to load upcoming movies:", error);
        setErrorMessage("Upcoming movies are unavailable right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!movies.length) {
    return <p>No upcoming movies found.</p>;
  }

  const heroMovie = movies[0];

  return (
    <>
      <section
        className="upcoming-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.poster_path})`,
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{heroMovie.title}</h1>

            <p>
              Coming {heroMovie.release_date}
            </p>

            <div className="hero-buttons">
              <Link to={`/movie/${heroMovie.id}`}>
                <button className="hero-btn">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="upcoming-section">
        <h2>Coming Soon</h2>

        <div className="movies-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="movie-info">
                <h3>{movie.title}</h3>

                <p>{movie.release_date}</p>

                <Link to={`/movie/${movie.id}`}>
                  <button className="hero-btn">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </>
  );
};

export default UpcomingPage;