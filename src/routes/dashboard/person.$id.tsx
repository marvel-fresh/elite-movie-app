import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams, } from "react-router";
import { Calendar, Film, MapPin, Star, ExternalLink, LinkIcon, Globe } from "lucide-react";
import { getImageURL } from "@/lib/functions";
import { getActorSocial, getPersonById, getPersonGallery, getPersonMovieCredits, getPersonTvCredits, } from "@/data/movies";
import type { PersonDetailsProps } from "@/types/movies.type";
import type { ActorsCredits, PersonGallery, PersonSocails, } from "@/types/cast.type";
import BackButton from "@/components/BackButton";
type Tabs = "overview" | "filmography" | "gallery";
type FilmographyTab = "movies" | "tv";

function PersonDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [person, setPerson] = useState<PersonDetailsProps | null>(null);
    const [movieCredits, setMovieCredits] = useState<ActorsCredits[]>([]);
    const [tvCredits, setTvCredits] = useState<ActorsCredits[]>([]);
    const [gallery, setGallery] = useState<PersonGallery[]>([]);
    const [socials, setSocials] = useState<PersonSocails | null>(null);
    const [loading, setLoading] = useState(true);

    const [filmographyTab, setFilmographyTab] =
        useState<FilmographyTab>("movies");

    const tab = searchParams.get("tab");

    const getCreditTitle = (credit: ActorsCredits) => {
        return credit.title || credit.name || "Unknown Title";
    };

    const activeCredits =
        filmographyTab === "movies"
            ? movieCredits
            : tvCredits;

    const [activeTab, setActiveTab] = useState<Tabs>(
        tab === "filmography" || tab === "gallery"
            ? tab
            : "overview"
    );

    type TabsType = {
        text: string;
        activeTab: Tabs;
    };

    const tabs: TabsType[] = [
        { text: "Overview", activeTab: "overview" },
        { text: "Filmography", activeTab: "filmography" },
        { text: "Gallery", activeTab: "gallery" },
    ];

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchPerson = async () => {
            try {
                const [personData, movieCreditsData, tvCredit, personGalleryData, socialsData,] = await Promise.all([
                    getPersonById(id),
                    getPersonMovieCredits(id),
                    getPersonTvCredits(id),
                    getPersonGallery(id),
                    getActorSocial(id),
                ]);

                setPerson(personData);
                setMovieCredits(movieCreditsData.cast || []);
                setTvCredits(tvCredit.cast || []);
                setGallery(personGalleryData.profiles || []);
                setSocials(socialsData);
            } catch (error) {
                console.error("Failed to fetch person:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerson();
    }, [id]);

    useEffect(() => {
        if (
            tab === "overview" ||
            tab === "filmography" ||
            tab === "gallery"
        ) {
            setActiveTab(tab);
        }
    }, [tab]);

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
        navigate(`?tab=${tab}`, { replace: true });
    };

    if (loading) {
        return (
            <section className="person-loading">
                <p>Loading person...</p>
            </section>
        );
    }

    if (!person) {
        return (
            <section className="person-loading">
                <h2>Person not found</h2>


                <Link to={`/movie/${id}`} className="item-btn">
                    Go Back
                </Link>
            </section>
        );
    }

    return (
        
        <main className="person-page">

   <BackButton/>
            <section className="person-hero">
                
                <div className="person-profile">
                 
                    {person.profile_path ? (
                        <img
                            src={getImageURL(person.profile_path, "xl")}
                            alt={person.name}
                        />
                    ) : (
                        <div className="person-placeholder">
                            No Image
                        </div>
                    )}
                </div>

                <div className="person-main">
                    <span className="person-department">
                        {person.known_for_department || "Actor"}
                    </span>

                    <h1>{person.name}</h1>

                    <div className="person-meta">
                        {person.birthday && (
                            <div>
                                <Calendar size={17} />

                                <span>
                                    {new Date(
                                        person.birthday
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        )}


                        <div className="person-stats">
                            <div className="person-stat">
                                <Film size={20} />
                                <div>
                                    <strong>{movieCredits.length + tvCredits.length}+</strong>
                                    <span>Movies & TV Shows</span>
                                </div>
                            </div>
                        </div>
                        {person.place_of_birth && (
                            <div>
                                <MapPin size={17} />

                                <span>
                                    {person.place_of_birth}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="person-rating">
                        <Star size={18} fill="currentColor" />

                        <span>
                            {person.popularity?.toFixed(1) || "N/A"}
                        </span>

                        <small>Popularity</small>
                    </div>


                </div>
            </section>

            <nav className="person-tabs">
                {tabs.map((tab) => (
                    <button
                        type="button"
                        key={tab.activeTab}
                        className={
                            activeTab === tab.activeTab
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            handleTabChange(tab.activeTab)
                        }
                    >
                        {tab.text}
                    </button>
                ))}
            </nav>

            {activeTab === "overview" && (
                <>
                    <section className="person-content">
                        <div className="person-biography">
                            <h2>Biography</h2>

                            <p>
                                {person.biography ||
                                    "No biography available."}
                            </p>
                        </div>

                        <aside className="person-sidebar">
                            <div className="person-side-card">
                                <h3>Personal Info</h3>

                                <div className="person-side-item">
                                    <small>Known For</small>

                                    <strong>
                                        {person.known_for_department ||
                                            "N/A"}
                                    </strong>
                                </div>

                                <div className="person-side-item">
                                    <small>Birthday</small>

                                    <strong>
                                        {person.birthday
                                            ? new Date(
                                                person.birthday
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </strong>
                                </div>

                                {person.deathday && (
                                    <div className="person-side-item">
                                        <small>Died</small>

                                        <strong>
                                            {new Date(
                                                person.deathday
                                            ).toLocaleDateString()}
                                        </strong>
                                    </div>
                                )}

                                <div className="person-side-item">
                                    <small>Place of Birth</small>

                                    <strong>
                                        {person.place_of_birth ||
                                            "N/A"}
                                    </strong>
                                </div>

                                <div className="person-side-item">
                                    <small>Popularity</small>

                                    <strong>
                                        {person.popularity?.toFixed(
                                            1
                                        ) || "N/A"}
                                    </strong>
                                </div>
                            </div>



                        </aside>
                    </section>

                    <section className="person-filmography-preview">
                        <div className="section-header">
                            <div className="filmography-title">
                                <h2>Filmography</h2>

                                <div className="filmography-tabs">
                                    <button
                                        type="button"
                                        className={
                                            filmographyTab ===
                                                "movies"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setFilmographyTab(
                                                "movies"
                                            )
                                        }
                                    >
                                        Movies
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            filmographyTab ===
                                                "tv"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setFilmographyTab(
                                                "tv"
                                            )
                                        }
                                    >
                                        TV Shows
                                    </button>
                                </div>

                            </div>

                            {activeCredits.length > 4 && (
                                <button
                                    type="button"
                                    className="view-all-btn"
                                    onClick={() =>
                                        handleTabChange(
                                            "filmography"
                                        )
                                    }
                                >
                                    View All
                                </button>

                            )}

                        </div>

                        {activeCredits.length > 0 ? (
                            <div className="filmography-preview-grid">
                                {activeCredits
                                    .slice(0, 4)
                                    .map((credit, index) => (
                                        <div
                                            className="filmography-card"

                                            key={`${credit.id}-${index}`}

                                        >
                                            <div className="filmography-poster">
                                                {credit.poster_path ? (
                                                    <>
                                                        <img
                                                            src={getImageURL(
                                                                credit.poster_path,
                                                                "xl"
                                                            )}
                                                            alt={getCreditTitle(credit)}
                                                            loading="lazy"
                                                        />

                                                        <Link
                                                            to={
                                                                filmographyTab === "movies"
                                                                    ? `/movie/${credit.id}`
                                                                    : `/tv/${credit.id}`
                                                            }
                                                            className="filmography-details-btn"
                                                        >
                                                            Details
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <div className="poster-placeholder">
                                                        <input
                                                            type="image"
                                                            placeholder="no image"
                                                        />

                                                        <Link
                                                            to={
                                                                filmographyTab === "movies"
                                                                    ? `/movie/${credit.id}`
                                                                    : `/tv/${credit.id}`
                                                            }
                                                            className="filmography-details-btn"
                                                        >
                                                            Details
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="filmography-info">
                                                <h3>
                                                    {getCreditTitle(
                                                        credit
                                                    )}
                                                </h3>

                                                <p className="filmography-role">
                                                    {credit.character
                                                        ? `as ${credit.character}`
                                                        : "Role unavailable"}
                                                </p>

                                                {(credit.release_date ||
                                                    credit.first_air_date) && (
                                                        <small>
                                                            {new Date(
                                                                credit.release_date ||
                                                                credit.first_air_date!
                                                            ).getFullYear()}
                                                        </small>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="filmography-empty">
                                <p>
                                    No{" "}
                                    {filmographyTab ===
                                        "movies"
                                        ? "movie"
                                        : "TV show"}{" "}
                                    credits available.
                                </p>
                            </div>

                        )}
                        <div className="filmography-social-layout">
                            {socials && (
                                <div className="person-social-card">
                                    <div className="social-card-header">
                                        <h3>Social Media</h3>
                                        <Globe size={18} />
                                    </div>

                                    <div className="social-links">

                                        {socials.instagram_id && (
                                            <a
                                                href={`https://instagram.com/${socials.instagram_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-link"
                                            >
                                                <LinkIcon size={17} />

                                                <span>Instagram</span>

                                                <ExternalLink size={14} />
                                            </a>
                                        )}

                                        {socials.facebook_id && (
                                            <a
                                                href={`https://facebook.com/${socials.facebook_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-link"
                                            >
                                                <LinkIcon size={17} />

                                                <span>Facebook</span>

                                                <ExternalLink size={14} />
                                            </a>
                                        )}

                                        {socials.twitter_id && (
                                            <a
                                                href={`https://twitter.com/${socials.twitter_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-link"
                                            >
                                                <LinkIcon size={17} />

                                                <span>Twitter</span>

                                                <ExternalLink size={14} />
                                            </a>
                                        )}

                                        {socials.tiktok_id && (
                                            <a
                                                href={`https://tiktok.com/@${socials.tiktok_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-link"
                                            >
                                                <LinkIcon size={17} />

                                                <span>TikTok</span>

                                                <ExternalLink size={14} />
                                            </a>
                                        )}

                                        {socials.youtube_id && (
                                            <a
                                                href={`https://youtube.com/${socials.youtube_id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-link"
                                            >
                                                <LinkIcon size={17} />

                                                <span>YouTube</span>

                                                <ExternalLink size={14} />
                                            </a>

                                        )}

                                    </div>
                                </div>

                            )}
                        </div>
                    </section>


                    <section className="gallery-preview">
                        <div className="gallery-preview-header">
                            <div>
                                <h2>Gallery</h2>
                                <p>
                                    {gallery.length} photos
                                </p>
                            </div>

                            {gallery.length > 4 && (
                                <button
                                    type="button"
                                    className="see-all-btn"
                                    onClick={() =>
                                        handleTabChange(
                                            "gallery"
                                        )
                                    }
                                >
                                    See All
                                </button>
                            )}
                        </div>

                        {gallery.length > 0 ? (
                            <div className="gallery-preview-grid">
                                {gallery
                                    .slice(0, 4)
                                    .map((image, index) => (
                                        <div
                                            className="gallery-preview-item"
                                            key={`${image.file_path}-${index}`}
                                        >
                                            <img
                                                src={getImageURL(
                                                    image.file_path,
                                                    "xl"
                                                )}
                                                alt={`${person.name} gallery ${index + 1
                                                    }`}
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="gallery-empty">
                                <p>
                                    No gallery images
                                    available.
                                </p>
                            </div>
                        )}
                    </section>

                    {Array.isArray(person.also_known_as) &&
                        person.also_known_as.length > 0 && (
                            <section className="person-aliases">
                                <h2>Also Known As</h2>

                                <div className="alias-list">
                                    {(person.also_known_as as string[])
                                        .slice(0, 10)
                                        .map((name: string) => (
                                            <span
                                                key={name}
                                                className="alias"
                                            >
                                                {name}
                                            </span>
                                        ))}
                                </div>
                            </section>
                        )}
                </>
            )}

            {activeTab === "filmography" && (
                <section className="person-filmography">
                    <div className="filmography-header">
                        <div className="filmography-title">
                            <h2>Filmography</h2>

                            <div className="filmography-tabs">
                                <button
                                    type="button"
                                    className={
                                        filmographyTab ===
                                            "movies"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setFilmographyTab(
                                            "movies"
                                        )
                                    }
                                >
                                    Movies
                                </button>

                                <button
                                    type="button"
                                    className={
                                        filmographyTab === "tv"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        setFilmographyTab("tv")
                                    }
                                >
                                    TV Shows
                                </button>
                            </div>

                        </div>
                    </div>

                    {activeCredits.length > 0 ? (
                        <div className="filmography-grid">
                            {activeCredits.map(
                                (credit, index) => (
                                    <article
                                        className="filmography-card"
                                        key={`${credit.id}-${index}`}
                                    >
                                        <div className="filmography-poster">
                                            {credit.poster_path ? (
                                                <>
                                                    <img
                                                        src={getImageURL(
                                                            credit.poster_path,
                                                            "xl"
                                                        )}
                                                        alt={getCreditTitle(credit)}
                                                        loading="lazy"
                                                    />

                                                    <Link
                                                        to={
                                                            filmographyTab === "movies"
                                                                ? `/movie/${credit.id}`
                                                                : `/tv/${credit.id}`
                                                        }
                                                        className="filmography-details-btn"
                                                    >
                                                        Details
                                                    </Link>
                                                </>
                                            ) : (
                                                <div className="poster-placeholder">
                                                    No Image

                                                    <Link
                                                        to={
                                                            filmographyTab === "movies"
                                                                ? `/movie/${credit.id}`
                                                                : `/tv/${credit.id}`
                                                        }
                                                        className="filmography-details-btn"
                                                    >
                                                        Details
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        <div className="filmography-info">
                                            <h3>
                                                {getCreditTitle(
                                                    credit
                                                )}
                                            </h3>

                                            <p className="filmography-role">
                                                {credit.character
                                                    ? `as ${credit.character}`
                                                    : "Role unavailable"}
                                            </p>

                                            {(credit.release_date ||
                                                credit.first_air_date) && (
                                                    <span className="filmography-year">
                                                        {new Date(
                                                            credit.release_date ||
                                                            credit.first_air_date!
                                                        ).getFullYear()}
                                                    </span>

                                                )}

                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="filmography-empty">
                            <p>
                                No{" "}
                                {filmographyTab ===
                                    "movies"
                                    ? "movie"
                                    : "TV show"}{" "}
                                credits available.
                            </p>
                        </div>
                    )}
                </section>
            )}

            {activeTab === "gallery" && (
                <section className="person-gallery">
                    <div className="gallery-header">
                        <div>
                            <h2>Gallery</h2>
                            <p>{gallery.length} photos</p>
                        </div>
                    </div>

                    {gallery.length > 0 ? (
                        <div className="gallery-grid">
                            {gallery.map(
                                (image, index) => (
                                    <div
                                        className="gallery-item"
                                        key={`${image.file_path}-${index}`}
                                    >
                                        <img
                                            src={getImageURL(
                                                image.file_path,
                                                "xl"
                                            )}
                                            alt={`${person.name} gallery ${index + 1
                                                }`}
                                            loading="lazy"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="gallery-empty">
                            <p>
                                No gallery images available.
                            </p>
                        </div>
                    )}
                </section>
            )}






        </main>
    );
}

export default PersonDetails;