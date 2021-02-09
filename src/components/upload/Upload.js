import React, { useState } from 'react'
import { Form, Row, Col, Spinner, Button, Modal } from 'react-bootstrap'

export default function Upload(props) {
    const [signUpLoading, setSignUpLoading] = useState(false);
    const { show, setShow } = props;


    return (
        <div className="container">


            <Modal className="tweet-modal"
                show={show}
                onHide={() => setShow(false)}
                centered
                size="lg">
                <Modal.Header >
                    <Modal.Title>Crear producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form action="http://localhost:4000/images/add" enctype="multipart/form-data" method="POST">

                        <Form.Group >
                            <Row md={4} >
                                <Form.Control type="text" placeholder="Titulo" name="title" />
                            </Row>
                            <Row md={4} >
                                <Form.Control type="text" placeholder="Producto" name="producto" />
                            </Row> <Row md={4} >
                                <textarea name="description" className="form-control"
                                    placeholder="Descripcion de la imagen"></textarea>

                            </Row>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Principal" name="principal" value="true" />
                        </Form.Group>
                        <Form.Group>
                            <Row md={4}>
                                <Col>
                                    <input type="file" name="image" className="custom-file-input" id="inputGroupFile01" />
                                    <label for="inputGroupFile01" className="custom-file-label">Escoge un archivo</label>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {!signUpLoading ? "Subir" : <Spinner animation="border" />}
                        </Button>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
          </Button>

                </Modal.Footer>
            </Modal>







        </div>
    )
}
