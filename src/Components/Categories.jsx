import { useState, useEffect } from "react";
import MoviesCard from "./MoviesCards";
const apiKey = import.meta.env.VITE_API_KEY;
const Discover = import.meta.env.VITE_DISCOVER;
import "../Css/Categories.css";

const categoriesName = [
  {
    id: 28,
    name: "Ação",
  },
  {
    id: 12,
    name: "Aventura",
  },
  {
    id: 16,
    name: "Animação",
  },
  {
    id: 35,
    name: "Comedia",
  },
  {
    id: 878,
    name: "Ficção",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 27,
    name: "Terror",
  },
  {
    id: 9648,
    name: "Misterio",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Familia",
  },
];

function Categories() {
  const [categoriesMoviesId, setCategoriesMoviesId] = useState(28);
  const [categoriesMovies, setCategoriesMovies] = useState([]);

  const getcategoriesMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCategoriesMovies(data.results);
  };

  useEffect(() => {
    const categoriesMoviesIdUrl = `
    ${Discover}?${apiKey}&with_genres=${categoriesMoviesId}`;

    getcategoriesMovies(categoriesMoviesIdUrl);
  }, [categoriesMoviesId]);

  return (
    <div className="filterByCategories-container">
      {" "}
      <div className="filterByCategories-title">
        <h1 className=" title">Filtrar por Categoria</h1>
      </div>
      <div className="filterByCategories-buttons " data-aos="fade-right">
        {categoriesName.map((category) => (
          <button
            className="filterByCategories-button"
            key={category.id}
            onClick={() => setCategoriesMoviesId(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="">
        <h1 className="title">
          Filmes de {""}
          <span>
            {
              categoriesName.find(
                (category) => category.id === categoriesMoviesId
              )?.name
            }
          </span>
        </h1>
      </div>
      <MoviesCard movie={categoriesMovies} />
    </div>
  );
}

export default Categories;
