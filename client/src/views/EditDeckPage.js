import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { addDeck } from '../store/DecksReducer/DeckThunk'
import { setCurrentDeck } from '../store/CurrentDeckReducer/CurrentDeckSlice'
import DeckEditor from '../components/DeckEditor'

// See CurrentDeckSlice for the deck state structure
const EditDeckPage = (props) => {
    console.log("rendering edit deck page")
    const dispatch = useDispatch()

    // get decks, and use url id to find this deck
    // I could use getDeck to fetch a deck from the backend and setCurrentDeck to that
    // instead I assume decks is accurate and loaded upon app initialization, thus I can get the decks from redux instead
    const deckId = useParams().id
    const decks = useSelector((state) => {
        return state.decks
    })

    const thisDeck = decks.find(deck => deck._id === deckId)
    dispatch(setCurrentDeck(thisDeck))


    const editMydeck = async (deck) => {
        console.log('start submit deck action')
        // requirements: 3 chars, 30 action characters, name exists
        const deckCopy = { ...deck }
        if (deckCopy.deckName === '') {
            console.log('Deck needs to have a name!')
            return
        } else if (deckCopy.length !== 30) {
            console.log('Deck needs to have 30 action cards!')
            return
        } else if (deckCopy.characterCards.length !== 3) {
            console.log('Deck needs to have 3 character cards!')
            return
        }
        dispatch(addDeck(deck))
        dispatch(setCurrentDeck(null))
    }

    return (
        <div>
            <DeckEditor submitDeck={editMydeck} />
        </div>
    )
}

export default EditDeckPage
