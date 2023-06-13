import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

import "swiper/css";

import "../Css/PopularMovies.css";

function PopularMovies({ popularMovies }) {
  const [popularMoviesVideos, setPopularMoviesVideos] = useState([]);

  const getPopularMoviesVideos = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const trailerMovie = data.results.find((movie) => movie.type === "Trailer");

    if (trailerMovie) {
      setPopularMoviesVideos((prevVideos) => [...prevVideos, trailerMovie]);
    }
  };

  useEffect(() => {
    if (popularMovies.length > 0) {
      popularMovies.forEach((movie) => {
        const moviesVideosURL = `${moviesURL}${movie.id}/videos?${apiKey}`;
        getPopularMoviesVideos(moviesVideosURL);
      });
    }
  }, [popularMovies]);

  const [loop, setLoop] = useState(false);

  return (
    <div className="Popular-movies">
      <h1 data-aos="fade-right" className="title">
        Trailers Populares
      </h1>
      <div data-aos="fade-up" className="Popular-movies-container">
        <Swiper
          className="popular-swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          centeredSlides={true}
          slidesPerView={1}
          navigation
          loop={loop}
          onSlideChange={() => {
            setLoop(true);
          }}
        >
          {popularMoviesVideos.length > 0 &&
            popularMoviesVideos.slice(0, 7).map((movie) => (
              <SwiperSlide key={movie.id}>
                <iframe
                  width="100%"
                  height="500px"
                  src={`https://www.youtube.com/embed/${movie.key}?&mute=1`}
                ></iframe>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PopularMovies;
