import { useEffect, useState } from "react";
import Star from "../assets/Star.svg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import MoviesCard from "../Components/MoviesCards";
import "../Css/watchlist.css";
import "../Css/cards.css";

const imagesURL = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function WatchList() {
  const [movies, setMovies] = useState([]);
  const [moviesRecomendation, setMoviesRecomendation] = useState([]);

  const getMoviesRecomendations = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMoviesRecomendation(data.results);
  };

  const getMovieRecommendationsURL = (movieId) => {
    return `${moviesURL}${movieId}/recommendations?${apiKey}&language=pt-BR`;
  };

  useEffect(() => {
    const savedMovies = localStorage.getItem("watchlist");
    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);
      setMovies(parsedMovies);

      parsedMovies.forEach((movie) => {
        const movieRecommendationsURL = getMovieRecommendationsURL(movie.id);
        getMoviesRecomendations(movieRecommendationsURL);
      });
    }
  }, []);

  const removeMovie = (id) => {
    const newMovies = movies.filter((movie) => movie.id !== id);
    localStorage.setItem("watchlist", JSON.stringify(newMovies));
    setMovies(newMovies);
  };

  const toggleWatched = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        const updatedMovie = {
          ...movie,
          watched: !movie.watched,
        };

        localStorage.setItem(
          "watchlist",
          JSON.stringify(movies.map((m) => (m.id === id ? updatedMovie : m)))
        );

        return updatedMovie;
      }
      return movie;
    });

    setMovies(updatedMovies);
  };
  return (
    <>
      <Navbar />
      <div className="watchListContainer">
        <h1 className="title">Sua watchlist</h1>
        {movies.length === 0 && (
          <p className="emptyWatchlist">
            Sua Watchlist está vazia <br /> Adicione um filme ao pesquisa-lo ou
            ao acessar sua página{" "}
          </p>
        )}
        <div className="cards container">
          {movies.length > 0 &&
            movies.map((movie) => {
              return (
                <article
                  id={`movie-card-${movie.id}`}
                  key={movie.id}
                  className={`about-movies__card ${
                    movie.watched ? "watched" : ""
                  }`}
                >
                  <div className="about-movies__card-image">
                    <img src={`${imagesURL}${movie.poster_path}`} alt="" />
                  </div>
                  <div className="about-movies__card-description">
                    <h4 className="about-movies__card-title">{movie.title}</h4>
                    <div className="about-movies__card-details">
                      <div className="about-movies__card-rating">
                        <img src={Star} alt="" />
                        <p>{movie.vote_average.toString().slice(0, 3)}</p>
                      </div>
                    </div>
                    <p className="addedIn">
                      Adicionado em <span>{movie.dateAdded}</span>
                    </p>
                    <div className="about__card-buttons">
                      <button
                        onClick={() => toggleWatched(movie.id)}
                        className="about__card-button"
                      >
                        {movie.watched ? "Não assistido" : "Assistido"}
                      </button>

                      <button
                        onClick={() => removeMovie(movie.id)}
                        className="about__card-button remove"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
        <div className="container">
          <h1 className="title">Recomendado para você</h1>
          {moviesRecomendation.length === 0 && (
            <p className="emptyWatchlist">
              Primeiramente adicione um item a sua Watch List
            </p>
          )}
          <MoviesCard movie={moviesRecomendation} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WatchList;
