import {  getReq  } from "@/lib/request";
export const getPopular = async() =>{
 const data = await getReq('/3/movie/popular')
    return data as unknown as [];
};