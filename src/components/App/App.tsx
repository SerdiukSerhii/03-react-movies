import css from './App.module.css';

import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import fetchMovies from '../../services/movieService';
import Loader from '../Loader/Loader';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setMovies([]);
      setLoading(true);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={movie => console.log(movie)} />
      )}
    </div>
  );
}

export default App;
