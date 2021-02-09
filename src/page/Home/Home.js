import React, { useState } from 'react';
import image from "../../assets/png/add.png";
import BasicLayout from '../../components/BasicLayout/BasicLayout';
import CrearProducto from '../../components/CrearProducto/CrearProducto';
import ListProducts from '../../components/ListProducts';
import useAuth from '../../hooks/useAuth';
import "./Home.scss";



export default function Home(props) {

    const {
        precio,
        addProductCart,
        productsCart,
        getProductsCart,
        products,
        setProducts } = props;

    const [showModal, setShowModal] = useState(false)
    const user = useAuth();
    const add = () => {
        setShowModal(true)
    }



    return (
        <BasicLayout
            precio={precio}
            productsCart={productsCart}
            getProductsCart={getProductsCart}
            products={products}
        >

            <div className="container  h-100">

                <div className="wrapper">
                    <div id="postres" className="titulo">
                        <h1 className="mx-auto">Postres</h1>
                    </div>

                </div>
                {user && <img onClick={add} className="add" src={image} alt="agregar producto" />
                }
                <ListProducts
                    addProductCart={addProductCart}
                    productsCart={productsCart}
                    getProductsCart={getProductsCart}
                    products={products}
                    setProducts={setProducts} />



                <CrearProducto show={showModal} setShow={setShowModal} />

            </div>
        </BasicLayout>
    )
}
