import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie.name || movie.original_name, { muti: true })
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v"));
          console.log(url);
        })
        .catch((err) => {
          console.table(movie);
          alert(
            `No trailers available for ${movie.title || movie.name} right now`
          );
        });

      // const movieUrl = await fetch(
      //   `http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=3e444194be48e2e01c06ace3f4f1f1a1`
      // );
      // const res = await movieUrl.json();
      // // console.log(res.results);
      // console.log(movie.id);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie, index) => (
          <img
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          />
        ))}
      </div>
      {trailerUrl && (
        <div className="trailer">
          <button className="close" onClick={handleClick}>
            &times;
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
