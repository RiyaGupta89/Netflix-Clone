import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";

  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl("")
    } else {
      movieTrailer(movie?.name || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        urlParams.get('v')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row-posters">
          {movies.map((movie) => {
            return (
              <img className={`row-poster ${isLargeRow && "row-poster-large"}`} onClick={() => {
                handleClick(movie)
              }} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} key={movie.id} />
            );
          })}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
      </div>
    </>
  );
};

export default Row;
