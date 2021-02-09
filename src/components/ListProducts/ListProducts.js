import React, { useEffect, useState } from 'react'
import "./ListProducts.scss"
import ShowMoreText from 'react-show-more-text';
import { listaProductos } from '../../api/ProducsApi';
import { Button } from 'react-bootstrap';
import BasicModal from '../modal/basicModal/BasicModal';
import EditarProducto from '../EditarProducto';
import useAuth from '../../hooks/useAuth';
export default function ListProducts(props) {
    const { addProductCart, setProducts } = props;

    const [postre, setPostre] = useState(null)
    const [producto, setProducto] = useState(null)
    const [tipo, setTipo] = useState("fecha")
    const [valor, setValor] = useState(-1)
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [inicio, setInicio] = useState(true);
    const [formData, setFormData] = useState({});
    const user = useAuth();
    useEffect(() => {

        listaProductos(tipo, valor).then(response => {
            console.log(response)
            setPostre(response?.data)
            setProducts(response?.data)
        })
        setInicio(true)
    }, [tipo, valor])

    const onClick = () => {

        setShowEdit(true);

    }
    const phone = '541134054422'
    const msg = encodeURIComponent("Quisiera tener más información acerca del producto " + formData.producto)
    const href = `https://wa.me/${phone}/?text=${msg}`

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }



    return (
        <>
            <div className="row justify-content-center h-100">
                <Button className="precio" onClick={() => { setValor(1); setTipo("precio") }}>Menor precio</Button>
                <Button className="precio" onClick={() => { setValor(-1); setTipo("precio") }}>Mayor precio</Button>
            </div>   {postre &&
                <div className="container" >
                    < div className="card-columns " >
                        {postre.map(name => (





                            <div className="card text-center" onClick={() => { setShow(true); setProducto(name.producto) }} >
                                <img className="card-img-top img-responsive" src={name.principal} alt="Card image cap" />
                                <div onClick={(e) => e.stopPropagation()} className="card-body">
                                    <h5 className="card-title">{name.producto}</h5>

                                    <ShowMoreText
                                        lines={2}
                                        more='Mostrar más'
                                        less='Mostrar menos'
                                        className='content-css'
                                        anchorClass='my-anchor-css-class'

                                        expanded={false}
                                        width={280}
                                    >


                                        <p className="card-text">{name.description}</p>
                                    </ShowMoreText>
                                </div>
                                <p className="text-muted">
                                    Precio <cite title="Source Title">${name.precio}</cite>
                                </p>
                                {user ? (

                                    <Button variant={"danger"} onClick={(e) => { e.stopPropagation(); setFormData(name); onClick() }}>Editar</Button>
                                ) : (<>
                                    <Button className="añadir" onClick={(e) => { e.stopPropagation(); setFormData(name); addProductCart(name?._id, name?.producto) }}>

                                        Añadir al carrito

                                    </Button>


                                </>
                                )}
                            </div>
                        ))}
                    </div>
                    <BasicModal show={show} setShow={setShow} producto={producto} />
                    <EditarProducto show={showEdit} formData={formData} setShow={setShowEdit} />

                </div >
            }
        </>


    )
}
