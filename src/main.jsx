import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import Movie from "./Pages/Movie";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Pages/Search.jsx";
import WatchList from "./Pages/WatchList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Movie/:id",
    element: <Movie />,
  },
  {
    path: "/Search",
    element: <Search />,
  },
  {
    path: "/Watchlist",
    element: <WatchList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
