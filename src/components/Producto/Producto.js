import React, { useEffect, useState } from 'react';
import "./Producto.scss"


import Carousel from 'react-bootstrap/Carousel'
import { listaFotos } from '../../api/ProducsApi';
// install Swiper components
export default function Producto(props) {
    const { producto } = props;
    const [image, setImage] = useState(null)
    useEffect(() => {


        listaFotos(producto).then(response => {
            setImage(response)
        })
    }, [])
    return (
        <div className="container">
            <Carousel>
                {image?.data.map(name => (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={name.imageURL}
                            alt="First slide"
                        />
                    </Carousel.Item>
                ))}

            </Carousel>
        </div>
    )
}
