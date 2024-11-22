const BASE_URL = 'https://squid-app-bfky7.ondigitalocean.app/api'
// const BASE_URL = 'http://119.8.153.52:2065/api/results-patient'
// const BASE_PROD = 'https://api-dev.suiza-soft.com/results-patient'

export async function refreshTokens<T>(token: string, refreshToken: string): Promise<T> {
    const url = `${BASE_URL}/authentication/refresh-token`;
    const data = { token, refreshToken };
    console.log(token)
    console.log(refreshToken)
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        },
        body: JSON.stringify(data)
    };
    return await fetchData<T>(url, options);
}

async function fetchData<T>(url: string, options?: any): Promise<T> {
    try {
        const response = await fetch(url, options);
        if (response.status === 401) {
            // Token de acceso caducado, intenta actualizarlo

            const token = localStorage.getItem('tokenRP');
            const refreshToken = localStorage.getItem('refreshTokenRP');



            if (token && refreshToken) {
                console.log("hello")
                const refreshResp: any =  await refreshTokens(token, refreshToken);
                console.log(refreshResp)
                const response = await refreshResp.json()
                console.log(response)
                console.log(response)
                if (refreshResp.code === 1) {
                    // Token refrescado con éxito, intenta la solicitud nuevamente con el nuevo token
                    const newToken = refreshResp.data.token;
                    localStorage.setItem('tokenRP', newToken);
                    localStorage.setItem('refreshTokenRP', refreshResp.data.refreshToken);
                    // Actualiza el encabezado de autorización con el nuevo token
                    if (options && options.headers) {
                        options.headers['Authorization'] = `Bearer ${newToken}`;
                    }
                    // Intenta realizar la solicitud nuevamente con el nuevo token
                    return await fetchData<T>(url, options);
                } else {
                
                    localStorage.removeItem('tokenRP');
                    localStorage.removeItem('refreshTokenRP');
                    // No se pudo refrescar el token, redirige a la página de inicio o maneja el error de alguna otra manera
                    throw new Error('No se pudo refrescar el token de acceso');
                }
            } else {
              
                localStorage.removeItem('tokenRP');
                localStorage.removeItem('refreshTokenRP');
                // Falta token o refreshToken, redirige a la página de inicio o maneja el error de alguna otra manera
                throw new Error('Falta token o refreshToken');
            }
        }
        
        console.log("hello")
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            return errorData;
        }
        return response.json();
    } catch (error) {
 
        console.log("hello")
        // Maneja cualquier error que ocurra durante la solicitud
        throw new Error(`Error al realizar la solicitud: ${error}`);
    }
}

export async function get<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}/${endpoint}`;
    if(token) {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
            }
        };
        return await fetchData<T>(url, options);
    }
    return await fetchData<T>(url);
}

export async function getWithBody<T>(endpoint: string, data: any): Promise<T> {
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // Pasar los datos en el cuerpo de la solicitud
    };
    return await fetchData<T>(url, options);
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
    const token = localStorage.getItem('token'); // Obtener el token antes de cada solicitud
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    };
    return await fetchData<T>(url, options);
}

export async function put<T>(endpoint: string, data: any): Promise<T> {
    const token = localStorage.getItem('token'); // Obtener el token antes de cada solicitud
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        },
        body: JSON.stringify(data),
    };
    return await fetchData<T>(url, options);
}

export async function del<T>(endpoint: string): Promise<T> {
    const token = localStorage.getItem('token'); // Obtener el token antes de cada solicitud
    const url = `${BASE_URL}/${endpoint}`;
    const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        },
    };
    return await fetchData<T>(url, options);
}