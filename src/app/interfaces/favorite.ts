interface Header {
    CODE: number;
    CODE_RESPONSE: string;
    MESSAGE: string;
}

export interface Favorite {
    idfavoritos: number
    esfavorito: number;
    favorito: number;
    HoraInicio: string;
    HoraFinal: string;
    FechaInicio: string;
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
}

export interface IResponse {
    HEADER: Header;
    RESPONSE: Favorite[];
}