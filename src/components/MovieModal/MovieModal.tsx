import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../MovieModal/MovieModal.module.css';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const FALLBACK_IMAGE = 'https://via.placeholder.com/1280x720';

const getBackdropUrl = (path: string | null) => {
  return path ? `${IMAGE_BASE_URL}${path}` : FALLBACK_IMAGE;
};

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  // --------------Закриття ESC----------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // ----------- Заборона скролу---------------
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // ---------Закриття по кліку на backdrop-----------
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const rating =
    movie.vote_average !== undefined
      ? `${movie.vote_average.toFixed(1)}/10`
      : 'N/A';

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className={css.image}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {rating}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
