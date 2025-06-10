interface Header {
    CODE: number;
    CODE_RESPONSE: string;
    MESSAGE: string;
}

export interface Event {
    esfavorito: number | null;
    HoraInicio: string;
    HoraFinal: string;
    FechaInicio: string;
    idEventos: number;
    ideventos: number;
    titulo: string;
    NombreLocal: string;
    urlFuente: string;
    url: string;
    Monto: number;
    Destacado: number;
    categoria_id: number;
    EsGratis: number;
    Distrito: string;
    estado: string | null;
    idfecha: number;
    usuario_id: number;
    favorito: number
}

export interface IResponse {
    HEADER: Header;
    RESPONSE: Event[];
}