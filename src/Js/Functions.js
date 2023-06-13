import dayjs from "dayjs";

export const addToWatchlist = (movie) => {
  const savedWatchlist = localStorage.getItem("watchlist");
  const currentDate = dayjs().format("DD-MM-YYYY");
  if (savedWatchlist) {
    const watchlist = JSON.parse(savedWatchlist);
    const movieInWatchlist = watchlist.find((item) => item.id === movie.id);

    if (!movieInWatchlist) {
      movie.dateAdded = currentDate;
      movie.watched = false;
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert("Filme adicionado à watchlist!");
    } else {
      alert("Este filme já está na watchlist!");
    }
  } else {
    movie.dateAdded = currentDate;
    const watchlist = [movie];
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Filme adicionado à watchlist!");
  }
};
