import React, { useEffect, useState } from 'react'
import { Form, Row, Button, Modal } from 'react-bootstrap'
import {
    updateInfoApi,
    buscoProducto, capitalizarPalabra, listaProductos, uploadAvatarApi, editAvatarApi, deleteAll
} from '../../api/ProducsApi';
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Add, Edit } from "../../utils/icons";
import "./EditarProducto.scss";
import { toast } from 'react-toastify';
import EliminarImagenes from '../EliminarImagenes';
// install Swiper components
export default function EditarProducto(props) {
    const { show, setShow, formData } = props;

    const { register, handleSubmit } = useForm();
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(
        formData.principal
    );
    const [newImageFile, setNewImageFile] = useState(null);
    const [newImageUrl, setNewImageUrl] = useState(
        null
    );
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(null)
    const [res, setRes] = useState(null)
    const [lista, setLista] = useState(null)
    const [editData, setEditData] = useState(formData)


    useEffect(() => {
        setEditData(formData)
    }, [formData])

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
    const onDropNewImage = (acceptedFile) => {
        const file = acceptedFile[0];
        setNewImageUrl(URL.createObjectURL(file));
        setNewImageFile(file);
    };

    const { getInputProps: getInputNewImageProps, getRootProps: getRootNewImageProps, } = useDropzone({
        accept: "image/jpeg, image/png, image/bmp",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropNewImage

    })


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
    const onChange = e => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (avatarFile) {


            await editAvatarApi(avatarFile, editData.producto, editData._id).catch(() => {
                toast.error("Error al subir el avatar");
            })
        }
        if (newImageFile) {
            await uploadAvatarApi(newImageFile, editData.producto).catch(() => {
                toast.error("Error al subir el avatar");
            })
        }

        await updateInfoApi(editData).then(() => {
            setShow(false);
        }
        ).catch(() => {
            toast.error("Error al actualizar los datos");
        })
        window.location.reload();
    }


    return (

        <Modal className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg">
            <Modal.Header >
                <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="container">


                    <Form.Group >
                        <div className="avatar" style={{ background: `url('${avatarUrl}')` }}{...getRootAvatarProps()}>
                            <input {...getInputAvatarProps()} />
                            <Edit />
                        </div>

                        <div className="banner" {...getRootNewImageProps()}>
                            <img className="image" src={newImageUrl} alt="" />
                            <input {...getInputNewImageProps()} />
                            <Add />
                        </div>
                        <Button className="btn btn-danger" onClick={() => setShowModal(true)}>Eliminar fotos</Button>
                        <Button className="btn btn-danger" onClick={() => {
                            deleteAll(formData?.producto).then(response => {
                                if (response.statusText) {
                                    window.location.reload();
                                }

                            })

                        }}>Eliminar producto</Button>
                        <EliminarImagenes show={showModal} setShow={setShowModal} formData={formData} />
                        <Row md={10} >
                            <Form.Control onBlur={onBlur} type="text" placeholder="Nombre" name="producto" onChange={onChange}
                                defaultValue={formData?.producto} />
                        </Row> <Row md={10} >
                            <textarea onChange={onChange} name="description" className="form-control"
                                placeholder="Descripcion" defaultValue={formData?.description}></textarea>

                        </Row>
                        <Row md={10} >
                            <Form.Control onChange={onChange} defaultValue={formData?.precio} type="text" placeholder="Precio" name="precio" />
                        </Row>
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
    function initialValue(formData) {
        return {
            _id: formData._id || "",
            producto: formData.producto || "",
            description: formData.description || "",
            precio: formData.precio || ""

        }
    }
}
