import style from './ErrorMessage.module.css'
interface Props {
   error: string
}


const ErrorMessage = ({error}: Props) => {
    return (
        <>
            <p className={style.text}>There was an error.{error}. Please try again...</p>
        </>
    );
};
export default ErrorMessage