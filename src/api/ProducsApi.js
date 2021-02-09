import Axios from "axios";
import * as FormData from 'form-data';
import { setTokenApi } from "./auth";
const API_HOST = "https://sodulce.herokuapp.com";
const API_HOSTs = "http://localhost:4000";

export async function agregoProducto(product) {
    try {
        const response = await Axios({
            url: `${API_HOST}/insertoProducto`,

            method: "POST",
            data: product
        })
        return response;
    } catch (e) {
        console.log(e)
    }

}
export async function buscoProducto(product) {
    try {
        const response = await Axios({
            url: `${API_HOST}/buscoProducto`,

            params: {
                producto: product
            }

        })
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function buscoBanner() {
    try {
        const response = await Axios({
            url: `${API_HOST}/buscobanner`,


        })
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function buscoLogo() {
    try {
        const response = await Axios({
            url: `${API_HOST}/buscoLogo`,


        })
        return response;
    } catch (e) {
        console.log(e)
    }
}

export async function buscoSobremi() {
    try {
        const response = await Axios({
            url: `${API_HOST}/buscoSobremi`,


        })
        return response;
    } catch (e) {
        console.log(e)
    }
}


export async function deleteImage(product) {
    try {
        const response = await Axios({
            url: `${API_HOST}/delete`,

            params: {
                _id: product
            }

        })
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function listaFotos(product) {
    try {
        const response = await Axios({
            url: `${API_HOST}/listafotos`,

            params: {
                producto: product
            }

        })
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function listaProductos(tipo, valor) {
    try {
        const response = await Axios({
            url: `${API_HOST}/listaProductos`,

            params: {
                tipo,
                valor
            }

        })
        return response;
    } catch (e) {
        console.log(e)
    }

}
export async function insertoProducto(product) {
    try {
        const response = await Axios({
            url: `${API_HOST}/insertoProductos`,

            params: {
                producto: product
            }

        })
        return response;
    } catch (e) {
        console.log(e)
    }

}

export function capitalizarPalabra(palabra) {
    const result = palabra.replace(/\b\w/g, l => l.toUpperCase())
    return result
}

export async function updateInfoApi(data) {
    try {
        const response = await Axios({
            url: `${API_HOST}/editoProducto`,

            method: "POST",
            data: data
        })
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function editoSobreMi(data) {
    try {
        const response = await Axios({
            url: `${API_HOST}/editoSobreMi`,

            method: "POST",
            data: { "sobremi": data }
        })
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function updateBanner(file) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'martin')
    const res = await Axios(
        {
            url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
            method: 'POST',
            data: data
        }
    )
    if (res) {
        formData.append('secure_url', res.data.secure_url);
        formData.append('public_id', res.data.public_id);

        Axios.post(`${API_HOST}/editoBanner`, formData, config)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}
export async function updateLogo(file) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'martin')
    const res = await Axios(
        {
            url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
            method: 'POST',
            data: data
        }
    )
    if (res) {
        formData.append('secure_url', res.data.secure_url);
        formData.append('public_id', res.data.public_id);

        Axios.post(`${API_HOST}/editoLogo`, formData, config)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export async function uploadAvatarApi(file, img) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    console.log(file)
    let formData = new FormData();
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'martin')
    const res = await Axios(
        {
            url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
            method: 'POST',
            data: data
        }
    )
    if (res) {
        formData.append('secure_url', res.data.secure_url);
        formData.append('public_id', res.data.public_id);
        formData.append('producto', img);

        Axios.post(`${API_HOST}/uploadimage`, formData, config)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}


export async function editAvatarApi(file, img, id) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let formData = new FormData();
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'martin')
    const res = await Axios(
        {
            url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
            method: 'POST',
            data: data
        }
    )
    if (res) {
        formData.append('secure_url', res.data.secure_url);
        formData.append('public_id', res.data.public_id);
        formData.append('producto', img);
        formData.append('_id', id);

        Axios.post(`${API_HOST}/editimage`, formData, config)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}
export async function addProduct(file, producto, description, precio) {
    console.log(producto, description, precio)
    const config = { headers: { 'Content-Type': 'application/json' } };
    let formData = new FormData();
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'martin')
    const res = await Axios(
        {
            url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
            method: 'POST',
            data: data
        }
    )
    if (res) {
        console.log(res)
        formData.append('secure_url', res.data.secure_url);
        formData.append('public_id', res.data.public_id);
        formData.append('producto', producto);
        formData.append('description', description);
        formData.append('precio', precio);



        Axios.post(`${API_HOST}/insertoProducto`, formData, config)
            .then((response) => {
                console.log(response);
                if (response) {
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export async function deleteAll(product) {
    try {
        const response = await Axios({
            url: `${API_HOST}/deleteall`,

            params: {
                producto: product
            }

        })
        return response;
    } catch (e) {
        console.log(e)
    }
}

export async function ingresoAdmin(formData) {

    console.log(formData)
    const config = { headers: { 'Content-Type': 'application/json' } };




    await Axios.post(`${API_HOST}/signin`, formData, config)
        .then((response) => {
            setTokenApi(response.data.token);
        })
        .catch(error => {
            console.log(error);
        })
}

