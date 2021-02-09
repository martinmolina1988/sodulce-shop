import React, { useEffect, useState } from 'react';
import { deleteImage, listaFotos } from '../../api/ProducsApi';
import "./EditarProducto.scss";
import "./CheckBoxImage.scss";
import { Button } from 'react-bootstrap';
export default function ListEditImages(props) {
    const { formData } = props;
    const { producto } = formData;
    const [images, setImages] = useState(null)
    const [data, setData] = useState(null)
    useEffect(() => {

        listaFotos(producto).then(response => {
            setImages(response)
        })
    }, [producto])


    return (
        < div className="list-images" > < div className="card-columns " >
            {images?.data.map((name, index) => (
                <ul>
                    <li>
                        <img src={name.imageURL} />

                        <Button onClick={() => { deleteImage(name._id); setData(name._id); }} className="boton">Eliminar</Button>
                    </li>
                </ul>
            ))}</ div>
        </div >
    )
}
