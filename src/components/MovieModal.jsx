import { motion } from "framer-motion";

export default function MovieModal({
  movie,
  onClose,
  addToWatchlist,
  addToHistory,
}) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={movie?.image?.medium || "https://via.placeholder.com/300"}
          alt={movie?.name}
        />

        <h2>{movie?.name}</h2>

        <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
        <button onClick={() => addToHistory(movie)}>Mark as Watched</button>

        <button onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
}
