import "../Css/SearchMovies.css";
import Search from "../assets/search.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchMovies() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-movies-form">
      <div className="search-movies-container">
        <input
          type="text"
          placeholder="Pesquise por um filme"
          onChange={(ev) => setSearch(ev.target.value)}
          value={search}
        />
        <button type="submit">
          <img src={Search} alt="" />
        </button>
      </div>
    </form>
  );
}

export default SearchMovies;
