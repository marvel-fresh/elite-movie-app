import type { Movie } from '@/types/latest';
import React from 'react'
import { Link } from 'react-router';


interface SectionProps {
    title: string
    hasViewMore: boolean
    viewMoreLink?:string
    movies: Movie[]
}

function Sections({ title, hasViewMore = true, viewMoreLink, movies }: SectionProps) {
    return (
        <section className="movieSection">

            <div className="flex items-center justify-between">
                <h3 className="others">{title}</h3>
                {hasViewMore && viewMoreLink && <Link to={viewMoreLink} className="viewMore">View more</Link>}
            </div>
            <div className="movie-grid">

                {
                    movies.map((item, i) => {

                        return (
                            <div className="movie-card" key={i}>
                                <img src={`/movies/${item.banner}`} alt={item.title} />

                                <div className="movie-info">
                                    <h3>{item.title}</h3>
                                    <p>Season 1-25</p>

                                    <button>Details</button>
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