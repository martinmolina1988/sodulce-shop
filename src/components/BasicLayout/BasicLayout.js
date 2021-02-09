import React, { useState, useEffect } from 'react'
import "./BasicLayout.scss";
import arrow from "../../assets/png/arrow2.png";
import { Button, Container } from "react-bootstrap";
import Encabezado from '../Encabezado';
import NavBar from '../navBar';
import Footer from '../Footer';
import Signin from '../Signin';
import useAuth from '../../hooks/useAuth';
import Cart from "../Cart"
import Etiquetas from './Etiquetas';

export default function BasicLayout(props) {

    const { className, children,
        precio,
        productsCart,
        getProductsCart,
        products
    } = props;
    const [show, setShow] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [cantiad, setCantidad] = useState(null);
    const user = useAuth();


    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    const onClick = () => {
        setShow(true)
    }
    const salir = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (


        <Container className={`basic-layout ${className}`}>


            <Signin show={show} setShow={setShow} />
            <NavBar precio={precio} productsCart={productsCart} className="sticky-top1" >
                {user ? (
                    <Button className="boton-ingresar" onClick={salir}>Salir</Button>
                ) : (
                    <Button className="boton-ingresar" onClick={onClick} >Ingresar</Button>
                )
                }

            </NavBar>

            <Encabezado />


            <Etiquetas className="d-none d-sm-none" />
            {children}


            <h4 className="opinion">Tu opinion importa! Deja un comentario:</h4>
            <div className="fb-comments" data-href="https://martinmolina1988.github.io/sodulce/" data-width="100%" data-numposts="5"></div>
            <div id="contacto" >
                <Footer />
            </div>
            <div className="scroll-to-top">

                {isVisible &&
                    <div onClick={scrollToTop}>
                        <img className="arrow" src={arrow} alt='Go to top' />
                    </div>}
            </div>

        </Container>
    )
}
