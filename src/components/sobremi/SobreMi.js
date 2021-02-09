import React, { useEffect, useState } from 'react'
import { Markup } from 'interweave';
import { buscoSobremi } from '../../api/ProducsApi';
import "./SobreMi.scss";
import BasicLayout from '../BasicLayout/BasicLayout';
import TextEditor from '../textEditor';
import { Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';


export default function SobreMi(props) {
    const {
        precio,
        productsCart
    } = props;

    const [sobre, setSobre] = useState(null)
    const [showText, setShowText] = useState(false)
    const user = useAuth();
    useEffect(() => {

        buscoSobremi().then(response => {
            setSobre(response.data[0].sobremi)
        })
    }, [])
    return (
        <BasicLayout
            precio={precio}
            productsCart={productsCart}
        >
            <div className="wrapper">
                <div className="titulo">
                    <h1 id="sobremi" className="mx-auto">Sobre mi</h1>
                </div>
            </div>
            <div className="sobre-mi">


                {sobre &&
                    <Markup content={sobre} />


                }
            </div>
            { user &&
                <Button onClick={() => setShowText(true)}>Editar Sobre mi</Button>
            }
            <TextEditor show={showText} setShow={setShowText} user={user} />
        </BasicLayout>
    )
}
