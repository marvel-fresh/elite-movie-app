import { getImageURL } from "@/lib/functions";
import type { MoviesListProps } from "@/types/movies.type";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from "swiper/modules";
import { Link } from "react-router";


const NowPlayingHero = ({nowPlaying}:{nowPlaying: MoviesListProps[]}) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 3500,
        waitForTransition: true,
        pauseOnMouseEnter: true
      }}
      
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay]}
    >

      {nowPlaying.map((np, i) => {
        return (

          <SwiperSlide key={i}>
            <Slides nowPlaying={np} />
          </SwiperSlide>

        )
      })}

      ...
    </Swiper>
  );
};


export default NowPlayingHero

const Slides = ({ nowPlaying }: { nowPlaying: MoviesListProps }) => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${getImageURL(nowPlaying?.backdrop_path, "xl")})` }}>
    <div className="backdrop"/>
      <div className="hero-content">
        <h1>{nowPlaying?.title}</h1>
        <p>{nowPlaying?.overview}</p>
        {/* <h1>{nowPlaying[0].actor}</h1>
          <p>{nowPlaying[0].directors}</p> */}

        <Link to={`/now-playing/${nowPlaying?.id}`}
          type="button"
          className="hero-btn"
        >
          Details
        </Link>

      </div>

    </section>
  )
}