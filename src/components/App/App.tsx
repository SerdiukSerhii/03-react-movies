import css from './App.module.css';

import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,

          style: {
            background: '#f8d7da',
            color: '#721c24',
          },
        }}
      />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      {!isLoading && !error && (
        <MovieGrid
          movies={movies}
          onSelect={movie => setSelectedMovie(movie)}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
