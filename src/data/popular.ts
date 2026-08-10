import {  getReq  } from "@/lib/request";
export const getPopular = async() =>{
 const data = await getReq('/movie/popular')
    return data as unknown as [];
};