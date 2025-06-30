import SearchBar from "../SearchBar/SearchBar.tsx";
import {useEffect, useRef, useState} from "react";
import type {Movie} from "../../types/movie.ts";
import Loader from "../Loader/Loader.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import {fetchMovies} from "../../services/movieService.ts";
import {toast, Toaster} from "react-hot-toast";

const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [activeMovie, setActiveMovie] = useState<Movie | null>(null)
    const [query, setQuery] = useState<string>('')
    const isFirstRender = useRef(true);
    const handleSubmit = (query: string) => {
        setQuery(query);
    }

    const onSelect = (movie: Movie) => {
        setActiveMovie(movie)
    }

    const onClose = () => {
        setActiveMovie(null)
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        fetchMovies(query).then(res => {

            setLoading(true);
            setError(null);
            setMovies(res.results)

        }).catch(error => {
            setLoading(true);
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [query]);

    useEffect(() => {
        if (movies?.length === 0) {
            toast.error('No movies found for your request.')
        }
    }, [movies]);

    if (error) {
        return (
            <>
                <SearchBar onSubmit={handleSubmit}/>
                {loading ? (<Loader/>) : (<ErrorMessage error={error}/>)}
            </>)
    }

    return (
        <>
            <SearchBar onSubmit={handleSubmit}/>
            {loading ? (<Loader/>) : (
                <>
                    <MovieGrid movies={movies}
                               onSelect={onSelect}
                    />
                    {activeMovie && <MovieModal movie={activeMovie}
                                                onClose={onClose}
                    />}
                </>
            )}
            <Toaster/>
        </>
    );
};
export default App