import { createAsyncThunk } from '@reduxjs/toolkit'
import queryImage from '../../firebase/FirebaseQueryImage'

// backend URLs to call get requests on
const cardsToFetch = [
    'characterCards',
    'artifactCards',
    'eventCards',
    'supportCards',
    'talentCards',
    'weaponCards',
]

const mapCardToImageFolder = {
    characterCards: 'characters',
    artifactCards: 'weapons_artifacts',
    eventCards: 'event',
    supportCards: 'support',
    talentCards: 'talents',
    weaponCards: 'weapons_artifacts',
}

/*
 * This is very slow since it fetches the urls of the firebase images one by one
 * I think I can speed it up if i store the imageUrls in the database with a firebasePath key as well
 */
const fetchAllCards = async () => {
    let allCards = []
    for (const cardType of cardsToFetch) {
        console.log(cardType)
        const fetchUrl = `http://localhost:5000/${cardType}`
        const response = await fetch(fetchUrl)
        let outputCards = await response.json()
        for (const card of outputCards) {
            const firebasePath = `/${mapCardToImageFolder[cardType]}/${card.image_id}/${card.image_id}.png`
            const imageUrl = await queryImage(firebasePath)
            const newCard = {
                ...card,
                imageUrl: imageUrl,
                cardType: cardType.replace('Cards', ''),
            }
            allCards.push(newCard)
        }
    }
    console.log(allCards)
    return allCards

}

export const getCards = createAsyncThunk('cards/getAll', async () => {
    console.log("starting")

    // right now this is executing before all cards are fetched
    let response = await fetchAllCards()
    return response
})