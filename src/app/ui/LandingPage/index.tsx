import styles from './landing.module.css'
import logo from '../../../../public/svg/logo.svg'
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingPage = () => {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simula un tiempo de carga de 2 segundos antes de iniciar la transición de desaparición
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500); // Ajusta el tiempo según tus necesidades

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="loading-container"
                    initial={{ opacity: 1 }}       // Estado inicial: completamente visible
                    animate={{ opacity: 1 }}       // Mantener visible durante la carga
                    exit={{ opacity: 0 }}          // Animación de salida: desvanecerse
                    transition={{ duration: 0.5 }} // Duración de la animación de salida
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div className={styles.loading__bar}></div>  {/* Barra de carga */}
                        <div className={styles.loading__wrapper}>
                            <img src={logo} alt="" />
                            <h3>Bienvenido a injoyplan</h3>
                            <p>En breve te mostraremos los mejores eventos que suceden en el pais</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingPage;
