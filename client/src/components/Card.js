import React, { useEffect, useState } from 'react'

import queryImage from '../firebase/FirebaseQueryImage'

const Card = (props) => {
    return (
        <div>
            <img
                src={props.card.imageUrl}
                alt={props.card.name + props.card.image_id}
            ></img>
            <p>{props.card.name}</p>
        </div>
    )
}

export default Card
