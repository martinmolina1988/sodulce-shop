import React, { useState } from 'react'
import { Form, Row, Col, Spinner, Button, Alert, Modal } from 'react-bootstrap'
import { agregoProducto, addProduct, buscoProducto, capitalizarPalabra, listaProductos } from '../../api/ProducsApi';
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Add } from "../../utils/icons";
import { map } from 'lodash';
import ListProducts from '../ListProducts';
import "./CrearProducto.scss";
import { toast } from 'react-toastify';
import Cloud from '../cloud';
// install Swiper components
export default function CrearProducto(props) {
    const { show, setShow } = props;
    const { register, handleSubmit } = useForm();
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [data, setData] = useState(null)
    const [products, setProducts] = useState({
        "precio": "",
        "producto": "",
        "description": ""

    })
    const [res, setRes] = useState(null)
    const [lista, setLista] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(
        null
    );
    const [dataImage, setDataImage] = useState(null)
    const onDropAvatar = (acceptedFile) => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    };

    const { getInputProps: getInputAvatarProps, getRootProps: getRootAvatarProps, } = useDropzone({
        accept: "image/jpeg, image/png, image/bmp",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar

    })

    const onChange = (e) => {

        setProducts({ ...products, [e.target.name]: e.target.value });


    }
    const onBlur = (e) => {
        if (data) {
            buscoProducto(capitalizarPalabra(data)).then(response => {
                setRes(response?.data[0])
            })
        }
        listaProductos().then(response => {
            setLista(response.data)

        })

    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (avatarFile) {


        }
        await addProduct(avatarFile, products.producto, products.description, products.precio).catch(() => {
            toast.error("Error al subir el avatar");
        })




    }
    console.log(dataImage)
    return (

        <Modal className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg">
            <Modal.Header >
                <Modal.Title>Crear producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">

                    <Form.Group >

                        <Form.Group >
                            <div className="avatar" style={{ background: `url('${avatarUrl}')` }}{...getRootAvatarProps()}>
                                <input {...getInputAvatarProps()} />
                            </div>
                            <Row md={10} >
                                <Form.Control type="text" placeholder="Nombre" name="producto" onChange={onChange}
                                />
                            </Row> <Row md={10} >
                                <textarea onChange={onChange} name="description" className="form-control"
                                    placeholder="Descripcion" ></textarea>

                            </Row>
                            <Row md={10} >
                                <Form.Control onChange={onChange} type="text" placeholder="Precio" name="precio" />
                            </Row>
                        </Form.Group>

                    </Form.Group>
                    <Button onClick={onSubmit} variant="primary" >
                        Subir
                    </Button>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
          </Button>

            </Modal.Footer>
        </Modal>








    )
}
