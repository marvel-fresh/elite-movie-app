import { getReq } from "@/lib/request";
import type { ActorsCredits, PersonGallery, PersonSocails } from "@/types/cast.type";
import type {  MovieCredits, MovieDetailsProps, MoviesListProps, PersonDetailsProps,   } from "@/types/movies.type";

export const getTopRated = () => {
    const data = getReq('/movie/top_rated')
    return data as unknown as MoviesListProps[];
};
export const getUpcoming = () => {
    const data = getReq('/movie/upcoming')
    return data as unknown as MoviesListProps[];
};


interface MoviesResponse {
    date:{minimum:string, maximun:string}
    page:number
    results:MoviesListProps[]
    total_pages:number
    total_results:number
}


export const getNowPlaying = async () => {
    const data =await  getReq('/movie/now_playing') as unknown as  MoviesResponse
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
export const getPopular = async() =>{
 const data = await getReq('/movie/popular') as unknown as MoviesResponse
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
