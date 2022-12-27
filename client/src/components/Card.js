import React, { useEffect, useState } from 'react'

import queryImage from '../firebase/FirebaseQueryImage'

const Card = (props) => {
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        queryImage(props.card.firebasePath, setImageUrl)
    }, [])

    return (
        <div>
            <img
                src={imageUrl}
                alt={props.card.name + props.card.image_id}
            ></img>
            <p>{props.card.name}</p>
        </div>
    )
}

export default Card
