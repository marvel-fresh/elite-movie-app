import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getImageURL } from "@/lib/functions";
import { getPopular } from "@/data/movies";
import type { MoviesListProps } from "@/types/movies.type";
import Footer from "@/layout/footer";

const TrendingPage = () => {
  const [movies, setMovies] = useState<MoviesListProps[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopular();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="trending-page">
        <div className="movies-grid">
          {movies.map((popular) => (
            <div key={popular.id} className="movie-card">
              <img
                src={getImageURL(popular.poster_path, "md")}
                alt={popular.title}
              />

              <h3>{popular.title}</h3>

              <p>
                {popular.release_date
                  ? popular.release_date.substring(0, 4)
                  : "N/A"}
              </p>

              <Link
                to={`/trending/${popular.id}`}
                className="hero-btn"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TrendingPage;