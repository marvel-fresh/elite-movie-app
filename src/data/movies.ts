import { getReq } from "@/lib/request";
import type { MovieDetailsProps, MoviesListProps } from "@/types/movies.type";

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


export const getMovieDetails = async() => {
    const data = getReq('/movie/{movie_id}')
    return data as unknown as MovieDetailsProps;
};


export const getPopular = async() =>{
 const data = await getReq('/movie/popular') as unknown as MoviesResponse
    return data.results;
};

