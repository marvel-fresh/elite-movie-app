import { useEffect, useState } from "react";

import { getPopular } from "@/data/movies";
import type { MoviesListProps } from "@/types/movies.type";

import MediaGrid from "@/components/media-grid";

const PopularMovies = () => {
  const [movies, setMovies] = useState<MoviesListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getPopular();
        setMovies(data);
      } catch (error) {
        console.error(
          "Error fetching popular movies:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <p>Loading popular movies...</p>;
  }

  return (
  <section className="discover-page">
  <div className="discover-container">
    <div className="discover-heading">
      <div>
        <h2>Popular Movies</h2>
        <p>Discover the most popular movies.</p>
      </div>
    </div>

    <MediaGrid
      movies={movies}
      type="movie"
    />
  </div>
</section>
  );
};

export default PopularMovies;