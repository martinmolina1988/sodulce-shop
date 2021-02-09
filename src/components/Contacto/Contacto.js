import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import whatsapp from "../../assets/png/whatsapp.png"
import BasicLayout from '../BasicLayout/BasicLayout';
import "./Contacto.scss"
export default function Contacto(props) {
    const {
        precio,
        addProductCart,
        productsCart,
        getProductsCart,
        products,
        setProducts } = props;
    const phone = '541134054422'
    const msg = encodeURIComponent("Hola buenos dias! Quisiera hacerle una consulta.. ")
    const href = `https://wa.me/${phone}/?text=${msg}`
    return (
        <BasicLayout
            precio={precio}
            productsCart={productsCart}
            getProductsCart={getProductsCart}
            products={products}>
            <Row style={{ margin: "50px" }}>
                <Col>
                    <h3>Nos encontramos en la zona de Banfield Oeste:</h3>
                    <h5>Hacemos envíos a las zonas aledañas: Lomas de Zamora, Lanús, Temperley</h5>
                </Col>
                <Col>
                    {/* Hello world */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26228.085867236914!2d-58.400243329036954!3d-34.742725132389516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2a1814f921f%3A0x1ff108ea8ecb9dd6!2sBanfield%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1612839432117!5m2!1ses!2sar" width={200} height={200} frameBorder={0} style={{ border: 0, margin: "20px" }} allowFullScreen aria-hidden="false" tabIndex={0} />
                </Col>
            </Row>
            <div className="contacto">
                <h3>Podés consultarme lo que necesites vía WhatsApp haciendo click en el siguiente botón:</h3>
                <div className="mx-auto" style={{ width: "200px" }}>
                    <Button onClick={(e) => { e.stopPropagation(); }}>
                        <a onClick={(e) => { e.stopPropagation(); }}
                            target="_blank"
                            href={href}
                        >
                            <img src={whatsapp} alt="" />Consultar
                   </a>
                    </Button>
                </div>

            </div>
        </BasicLayout >
    )
}
