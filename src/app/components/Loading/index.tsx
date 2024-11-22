import styles from './loading.module.css';
import './styles.css'

const Loading = () => {
    return (
        <div className={styles.loading__wrapper}>
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
                <p>Cargando ...</p>
            </div>
        </div>
    )
}

export default Loading;