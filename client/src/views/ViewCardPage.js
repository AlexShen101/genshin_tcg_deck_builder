import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import queryImage from '../firebase/FirebaseQueryImage'

const mapCardToImageFolder = {
    characterCards: 'characters',
    artifactCards: 'weapons_artifacts',
    eventCards: 'event',
    supportCards: 'support',
    talentCards: 'talents',
    weaponCards: 'weapons_artifacts',
}

// handles rendering and functions for the card displayer
const viewCardPage = (props) => {
    const [card, setCard] = useState()
    const [imageUrl, setImageUrl] = useState()

    // This method fetches the relevant card types from the database.
    useEffect(() => {
        // card should either be "" or one of the elements in cardsToFetch
        const getCard = async (cardType, id) => {
            let allCards = []
            const fetchUrl = `http://localhost:5000/${cardType}/${id}`
            const response = await fetch(fetchUrl)
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }
            let outputCard = await response.json()
            let imageFolder = mapCardToImageFolder[props.params.cardType]
            queryImage(imageFolder, outputCard.image_id, setImageUrl)

            setCard(outputCard)
        }
        getCard(props.params.cardType, props.params.id)
        return
    }, [])

    // This following section will display the table with the cards of individuals.
    return (
        <div>
            <h3>Card View</h3>
            <div>
                {card != null ? (
                    <>
                        <img src={imageUrl} alt={imageUrl}></img>
                        <h3>{card.name}</h3>
                        <p>{card.description}</p>
                        <p>{card.cost}</p>
                        <p>{card.obtained}</p>
                        <p>{card.effect}</p>
                    </>
                ) : (
                    <h3>Loading...</h3>
                )}
            </div>
        </div>
    )
}

const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />
}

export default withParams(viewCardPage)
