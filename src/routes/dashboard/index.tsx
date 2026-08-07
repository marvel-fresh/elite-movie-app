import Sections from "@/components/sections";
import { getNowPlaying } from "@/data/movies";
import type { Movie } from "@/types/latest";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "@/layout/footer"
import type { MoviesListProps } from "@/types/movies.type";
import { getImageURL } from "@/lib/functions";
const DashboardPage = () => {

  const [nowPlaying, setNowPlaying] = useState<MoviesListProps[]>([])

  useEffect(()=>{
    const getData =async ()=>{
      const nowPlaying = await getNowPlaying()
      setNowPlaying(nowPlaying)
    }

    getData()


  },[])


  return (

    <>


      <section className="hero" style={{ backgroundImage: `url(${getImageURL(nowPlaying[1]?.backdrop_path, "xl")})` }}>
        <div className="hero-content">
          <h1>{nowPlaying[1]?.title}</h1>
          <p>{nowPlaying[1]?.overview}</p>
          {/* <h1>{nowPlaying[0].actor}</h1>
          <p>{nowPlaying[0].directors}</p> */}

          <button
            type="button"
            className="hero-btn"
          >
            Details
          </button>

        </div>

      </section>

      {/* <Sections title="Trending" movies={movies} hasViewMore viewMoreLink="/trending" />

      <Sections title="latest" movies={movies} hasViewMore viewMoreLink="/latest" />

      <Sections title="Popular" movies={movies} hasViewMore />

      <Sections title="Top Rated" movies={movies} hasViewMore />

      <Sections title="upcoming movies" movies={movies} hasViewMore />

      <Sections title="Now Playing" movies={movies} hasViewMore />

      <Sections title="Drama" movies={movies} hasViewMore />

      <Sections title="Actions" movies={movies} hasViewMore />

      <Sections title="Fantasy" movies={movies} hasViewMore />

      <Sections title="Horror" movies={movies} hasViewMore />

      <Sections title="Romance" movies={movies} hasViewMore /> */}
      <Footer/>
    </>

  );
};

export default DashboardPage;
