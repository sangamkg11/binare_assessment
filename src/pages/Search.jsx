import { useState, useMemo, useEffect } from "react";
import { searchMovies } from "../services/api";
import { debounce } from "lodash";

function Search() {
  const [results, setResults] = useState([]);

  const handleSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query) return;

        try {
          const res = await searchMovies(query);
          const shows = res.data.map((item) => item.show || item);
          setResults(shows);
        } catch (error) {
          console.error(error);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel(); // cleanup
    };
  }, [handleSearch]);

  return (
    <div className="search-container">
      <input
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="search-results">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="search-item"
            onClick={() => console.log(movie)}
          >
            <img
              src={movie?.image?.medium || "https://via.placeholder.com/80"}
              alt={movie.name}
            />
            <p>{movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search; // ✅ NOW VALID
