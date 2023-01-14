import { createAsyncThunk } from '@reduxjs/toolkit'

// backend URLs to call get requests on
const cardsToFetch = [
    'characterCards',
    'artifactCards',
    'eventCards',
    'supportCards',
    'summons',
    'statuses',
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
    // connect to backend for image urls
    const imageUrlsResponse = await fetch(
        `${process.env.REACT_APP_HOSTNAME}/firebaseImageUrls`
    )
    const imageUrls = await imageUrlsResponse.json()
    for (const cardType of cardsToFetch) {
        const fetchUrl = `${process.env.REACT_APP_HOSTNAME}/${cardType}`
        const response = await fetch(fetchUrl)
        const outputCards = await response.json()
        for (const card of outputCards) {
            const cardUrl = imageUrls.find(
                (url) => url.image_id === card.image_id
            )
            const newCard = {
                ...card,
                imageUrl: cardUrl ? cardUrl.icon_imageUrl : undefined,
                highResImageUrl: cardUrl ? cardUrl.highres_imageUrl : undefined,
                cardType: cardType.replace('Cards', ''),
            }
            allCards.push(newCard)
        }
    }
    return allCards
}

export const getCards = createAsyncThunk('cards/getAll', async () => {
    // right now this is executing before all cards are fetched
    let response = await fetchAllCards()
    return response
})
