import { useEffect, useState } from "react";
import { Link } from "react-router";

// removed unused import: getImageURL
import { getUpcoming } from "@/data/movies";
import NowPlayingHero from "@/components/swiper";

import type { MoviesListProps } from "@/types/movies.type";

const UpcomingPage = () => {
  const [nowPlaying, setNowPlaying] = useState<MoviesListProps[]>([]);
  const [movies, setMovies] = useState<MoviesListProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const upComing = await Promise.all([getUpcoming()]);
      setNowPlaying(upComing[0]);
    };
    getData();
  }, []);


  useEffect(() => {
    const fetchUpcoming = async () => {
      const upComing = await Promise.all([getUpcoming()]);
      setMovies(upComing[0]);
    };

    fetchUpcoming();
  }, []);

  if (!movies.length) {
    return <p>Loading movies...</p>;
  }

  const heroMovie = movies[0];

  return (
    <>
    <NowPlayingHero nowPlaying={nowPlaying}/>
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
              <Link to={`/upcoming/${heroMovie.id}`}>
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

                <Link to={`/upcoming/${movie.id}`}>
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