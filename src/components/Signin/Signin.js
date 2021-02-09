import React, { useState } from 'react';
import { values, size } from "lodash";
import { Form, Button, Modal } from 'react-bootstrap'
import "./Signin.scss";
import { ingresoAdmin } from "../../api/ProducsApi";
import { toast } from 'react-toastify';
import { setTokenApi } from '../../api/auth';


export default function Signin(props) {
    const { show, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        });

        if (size(formData) !== validCount) {
            toast.warning("Completa todo los campos del formulario");
        } else {
            {
                setSignInLoading(true);
                ingresoAdmin(formData).then(response => {

                    setTokenApi(response.data.token);

                })
                    .catch(() => {
                        toast.error("Error del servidor, inténtelo más tarde");
                    })
                    .finally(() => {
                        setSignInLoading(false);
                        window.location.reload();
                    });
            }
        }
    };
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="container">


            <Modal className="tweet-modal"
                show={show}
                onHide={() => setShow(false)}
                centered
                size="lg">
                <Modal.Header >
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form onSubmit={onSubmit} onChange={onChange}>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Correo electronico"
                                defaultValue={formData.email}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                defaultValue={formData.password}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ingresar
                    </Button>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
          </Button>

                </Modal.Footer>
            </Modal>







        </div>
    )
    function initialFormValue() {
        return {
            email: "",
            password: ""
        };
    }

}
