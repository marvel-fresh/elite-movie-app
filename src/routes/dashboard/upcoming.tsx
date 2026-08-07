import { Link } from "react-router";
import { upcomingMovies } from "@/data/upcoming";
import type { Movie } from "@/types/upcoming";
import Footer from "@/layout/footer";

const UpcomingPage = () => {
  return (
    <>

      <section
        className="upcoming-hero"
        style={{
          backgroundImage: `url(/movie/${upcomingMovies[0].banner})`,
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{upcomingMovies[0].title}</h1>
            <p>Coming {upcomingMovies[0].releaseDate}</p>

            <div className="hero-buttons">
              <Link to={`/upcoming/${upcomingMovies[0].id}`}>
                <button className="hero-btn">Details</button>
              </Link>


            </div>
          </div>
        </div>
      </section>


      <section className="upcoming-section">
        <h2>Coming Soon</h2>

        <div className="movies-grid">
          {upcomingMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={`/movies/${movie.banner}`}
                alt={movie.title}
              />

              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.releaseDate}</p>
                <p>{movie.genre}</p>

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

      <Footer />
    </>
  );
};

export default UpcomingPage;