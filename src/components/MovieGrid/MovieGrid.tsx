import style from './MovieGrid.module.css'
import type {Movie} from "../../types/movie.ts";
import {BASE_IMAGE_PATH, SIZE} from "../../constants.ts";
interface MovieGridProps {
    onSelect: (movie:Movie) => void;
    movies: Movie[]
}


const MovieGrid = ({onSelect, movies}: MovieGridProps) => {
    return (
        <ul className={style.grid}>
            {movies.map(movie => (
                <li key={movie.id} onClick={()=> onSelect(movie)}>
                    <div className={style.card}>
                        <img
                            className={style.image}
                            src={`${BASE_IMAGE_PATH}${SIZE.w500}/${movie.poster_path}`}
                            alt="movie title"
                            loading="lazy"
                        />
                        <h2 className={style.title}>Movie title</h2>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default MovieGrid