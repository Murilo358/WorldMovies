import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Star from "../assets/star.svg";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import ImageNotFound from "../assets/ImageNotFound.png";

import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const imagesURL = import.meta.env.VITE_IMG;

const MoviesCards = ({ movie }) => {
  const [loop, setLoop] = useState(false);

  return (
    <Swiper
      className="cards-swiper"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      spaceBetween={20}
      navigation
      loop={loop}
      onSlideChange={() => {
        setLoop(true);
      }}
      breakpoints={{
        0: {
          navigation: false,
          slidesPerView: 3,
          spaceBetween: 10,
          slidesPerGroup: 3,
        },
        580: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 2,
        },
        775: {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },
        995: {
          slidesPerView: 4,
          spaceBetween: 20,
          slidesPerGroup: 4,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 20,
          slidesPerGroup: 5,
        },
      }}
    >
      <div data-aos="fade-up" className="movies-container">
        {movie.length === 0 && <FaSpinner className="spinner" />}
        {movie.length > 0 &&
          movie.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Link className="link" to={`/Movie/${movie.id}`}>
                  <article className="movies__card">
                    <div className="movies__card-image">
                      <img
                        src={`${imagesURL}${movie.poster_path}`}
                        onError={(e) => {
                          e.target.src = ImageNotFound;
                        }}
                      />
                    </div>
                    <div className="movies__card-description">
                      <h4 className="movies__card-title">{movie.title}</h4>
                      <div className="movies__card-details">
                        <div className="movies__card-rating">
                          <img src={Star} alt="" />
                          <p>{movie.vote_average.toString().slice(0, 3)}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            );
          })}
      </div>
    </Swiper>
  );
};

export default MoviesCards;
