import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useSearchParams, Link, ScrollRestoration } from "react-router-dom";
import { addToWatchlist } from "../Js/Functions";
import Star from "../assets/star.svg";
import ImageNotFound from "../assets/ImageNotFound.png";
import { AiOutlinePlus } from "react-icons/ai";

const imagesURL = import.meta.env.VITE_IMG;
const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [movies, setMovies] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    const movieSearch = `${searchUrl}?${apiKey}&query=${query}&language=pt-BR`;

    getMovie(movieSearch);
  }, []);

  return (
    <>
      <Navbar />
      <div className="Searchresults">
        <h1 className="title">
          Resultados para: <span>{query}</span>{" "}
        </h1>

        <div className="cards container-fluid">
          <div className="bg__gradient"></div>
          {movies.length === 0 && console.log("COLOCAR SPINNER AQUI")}
          {movies.length > 0 &&
            movies.map((movie) => {
              return (
                <article key={movie.id} className="about-movies__card">
                  <div className="about-movies__card-image">
                    <img
                      src={`${imagesURL}${movie.poster_path}`}
                      onError={(e) => {
                        e.target.src = ImageNotFound;
                      }}
                    />
                  </div>
                  <div className="about-movies__card-description">
                    <h4 className="about-movies__card-title">{movie.title}</h4>
                    <div className="about-movies__card-details">
                      <div className="about-movies__card-rating">
                        <img src={Star} alt="" />
                        <p>{movie.vote_average.toString().slice(0, 3)}</p>
                      </div>
                    </div>
                    <div className="about__card-buttons">
                      <button
                        onClick={() => addToWatchlist(movie)}
                        className="about__card-button"
                      >
                        <AiOutlinePlus /> Watchlist
                      </button>
                      <Link className="link" to={`/Movie/${movie.id}`}>
                        <button className="about__card-button">
                          Ver detalhes
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
        <ScrollRestoration />
      </div>
      <Footer />
    </>
  );
}

export default Search;
