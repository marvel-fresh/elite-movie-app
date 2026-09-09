export interface Genre {
  id: number;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface PersonDetailsProps {
"biography": string,
  "birthday": string | null,
  "deathday": string | null,
  "gender": number,
  "homepage": string | null,
  "id": number,
  "imdb_id": string,
  "known_for_department": string,
  "name": string,
  "place_of_birth": string | null,
  "popularity": number,
  "profile_path": string | null
  "also_known_as": string 
}

export interface MoviesListProps{
      "adult": boolean,
      "backdrop_path": string,
      "genre_ids": number[],
      "id": number,
      "title": string,
      "original_language": string,
      "original_title": string,
      "overview": string,
      "popularity": number,
      "poster_path": string,
      "release_date": string,
      "video": boolean,
      "vote_average": number,
      "vote_count": number

      'name': string; 
      'original_name': string;
      'first_air_date': string;
      
    }
export interface Recommendation {
  adult: boolean;
  backdrop_path: string ;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string ;
  media_type: "movie";
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface PersonSearchResult {
  id: number;
  name: string;
  profile_path: string | null;
  adult: boolean;
  gender?: number;
  known_for_department?: string;
  popularity: number;
  known_for?: MoviesListProps[];
}

export interface PersonSearchResponse {
  page: number;
  results: PersonSearchResult[];
  total_pages: number;
  total_results: number;
}
export interface MovieDetailsProps
{
  "adult": boolean,
  "backdrop_path": string,
  "belongs_to_collection": Collection,
  "budget": number,
  "genres": Genre[],
  "homepage": string,
  "id": number,
  "imdb_id": string,
  "origin_country": string[],
  "original_language": string,
  "original_title": string,
  "overview": string,
  "credits": MovieCredits,
  "popularity": number,
  "poster_path": string,
  "production_companies": ProductionCompanies[],
  "production_countries": ProductionCountries[],
  "release_date": string,
  "revenue": number,
  "runtime": number,
  "spoken_languages": Language[],
  "status": string,
  "tagline": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
}

export interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}


export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface SimilarMovies {
  page: number;
  results: MoviesListProps[];
  total_pages: number;
  total_results: number;
 
   
    };

    export interface TVResponse {
  page: number;
  results: MoviesListProps[];
  total_pages: number;
  total_results: number;
}
   
  


export interface TVGenre {
  id: number;
  name: string;
}

export interface TVProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TVNetwork {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TVCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number | null;
  profile_path: string | null;
}

export interface TVSeason {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface TVEpisode {
  air_date: string | null;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string | null;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  crew: TVCrew[];
  guest_stars: TVCast[];
}
export interface TVDetailsProps {
  adult: boolean;

  backdrop_path: string | null;

  created_by: TVCreatedBy[];

  episode_run_time: number[];

  first_air_date: string;

  genres: TVGenre[];

  homepage: string;

  id: number;

  in_production: boolean;

  languages: string[];

  last_air_date: string | null;

  last_episode_to_air: TVEpisode | null;

  name: string;

  networks: TVNetwork[];

  number_of_episodes: number;

  number_of_seasons: number;

  origin_country: string[];

  original_language: string;

  original_name: string;

  overview: string;

  popularity: number;

  poster_path: string | null;

  production_companies: TVProductionCompany[];

  production_countries: TVProductionCountry[];

  seasons: TVSeason[];

  spoken_languages: TVSpokenLanguage[];

  status: string;

  tagline: string;

  type: string;

  vote_average: number;

  vote_count: number;

  next_episode_to_air: TVEpisode | null;
}
export interface TVProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface TVSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TVCast {
  adult: boolean;
  cast_id?: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface TVCrew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number | null;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface TVCredits {
  cast: TVCast[];
  crew: TVCrew[];
}
export interface TVListProps {
  adult: boolean;

  backdrop_path: string | null;

  genre_ids: number[];

  id: number;

  origin_country: string[];

  original_language: string;

  original_name: string;

  overview: string;

  popularity: number;

  poster_path: string | null;

  first_air_date: string;

  name: string;

  vote_average: number;

  vote_count: number;
}
export interface TVListResponse {
  page: number;

  results: TVListProps[];

  total_pages: number;

  total_results: number;
}
export interface SimilarTVResponse {
  page: number;

  results: TVListProps[];

  total_pages: number;

  total_results: number;
}

export interface TVReviewAuthorDetails {
  name: string;

  username: string;

  avatar_path: string | null;

  rating: number | null;
}

export interface TVReview {
  author: string;

  author_details: TVReviewAuthorDetails;

  content: string;

  created_at: string;

  id: string;

  updated_at: string;

  url: string;
}

export interface TVReviewsResponse {
  page: number;

  results: TVReview[];

  total_pages: number;

  total_results: number;
}

export interface TVVideo {
  iso_639_1: string;

  iso_3166_1: string;

  name: string;

  key: string;

  site: string;

  size: number;

  type: string;

  official: boolean;

  published_at: string;

  id: string;
}
export interface TVSeasonDetails {
  _id: string;

  air_date: string | null;

  episodes: TVEpisode[];

  name: string;

  overview: string;

  id: number;

  poster_path: string | null;

  season_number: number;

  vote_average: number;
}

export interface TVRecommendation extends TVListProps {}

export interface TVRecommendationsResponse {
  page: number;

  results: TVRecommendation[];

  total_pages: number;

  total_results: number;
}

export interface Trailer {
      "key": string,
      "site": string,
      "size": number,
      "type": string,
      "official": boolean,
      "published_at": string,
      "id": string,
      "name": string,
      "iso_639_1": string,
      "iso_3166_1": string
}

export interface TrailerResponse {
  id: number;
  results: Trailer[];
}

export interface WatchHistoryItem {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  mediaType: "movie" | "tv";
  watchedAt: number;
  watchCount: number;
}