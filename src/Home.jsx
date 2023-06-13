import Header from "./Components/Navbar";
import PopularMovies from "./Components/PopularMovies";
import SearchMovies from "./Components/SearchMovies";
import MoviesCard from "./Components/MoviesCards";
import Categories from "./Components/Categories";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import AOS from "aos";
import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Home.css";
import "./Css/AboutMoviesCard.css";
import "./Css/Cards.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

AOS.init({
  duration: 1000,
  offset: 100,
});

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const getPopularMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setPopularMovies(data.results);
  };
  const getNowPlayingMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setPlayingMovies(data.results);
  };
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopRatedMovies(data.results);
  };

  //Usa o useffect em alguns estagios da aplicação segundo os arrays de dependencia
  //que executada toda vez que uma dependencia é modificada
  //Deixando vazio faz com execute a função toda vez que for carregada

  useEffect(() => {
    const popularMoviesUrl = `${moviesURL}popular?${apiKey}&language=pt-BR`;
    const topRatedMoviesUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`;
    const nowPlayingMoviesURL = `${moviesURL}now_playing?${apiKey}&language=pt-BR`;

    getPopularMovies(popularMoviesUrl);
    getTopRatedMovies(topRatedMoviesUrl);
    getNowPlayingMovies(nowPlayingMoviesURL);
  }, []);

  return (
    <>
      {" "}
      <Header className="container-fluid" />
      <div className="home">
        <div className="content">
          <div className="first-content">
            <div className="container">
              <SearchMovies />
              <PopularMovies popularMovies={popularMovies} />
            </div>
          </div>
          <div className="wave"></div>
          <div className="second-content">
            <div className="container">
              <Categories />
              <h1 id="popular" className="title">
                Filmes populares
              </h1>

              <MoviesCard movie={popularMovies} />
              <h1 id="nowPlaying" className="title">
                Filmes em cartaz
              </h1>
              <MoviesCard movie={nowPlayingMovies} />
              <h1 id="topRated" className="title">
                Filmes mais bem avaliados
              </h1>
              <MoviesCard movie={topRatedMovies} />
              <AboutUs />
            </div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}

export default Home;
