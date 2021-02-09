import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Candado, Tarjeta, Etiqueta } from "../../utils/icons";

import "./Etiquetas.scss";
export default function Etiquetas() {
    return (
        <div className="div  d-none d-sm-block">
            <Row>
                <Col >
                    <div className="columnas">

                        <Candado className="svg" />
                        <div className="contenido">

                            <h4>#QuedateEnCasa</h4>
                            <p>Envios con normalidad en Lomas de Zamora! pueden sufrir demoras por la cuarentena</p>
                        </div>
                    </div>
                </Col>

                <Col className="col1">
                    <div className="columnas">
                        <Tarjeta />
                        <div className="contenido">

                            <h4>Mercado Pago</h4>
                            <p>Paga con mercadoPago</p>
                        </div>
                    </div>
                </Col>
                <Col className="col1">
                    <div className="columnas">
                        <Etiqueta />
                        <div className="contenido">

                            <h4>SITIO SEGURO</h4>
                            <p>Protegemos tus datos</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}
