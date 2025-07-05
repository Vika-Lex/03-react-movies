import style from './MovieModal.module.css'
import type {Movie} from "../../types/movie.ts";
import {createPortal} from "react-dom";
import {BASE_IMAGE_PATH, SIZE} from "../../constants.ts";
import {useEffect} from "react";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;

}

const MovieModal = ({movie, onClose}: MovieModalProps) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget !== event.target) {
            return
        }
        onClose()
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        function onPressEsc(event: KeyboardEvent) {
            if (event.code === "Escape") {
                onClose()
            }
        }

        window.addEventListener('keydown', onPressEsc)
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onPressEsc)
        }
    }, [onClose]);

    return createPortal(
        <div className={style.backdrop}
             onClick={handleBackdropClick}
             role="dialog"
             aria-modal="true"
        >
            <div className={style.modal}

            >
                <button className={style.closeButton}
                        onClick={onClose}
                        aria-label="Close modal"
                >
                    &times;
                </button>
                <img
                    src={`${BASE_IMAGE_PATH}${SIZE.original}/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={style.image}
                />
                <div className={style.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average / 10}
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};
export default MovieModal