import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieModal from "../components/MovieModal";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //   const addToWatchlist = (movie) => {
  //     const list = JSON.parse(localStorage.getItem("watchlist")) || [];
  //     localStorage.setItem("watchlist", JSON.stringify([...list, movie]));
  //   };

  const addToWatchlist = (movie) => {
    const list = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = list.find((m) => m.id === movie.id);
    if (exists) return;

    localStorage.setItem("watchlist", JSON.stringify([...list, movie]));
  };
  const addToHistory = (movie) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem("history", JSON.stringify([...history, movie]));
  };

  const loadMore = () => setPage((prev) => prev + 1);

  const lastRef = useInfiniteScroll(loadMore);

  useEffect(() => {
    let isMounted = true;

    fetchMovies(page).then((res) => {
      if (isMounted) {
        setMovies((prev) => {
          const updated = [...prev, ...res.data];
          localStorage.setItem("movies", JSON.stringify(updated));
          return updated;
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    if (!navigator.onLine) {
      const cached = JSON.parse(localStorage.getItem("movies")) || [];
      setMovies(cached);
    }
  }, []);

  //   useEffect(() => {
  //     const handleReconnect = () => {
  //       setPage(1);
  //       setMovies([]);
  //     };

  //     window.addEventListener("online", handleReconnect);

  //     return () => {
  //       window.removeEventListener("online", handleReconnect);
  //     };
  //   }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <>
      <h2 style={{ color: "white" }}>Top Show</h2>

      <div className="grid">
        <MovieCard movie={movies[0]} />
        {movies.map((movie, index) => {
          if (index === movies.length - 1) {
            return (
              <div ref={lastRef} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onClick={(movie) => setSelectedMovie(movie)}
                />
              </div>
            );
          }
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </>
  );
}
