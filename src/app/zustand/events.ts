import { create } from 'zustand';
import { get } from '../utils/fetch';
import { Event, IResponse } from '../interfaces/event';
import useAlertStore from './alert';
import moment from 'moment';

export interface IEventsState {
    getEvents: (limit: number) => void;
    eventsEntreteiment: Event[],
    eventsCulture: Event[],
    eventsTeatro: Event[],
    eventsMusic: Event[],
    eventsDestacades: Event[],
    getEventsDestacades: () => void,
    resetEventBySearch: () => void
    resetEvent: () => void
    events: Event[];
    eventSearch: any
    total: number
    eventSearchByFilters: any
    valueSearch: string
    dataEvent: null,
    getEventBySearch: (data: string) => any
    setEventsAsFavorite: (idEvento: any, resp: any) => any
    setEventDataFavorite: (idEvento: any, resp: any) => any
    setEventFiltersFavorite: (idEvento: any, resp: any) => any
    setEventsDeleteFavorite: (idFavorito: any) => any
    setEventDataDeleteDFavorite: (idFavorito: any) => any
    setEventDeleteFiltersFavorite: (idFavorito: any) => any
    getEventByEventAndDate: (event: number, date: number) => any
    getEventSearchByFilters: (params: any) => any
    getValueSearch: (value: string) => any
}

export const useEventStore = create<IEventsState>((set, _get) => ({
    eventsEntreteiment: [],
    eventsDestacades: [],
    eventsCulture: [],
    eventsTeatro: [],
    eventsMusic: [],
    valueSearch: "",
    eventSearchByFilters: [],
    total: 0,
    dataEvent: null,
    eventSearch: null,
    getValueSearch: (valueSearch: string) => {
        set({
            valueSearch: valueSearch
        })
    },
    resetEventBySearch: () => {
        set({
            eventSearch: []
        })
    },
    resetEvent: () => {
        set({
            dataEvent: null
        })
    },
    events: [],
    getEvents: async (limit: number) => {
        try {
            console.log(limit)
            const resp: IResponse = await get(`eventos/listarEventosxPaginate/1/${limit}`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({
                    events: resp.RESPONSE?.map((item: Event) => ({
                        ...item,
                        favorito: 0,
                        esfavorito: 0
                    }))
                });
            } else {
                set({ events: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    getEventsDestacades: async () => {
        try {
            const resp: IResponse = await get(`eventos/destacados/listarEventosxDestacados`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({
                    eventsDestacades: resp.RESPONSE?.map((item: Event) => ({
                        ...item,
                        favorito: 0,
                        esfavorito: 0
                    }))
                });
            } else {
                set({ eventsDestacades: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    setEventsAsFavorite: (idEvento, resp) => {
        console.log(idEvento, resp)

        set((state: any) => {
            console.log(state.events)
            return (
                {
                    events: state?.events?.map((event: any) =>
                        event.idEventos === idEvento
                            ? { ...event, esfavorito: event.esfavorito === 0 ? 1 : 0, favorito: resp }
                            : event
                    )
                });
        })
    },
    setEventFiltersFavorite: (idEvento: any, resp: number) => {
        console.log(idEvento, resp)
        set((state: any) => ({
            eventSearchByFilters: state?.eventSearchByFilters?.map((event: any) =>
                (event.ideventos || event.idEventos) === idEvento
                    ? { ...event, esfavorito: event.esfavorito === 0 ? 1 : 0, favorito: resp }
                    : event

            ),
        }));
    },
    setEventDataFavorite: (idEvento: any, resp: number) => {
        set((state: any) => ({
            dataEvent: state?.dataEvent?.map((dataEventItem: any) => ({
                ...dataEventItem,
                data: dataEventItem?.data?.map((item: any) =>
                    (item.ideventos || item.idEventos) === idEvento
                        ? { ...item, favorito: resp }
                        : item
                ),
            })),
        }));
    },
    setEventsDeleteFavorite: (favorito: any) => {
        set((state: any) => ({
            events: state?.events?.map((item: any) =>
                item.favorito === favorito
                    ? { ...item, esfavorito: item.esfavorito === 1 ? 0 : 1 }
                    : item
            )
        }));
    },
    setEventDeleteFiltersFavorite: (favorito: any) => {
        set((state: any) => ({
            eventSearchByFilters: state?.eventSearchByFilters?.map((item: any) =>
                item.favorito === favorito
                    ? { ...item, favorito: null, esfavorito: 0 }
                    : item
            )
        }));
    },
    setEventDataDeleteDFavorite: (favorito: any) => {
        set((state: any) => ({
            dataEvent: state?.dataEvent?.map((dataEventItem: any) => ({
                ...dataEventItem,
                data: dataEventItem?.data?.map((item: any) =>
                    item.favorito === favorito
                        ? { ...item, favorito: null }
                        : item
                ),
            })),
        }));
    },
    getEventBySearch: async (palabraBusqueda: string) => {
        try {
            const resp: any = await get(`eventos/listar_eventos_filtro_letras/${palabraBusqueda}`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({ eventSearch: resp.RESPONSE });
            } else {
                set({ eventSearch: null })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    getEventByEventAndDate: async (event: number, date: number) => {
        console.log(event)
        try {
            const resp: any = await get(`eventos/consultar_evento_seleccionado/${date}/${event}`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({ dataEvent: resp.RESPONSE });

            } else {
                set({ dataEvent: null })
            }

        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    // aqui se llama asi por que el api debe ser con params pero metodo get y no post 
    getEventSearchByFilters: async (data: any) => {
        console.log(data);
        const filteredParams = Object.entries(data)
            .filter(([_, value]) => value !== undefined)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const query = new URLSearchParams(filteredParams).toString();
        const resp: any = await get(`eventos/eventosPublicos/listar_Eventos_Publicos_completo?${query}`); // Mantener la URL simple si usas POST

        if (resp.message === "OK") {
            set({ eventSearchByFilters: resp.data.eventos, total: resp.data.total });
        } else {
            set({ eventSearchByFilters: null })
        }
    }
}));