import React, { useState } from 'react'
import Axios from "axios";


import "./Cloud.scss"

export default function Cloud(props) {
    const { setDataImage } = props;


    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'martin')
        setLoading(true)
        const file = await Axios(
            {
                url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
                method: 'POST',
                data: data
            }
        )
        setDataImage(file.data);
        console.log(file.data.public_id)
        setImage(file.data.secure_url)
        setLoading(false)
    }

    return (
        <div className="App">
            <h1>Upload Image</h1>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                    <img src={image} style={{ width: '300px' }} />
                )}
        </div>
    )
}
