import style from './SearchBar.module.css'
import {toast} from 'react-hot-toast'

interface SearchBarProps {
    className?: string;
    onSubmit: (query: string) => void
}


const SearchBar = ({onSubmit}: SearchBarProps) => {
    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;
        if (!query) {
            toast.error('Please enter your search query.');
            return
        }
        onSubmit(query)
    }
    return (
        <>
            <header className={style.header}>
                <div className={style.container}>
                    <a
                        className={style.link}
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by TMDB
                    </a>
                    <form className={style.form}
                          action={handleSubmit}
                    >
                        <input
                            className={style.input}
                            type="text"
                            name="query"
                            autoComplete="off"
                            placeholder="Search movies..."
                            autoFocus
                        />
                        <button className={style.button}
                                type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </header>

        </>
    );
};
export default SearchBar