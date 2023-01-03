import React from 'react'
import DeckEditor from '../components/DeckEditor'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getCards } from '../store/CardsReducer/CardThunk'
import { addDeck } from '../store/DecksReducer/DeckThunk'
import { setCurrentDeck } from '../store/CurrentDeckReducer/CurrentDeckSlice'

// See CurrentDeckSlice for the deck state structure
const CreateDeckPage = () => {
    console.log("rendering create deck page")
    const navigate = useNavigate()
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
        console.log("here")
        return navigate("/dashboard")
    }

    const newDeck = {
        deckName: '',
        characterCards: [],
        actionCards: [],
        length: 0,
    }

    return (
        <div>
            <DeckEditor submitDeck={addMyDeck} currentDeck={newDeck} />
        </div>
    )
}

export default CreateDeckPage
