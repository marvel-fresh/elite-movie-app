import {  getReq  } from "@/lib/request";
export const getTopRated = async() =>{
 const data = await getReq('/3/movie/top_rated')
    return data as unknown as  [];
};