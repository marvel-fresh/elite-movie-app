import { getNowPlaying, getPopular, getUpcoming } from "@/data/movies";
import { useEffect, useState } from "react";
import Footer from "@/layout/footer"
import type { MoviesListProps } from "@/types/movies.type";
// removed unused import: getImageURL
import NowPlayingHero from "@/components/swiper";
import Sections from "@/components/sections";
const DashboardPage = () => {

  const [nowPlaying, setNowPlaying] = useState<MoviesListProps[]>([])
  const [popular, setPopular] = useState<MoviesListProps[]>([])
const [upcoming, setUpcoming] = useState<MoviesListProps[]>([])
  void upcoming;

  useEffect(()=>{
    const getData =async ()=>{
      const [nowPlaying, popular, upcoming] = await Promise.all([getNowPlaying(), getPopular(), getUpcoming()])
      setNowPlaying(nowPlaying)
      setPopular(popular)
      setUpcoming(upcoming)
    }

    getData()
  },[])


  return (

    <>


<NowPlayingHero nowPlaying={nowPlaying}/>

      <Sections title="Trending" movies={popular} hasViewMore viewMoreLink="/trending" />
{/* <Sections  title="Upcoming Movies"  movies={upcoming} hasViewMore viewMoreLink="/upcoming" 
/> */}
      {/* <Sections title="latest" movies={movies} hasViewMore viewMoreLink="/latest" />

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
