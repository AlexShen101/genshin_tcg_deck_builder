import React from 'react'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import DeckEditor from '../components/DeckEditor'
import { addDeck } from '../store/DecksReducer/DeckSlice'

// See CurrentDeckSlice for the deck state structure
const CreateDeckPage = () => {
    console.log('rendering create deck page')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addMyDeck = async (deck) => {
        console.log('start submit deck action')
        // requirements: 3 chars, 30 action characters, name exists

        if (deck.deckName === '') {
            console.log('Deck needs to have a name!')
            return
        } else if (deck.length !== 30) {
            console.log('Deck needs to have 30 action cards!')
            return
        } else if (deck.characterCards.length !== 3) {
            console.log('Deck needs to have 3 character cards!')
            return
        }

        const newDeck = { ...deck, id: uuidv4() }
        dispatch(addDeck(newDeck))
        console.log('here')
        return navigate('/dashboard')
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
