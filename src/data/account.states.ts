import {  getReq  } from "@/lib/request";
export const getAccountState = async() =>{
 const data = await getReq('/3/movie/{movie_id}')
    return data as unknown as  [];
};