import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint: number = 600) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Función para verificar el tamaño de la ventana
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // Ejecuta la función cuando el hook se monta
        handleResize();

        // Añade un listener para detectar cambios en el tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Limpia el listener cuando el hook se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;