import axios from "axios";
import { ENV_VAR } from "../db/ENV_VARS.js";

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';


export const fetchMovies = async(url)=>{
    const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ENV_VAR.TMDB_API_KEY}`

  }
};
const response = await axios.get(url,options);
if(response.status !== 200){
    throw new Error("Failed to fetch data from TMDB"+ response.statusText)
}
return response.data;

}