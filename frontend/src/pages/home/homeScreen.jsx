import { Info, Play } from "lucide-react";
import {Navbar} from "../../components/Navbar.jsx";
import { Link } from "react-router-dom";
import useGetTrendingContent from "../../hooks/getTrendingContent.jsx";
import { ORIGINAL_BASE_URL, MOVIE_CATEGORIES, TV_CATEGORIES } from "../../utils/constants.js";
import { useContentStore } from "../../store/content.js";
import MovieSlider from "../../components/MovieSlider.jsx";
import { useState } from "react";

export const HomeScreen = () => {
    const { trendingContent } = useGetTrendingContent();
    const [imgLoading, setImgLoading] = useState(true);
    const { contentType } = useContentStore();
    console.log(trendingContent);
  if (!trendingContent)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);
    
  return (
    <>
    <div className="relative h-screen text-white">
      <Navbar />

      { imgLoading && (<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />)}
      <img
        src={ORIGINAL_BASE_URL + trendingContent?.backdrop_path}
        alt="hero img"
        className="absolute inset-0 h-full w-full object-cover -z-50"
        onLoad={()=>{setImgLoading(false)}}
      />

    
      <div
        className="absolute inset-0 bg-black/50 -z-40"
        aria-hidden="true"
      />

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            {
                trendingContent?.title || trendingContent?.name
            }
          </h1>
          <p className="text-lg mb-2">{trendingContent?.release_date?.split("-")[0] ||
								trendingContent?.first_air_date.split("-")[0]}{" "}
							| {trendingContent?.adult ? "18+" : "PG-13"} </p>
          <p className="text-lg">
            {trendingContent?.overview.length > 200
								? trendingContent?.overview.slice(0, 200) + "..."
								: trendingContent?.overview}
          </p>
        </div>

        <div className="flex mt-6">
          <Link
            to={`/watch/${trendingContent?.id}`}
            className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-5 flex items-center"
          >
            <Play className="size-7 inline-block mr-2 fill-black" />
            WATCH
          </Link>

          <Link
           to={`/watch/${trendingContent?.id}`}
            className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Info className="size-7 inline-block mr-2" />
            MORE INFO
          </Link>
        </div>
      </div>
    </div>
    <div className='flex flex-col gap-10 bg-black py-10'>
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
			</div>
    </>
  );
};
