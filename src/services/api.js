import axios from "axios";

const API = axios.create({
  baseURL: "https://api.tvmaze.com",
});

// Fetch shows (pagination)
export const fetchMovies = (page = 1) => API.get(`/shows?page=${page}`);

// Search shows
export const searchMovies = (query) => API.get(`/search/shows?q=${query}`);
