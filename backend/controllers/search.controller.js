import { fetchMovies } from "../services/tmdb.services.js";
import { User } from "../models/user.model.js";


export const searchPerson = async (req,res) => {

    const { query } = req.params;
    try {
        const response = await fetchMovies(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length === 0){
            return res.status(400).json(null)
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date()
                }
            }
        })
        res.status(200).json({success:true, content:response.results})
    } catch (error) {
        console.log("error in search person handler",error.message);
        
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}
export const searchMovie = async (req,res) => {
        const { query } = req.params;
    try {
        const response = await fetchMovies(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length === 0){
            return res.status(400).json(null)
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt:new Date()
                }
            }
        })
        res.status(200).json({success:true, content:response.results})
    } catch (error) {
        console.log("error in search movie handler",error.message);
        
        res.status(500).json({success:false,message:"Internal server Error"})
    }
}
export const searchTv = async (req,res) => {
        const { query } = req.params;
    try {
        const response = await fetchMovies(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length === 0){
            return res.status(400).json(null)
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt:new Date()
                }
            }
        })
        res.status(200).json({success:true, content:response.results})
    } catch (error) {
        console.log("error in search tv handler",error.message);
        
        res.status(500).json({success:false,message:"Internal server Error"})
    }
    
}
export const getSearchHistory = async (req,res) => {
    try {
        res.status(200).json({success:true, content:req.user.searchHistory})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
    }
}
export const deleteSearchHistory = async (req,res) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
       await User.findByIdAndUpdate(req.user._id,{
        $pull:{
            searchHistory:{ id:id }
        }
       }) 
       res.status(200).json({success:true, message:"Item removed successfully"})
    } catch (error) {
        console.log("Error in delete handler",error.message);
        
       res.status(500).json({success:false, message:"Internal server error"}) 
    }
}