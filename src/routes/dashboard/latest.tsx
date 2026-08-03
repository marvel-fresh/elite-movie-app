
import { Link, } from "react-router";
import { useState } from 'react';
import type { Movie } from "@/types/latest";
import { movies } from "@/data/movies";




const LatestMovies = () => {

      const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const showMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };
    return (

<>


        <section className="hero">
        <div className="hero-content">
          <h1>{movies[0].title}</h1>
          <p>{movies[0].seasons}</p>

          <button
            type="button"
            className="hero-btn"
            onClick={() => showMovieDetails(movies[0])}
          >
            Details
          </button>

          <h1>{movies[1].title}</h1>
          <p>{movies[1].seasons}</p>

          <button
            type="button"
            className="hero-btn"
            onClick={() => showMovieDetails(movies[1])}
          >
            Details
          </button>
        </div>
        
      </section>
  <section className="hero-latest"
       
 
  >
        <div className="hero-content">
        
          <h1>bahubali</h1>
          <p>
           season 1
          </p>

          <button className="hero-btn">details</button>

          <h1>The Flash</h1>
          <p>
       se 1-ep 1-8
          </p>

          <button className="hero-btn">details</button>

        </div>
        
      </section>
       <h3 className="others">you might also like</h3>
      <div className="movie-grid">
       
  <div className="movie-card">
    <img src="/image.jpg.png" alt="The Avengers" />

    <div className="movie-info">
      <h3>The Avengers</h3>
      <p>Season 1-25</p>

      <button>Details</button>
    </div>
  </div>

  <div className="movie-card">
    <img src="/spiderman.jpg" alt="Spider-Man" />

    <div className="movie-info">
      <h3>Spider-Man</h3>
      <p>Season 1-10</p>

      <button>Details</button>
    </div>
  </div>
</div>

      <section className="hero-image">
        <div className="hero-content">
          <h1>{movies[2].title}</h1>
          <p>{movies[2].seasons}</p>

          <button
            type="button"
            className="hero-btn"
            onClick={() => showMovieDetails(movies[2])}
          >
            Details
          </button>
        </div>
      </section>

      {selectedMovie && (
        <div className="movie-modal-overlay" onClick={closeMovieDetails}>
          <div
            className="movie-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="close-modal-btn"
              onClick={closeMovieDetails}
            >
              *
            </button>

            <h2>{selectedMovie.title}</h2>

            <p>
        Seasons: {selectedMovie.seasons}
            </p>

            <p>
        Year: {selectedMovie.year}
            </p>

            <p>
             Genre: {selectedMovie.genre}
            </p>

            <p>
        Description: {selectedMovie.description}
            </p>

            
          </div>
          
        </div>
      )}
    </>
  );
};

export default LatestMovies;