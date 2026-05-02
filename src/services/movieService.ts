import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

interface MoviesResponse {
  results: Movie[];
}

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data.results;
};

export default fetchMovies;
