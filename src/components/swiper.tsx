import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { getImageURL } from "@/lib/functions";
import type { MoviesListProps } from "@/types/movies.type";

import "swiper/css";

interface NowPlayingHeroProps {
  nowPlaying: MoviesListProps[];
}

const NowPlayingHero = ({ nowPlaying }: NowPlayingHeroProps) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="now-playing-swiper"
    >
      {nowPlaying.map((movie) => (
        <SwiperSlide key={movie.id}>
          <section
            className="hero"
            style={{
              backgroundImage: `url(${getImageURL(
                movie.backdrop_path,
                "xl"
              )})`,
            }}
          >
            <div className="backdrop" />

            <div className="hero-content">
              <h1>{movie.title}</h1>

              <p>{movie.overview}</p>

              <Link
                to={`/movie/${movie.id}`}
                className="hero-btn"
              >
                Details
              </Link>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NowPlayingHero;