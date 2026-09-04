import { useEffect, useState } from "react";

import {
  getNowPlaying,
  getPopular,
  getUpcoming,
  getTrendingMovies,
} from "@/data/movies";

import type { MoviesListProps } from "@/types/movies.type";

import NowPlayingHero from "@/components/swiper";
import MediaSwiper from "@/components/media-swiper";

const DashboardPage = () => {
  const [nowPlaying, setNowPlaying] = useState<MoviesListProps[]>([]);
  const [trending, setTrending] = useState<MoviesListProps[]>([]);
  const [popular, setPopular] = useState<MoviesListProps[]>([]);
  const [upcoming, setUpcoming] = useState<MoviesListProps[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const nowPlayingData = await getNowPlaying();
        setNowPlaying(nowPlayingData);

        const trendingData = await getTrendingMovies();
        setTrending(trendingData);

        const popularData = await getPopular();
        setPopular(popularData);

        const upcomingData = await getUpcoming();
        setUpcoming(upcomingData);
      } catch (error) {
        console.error("Dashboard API error:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="dashboard-page">
      <NowPlayingHero nowPlaying={nowPlaying} />

      <MediaSwiper
        title="Trending"
        movies={trending}
        type="movie"
        viewMoreLink="/trending"
      />

      <MediaSwiper
        title="Popular Movies"
        movies={popular}
        type="movie"
        viewMoreLink="/popular"
      />

      <MediaSwiper
        title="Upcoming Movies"
        movies={upcoming}
        type="movie"
        viewMoreLink="/upcoming"
      />
    </main>
  );
};

export default DashboardPage;