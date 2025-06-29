import style from './Loader.module.css'
interface Props {
    className?: string
}


const Loader = ({}: Props) => {
    return (
        <>
            <p className={style.text}>Loading movies, please wait...</p>

        </>
    );
};
export default Loader