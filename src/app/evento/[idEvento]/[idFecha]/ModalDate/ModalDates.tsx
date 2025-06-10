import ReactModal from "react-modal";
import { motion } from "framer-motion";
import styles from './modaldates.module.css'
import { Dispatch } from "react";
import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
    showModal: boolean
    setShowModal: Dispatch<boolean>
    dataFechaOrdenada: any
}

const ModalDates = ({ showModal, setShowModal, dataFechaOrdenada }: IProps) => {

    const onCloseModal = () => {
        document.body.classList.remove('ReactModal__Body--open');
        setShowModal(false)
    }


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            borderRadius: "10px",
            border: "none",
            width: "auto",
            overflow: "hidden",
            padding: "30px 20px 0px 20px",
            background: "#fff",
            transform: 'translate(-50%, -50%)'
        }
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    };

    return (
        <ReactModal ariaHideApp={false} isOpen={showModal} style={customStyles}>
            {
                dataFechaOrdenada.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}       // Estado inicial: completamente visible
                        animate={{ opacity: 1 }}       // Mantener visible durante la carga
                        exit={{ opacity: 1 }}          // Animación de salida: desvanecerse
                        transition={{ duration: 0.5 }}
                        style={{ background: "#fff" }}
                        variants={variants}
                    >
                        <div className={styles.date}>
                            <div className={styles.close} onClick={onCloseModal}>
                                <Icon icon="line-md:close" fontSize={25} />
                            </div>
                            <div className={styles.date__wrapper}>
                                <div>
                                    <h2>Calendario del evento</h2>
                                </div>
                                <div className={styles.date__table}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    Fecha y hora
                                                </td>
                                                <td>
                                                    Precio desde
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataFechaOrdenada?.map((item: any, index: number) => (
                                                    <tr key={index}>
                                                        <td><p className={styles.date__hour}>{moment(item.FechaInicio).locale('es').utc().format('dddd, D [de] MMMM [de] YYYY')}</p>
                                                            <div>{item.HoraInicio} - {item.HoraFinal}</div>
                                                        </td>
                                                        <td className={styles.mount}>S/ {Number(item.monto).toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.button__close} onClick={onCloseModal}>
                                    <button className={styles.closeModal}>cerrar</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </ReactModal>
    )
}

export default ModalDates;