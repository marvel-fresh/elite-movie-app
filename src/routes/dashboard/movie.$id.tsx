
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { getImageURL } from "@/lib/functions";
import { getMovieById, getMovieCredits, getRecommendation, getSimilarMovies } from "@/data/movies";
import type { MovieCredits, MovieDetailsProps, MoviesListProps,   } from "@/types/movies.type";
import { Play, Languages, MapPin, Info, Star, MoreHorizontal } from "lucide-react";
import Credit from "@/components/credit";
import Recommendations from "@/components/recommendations";
import {Bookmark,BookmarkCheck,} from "lucide-react";
import {addToWatchlist,removeFromWatchlist,isInWatchlist,} from "@/lib/watchlist";
import BackButton from "@/components/BackButton";
type Tabs = 'overview' | 'details' | 'credit' | 'reviews' | 'recommendation';

function Movie() {
 const { id } = useParams();

const [recommendations, setRecommendations] = useState<MoviesListProps[]>([]);
const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
const [credit, setCredit] = useState<MovieCredits | null>(null);
const [similar, setSimilar] = useState<MoviesListProps[]>([]);
void similar;
   
const [searchParams, setSearchParams] = useSearchParams();

const activeTab = (searchParams.get("tab") as Tabs) || "overview";
const [inWatchlist, setInWatchlist] =
  useState(false);

  type TabsType = { 
    text: string,
     activeTab: Tabs 
    }
  const tabs: TabsType[] = [
    { text: "Overview", activeTab: "overview" },
    { text: "Details", activeTab: "details" },
    { text: "Cast & Crew", activeTab: "credit" },
    { text: "Reviews", activeTab: "reviews" },
    { text: "Recommendations", activeTab: "recommendation" }
  ]






useEffect(() => {
  if (movie) {
    setInWatchlist(
      isInWatchlist(movie.id)
    );
  }
}, [movie]);

  useEffect(() => {
    if (id) {
      const getData = async () => {
        const [movieInfo, creditInfo, similarInfo,recommendationsInfo] = await Promise.all([
          getMovieById(id),
          getMovieCredits(id),
          getSimilarMovies(id),
          getRecommendation (id)
        ])

        setMovie(movieInfo)
        setCredit(creditInfo)
        setSimilar(similarInfo)
        setRecommendations(recommendationsInfo)
      }

      getData()
    }

  }, [id]);
  const director = credit?.crew?.filter((person) => (person.job === "Director"))
  const writters = credit?.crew?.filter((person) => (person.job === "Writer"))
  const handleWatchlist = () => {
  if (!movie) return;

  if (inWatchlist) {
    removeFromWatchlist(movie.id);
    setInWatchlist(false);
  } else {
    addToWatchlist(movie);
    setInWatchlist(true);
  }
};

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <section className="movie-page">

      <section className="hero" style={{ backgroundImage: `url(${getImageURL(movie?.backdrop_path, "xl")})` }}>
  
        <div className="backdrop" />
        
        <div className="hero-content">

      <BackButton />

          <div className="top-rated">
            <Star size={14} />
            <span>Top Rated Movie</span>
          </div>

          <h1>{movie?.title}</h1>


          <div className="movie-date">
            <span>
              {movie?.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </span>

            <span>•</span>

            <span>
              {movie?.runtime
                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                : "N/A"}
            </span>

            <span>•</span>

            <span>PG-13</span>

            <span>•</span>

            <span>Sci-Fi, Action, Thriller</span>
          </div>

          <div className="ratings">

            <div className="rating-item">
              <Star size={18} fill="currentColor" />
              <div>{movie?.vote_average?.toFixed(1)}</div>
              <span>/10</span>
            </div>

            <span className="rating-separator">
              ({movie?.vote_count?.toLocaleString()} votes)
            </span>

            <div className="rating-item">
              <span className="tomato">
                <img
                  src="/rotten-tomato.webp" width="16" height="auto" alt="Rotten Tomato" /></span>
              <div>87%</div>
            </div>

            <div className="imdb">
              <div>
                <img
                  src="/imdb.webp" width="25" height="auto" alt="Rotten Tomato" />
              </div>
              <span>{movie?.vote_average?.toFixed(1)}/10</span>
            </div>

          </div>


          <p className="movie-overview">
            {movie?.overview}
          </p>

          <div className="movie-buttons">

            <Link
              to={`/movie/${movie?.id}`}
              className="watch-now-btn"
            >
              <Play size={16} fill="currentColor" />
              Watch Now
            </Link>

            <button className="trailer-btn">
              <Play size={15} fill="currentColor" />
              Trailer
            </button>

          <button
  className="trailer-btn"
  onClick={handleWatchlist}
>
  {inWatchlist ? (
    <>
      <BookmarkCheck size={18} />
      Added to Watchlist
    </>
  ) : (
    <>
      <Bookmark size={18} />
      Add to Watchlist
    </>  
  )}
</button>

            <button className="more-btn">
              <MoreHorizontal size={20} />
            </button>

          </div>

        </div>
      </section>
      <div className="movie-divider"></div>


      <nav className="movie-tabs">

        {tabs.map((tab, i) => (
          <button
            key={i}
            className={activeTab === tab.activeTab ? "active" : ""}
            onClick={() => setSearchParams({ tab: tab.activeTab })}
          >
            {tab.text}
          </button>
        ))}

      </nav>


      <div className="movie-tab-content">

        {activeTab === "overview" && (
          <>
            <section className="overview-section">


              <div className="overview-poster">
                <img
                  src={getImageURL(movie.poster_path, "md")}
                  alt={movie.title}
                />
              </div>


              <div className="overview-main">

                <h2>Overview</h2>

                <p className="overview-description">
                  {movie.overview}
                </p>



                <div className="overview-details">

                  <div className="detail-row">
                    <div>Release Date</div>
                    <div>{movie.release_date || "N/A"}</div>
                  </div>


                  <div className="detail-row">
                    <div>Director</div>
                    <div>
                      {director?.map((dir, i) => (
                        <span key={dir.id}>
                          {dir.name}

                          {i < director.length - 1 ? ", " : " "}
                        </span>
                      ))}
                    </div>
                  </div>



                  <div className="detail-row">
                    <div>Writters</div>
                    <div>
                      {writters?.map((write, i) => (
                        <span key={write.id}>
                          {write.name}
                          {i < writters.length - 1 ? ", " : " "}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div>Stars</div>
                    <div>
                      {credit?.cast.slice(0, 5).map((person, i) => (
                        <span key={person.id}>
                          {person.name}
                          {i < credit.cast.length - 1 ? ", " : " "}
                        </span>
                      ))}
                    </div>

                  </div>
                  <div className="detail-row">
                    <div>Budget</div>
                    <div>${movie.budget?.toLocaleString() || "N/A"}</div>
                  </div>
                  <div className="detail-row">
                    <div>Revenue</div>
                    <div>${movie.revenue?.toLocaleString() || "N/A"}</div>
                  </div>
                  <div className="detail-row">
                    <div>Production Companies</div>
                    <div className="flex">{
                      movie.production_companies.map((comp, i) => {
                        return (

                          <span>{comp.name}
                            {i < movie.production_companies.length - 1 ? ", " : " "}
                          </span>


                        )
                      })
                    }</div>
                  </div>

                </div>
              </div>


              <div className="overview-sidebar">

                <div className="side-info">
                  <div className="info-icon"><Info /></div>

                  <div>
                    <small>Status</small>
                    <p>{movie.status || "Released"}</p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon"><Languages /></div>

                  <div>
                    <small>Original Language</small>
                    <p>
                      {movie.original_language
                        ? movie.original_language.toUpperCase()
                        : "English"}
                    </p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon"><MapPin /></div>

                  <div>
                    <small>Country</small>
                    <p>United States</p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon">◌</div>

                  <div>
                    <small>Also Known As</small>
                    <p>{movie.title}</p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon">♧</div>

                  <div>
                    <small>Production Companies</small>
                    <p>
                      {movie.production_companies?.length
                        ? movie.production_companies
                          .map((company) => company.name)
                          .join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="available-section">
                  <small>Available In</small>

                  <div className="quality-buttons">
                    <div>HD</div>
                    <div>4K</div>
                    <div>HDR</div>
                  </div>
                </div>

              </div>


            </section>
            <Credit
              cast={credit?.cast || []}
              crew={[]}
              movieId={movie.id}
            />
          </>
        )}

        {activeTab === "credit" && (
          <Credit
            cast={credit?.cast || []}
            crew={credit?.crew || []}
            movieId={movie.id}
          />
        )}

        {activeTab === "details" && (
          <div className="tab-section">
            <h2>Details</h2>

          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-section">
            <h2>Reviews</h2>

          </div>
        )}

  {activeTab === "recommendation" && (
  <div className="tab-section">
    <Recommendations movies={recommendations} />
  </div>
)}

      </div>



    </section>

  );
}

export default Movie;
