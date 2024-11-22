"use client";
import styles from './header.module.css'
import logo from '../../../../public/images/logo.png'
import lupa from '../../../../public/svg/search.svg'
import lupaMobile from '../../../../public/svg/search.svg'
import cora from '../../../../public/svg/favorite.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { IAuthState, useAuthStore } from '../../zustand/auth'
import { IEventsState, useEventStore } from '../../zustand/events'
import { IFavoriteState, useFavoriteStore } from '../../zustand/favorites'
import { Icon } from '@iconify/react/dist/iconify.js'
import nofavorite from '../../../../public/svg/nofavorite.svg'
import moment from 'moment'
// import Auth from '../../Auth'
import Image from 'next/image';
moment.locale('es');

const Header = () => {

    const [toggleOpenFavorites, setToogleOpenFavorites] =
        useState<boolean>(false);

    const [toggleOpenSearchEvents, setToogleOpenSearchEvents] = useState<boolean>(false);
    const { auth }: IAuthState = useAuthStore();
    const { getEventBySearch, eventSearch, resetEventBySearch, events, getEvents }: IEventsState = useEventStore();
    const { getFavorites, deleteFavorite }: IFavoriteState = useFavoriteStore();
    console.log(auth)

    console.log(events)

    const [openAuth, setOpenAuth] = useState<boolean>(false);

    useEffect(() => {
        getFavorites();
    }, [])

    const [search, setSearch] = useState<string>("");
    // const navigate = useNavigate();
    // comentario


    const [isActiveFavorite, setIsActiveFavorite] = useState<boolean>(false);
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
    const [hoveredFavoriteId, setHoveredFavoriteId] = useState<number | null>(null);
    // const [limit, _setLimit] = useState(12);

    const favoritesRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     getEvents(limit);  // Pasamos el límite actual
    // }, [limit]);

    const toggleFavorite = () => {
        setToogleOpenFavorites(!toggleOpenFavorites);
    };

    const toggleSearch = () => {
        setToogleOpenSearchEvents(!toggleOpenSearchEvents);
    };

    useEffect(() => {
        if (toggleOpenFavorites) {
            setIsActiveFavorite(true);
        } else {
            setIsActiveFavorite(false);
        }
    }, [toggleOpenFavorites]);

    useEffect(() => {
        if (toggleOpenSearchEvents) {
            setIsActiveSearch(true);
        } else {
            setIsActiveSearch(false);
        }
    }, [toggleOpenSearchEvents]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
                setToogleOpenFavorites(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setToogleOpenSearchEvents(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (search.length > 3) {
            getEventBySearch(search)
        } else {
            resetEventBySearch();
        }
    }, [search]);



    const deleteFavorites = (e: any, item: any) => {
        console.log(item)
        e.stopPropagation();
        deleteFavorite(item)
    }

    let eventsOnlyFavorites = events?.filter((item: any) => item.esfavorito === 1);

    const navigateEvent = (item: any) => {
        // navigate(`/evento/${item.ideventos}/${item.idfecha}`)
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Función para verificar el tamaño de la ventana
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Ejecuta la función cuando el componente se monta
        handleResize();

        // Añade un listener para detectar cambios en el tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const path = usePathname();
    console.log(path)

    // console.log(path)

    // useEffect(() => {
    //     if (path.pathname) {
    //         setIsActiveSearch(false);
    //     }
    // }, [path.pathname])

    console.log(isActiveFavorite)

    return (
        <div className="border-b border-solid border-[#e9e9e9] bg-[#F9FAFC]">
            {/* <Auth openAuth={openAuth} setOpenAuth={setOpenAuth} /> */}
            <div className="max-w-screen-2xl h-18 py-5 mx-auto items-center grid grid-cols-12">
                <Link className='w-44' href="/"><Image src={logo} alt="logo" height={300} width={300} /></Link>

                <div className={
                    isMobile ? 
                    styles.search_containerMobile : "border col-start-4 col-span-5 flex items-center border-1 border-solid border-[#ddd] rounded-[50px] bg-white"}>
                    {
                        isMobile && <div className={styles.search_icon_container}>
                            <Image src={lupaMobile} alt="lupa" className={styles.search_icon} />
                        </div>
                    }
                    <div className="flex justify-center pr-2 pl-4">
                        <Image src={lupa} width={28} onClick={() => toggleSearch()} alt="lupa" className={styles.search_icon} />
                    </div>
                    <div className={styles.search} ref={searchRef}>
                        {
                            !isMobile &&
                            <input
                                onClick={() => toggleSearch()}
                                onChange={(e: any) => setSearch(e.target.value)}
                                type="text" placeholder="Evento, equipo o artista"
                                className="w-[90%] border-none relative outline-none font-[Quicksand] py-4 text-md text-[#5C6570] font-bold"
                            />
                        }
                        {/* <div className={isActiveSearch ? styles.activeSearch : styles.dropdownSearch}>
                            {
                                isMobile && <div className={styles.searchMobile}>
                                    <Image src={lupa} alt="lupa" className={styles.search_icon} />
                                    <input onChange={(e: any) => setSearch(e.target.value)} type="text" placeholder="Evento, equipo o artista" />
                                    <Icon icon="openmoji:close" color='#9B292B' onClick={() => toggleSearch()} />
                                </div>
                            }
                            <div>
                                <ul className={styles.dropdownHeader__wrapper}>
                                    <div className={styles.dropdown__header}>
                                        <div>
                                            {eventSearch?.length > 0 ? <h6>Eventos</h6> :
                                                <p className={styles.noResults}>Ver todos los resultado para <strong>{search || "Por buscar ..."}</strong></p>
                                            }

                                        </div>
                                        <div>
                                            {eventSearch?.length > 0 && eventSearch?.map((item: any) => (
                                                <Link href={`/evento/${item.ideventos}/${item.idfecha}`} key={item.ideventos}>
                                                    <div className={styles.events}>
                                                        <div className={styles.event__left}>
                                                            <div>
                                                                <img src={item.url} alt={item.title} />
                                                            </div>
                                                            <div>
                                                                <h3 className={styles.title}>{item.titulo}</h3>
                                                                <span>{item.NombreLocal}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p> {moment(item.FechaInicio).utc().format('ddd, D MMM').toUpperCase()}</p>
                                                            <span>{item.HoraInicio}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div>
                                            {
                                                eventSearch?.length > 0 && (
                                                    <div className={styles.seeAll}>
                                                        <Link href={`/busqueda/${search}`}><p>Ver todos los resultados por <strong>{search}</strong></p></Link>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className={styles.corazon} ref={favoritesRef}>
                    <p>{auth?.nombre} {auth?.Apellido}</p>
                    {auth === null && <button onClick={() => setOpenAuth(true)}
                        className='mr-[10px] text-white bg-[#007FA4] text-[15px] py-[10px] px-[25px] rounded-[20px] font-open-sans cursor-pointer'
                        >Ingresar</button>}
                    <Image src={cora} alt="cora" width={47} height={47} onClick={() => toggleFavorite()} />
                    <div
                        className={isActiveFavorite ? "opacity-100 visible z-10 shadow-custom-2" : ""}
                    >
                        <ul className={styles.dropdownHeader__wrapper}>
                            <div className={styles.dropdown__header}>
                                <div>
                                    <h6>Favoritos</h6>
                                    {
                                        isMobile && <div className={styles.closeFavorites}>
                                            <Icon width={30} icon="ic:baseline-close" onClick={() => setToogleOpenFavorites(false)} />
                                        </div>
                                    }
                                </div>
                                <div className={styles.favorites__dropdown}>
                                    {
                                        eventsOnlyFavorites.length > 0 ? eventsOnlyFavorites?.map((item: any) => (
                                            <div className={styles.favorites}
                                                onClick={() => navigateEvent(item)}
                                                key={item.evento}
                                                onMouseEnter={() => setHoveredFavoriteId(item.idfavoritos)}
                                                onMouseLeave={() => setHoveredFavoriteId(null)}
                                            >
                                                <div>
                                                    <img src={item.url} alt="" />
                                                </div>
                                                <div>
                                                    <p>{moment(item.FechaInicio).utc().format('D MMM').toUpperCase()} - {item.HoraInicio} - {item.HoraFinal}</p>
                                                    <h3>{item.titulo}</h3>
                                                    <span>{item.NombreLocal}</span>
                                                </div>

                                                {
                                                    isMobile && <Icon icon="ic:baseline-close" onClick={(e: any) => deleteFavorites(e, item)} />
                                                }

                                                {hoveredFavoriteId === item.idfavoritos && !isMobile && (
                                                    <Icon icon="ic:baseline-close" onClick={(e: any) => deleteFavorites(e, item)} />
                                                )}
                                            </div>
                                        )) :

                                            <div className={styles.noFavorite}>
                                                <div>
                                                    <img src={nofavorite} alt="" />
                                                    <strong>Aún no tienes eventos favoritos</strong>
                                                    <p>En cuanto los tengas, podrás verlos aquí</p>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header