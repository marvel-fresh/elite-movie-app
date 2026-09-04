import { getReq } from "@/lib/request";
import type { ActorsCredits, PersonGallery, PersonSocails } from "@/types/cast.type";
import type { MovieCredits, MovieDetailsProps, MoviesListProps, PersonDetailsProps, PersonSearchResponse, SimilarTVResponse,  TVCredits, TVDetailsProps,  TVListProps,  TVRecommendationsResponse, TVResponse,   } from "@/types/movies.type";
import { data } from "react-router";

export const getTopRated = () => {
    const data = getReq('/movie/top_rated')
    return data as unknown as MoviesListProps[];
};
export const getUpcoming = async () => {
  const data = await getReq("/movie/upcoming") as unknown as MoviesResponse;

  return data.results;
};

export const searchMovies = async (query: string) => {
  return getReq( `/search/movie?query=${encodeURIComponent(query)}`
  ) as unknown as MoviesResponse;
};
export const searchPerson = async (query: string) => {
  return getReq( `/search/person?query=${encodeURIComponent(query)}`
  ) as unknown as PersonSearchResponse;
};
export const searchTV = async (query: string) => {
  return getReq(`/search/tv?query=${encodeURIComponent(query)}`
  ) as unknown as MoviesResponse;
};
interface MoviesResponse {
    date:{minimum:string, maximun:string}
    page:number
    results:MoviesListProps[]
    total_pages:number
    total_results:number
}


export const getNowPlaying = async () => {
  const data = await getReq("/movie/now_playing") as unknown as MoviesResponse;

  return data.results;
};

export const getMovieCredits = async(movieId:string) => {
    const data = getReq(`/movie/${movieId}/credits`)
    return data as unknown as MovieCredits;
};

export const getSimilarMovies = async(movieId:string) => {
    const data = getReq(`/movie/${movieId}/similar`) as unknown as MoviesResponse
    return data.results as unknown as MoviesListProps[];
};
export const getRecommendation = async (movieId: string) => {
  const data = await getReq(`/movie/${movieId}/recommendations`) as unknown as MoviesResponse;

  return data.results;
};
export const getPopular = async () => {
  const data = await getReq("/movie/popular") as unknown as MoviesResponse;

  return data.results;
};
export const getTrendingMovies = async () => {
  const data = await getReq("/trending/movie/week") as unknown as MoviesResponse;

  return data.results;
};
export const getTrendingTV = async () => {
  const data = await getReq("/trending/tv/week") as unknown as MoviesResponse
  return data.results;
};


export const getPopularTV = async () => {
  const data = await getReq("/tv/popular") as unknown as TVResponse;

  return data.results;
};

export const getTopRatedTV = async () => {
  const data = await getReq( "/tv/top_rated" ) as unknown as TVResponse;

  return data.results;
};
export const getMovieById = async(movieId:string)=>{
 const data = await getReq(`/movie/${movieId}`)
    return data as unknown as MovieDetailsProps;
}

export const getPersonById = async (person_id: string) => {
  return await getReq(`/person/${person_id}`) as unknown as PersonDetailsProps;
};
    
export const getPersonMovieCredits = async (person_id: string) => {
  return await getReq(`/person/${person_id}/movie_credits`) as unknown as {cast:ActorsCredits[], crew:ActorsCredits[]};
};

export const getPersonTvCredits = async (person_id: string) => {
  return await getReq(`/person/${person_id}/tv_credits`) as unknown as {cast:ActorsCredits[], crew:ActorsCredits[]};
};

export const getPersonGallery = async (person_id: string) => {
  return await getReq(`/person/${person_id}/images`) as unknown as {profiles:PersonGallery[]};
}

export const getActorSocial = async(person_id:string) =>{
  return await getReq(`/person/${person_id}/external_ids`) as unknown as PersonSocails;

}
export const discoverMovies = async (
  params: Record<string, string> = {}
) => {
  const query = new URLSearchParams(params).toString();

  console.log("MOVIE DISCOVER URL:", `/discover/movie?${query}`);

  const data = await getReq(
    `/discover/movie?${query}`
  ) as unknown as MoviesResponse;

  console.log("MOVIE DISCOVER DATA:", data);

  return data.results;
};

export const discoverTV = async (
  params: Record<string, string> = {}
) => {
  const query = new URLSearchParams(params).toString();

  console.log("TV DISCOVER URL:", `/discover/tv?${query}`);

  const data = await getReq(
    `/discover/tv?${query}`
  ) as unknown as TVResponse;

  console.log("TV DISCOVER DATA:", data);

  return data.results;
};

export const getTVById = async (
  id: string
): Promise<TVDetailsProps> => {
  return getReq<TVDetailsProps>(`/tv/${id}`);
};

export const getTVCredits = async (
  id: string
): Promise<TVCredits> => {
  return getReq<TVCredits>(
    `/tv/${id}/credits`
  );
};

export const getSimilarTV = async (
  id: string
): Promise<TVListProps[]> => {
  const data = await getReq<SimilarTVResponse>(
    `/tv/${id}/similar`
  );

  return data.results;
};

export const getTVRecommendations = async (
  id: string
): Promise<TVListProps[]> => {
  const data =
    await getReq<TVRecommendationsResponse>(
      `/tv/${id}/recommendations`
    );

  return data.results;
};