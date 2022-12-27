import React from 'react'
import DeckEditor from '../components/DeckEditor'
import { useSelector, useDispatch } from 'react-redux'

import { addDeck } from '../store/DecksReducer/DeckThunk'
import { setCurrentDeck } from '../store/CurrentDeckReducer/CurrentDeckSlice'

// See CurrentDeckSlice for the deck state structure
const CreateDeckPage = () => {
    const dispatch = useDispatch()
    const addMyDeck = async (deck) => {
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
            <DeckEditor submitDeck={addMyDeck} />
        </div>
    )
}

export default CreateDeckPage
