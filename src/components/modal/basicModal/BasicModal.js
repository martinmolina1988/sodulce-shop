import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { listaFotos } from '../../../api/ProducsApi';
import Producto from '../../Producto/Producto';
import "./BasicModal.scss"
export default function BasicModal(props) {
    const { show, setShow, producto } = props;




    return (
        <div>


            <Modal className="tweet-modal"
                show={show}
                onHide={() => setShow(false)}
                centered
                size="lg">
                <Modal.Header >
                    <Modal.Title>{producto}</Modal.Title>
                </Modal.Header>
                <Modal.Body><Producto producto={producto} /> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
          </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
