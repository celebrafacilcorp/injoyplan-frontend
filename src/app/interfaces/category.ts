interface Header {
    CODE: number;
    CODE_RESPONSE: string;
    MESSAGE: { msg: string }[];
}

export interface Category {
    cantidad: number;
    idCategorias: number;
    nombreCategoria: string;
    estado: number;
    iconos: string;
}

export interface IResponse {
    HEADER: Header;
    RESPONSE: Category[];
}