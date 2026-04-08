import React from "react";

const MovieCard = React.memo(({ movie, onClick }) => {
  if (!movie) return null;

  return (
    <div className="card" onClick={() => onClick && onClick(movie)}>
      <img
        src={movie?.image?.medium || "https://via.placeholder.com/150"}
        alt={movie?.name}
        loading="lazy"
      />
      <p>{movie?.name}</p>
    </div>
  );
});

export default MovieCard; // ✅ THIS LINE IS REQUIRED

// export default MovieCard;
