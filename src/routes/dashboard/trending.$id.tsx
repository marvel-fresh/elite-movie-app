import { useParams } from "react-router";
import { movies } from "@/data/trending";

const TrendingDetails = () => {
  const { id } = useParams();

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
<div className="movie-details">
  <div className="banner-wrapper">
    <img
      src={`/movie/${movie.banner}`}
      alt={movie.title}
      className="details-banner"
    />

    <div className="details-content">
      <h1>{movie.title}</h1>
      <p>{movie.year}</p>
      <p>{movie.genre}</p>
      <p>{movie.description}</p>
    </div>
  </div>
</div>
    
  );
};

export default TrendingDetails;