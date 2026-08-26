import { getImageURL } from '@/lib/functions';

import type { MoviesListProps } from '@/types/movies.type';
import { ChevronRight } from 'lucide-react';

import { Link } from 'react-router';


interface SectionProps {
    title: string
    hasViewMore: boolean
    viewMoreLink?: string
    movies: MoviesListProps[]
}

function Sections({ title, hasViewMore = true, viewMoreLink, movies }: SectionProps) {

     const sortedMovies: MoviesListProps[] = [...movies].sort(
        (a, b) =>
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
    );
    return (
        <section className="movieSection">

            <div className="flex items-center justify-between">
                <h3 className="others">{title}</h3>
                {hasViewMore && viewMoreLink && <Link to={viewMoreLink} className="viewMore">View more
                    <ChevronRight size={16} />
                </Link>}
            </div>
            <div className="movie-grid">

                {
                   sortedMovies?.map((item, i) => {

                        return (
                            <div className="movie-card" key={item.id}>
                                <img src={getImageURL(item.poster_path, "md")} alt={item.title} />

                                <div className="movie-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.release_date}</p>


                                    <Link to={`/now-playing/${item.id}`} className="item-btn">
                                        Details
                                    </Link>
                                </div>
                            </div>

                        )
                    })
                }


            </div>

        </section>


    )
}

export default Sections