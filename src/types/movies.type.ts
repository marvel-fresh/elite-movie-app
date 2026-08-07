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
      "softcore": boolean,
      "video": boolean,
      "vote_average": number,
      "vote_count": number
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
