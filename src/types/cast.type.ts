import type { Cast } from "./movies.type";

export interface ActorsCredits extends Cast {

    "backdrop_path": string
    "genre_ids": number[]
    "title": string
    "original_language": string
    "original_title": string
    "overview": string
    "popularity": number
    "poster_path": string
    "release_date": string
    "softcore": boolean
    "video": boolean
    "vote_average": number
    "vote_count": number
    "character": string
    "credit_id": string
    "order": number
    "first_air_date": string;
}


export interface PersonGallery {
    "aspect_ratio": number,
    "height": number,
    "iso_3166_1": number | null,
    "iso_639_1": number | null,
    "file_path": string,
    "vote_average": number,
    "vote_count": number,
    "width": number
}


export interface PersonSocails {
    "id": number,
    "freebase_mid": string,
    "freebase_id": string,
    "imdb_id": string,
    "tvrage_id": number,
    "wikidata_id": string,
    "facebook_id": string,
    "instagram_id": string,
    "tiktok_id": string
    "twitter_id": string,
    "youtube_id": string
}