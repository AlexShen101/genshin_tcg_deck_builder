import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { storage } from '../firebase/FirebaseSetup'
import { ref, getDownloadURL } from 'firebase/storage'

import { Link } from 'react-router-dom'

const mapCardToImageFolder = {
    characterCards: 'characters',
    artifactCards: 'weapons_artifacts',
    eventCards: 'event',
    supportCards: 'support',
    talentCards: 'talents',
    weaponCards: 'weapons_artifacts',
}

// takes in an image_type
const queryImage = (image_type, image_id, my_callback) => {
    const pathReference = ref(
        storage,
        image_type + '/' + image_id + '/' + image_id + '.png'
    )
    // var storageRef = firebase.storage().ref()
    getDownloadURL(pathReference)
        .then((url) => {
            my_callback(url)
            // document.querySelector('img').src = test;
        })
        .catch((error) => {
            console.log(error)
            my_callback(undefined)
        })
}

// handles rendering and functions for the card displayer
const viewCardPage = (props) => {
    const [card, setCard] = useState()
    const [imageUrl, setImageUrl] = useState()

    console.log(card)
    // This method fetches the relevant card types from the database.
    useEffect(() => {
        // card should either be "" or one of the elements in cardsToFetch
        async function getCard(cardType, id) {
            let allCards = []
            const fetchUrl = `http://localhost:5000/${cardType}/${id}`
            const response = await fetch(fetchUrl)
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                console.log(message)
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
