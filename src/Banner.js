import axios from "./axios";
import React, { useState, useEffect } from "react";
import requests from "./requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[
          Math.floor(Math.random()*(request.data.results.length - 1))
        ]);
        return request;
    //   math.round(math.random()*(request.data.results.length - 1))
    }
    console.log(movie)
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

  return (
    <>
      <header className="banner" style={{backgroundImage: 'url('+`${base_url}${movie.poster_path}`+')',
        backgroundPosition: "center center", backgroundSize: "cover", width: 100+"%"}}>

        <div className="banner-bg" >

          <h1 className="title">
          {movie?.name || movie?.title || movie?.original_name}
          </h1>

          <div className="buttons">
            <button className="button">Play</button>
            <button className="button">My List</button>
          </div>

          <h1 className="description">
          {truncate(movie?.overview, 150)}
          </h1>

        </div>

        <div className="fadebottom"></div>

      </header>
    </>
  );
};

export default Banner;
