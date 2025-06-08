import { create } from 'zustand';
import { get } from '../utils/fetch';
import { Event, IResponse } from '../interfaces/event';
import useAlertStore from './alert';
import moment from 'moment';

export interface IEventsState {
    getEvents: (limit: number) => void;
    getEventsByCategory1: (category: any) => any
    getEventsByCategory2: (category: any) => any
    getEventsByCategory3: (category: any) => any
    getEventsByCategory4: (category: any) => any
    eventsEntreteiment: Event[],
    eventsCulture: Event[],
    eventsTeatro: Event[],
    eventsMusic: Event[],
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
            const resp: IResponse = await get(`eventos/listarEventosxPaginate/1/${limit}`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({ events: resp.RESPONSE });
            } else {
                set({ events: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    setEventsAsFavorite: (idEvento, resp) => {
        console.log(idEvento, resp)

        set((state: any) => ({
            events: state?.events?.map((event: any) =>
                event.ideventos === idEvento
                    ? { ...event, esfavorito: event.esfavorito === 0 ? 1 : 0, favorito: resp }
                    : event
            )
        }));
    },
    setEventFiltersFavorite: (idEvento: any, resp: number) => {
        console.log(idEvento, resp)
        set((state: any) => ({
            eventSearchByFilters: state?.eventSearchByFilters?.map((event: any) =>
                event.ideventos === idEvento
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
                    item.ideventos === idEvento
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

        try {
            const resp: any = await get(`eventos/consultar_evento_seleccionado/${event}/${date}`);
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
        const url = `https://goldfish-app-zbw3y.ondigitalocean.app/api/eventos/listar_Eventos_Publicos_filtro?${query}`; // Mantener la URL simple si usas POST

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Enviar los datos en el cuerpo
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result); // Mostrar la respuesta

            if (result.HEADER.CODE === 200) {
                // Manejar la respuesta exitosa
                set({
                    eventSearchByFilters: result.RESULT.ResponseFinal,
                    total: result.RESULT.canti
                })
                console.log("Resultados:", result.RESULT.ResponseFinal);
            } else {
                // Manejar cuando no se obtienen resultados
                console.log("No se encontraron resultados");
            }
        } catch (error) {
            console.error('Error durante la búsqueda:', error);
        }
    },
    getEventsByCategory1: async (params: any) => {
        const filteredParams = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const query = new URLSearchParams(filteredParams).toString();
        const url = `https://goldfish-app-zbw3y.ondigitalocean.app/api/eventos/listar_Eventos_Publicos_filtro?${query}`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params), // Enviar los datos en el cuerpo
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result); // Mostrar la respuesta

            if (result.HEADER.CODE === 200) {
                // Manejar la respuesta exitosa
                set({
                    eventsMusic: params.categoria === 1 ? result.RESULT.ResponseFinal : [],
                })
                console.log("Resultados:", result.RESULT.ResponseFinal);
            } else {
                // Manejar cuando no se obtienen resultados
                console.log("No se encontraron resultados");
            }
        } catch (error) {
            console.error('Error durante la búsqueda:', error);
        }
    },
    getEventsByCategory2: async (params: any) => {
        const filteredParams = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const query = new URLSearchParams(filteredParams).toString();
        const url = `https://goldfish-app-zbw3y.ondigitalocean.app/api/eventos/listar_Eventos_Publicos_filtro?${query}`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params), // Enviar los datos en el cuerpo
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result); // Mostrar la respuesta

            if (result.HEADER.CODE === 200) {
                // Manejar la respuesta exitosa
                set({
                    eventsEntreteiment: params.categoria === 2 ? result.RESULT.ResponseFinal : [],
                })
                console.log("Resultados:", result.RESULT.ResponseFinal);
            } else {
                // Manejar cuando no se obtienen resultados
                console.log("No se encontraron resultados");
            }
        } catch (error) {
            console.error('Error durante la búsqueda:', error);
        }
    },
    getEventsByCategory3: async (params: any) => {
        const filteredParams = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const query = new URLSearchParams(filteredParams).toString();
        const url = `https://goldfish-app-zbw3y.ondigitalocean.app/api/eventos/listar_Eventos_Publicos_filtro?${query}`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params), // Enviar los datos en el cuerpo
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result); // Mostrar la respuesta

            if (result.HEADER.CODE === 200) {
                // Manejar la respuesta exitosa
                set({
                    eventsCulture: params.categoria === 3 ? result.RESULT.ResponseFinal : [],
                })
                console.log("Resultados:", result.RESULT.ResponseFinal);
            } else {
                // Manejar cuando no se obtienen resultados
                console.log("No se encontraron resultados");
            }
        } catch (error) {
            console.error('Error durante la búsqueda:', error);
        }
    },
    getEventsByCategory4: async (params: any) => {
        const filteredParams = Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const query = new URLSearchParams(filteredParams).toString();
        const url = `https://goldfish-app-zbw3y.ondigitalocean.app/api/eventos/listar_Eventos_Publicos_filtro?${query}`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params), // Enviar los datos en el cuerpo
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result); // Mostrar la respuesta

            if (result.HEADER.CODE === 200) {
                // Manejar la respuesta exitosa
                set({
                    eventsTeatro: params.categoria === 4 ? result.RESULT.ResponseFinal : [],
                })
                console.log("Resultados:", result.RESULT.ResponseFinal);
            } else {
                // Manejar cuando no se obtienen resultados
                console.log("No se encontraron resultados");
            }
        } catch (error) {
            console.error('Error durante la búsqueda:', error);
        }
    },
}));