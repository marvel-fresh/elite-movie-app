import { Link } from "react-router";
import { movies } from "@/data/trending";
import Footer from "@/layout/footer"
const TrendingPage = () => {
  return (
    <>
    <div className="trending-page">
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`./movie/${movie.banner}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>

            <Link to={`/trending/${movie.id}`}>
              <button type="button" className="hero-btn">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default TrendingPage;