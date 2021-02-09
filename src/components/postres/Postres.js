import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import image from "../../assets/png/add.png"
import CrearProducto from '../CrearProducto/CrearProducto';
import ListProducts from '../ListProducts';
import BasicLayout from '../BasicLayout/BasicLayout';
import "./Postres.scss";
export default function Postres() {
    const [showModal, setShowModal] = useState(false)
    const user = useAuth();
    const add = () => {
        setShowModal(true)
    }
    return (
        <BasicLayout>

            <div>
                <div className="wrapper">
                    <div id="postres" className="titulo">
                        <h1 className="mx-auto">Postres</h1>
                    </div>

                </div>
                {user && <img onClick={add} className="add" src={image} alt="agregar producto" />
                }
                <ListProducts />



                <CrearProducto show={showModal} setShow={setShowModal} />
            </div>
        </BasicLayout>
    )
}
