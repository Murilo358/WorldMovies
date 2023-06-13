import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Css/Movie.css";
import ImageNotFound from "../assets/ImageNotFound.png";
import BackDropNotFound from "../assets/BackDropNotFound.png";
import { useState, useEffect } from "react";
import { useParams, ScrollRestoration } from "react-router-dom";

import { addToWatchlist } from "../Js/Functions";
import Star from "../assets/star.svg";
import dayjs from "dayjs";

const imagesURL = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Movie() {
  const { id } = useParams();

  const [movie, setMovies] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data);
  };

  const releaseDate = dayjs(movie.release_date).format("DD/MM/YYYY");
  useEffect(() => {
    const getMovieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`;

    getMovie(getMovieURL);
  }, []);

  return (
    <>
      <Navbar />
      <div className="movie-content">
        <div className="movie container">
          {movie && (
            <>
              <div className="movie__intro">
                <img
                  src={`${imagesURL}${movie.backdrop_path}`}
                  onError={(e) => {
                    e.target.src = BackDropNotFound;
                  }}
                />
              </div>
              <div className="movie__details">
                <div className="movie__details-left">
                  <img
                    src={`${imagesURL}${movie.poster_path}`}
                    onError={(e) => {
                      e.target.src = ImageNotFound;
                    }}
                  />
                </div>
                <div className="movie__details-right">
                  <div className="movie__details-title">
                    <h1>{movie.title}</h1>
                  </div>
                  <div className="movie__details-rating">
                    <img src={Star} alt="" />
                    <p>5.0</p>
                  </div>
                  <div className="movie__details-releaseDate">
                    <p>
                      Data de lançamento <span>{releaseDate}</span>
                    </p>
                  </div>
                  <div className="movie__details-duration">
                    <p>
                      Tempo de duração <span>{movie.runtime} min</span>
                    </p>
                  </div>
                  <div className="movies__details-desc">
                    <h3>Descrição</h3>
                    <p>{movie.overview}</p>
                    <button
                      className="about__card-button"
                      onClick={() => addToWatchlist(movie)}
                    >
                      Adicionar a watchlist
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <ScrollRestoration />
      </div>

      <Footer />
    </>
  );
}

export default Movie;
