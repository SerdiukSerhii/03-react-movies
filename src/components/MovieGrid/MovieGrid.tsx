import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';
import noImage from '../../assets/no-image.png';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const FALLBACK_IMAGE = noImage;

const getImageUrl = (posterPath: string | null) => {
  if (!posterPath) return FALLBACK_IMAGE;

  return `${IMAGE_BASE_URL}${posterPath}`;
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
