import React, { useEffect, useState } from 'react'
import { Add } from "../../utils/icons";
import { Button } from 'react-bootstrap'
import { useDropzone } from "react-dropzone";

import "./Encabezado.scss";
import { updateBanner, buscoBanner, updateLogo, buscoLogo } from '../../api/ProducsApi';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

export default function Encabezado(props) {
    const [loadBanner, setLoadBanner] = useState(false);
    const user = useAuth();
    const [newImageFile, setNewImageFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [banner, setBanner] = useState(null);
    const [logo, setLogo] = useState(null);
    const [newImageUrl, setNewImageUrl] = useState(
        null
    );
    const [logoUrl, setLogoUrl] = useState(
        null
    );
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
    const onDropLogo = (acceptedFile) => {
        const file = acceptedFile[0];
        setLogoUrl(URL.createObjectURL(file));
        setLogoFile(file);
    };

    const { getInputProps: getInputLogoProps, getRootProps: getRootLogoProps, } = useDropzone({
        accept: "image/jpeg, image/png, image/bmp",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropLogo

    })

    const onSubmit = async () => {
        console.log("Click")
        if (newImageFile) {
            await updateBanner(newImageFile).catch(() => {
                toast.error("Error al subir el avatar");
            })
        }
    }
    const subirLogo = async () => {
        console.log("Click")
        if (logoFile) {
            await updateLogo(logoFile).catch(() => {
                toast.error("Error al subir el avatar");
            })
        }
    }

    useEffect(() => {
        buscoBanner().then(response => {
            setBanner(response?.data[0].secure_url)
            if (response)
                setLoadBanner(true)
        })
        buscoLogo().then(response => {

            console.log(response)
            if (response)
                setLogo(response?.data[0].secure_url)
            setLoadBanner(true)
        })
    }, [user])
    return (<>
        {!loadBanner ? (

            <div className="row justify-content-center h-100 "> <div className="lds-heart "><div></div></div></div>
        ) : (

                <div className="container">
                    {user &&
                        <><div className="banner" {...getRootLogoProps()}>
                            <h4>Cambiar logo</h4>
                            <input {...getInputLogoProps()} />
                            <Add />
                            <img className="image" src={logoUrl} alt="" />
                        </div>
                            <Button onClick={subirLogo}>Subir</Button>
                        </>}
                    <img src={logo} id="logo" className="img" alt="Banner" />


                    {user &&
                        <><div className="banner" {...getRootNewImageProps()}>
                            <h4>Cambiar banner</h4>
                            <input {...getInputNewImageProps()} />
                            <Add />
                            <img className="image" src={newImageUrl} alt="" />
                        </div>
                            <Button onClick={onSubmit}>Subir</Button>
                        </>}
                    <img src={banner} className="banner d-block w-100" alt="Banner" />

                </div>)}</>
    )
}
