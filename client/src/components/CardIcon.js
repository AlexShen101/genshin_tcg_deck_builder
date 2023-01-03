import React, { useEffect, useState } from 'react'

import queryImage from '../firebase/FirebaseQueryImage'

const CardIcon = (props) => {
    return (
        <div className="card-container text-center">
            <>
                <img
                    width="123"
                    height="200"
                    src={props.card.imageUrl}
                    alt={props.card.name + props.card.image_id}
                ></img>
                <p className="card-text m-auto">{props.card.name}</p>
            </>
        </div>
    )
}

export default CardIcon
