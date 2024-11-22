interface Header {
    CODE: number;
    CODE_RESPONSE: string;
    MESSAGE: string;
}

export interface Auth {
    token: string
    fecha_expiracion: string
    fecha_creacion: string
    user: IUser
}

export interface IUser {
    id: number
    nombre: string
    Apellido: string
    genero: string
    f_nacimiento: string
    imagenPerfil: string
    password: string
    email: string
    terminosCondiciones: number
    politica: number
    perfilu: string
    estado: number
}

export interface IResponse {
    HEADER: Header;
    RESPONSE: Auth;
}

export interface IEmail {
    correo: string
}