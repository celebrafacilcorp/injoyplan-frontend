
import { IEventsState, useEventStore } from '../../zustand/events'
import { IAuthState, useAuthStore } from '../../zustand/auth'
import { IFavoriteState, useFavoriteStore } from '../../zustand/favorites'
import Card from '@/app/components/Card'
import { Event } from '@/app/interfaces/event'
import { useEffect } from 'react'
import moment from 'moment'

const Events = ({ setLimit, setOpenAuth }: any) => {

    const { events,eventSearchByFilters, getEventsByCategory1,getEventsByCategory2,getEventsByCategory3,getEventsByCategory4, eventsEntreteiment, eventsCulture, eventsMusic, eventsTeatro }: IEventsState = useEventStore();
    const { auth }: IAuthState = useAuthStore();
    const { addFavorite, deleteFavorite }: IFavoriteState = useFavoriteStore();

    console.log(events)

    const eventsNoDestacades = events.length > 0 ? events?.filter((item: any) => item?.Destacado === 0) : [];

    console.log(eventSearchByFilters)
    console.log(events)

    const addFavoritesByUser = (item: any) => {
        console.log(item)
        if (auth) {
            console.log(item)
            if (item.esfavorito === 1) {
                deleteFavorite(item)
            } else {
                const data = {
                    idEvento: item.idEventos || item.ideventos,
                    idFecha: item.idfecha,
                    registrado: false
                }
                addFavorite(data)
            }
        } else {
            setOpenAuth(true)
        }
    }

    useEffect(() => {
        let data = {
            "categoria": 1,
            "TipoEvento": 0,
            "Ubicacion": "",
            "horaInicioFin": "",
            "fecha": moment(new Date()).format('DD-MM-YYYY'),
            "busqueda": "",
            "cantPage": 8,
            "page": 1
        }
        getEventsByCategory1({
            ...data,
            categoria: 1
        });
        getEventsByCategory2({
            ...data,
            categoria: 2
        });

        getEventsByCategory3({
            ...data,
            categoria: 3
        });
        getEventsByCategory4({
            ...data,
            categoria: 4
        });
    }, [])

    console.log(eventsNoDestacades)

    return (
        <div className='bg-[#fff]'>

            <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl max-w-[980px] mx-auto mt-6 xl:px-10 px-5">
                <div className="md:px-0">
                    <div className='md:pt-16 pt-6'>
                        <h2 className='text-3xl mb-8 font-bold text-[#444444] md:text-[#212121]'>Eventos para ti</h2>
                    </div>
                    <div className="grid auto-cols-min grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                        {
                            eventsNoDestacades.map((item: Event, index: number) => {
                                return (
                                    <Card item={item} key={index} addFavoritesByUser={addFavoritesByUser} />
                                )
                            })
                        }
                    </div>
                    <div className='text-[#007fa4] font-bold flex justify-center mt-10 mb-10 border-2 border-solid border-[#007FA4] p-2 w-fit mx-auto rounded-full px-16'>
                        <button onClick={() => setLimit((page: any) => page + 12)} type="submit">VER MÁS EVENTOS</button>
                    </div>
                </div>
            </div>
            {
                eventsTeatro?.length > 0 && (
                    <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl max-w-[980px] mx-auto mt-6 xl:px-10 px-5">
                        <div className="md:px-0">
                            <div className='md:pt-16 pt-6'>
                                <h2 className='text-3xl mb-8 font-bold text-[#444444] md:text-[#212121]'>Eventos de teatro</h2>
                            </div>
                            <div className="grid auto-cols-min grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                                {
                                    eventsTeatro.map((item: Event, index: number) => {
                                        return (
                                            <Card item={item} key={index} addFavoritesByUser={addFavoritesByUser} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            {
                eventsEntreteiment?.length > 0 && (
                    <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl max-w-[980px] mx-auto mt-6 xl:px-10 px-5">
                        <div className="md:px-0">
                            <div className='md:pt-16 pt-6'>
                                <h2 className='text-3xl mb-8 font-bold text-[#444444] md:text-[#212121]'>Eventos de entrenimiento</h2>
                            </div>
                            <div className="grid auto-cols-min grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                                {
                                    eventsEntreteiment.map((item: Event, index: number) => {
                                        return (
                                            <Card item={item} key={index} addFavoritesByUser={addFavoritesByUser} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }


            {
                eventsMusic?.length > 0 && (
                    <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl max-w-[980px] mx-auto mt-6 xl:px-10 px-5">
                        <div className="md:px-0">
                            <div className='md:pt-16 pt-6'>
                                <h2 className='text-3xl mb-8 font-bold text-[#444444] md:text-[#212121]'>Eventos de musica</h2>
                            </div>
                            <div className="grid auto-cols-min grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                                {
                                    eventsMusic.map((item: Event, index: number) => {
                                        return (
                                            <Card item={item} key={index} addFavoritesByUser={addFavoritesByUser} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            {
                eventsCulture?.length > 0 && (
                    <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl max-w-[980px] mx-auto mt-6 xl:px-10 px-5">
                        <div className="md:px-0">
                            <div className='md:pt-16 pt-6'>
                                <h2 className='text-3xl mb-8 font-bold text-[#444444] md:text-[#212121]'>Eventos de cultura</h2>
                            </div>
                            <div className="grid auto-cols-min grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                                {
                                    eventsCulture.map((item: Event, index: number) => {
                                        return (
                                            <Card item={item} key={index} addFavoritesByUser={addFavoritesByUser} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Events
