"use client"
import { ICategoriesState, useCategoriesState } from "@/app/zustand/categories";
import { IEventsState, useEventStore } from "@/app/zustand/events";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import styles from './explorer.module.css'
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import SelectPro from "@/app/components/SelectPro";
import { DateTime } from "@/app/components/Date";
import comp from './../../../../public/svg/share.svg'
import corp from './../../../../public/svg/heart.svg'
import flc from './../../../../public/svg/angle_right.svg'
import Link from "next/link";
import Image from "next/image";
import { quicksand, sans } from "../../../../public/fonts";

const Busqueda = ({searchValue} : any) => {

    moment.updateLocale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mié._Jue._Vie._Sáb.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_')
    });

    const location = useParams();
    const isOnlyNumber = location.value;
    console.log(isOnlyNumber)

    const { getEventSearchByFilters, eventSearchByFilters }: IEventsState = useEventStore();

    const [search, setSearch] = useState<any>(searchValue || typeof isOnlyNumber === "number" ? "" : isOnlyNumber);
    const { countsCategories, getCategoriesCount }: ICategoriesState = useCategoriesState();
    const [category, setCategory] = useState<number>(search?.length === 1 ? Number(search) : 0)

    const distritos = [
        { "id": 1, "value": "Cercado de Lima" },
        { "id": 2, "value": "Ate" },
        { "id": 3, "value": "Barranco" },
        { "id": 4, "value": "Breña" },
        { "id": 5, "value": "Comas" },
        { "id": 6, "value": "Chorrillos" },
        { "id": 7, "value": "El Agustino" },
        { "id": 8, "value": "Jesús María" },
        { "id": 9, "value": "La Molina" },
        { "id": 10, "value": "La Victoria" },
        { "id": 11, "value": "Lince" },
        { "id": 12, "value": "Los Olivos" },
        { "id": 13, "value": "Lurigancho" },
        { "id": 14, "value": "Lurín" },
        { "id": 15, "value": "Magdalena del Mar" },
        { "id": 16, "value": "Miraflores" },
        { "id": 17, "value": "Pachacámac" },
        { "id": 18, "value": "Pucusana" },
        { "id": 19, "value": "Pueblo Libre" },
        { "id": 20, "value": "Puente Piedra" },
        { "id": 21, "value": "Punta Hermosa" },
        { "id": 22, "value": "Punta Negra" },
        { "id": 23, "value": "Rímac" },
        { "id": 24, "value": "San Bartolo" },
        { "id": 25, "value": "San Borja" },
        { "id": 26, "value": "San Isidro" },
        { "id": 27, "value": "San Juan de Lurigancho" },
        { "id": 28, "value": "San Juan de Miraflores" },
        { "id": 29, "value": "San Luis" },
        { "id": 30, "value": "San Martín de Porres" },
        { "id": 31, "value": "San Miguel" },
        { "id": 32, "value": "Santa Anita" },
        { "id": 33, "value": "Santa María del Mar" },
        { "id": 34, "value": "Santa Rosa" },
        { "id": 35, "value": "Santiago de Surco" },
        { "id": 36, "value": "Surquillo" },
        { "id": 37, "value": "Villa El Salvador" },
        { "id": 38, "value": "Villa María del Triunfo" }
    ]

    const navigate = useRouter();

    const searchFilters = () => {
        let data = {
            "categoria": search.length === 1 ? search : 0,
            "TipoEvento": 0,
            "Ubicacion": "",
            "horaInicioFin": "",
            "fecha": "09-10-2024",
            "busqueda": search,
            "cantPage": 12,
            "page": 0
        }
        getEventSearchByFilters(data);
    }

    const [date, setDate] = useState(moment(new Date(), 'DD/MM/YYYY').format('DD-MM-YYYY'));

    const handleDate = (value: string, name: string) => {
        console.log(date)
        console.log(name)
        setDate(moment(value, 'DD/MM/YYYY').format('DD-MM-YYYY'));
    }

    console.log(date)

    useEffect(() => {
        let data = {
            "categoria": category,
            "TipoEvento": 0,
            "Ubicacion": "",
            "horaInicioFin": "",
            "fecha": date,
            "busqueda": search,
            "cantPage": 12,
            "page": 0
        }
        getEventSearchByFilters(data);
    }, [search, date, category])

    console.log(countsCategories)

    const handleSelectCategory = (_id: number) => {
        setCategory(_id)
    }

    const navigateEvent = (item: any) => {
        navigate.push(`/evento/${item.ideventos}/${item.idfecha}`)
    }

    useEffect(() => {
        getCategoriesCount();
    },[])

    console.log(eventSearchByFilters)

    return (
        <div>
            <>
                <div className={styles.search__main}>
                    <div>
                        <div className={styles.input__search}>
                            <input value={search.length === 1 ? "" : search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target?.value)} type="text" name='search' />

                            <div className={styles.buttons__filters}>
                                <Icon icon="ei:close" onClick={() => setSearch("")} />
                                <div></div>
                                <Icon onClick={searchFilters} icon="material-symbols:search" />
                            </div>
                        </div>
                        <div>
                            <button onClick={searchFilters}>Buscar</button>
                        </div>
                    </div>
                </div>
                <div className={styles.explorer}>

                    <div className={styles.filters__main}>
                        <SelectPro isIconLeft={true} options={distritos} placeholder={`Explora en Lima, Peru`} name='distrito' onChange={() => { }} />

                        <DateTime onChange={handleDate} name="dateStart" placeholder="desde hoy" />

                        <SelectPro isIconLeft={false} options={countsCategories?.map((item: any) => ({
                            id: item?.idCategorias,
                            value: item?.nombreCategoria
                        }))} placeholder={`Cualquier categoría`} name='categoria' onChange={handleSelectCategory} />
                    </div>
                    <div className={styles.event__notFound}>
                        {
                            eventSearchByFilters === undefined && <p>No se encontraron resultados para este evento, por favor vuelve intentarlo</p>
                        }
                    </div>
                    <div className={styles.explorer_wrapper}>
                        {
                            eventSearchByFilters?.map((item: any, index: number) => (
                                <motion.div className="shadow-custom-2 mb-16 relative min-h-[300]"
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigateEvent(item)}
                                    layout
                                    initial={{ opacity: 0, y: 50 }}  // Animación inicial (fuera de la vista)
                                    animate={{ opacity: 1, y: 0 }}  // Animación al entrar (desplazamiento hacia arriba)
                                    exit={{ opacity: 0, y: -50 }}  // Animación al salir (desplazamiento hacia abajo)
                                    transition={{ duration: 0.5, ease: "easeInOut" }}  // Transición suave
                                >
                                    <div>
                                        <strong className={`${quicksand.className} font-[900] text-5xl text-[#444]`}>{moment(item?.FechaInicio)?.format('DD')}</strong>
                                        <span className={`${quicksand.className}font-sans font-[700] text-2xl text-[#444]`}>{moment(item?.FechaInicio)?.format('MMM').toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <img className={styles.lastimg} src={item?.url} alt="imagenes1" />
                                    </div>
                                    <div>
                                        <h3 className={`${sans.className} font-[300] font-sans`}>{item?.titulo}</h3>
                                        <h6 className={`${sans.className} font-[300] font-sans`}>{moment(item?.FechaInicio)?.format('ddd')} {item?.HoraInicio} - {item?.HoraFinal}</h6>
                                        <h5 className={`${sans.className} font-[300] font-sans`}>{item?.NombreLocal}</h5>
                                    </div>
                                    <div className={styles.price}>
                                        <span>Desde</span> <br />
                                        <strong>S/ {Number(item.Monto).toFixed(2)}</strong>
                                        {/* <h6>Visto 21 veces</h6> */}
                                        <div>
                                            <Image src={comp} alt="comp" width={20} height={20} />
                                            <Image src={corp} alt="corp" width={20} height={20} />
                                        </div>
                                    </div>

                                    <Link className="font-[900] absolute bottom-[-30px] left-[110px] text-[#A3ABCC] text-xs flex items-center" href="/about">VER FUENTE <Image className="ml-2" src={flc} alt="flc" width={15} height={15} /></Link>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </>
        </div>
    )
}

export default Busqueda;