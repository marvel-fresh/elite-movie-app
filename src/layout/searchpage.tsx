import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import {searchMovies,searchPerson,searchTV,} from "@/data/movies";

import { getImageURL } from "@/lib/functions";

import type {MoviesListProps,PersonSearchResult,} from "@/types/movies.type";

import "../global.css";
type SearchTab = "all" | "movies" | "tv" | "person";


const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
const [activeTab, setActiveTab] = useState<SearchTab>("all");
  const [movies, setMovies] = useState<MoviesListProps[]>([]);
  const [people, setPeople] = useState<PersonSearchResult[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const [
          movieData,
          personData,
          tvData,
        ] = await Promise.all([
          searchMovies(query),
          searchPerson(query),
          searchTV(query),
        ]);

        setMovies(movieData.results || []);
        setPeople(personData.results || []);
        setTvShows(tvData.results || []);

      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <main className="search-page">

      <h1>
        Search results for "{query}"
      </h1>
<div className="search-tabs">
  <button
    className={activeTab === "all" ? "active" : ""}
    onClick={() => setActiveTab("all")}
  >
    All
  </button>

  <button
    className={activeTab === "movies" ? "active" : ""}
    onClick={() => setActiveTab("movies")}
  >
    Movies
  </button>

  <button
    className={activeTab === "tv" ? "active" : ""}
    onClick={() => setActiveTab("tv")}
  >
    TV Shows
  </button>

  <button
    className={activeTab === "person" ? "active" : ""}
    onClick={() => setActiveTab("person")}
  >
    People
  </button>
</div>
      {loading && <p>Searching...</p>}

      {!loading &&
        movies.length === 0 &&
        people.length === 0 &&
        tvShows.length === 0 && (
          <p>No results found.</p>
        )}

     <div className="search-results-grid">


  {(activeTab === "all" || activeTab === "movies") &&
    movies.map((movie) => (
      <Link
        key={`movie-${movie.id}`}
        to={`/movie/${movie.id}`}
        className="search-card"
      >
        <img
          src={getImageURL(movie.poster_path ?? "", "md")}
          alt={movie.title}
        />

        <h3>{movie.title}</h3>

        <p>Movie</p>

        <p>
          ⭐ {movie.vote_average?.toFixed(1)}
        </p>
      </Link>
    ))}

  
  {(activeTab === "all" || activeTab === "tv") &&
    tvShows.map((tv) => (
      <Link
        key={`tv-${tv.id}`}
        to={`/tv/${tv.id}`}
        className="search-card"
      >
        <img
          src={getImageURL(tv.poster_path ?? "", "md")}
          alt={tv.name}
        />

        <h3>{tv.name}</h3>

        <p>TV Show</p>

        <p>
          ⭐ {tv.vote_average?.toFixed(1)}
        </p>
      </Link>
    ))}

  {(activeTab === "all" || activeTab === "person") &&
    people.map((person) => (
      <Link
        key={`person-${person.id}`}
        to={`/person/${person.id}`}
        className="search-card"
      >
        <img
          src={getImageURL(person.profile_path ?? "", "md")}
          alt={person.name}
        />

        <h3>{person.name}</h3>

        <p>Person</p>

        <p>
          ⭐ {person.popularity?.toFixed(1)}
        </p>
      </Link>
    ))}

</div>

    </main>
  );
};

export default SearchPage;