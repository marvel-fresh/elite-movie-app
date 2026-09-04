
import { getImageURL } from "@/lib/functions";
import type { MoviesListProps } from "@/types/movies.type";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface SectionProps {
    title: string;
    hasViewMore?: boolean;
    viewMoreLink?: string;
    movies: MoviesListProps[];
    mediaType?: "movie" | "tv";
}

function Sections({
    title,
    hasViewMore = true,
    viewMoreLink,
    movies,
    mediaType = "movie",
}: SectionProps) {

    const sortedMovies: MoviesListProps[] = [...movies].sort(
        (a, b) => {
            const dateA =
                mediaType === "tv"
                    ? a.first_air_date
                    : a.release_date;

            const dateB =
                mediaType === "tv"
                    ? b.first_air_date
                    : b.release_date;

            return (
                new Date(dateB || "").getTime() -
                new Date(dateA || "").getTime()
            );
        }
    );

    return (
        <section className="movieSection">

            <div className="flex items-center justify-between">

                <h3 className="others">
                    {title}
                </h3>

                {hasViewMore && viewMoreLink && (
                    <Link
                        to={viewMoreLink}
                        className="viewMore"
                    >
                        View more
                        <ChevronRight size={16} />
                    </Link>
                )}

            </div>

            <div className="movie-grid">

                {sortedMovies.map((item) => {

                    const name =
                        mediaType === "tv"
                            ? item.name
                            : item.title;

                    const date =
                        mediaType === "tv"
                            ? item.first_air_date
                            : item.release_date;

                    const detailsLink =
                        mediaType === "tv"
                            ? `/tvshows/${item.id}`
                            : `/movie/${item.id}`;

                    return (
                        <div
                            className="movie-card"
                            key={item.id}
                        >

                            <img
                                src={getImageURL(
                                    item.poster_path ?? "",
                                    "md"
                                )}
                                alt={name ?? "Untitled"}
                            />

                            <div className="movie-info">

                                <h3>
                                    {name ?? "Untitled"}
                                </h3>

                                <p>
                                    {date || "N/A"}
                                </p>

                                <Link
                                    to={detailsLink}
                                    className="item-btn"
                                >
                                    Details
                                </Link>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default Sections;
