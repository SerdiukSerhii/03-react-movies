import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const FALLBACK_IMAGE = 'https://via.placeholder.com/500';

const getImageUrl = (posterPath: string | null) => {
  return posterPath ? `${IMAGE_BASE_URL}${posterPath}` : FALLBACK_IMAGE;
};

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div
            className={css.card}
            onClick={() => onSelect(movie)}
          >
            <img
              className={css.image}
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
            />

            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
