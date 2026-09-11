import { useEffect, useState } from "react";
import {  useParams, useSearchParams } from "react-router";
import {
  Play,
  Languages,
  MapPin,
  Info,
  Star,
  MoreHorizontal,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

import { getImageURL } from "@/lib/functions";
import TrailerModal from "@/components/TrailerModal";
import {
  getTVById,
  getTVCredits,
  getTVReviews,
  getTVRecommendations,
  getTVVideos
} from "@/data/movies";

import type {
  TVDetailsProps,
  TVCredits,
  TVListProps,
  Review,
  Trailer,
} from "@/types/movies.type";

import Credit from "@/components/credit";
import Recommendations from "@/components/recommendations";
import BackButton from "@/components/BackButton";

import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/watchlist";

type Tabs =
  | "overview"
  | "details"
  | "credit"
  | "reviews"
  | "recommendation";

function TV() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tv, setTV] = useState<TVDetailsProps | null>(null);
  const [credit, setCredit] = useState<TVCredits | null>(null);
  const [recommendations, setRecommendations] = useState<TVListProps[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const activeTab =
    (searchParams.get("tab") as Tabs) || "overview";

  const tabs: { text: string; activeTab: Tabs }[] = [
    {
      text: "Overview",
      activeTab: "overview",
    },
    {
      text: "Details",
      activeTab: "details",
    },
    {
      text: "Cast & Crew",
      activeTab: "credit",
    },
    {
      text: "Reviews",
      activeTab: "reviews",
    },
    {
      text: "Recommendations",
      activeTab: "recommendation",
    },
  ];

useEffect(() => {
  if (!id) return;

  const getData = async () => {
    try {
      const [
        tvInfo,
        creditInfo,
        recommendationsInfo,
      ] = await Promise.all([
        getTVById(id),
        getTVCredits(id),
        getTVRecommendations(id),
      ]);

      setTV(tvInfo);
      setCredit(creditInfo);
      setRecommendations(recommendationsInfo);
      getTVReviews(id)
        .then((reviewsInfo) => setReviews(reviewsInfo.results || []))
        .catch(() => setReviews([]));

      const videosInfo = await getTVVideos(id);

      const selectedTrailer =
        videosInfo.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official
        ) ??
        videosInfo.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        ) ??
        videosInfo.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Teaser"
        );

      setTrailer(selectedTrailer ?? null);
    } catch (error) {
      console.error("Failed to fetch TV data:", error);
      setTrailer(null);
    }
  };

  getData();
}, [id]);

  useEffect(() => {
    if (!tv) return;

    setInWatchlist(isInWatchlist(tv.id));
  }, [tv]);

  const handleWatchlist = () => {
    if (!tv) return;

    if (inWatchlist) {
      removeFromWatchlist(tv.id);
      setInWatchlist(false);
    } else {
      addToWatchlist(tv);
      setInWatchlist(true);
    }
  };

  if (!tv) {
    return <p>Loading...</p>;
  }

  const genres =
    tv.genres?.map((genre) => genre.name).join(", ") || "N/A";

  const creators =
    tv.created_by?.map((creator) => creator.name).join(", ") ||
    "N/A";

  const seasons = `${tv.number_of_seasons} ${tv.number_of_seasons === 1 ? "Season" : "Seasons"
    }`;

  const episodes = `${tv.number_of_episodes} ${tv.number_of_episodes === 1 ? "Episode" : "Episodes"
    }`;

  const writers = credit?.crew?.filter(
    (person) =>
      person.job === "Writer" ||
      person.job === "Screenplay" ||
      person.job === "Story"
  );

  return (
    <section className="movie-page">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${getImageURL(
            tv.backdrop_path ?? "",
            "xl"
          )})`,
        }}
      >
        <div className="backdrop" />

        <div className="hero-content">
          <BackButton />

          <div className="top-rated">
            <Star size={14} />
            <span>Top Rated TV Show</span>
          </div>

          <h1>{tv.name}</h1>

          <div className="movie-date">
            <span>
              {tv.first_air_date
                ? new Date(tv.first_air_date).getFullYear()
                : "N/A"}
            </span>

            <span>•</span>

            <span>{seasons}</span>

            <span>•</span>

            <span>{episodes}</span>

            <span>•</span>

            <span>{genres}</span>
          </div>

          <div className="ratings">
            <div className="rating-item">
              <Star size={18} fill="currentColor" />

              <div>{tv.vote_average.toFixed(1)}</div>

              <span>/10</span>
            </div>

            <span className="rating-separator">
              ({tv.vote_count.toLocaleString()} votes)
            </span>

            <div className="rating-item">
              <span className="tomato">
                <img
                  src="/rotten-tomato.webp"
                  width="16"
                  height="auto"
                  alt="Rotten Tomato"
                />
              </span>

              <div>87%</div>
            </div>

            <div className="imdb">
              <div>
                <img
                  src="/imdb.webp"
                  width="25"
                  height="auto"
                  alt="IMDb"
                />
              </div>

              <span>{tv.vote_average.toFixed(1)}/10</span>
            </div>
          </div>

          <p className="movie-overview">
            {tv.overview || "No overview available."}
          </p>

          <div className="movie-buttons">
            {/* <Link
              to={`/tv/${tv.id}`}
              className="watch-now-btn"
            >
              <Play size={16} fill="currentColor" />
              Watch Now
            </Link> */}

            <button
              className="watch-now-btn"
              onClick={() => setIsTrailerOpen(true)}
            >
              <Play size={16} fill="currentColor" />
              Watch Trailer
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

      <div className="movie-divider" />

      <nav className="movie-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.activeTab}
            className={
              activeTab === tab.activeTab ? "active" : ""
            }
            onClick={() =>
              setSearchParams({
                tab: tab.activeTab,
              })
            }
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
                  src={getImageURL(
                    tv.poster_path ?? "",
                    "md"
                  )}
                  alt={tv.name}
                />
              </div>

              <div className="overview-main">
                <h2>Overview</h2>

                <p className="overview-description">
                  {tv.overview || "No overview available."}
                </p>

                <div className="overview-details">
                  <div className="detail-row">
                    <div>First Air Date</div>
                    <div>
                      {tv.first_air_date || "N/A"}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div>Last Air Date</div>
                    <div>
                      {tv.last_air_date || "N/A"}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div>Created By</div>
                    <div>{creators}</div>
                  </div>

                  <div className="detail-row">
                    <div>Writers</div>

                    <div>
                      {writers?.length
                        ? writers.map((writer, index) => (
                          <span
                            key={`${writer.id}-${index}`}
                          >
                            {writer.name}
                            {index <
                              writers.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))
                        : "N/A"}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div>Stars</div>

                    <div>
                      {credit?.cast
                        ?.slice(0, 5)
                        .map((person, index) => (
                          <span key={person.id}>
                            {person.name}
                            {index <
                              Math.min(
                                credit.cast.length,
                                5
                              ) - 1
                              ? ", "
                              : ""}
                          </span>
                        )) || "N/A"}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div>Seasons</div>
                    <div>{tv.number_of_seasons}</div>
                  </div>

                  <div className="detail-row">
                    <div>Episodes</div>
                    <div>{tv.number_of_episodes}</div>
                  </div>

                  <div className="detail-row">
                    <div>Production Companies</div>

                    <div className="flex">
                      {tv.production_companies?.length
                        ? tv.production_companies.map(
                          (company, index) => (
                            <span key={company.id}>
                              {company.name}
                              {index <
                                tv.production_companies
                                  .length -
                                1
                                ? ", "
                                : ""}
                            </span>
                          )
                        )
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overview-sidebar">
                <div className="side-info">
                  <div className="info-icon">
                    <Info />
                  </div>

                  <div>
                    <small>Status</small>
                    <p>{tv.status || "N/A"}</p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon">
                    <Languages />
                  </div>

                  <div>
                    <small>Original Language</small>

                    <p>
                      {tv.original_language
                        ? tv.original_language.toUpperCase()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon">
                    <MapPin />
                  </div>

                  <div>
                    <small>Country</small>

                    <p>
                      {tv.origin_country?.join(", ") ||
                        "N/A"}
                    </p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon">◌</div>

                  <div>
                    <small>Also Known As</small>

                    <p>
                      {tv.original_name || tv.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="side-info">
                  <div className="info-icon">♧</div>

                  <div>
                    <small>Networks</small>

                    <p>
                      {tv.networks?.length
                        ? tv.networks
                          .map((network) => network.name)
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
              movieId={tv.id}
              mediaType="tv"
            />
          </>
        )}

        {activeTab === "credit" && (
          <Credit
            cast={credit?.cast || []}
            crew={credit?.crew || []}
            movieId={tv.id}
            mediaType="tv"
          />
        )}

        {activeTab === "details" && (
          <div className="tab-section">
            <h2>TV Show Details</h2>

            <div className="overview-details">
              <div className="detail-row">
                <div>Name</div>
                <div>{tv.name || "N/A"}</div>
              </div>

              <div className="detail-row">
                <div>Original Name</div>
                <div>
                  {tv.original_name || "N/A"}
                </div>
              </div>

              <div className="detail-row">
                <div>First Air Date</div>
                <div>
                  {tv.first_air_date || "N/A"}
                </div>
              </div>

              <div className="detail-row">
                <div>Last Air Date</div>
                <div>
                  {tv.last_air_date || "N/A"}
                </div>
              </div>

              <div className="detail-row">
                <div>Seasons</div>
                <div>{tv.number_of_seasons}</div>
              </div>

              <div className="detail-row">
                <div>Episodes</div>
                <div>{tv.number_of_episodes}</div>
              </div>

              <div className="detail-row">
                <div>Type</div>
                <div>{tv.type || "N/A"}</div>
              </div>

              <div className="detail-row">
                <div>Status</div>
                <div>{tv.status || "N/A"}</div>
              </div>

              <div className="detail-row">
                <div>Original Language</div>
                <div>
                  {tv.original_language || "N/A"}
                </div>
              </div>

              <div className="detail-row">
                <div>Origin Country</div>
                <div>
                  {tv.origin_country?.join(", ") || "N/A"}
                </div>
              </div>

              <div className="detail-row">
                <div>Tagline</div>
                <div>{tv.tagline || "N/A"}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-section">
            <h2>Reviews</h2>
            {reviews.length ? reviews.slice(0, 6).map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-card-header">
                  <strong>{review.author_details?.name || review.author}</strong>
                  {review.author_details?.rating ? <span>{review.author_details.rating}/10</span> : null}
                </div>
                <p>{review.content}</p>
              </article>
            )) : <p className="tab-empty">No reviews available yet.</p>}
          </div>
        )}

        {activeTab === "recommendation" && (
          <div className="tab-section">
            <Recommendations
  movies={recommendations}
  tv
/>
          </div>
        )}
        <TrailerModal
  isOpen={isTrailerOpen}
  onClose={() => setIsTrailerOpen(false)}
  title={tv.name}
  trailer={trailer}
/>
      </div>
    </section>
  );
}

export default TV;