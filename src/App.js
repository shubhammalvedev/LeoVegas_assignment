import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import ModalPlayer from "./components/ModalPlayer";
import GoToTop from "./components/GoToTop.";

const App = () => {
  const state = useSelector((state) => state);
  let { movies} = state;
  let { page, hasMore } = movies;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();

  const closeModal = () => setOpen(false);

  const getSearchResults = (query, page=1) => {
    const url = query ? `${ENDPOINT_SEARCH}&query=${query}` : ENDPOINT_DISCOVER;
    dispatch(fetchMovies({ url, page }));
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const lastMovieElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getSearchResults(searchQuery, page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [page,hasMore,searchQuery]
  );

  useEffect(() => {
    getSearchResults(searchQuery || "");
  }, [searchQuery]);


  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        {videoKey && (
          <ModalPlayer show={isOpen} onClose={closeModal}>
            <YouTubePlayer videoKey={videoKey} />
          </ModalPlayer>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                lastMovieElementRef={lastMovieElementRef}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
      <GoToTop />
    </div>
  );
};

export default App;
