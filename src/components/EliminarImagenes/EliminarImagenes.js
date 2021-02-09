import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Spinner, Button, Alert, Modal } from 'react-bootstrap'
import { agregoProducto, buscoProducto, capitalizarPalabra, listaProductos } from '../../api/ProducsApi';
import ListEditImages from '../EditarProducto/ListEditImages';

import ListProducts from '../ListProducts';
import "./EliminarImagenes.scss";
// install Swiper components
export default function EliminarImagenes(props) {
    const { show, setShow, formData } = props;
    const [images, setImages] = useState(null)


    return (

        <Modal className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg">
            <Modal.Header >
                <Modal.Title>Eliminar imagenes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                < ListEditImages formData={formData} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
          </Button>

            </Modal.Footer>
        </Modal>








    )
}
