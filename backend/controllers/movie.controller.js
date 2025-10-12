import { fetchMovies } from './../services/tmdb.services.js';
export const getTrendingMovie = async(req,res)=>{
        try {
            const data = await fetchMovies('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
            const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];

            res.json({success:true, content: randomMovie})
        } catch (error) {
            console.log(error.message);
            res.status(500).json({success:false, message:"Internal server error"})
        }
}
export const getMovieTrailers = async (req,res) => {
    const { id } = req.params;
    try {
        const data = await fetchMovies(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success:true, trailers: data.results})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(400).send(null)
        }
        res.status(500).json({success:true, message:"Internal server error"})
    }
}
export const getMovieDetails = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await fetchMovies(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({success:true, content:data})
    } catch (error) {
        if(error.response.includes(400)){
            return res.status(400).send(null)
        }
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}
export const getSimilarMovies =  async (req,res) => {
    const {id } = req.params;
    try {
        const data =  await fetchMovies(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success:true, similar:data.results})
    } catch (error) {
        console.log("TMDB similar movies response:", data);

       res.status(500).json({success:false, message:"Internal server Error"}) 
    }
}
export const getCategories = async (req,res) => {
    const { category } = req.params;
    try {
        const data = await fetchMovies(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(200).json({success:true, content:data.results})
    } catch (error) {
       res.status(500).json({success:false,message:"Internal Server Error"}) 
    }
}