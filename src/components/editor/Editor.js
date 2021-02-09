import React from 'react'
import AvatarEditor from 'react-avatar-editor';
export default function Editor() {
    return (
        <div>
            <AvatarEditor
                image="https://res.cloudinary.com/djxxttv9t/image/upload/v1608779831/gni1asz3zz7cerp7tmij.jpg"
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
            />
        </div>
    )
}
