import Sections from "@/components/sections";
import { movies } from "@/data/movies";
import type { Movie } from "@/types/latest";
import { useState } from "react";
import { Link } from "react-router";
const DashboardPage = () => {

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const showMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };


  return (

    <>


      <section className="hero" style={{backgroundImage:`url(./movies/${movies[0].banner})`}}>
        <div className="hero-content">
          <h1>{movies[0].title}</h1>
          <p>{movies[0].description}</p>

          <button
            type="button"
            className="hero-btn"
            onClick={() => showMovieDetails(movies[0])}
          >
            Details
          </button>

        </div>

      </section>

<Sections title="Trending" movies={movies} hasViewMore viewMoreLink="/trending"/>

    </>

  );
};

export default DashboardPage;
